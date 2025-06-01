import json
from groq import Groq
import time
import random

def generate_meta_description(quiz_title, quiz_id, client, attempt=1):
    """Generate a unique meta description using Groq API."""
    
    prompt = f"""Create a fresh and original meta description for a trivia quiz titled: "{quiz_title}"

Guidelines:
- Keep it under 160 characters.
- Don't follow a standard format or template.
- Avoid repeating phrases like "Test your knowledge" or "Challenge yourself".
- Make it sound different from typical quiz taglines.
- Use creativity, wit, or intrigue based on the quiz topic.
- You may use humor, curiosity, mystery, or a clever hook.

Only return the one-sentence meta description with no labels or quotation marks."""

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7 + (attempt * 0.1),  # Increase randomness with attempts
            max_tokens=80,
            top_p=1,
            stream=False,
            stop=None,
        )
        
        meta_description = completion.choices[0].message.content.strip()
        
        # Clean up the response
        meta_description = meta_description.replace('"', '').replace("'", "")
        if meta_description.startswith("Meta description:"):
            meta_description = meta_description.replace("Meta description:", "").strip()
        
        # Remove any leading/trailing punctuation
        meta_description = meta_description.strip('.,!?')
        
        # Ensure it's under 160 characters
        if len(meta_description) > 160:
            meta_description = meta_description[:157] + "..."
        
        return meta_description
            
    except Exception as e:
        print(f"  Error: {str(e)}")
        if "rate" in str(e).lower() or "limit" in str(e).lower():
            print(f"  Rate limit hit, waiting longer...")
            time.sleep(10)  # Wait 10 seconds for rate limit
            if attempt < 3:
                return generate_meta_description(quiz_title, quiz_id, client, attempt + 1)
            else:
                return create_fallback_meta(quiz_title)
        else:
            return create_fallback_meta(quiz_title)

def create_fallback_meta(quiz_title):
    """Create a fallback meta description when API fails."""
    # Extract main topic from title
    title_words = quiz_title.lower().split()
    
    if 'deadpool' in title_words and 'wolverine' in title_words:
        return "Test your Marvel superhero knowledge! Challenge yourself with Deadpool & Wolverine trivia questions."
    elif 'friends' in title_words:
        return "Could you BE any more ready for this Friends quiz? Test your knowledge of the iconic TV show!"
    elif 'breaking' in title_words and 'bad' in title_words:
        return "Say my name! Test your Breaking Bad knowledge with this comprehensive TV series quiz."
    elif 'game' in title_words and 'thrones' in title_words:
        return "Winter is coming! Challenge your Game of Thrones expertise with this epic fantasy quiz."
    elif 'machine' in title_words and 'learning' in title_words:
        return "Master machine learning concepts! Test your AI and data science knowledge with this tech quiz."
    elif 'taylor' in title_words and 'swift' in title_words:
        return "Shake it off and test your Swiftie knowledge! Challenge yourself with Taylor Swift trivia."
    else:
        # Generic fallback based on first word
        topic = quiz_title.split()[0] if quiz_title.split() else "trivia"
        return f"Test your {topic} knowledge with this engaging trivia quiz! Challenge yourself today."

def main():
    # Initialize Groq client
    client = Groq(api_key="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")
    
    # Load quiz data
    with open('quiz_titles_and_ids.json', 'r', encoding='utf-8') as f:
        quiz_data = json.load(f)
    
    print(f"Generating meta descriptions for {len(quiz_data)} quizzes using Groq API...")
    print("This will take approximately 20-30 minutes due to API rate limits.")
    print("Using 3-second delays between requests to avoid rate limiting.")
    
    generated_metas = []
    used_descriptions = set()
    
    for i, quiz in enumerate(quiz_data, 1):
        quiz_id = quiz['id']
        quiz_title = quiz['title']
        
        print(f"\nProcessing {i}/{len(quiz_data)}: {quiz_title[:60]}...")
        
        # Generate meta description
        meta_description = generate_meta_description(quiz_title, quiz_id, client)
        
        # Ensure uniqueness
        attempt = 1
        while meta_description in used_descriptions and attempt <= 3:
            print(f"  Duplicate detected, regenerating (attempt {attempt + 1})...")
            meta_description = generate_meta_description(quiz_title, quiz_id, client, attempt + 1)
            attempt += 1
        
        # If still duplicate, modify it slightly
        if meta_description in used_descriptions:
            meta_description = f"{meta_description[:-1]} - Quiz #{random.randint(100,999)}"
            if len(meta_description) > 160:
                meta_description = meta_description[:157] + "..."
        
        used_descriptions.add(meta_description)
        
        quiz_entry = {
            "id": quiz_id,
            "title": quiz_title,
            "meta_description": meta_description,
            "length": len(meta_description)
        }
        
        generated_metas.append(quiz_entry)
        
        print(f"  Generated ({len(meta_description)} chars): {meta_description}")
        
        # Save progress every 10 quizzes
        if i % 10 == 0:
            with open('quiz_meta_descriptions_groq_progress.json', 'w', encoding='utf-8') as f:
                json.dump(generated_metas, f, indent=2, ensure_ascii=False)
            print(f"  Progress saved: {i}/{len(quiz_data)} completed")
        
        # Rate limiting - wait 3 seconds between requests (Groq is faster than OpenRouter)
        if i < len(quiz_data):
            time.sleep(3)
    
    # Save final results
    output_file = 'quiz_meta_descriptions_groq_final.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(generated_metas, f, indent=2, ensure_ascii=False)
    
    # Statistics
    lengths = [len(meta['meta_description']) for meta in generated_metas]
    unique_count = len(set(meta['meta_description'] for meta in generated_metas))
    
    print(f"\n✅ COMPLETED!")
    print(f"📄 Saved to: {output_file}")
    print(f"📊 Statistics:")
    print(f"   Total quizzes: {len(generated_metas)}")
    print(f"   Unique descriptions: {unique_count}")
    print(f"   Duplicates: {len(generated_metas) - unique_count}")
    print(f"   Average length: {sum(lengths) / len(lengths):.1f} characters")
    print(f"   Max length: {max(lengths)} characters")
    print(f"   Min length: {min(lengths)} characters")
    
    # Show some examples
    print(f"\n📝 Sample Generated Meta Descriptions:")
    for i in range(min(5, len(generated_metas))):
        meta = generated_metas[i]
        print(f"   {meta['title'][:50]}...")
        print(f"   → {meta['meta_description']}")
        print()

if __name__ == "__main__":
    main() 