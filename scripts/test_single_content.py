#!/usr/bin/env python3
"""
Test single content generation for any quiz by Quiz ID
"""

from openai import OpenAI
import json
import sys
from datetime import datetime
from pathlib import Path

def load_quiz_data(quiz_id):
    """Load quiz data from quizzes.json file."""
    try:
        quizzes_file = Path(__file__).parent.parent / "data" / "quizzes.json"
        with open(quizzes_file, 'r', encoding='utf-8-sig') as f:
            quizzes = json.load(f)
        
        # Find the quiz by ID
        quiz = next((q for q in quizzes if q.get("id") == quiz_id), None)
        if not quiz:
            print(f"❌ Quiz with ID '{quiz_id}' not found!")
            return None
            
        return quiz
        
    except Exception as e:
        print(f"❌ Error loading quiz data: {e}")
        return None

def determine_subcategory(quiz):
    """Determine subcategory based on quiz data."""
    title_lower = quiz.get("title", "").lower()
    tags = [tag.lower() for tag in quiz.get("tags", [])]
    category = quiz.get("category", "")
    
    # Subcategory detection logic
    if category == "entertainment":
        if any(word in title_lower or word in " ".join(tags) for word in ["movie", "film", "cinema", "actor", "actress", "director"]):
            return "movies"
        elif any(word in title_lower or word in " ".join(tags) for word in ["tv", "television", "series", "show", "episode"]):
            return "tv-shows"
        elif any(word in title_lower or word in " ".join(tags) for word in ["music", "song", "album", "artist", "band", "singer", "musician"]):
            return "music"
        else:
            return "movies"  # Default for entertainment
    elif category == "technology":
        return "technology"
    elif category == "science":
        return "science"
    elif category == "history":
        return "history"
    else:
        return category

def create_content_prompt(quiz, subcategory):
    """Create content generation prompt based on quiz data."""
    
    # Clean title for content
    clean_title = quiz["title"].replace("Trivia Questions and Answers", "").replace("Quiz", "").strip()
    if clean_title.endswith(" -"):
        clean_title = clean_title[:-2].strip()
    
    base_prompt = f"""
Create an educational article about "{clean_title}" for a quiz learning platform in HTML format.

QUIZ CONTEXT:
- Title: {quiz["title"]}
- Category: {quiz["category"]}
- Subcategory: {subcategory}
- Description: {quiz.get("description", "")}
- Tags: {", ".join(quiz.get("tags", []))}

IMPORTANT HTML FORMATTING REQUIREMENTS:
- Generate content in semantic HTML structure
- Use the exact format shown below
- Include schema.org markup for SEO
- Use Tailwind CSS classes for styling
- Target 400-500 words total
- Write for all ages in an engaging, educational tone

REQUIRED HTML STRUCTURE:
<article itemscope itemtype='https://schema.org/Article'>
    <h2 class='text-2xl font-bold mb-4' itemprop='headline'>[Article Title Here]</h2>
    <div itemprop='articleBody'>
        <p class='text-gray-700 leading-relaxed mb-4'>[First paragraph content]</p>
        
        <p class='text-gray-700 leading-relaxed mb-4'>[Second paragraph content]</p>
        
        <p class='text-gray-700 leading-relaxed mb-4'>[Third paragraph content]</p>
        
        <p class='text-gray-700 leading-relaxed'>[Final paragraph content]</p>
    </div>
    <div class='mt-4 text-sm text-gray-500' itemprop='keywords'>Keywords: [relevant, keywords, here]</div>
</article>

CONTENT GUIDELINES:
- Write 4-5 well-structured paragraphs
- Include specific details, facts, and interesting information
- Use natural language without markdown formatting
- Keep paragraphs to 3-4 sentences each
- Make content educational and engaging"""

    # Add subcategory-specific guidance
    if subcategory == 'movies':
        return base_prompt + """

For this movie topic, cover:
- Brief plot overview and significance
- Key cast and crew members
- Production highlights and interesting facts
- Critical reception and cultural impact
- Notable achievements or awards

Generate appropriate keywords related to: movies, entertainment, film, cinema, actors"""
    
    elif subcategory == 'tv-shows':
        return base_prompt + """

For this TV show topic, cover:
- Show premise and main characters
- Key seasons and memorable episodes
- Cast and production team
- Cultural impact and fanbase
- Awards and critical reception

Generate appropriate keywords related to: television, tv series, entertainment, drama, comedy"""
    
    elif subcategory == 'music':
        return base_prompt + """

For this music topic, cover:
- Artist/band background and career
- Musical style and influences
- Notable albums and hit songs
- Career achievements and awards
- Impact on music industry

Generate appropriate keywords related to: music, artist, songs, albums, entertainment"""
    
    elif subcategory == 'technology':
        return base_prompt + """

For this technology topic, cover:
- Technology explanation and functionality
- Historical development and inventors
- Current applications and uses
- Impact on society and industry
- Future developments and trends

Generate appropriate keywords related to: technology, innovation, digital, computing, science"""
    
    elif subcategory == 'science':
        return base_prompt + """

For this science topic, cover:
- Scientific principles and concepts
- Key discoveries and researchers
- Real-world applications
- Importance in scientific advancement
- Current research and developments

Generate appropriate keywords related to: science, research, discovery, knowledge, innovation"""
    
    elif subcategory == 'history':
        return base_prompt + """

For this history topic, cover:
- Historical context and time period
- Important figures and events
- Causes and consequences
- Historical significance
- Legacy and lasting impact

Generate appropriate keywords related to: history, historical, events, culture, civilization"""
    
    else:
        return base_prompt + """

For this general topic, provide:
- Clear introduction and context
- Important background information
- Key facts and interesting details
- Significance and impact
- Notable aspects or achievements

Generate appropriate keywords related to the topic."""

def create_knowledge_graph_prompt(quiz, subcategory):
    """Create knowledge graph generation prompt based on quiz data."""
    
    clean_title = quiz["title"].replace("Trivia Questions and Answers", "").replace("Quiz", "").strip()
    if clean_title.endswith(" -"):
        clean_title = clean_title[:-2].strip()
    
    return f"""
Create a knowledge graph table in HTML format for "{clean_title}".

QUIZ CONTEXT:
- Title: {quiz["title"]}
- Category: {quiz["category"]}
- Subcategory: {subcategory}
- Tags: {", ".join(quiz.get("tags", []))}

REQUIRED HTML STRUCTURE:
<table border='1' cellpadding='8' cellspacing='0' style='width:100%; border-collapse:collapse;'>
<thead>
<tr style='background-color:#f3f4f6;'>
<th>Entity</th>
<th>Type</th>
<th>Role/Relation</th>
<th>Details</th>
</tr>
</thead>
<tbody>
[Generate 12-15 rows with relevant entities]
</tbody>
</table>

ENTITY CATEGORIES TO INCLUDE (based on {subcategory}):
- Main subject/topic
- Key people involved
- Organizations/companies
- Important dates
- Key concepts and themes
- Related works or projects
- Technical aspects (if applicable)
- Cultural significance
- Awards or recognition

FORMAT EACH ROW AS:
<tr><td>[Entity Name]</td><td>[Type]</td><td>[Role/Relation]</td><td>[Details]</td></tr>

Make it comprehensive and educational, covering all major aspects of the topic.
"""

def test_single_content(quiz_id=None):
    """Test content generation for a specific quiz by ID."""
    
    # Get quiz ID from command line argument or use default
    if not quiz_id:
        quiz_id = sys.argv[1] if len(sys.argv) > 1 else "deadpool-and-wolverine-trivia-questions-answers"
    
    print(f"🎯 Generating content for Quiz ID: {quiz_id}")
    
    # Load quiz data
    quiz = load_quiz_data(quiz_id)
    if not quiz:
        return
    
    print(f"📝 Quiz Title: {quiz['title']}")
    print(f"📂 Category: {quiz['category']}")
    
    # Determine subcategory
    subcategory = determine_subcategory(quiz)
    print(f"🏷️ Subcategory: {subcategory}")
    
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key="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",
    )
    
    # Create prompts based on quiz data
    content_prompt = create_content_prompt(quiz, subcategory)
    knowledge_graph_prompt = create_knowledge_graph_prompt(quiz, subcategory)
    
    try:
        print("\n🔄 Generating HTML content...")
        
        # Generate main content
        content_completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://localhost:3001",
                "X-Title": "Trivia Quiz Website - Content Generator",
            },
            model="deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages=[{
                "role": "user",
                "content": content_prompt
            }],
            temperature=0.7,
            max_tokens=1000
        )
        
        content = content_completion.choices[0].message.content.strip()
        
        # Clean up HTML content
        if content.startswith('```html'):
            content = content.replace('```html', '').replace('```', '').strip()
        
        print("✅ Main content generated successfully!")
        print(f"📝 Content word count: {len(content.split())}")
        
        print("\n🔄 Generating knowledge graph table...")
        
        # Generate knowledge graph
        kg_completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://localhost:3001",
                "X-Title": "Trivia Quiz Website - Knowledge Graph Generator",
            },
            model="deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages=[{
                "role": "user",
                "content": knowledge_graph_prompt
            }],
            temperature=0.6,
            max_tokens=1200
        )
        
        knowledge_graph = kg_completion.choices[0].message.content.strip()
        
        # Clean up knowledge graph HTML
        if knowledge_graph.startswith('```html'):
            knowledge_graph = knowledge_graph.replace('```html', '').replace('```', '').strip()
        
        print("✅ Knowledge graph generated successfully!")
        
        # Create content title
        clean_title = quiz["title"].replace("Trivia Questions and Answers", "").replace("Quiz", "").strip()
        if clean_title.endswith(" -"):
            clean_title = clean_title[:-2].strip()
            
        templates = {
            "movies": "About the",
            "tv-shows": "About the", 
            "music": "About",
            "technology": "About",
            "science": "About",
            "history": "About",
            "default": "About"
        }
        
        prefix = templates.get(subcategory, templates["default"])
        content_title = f"{prefix} {clean_title}"
        
        # Load existing content or create new structure
        content_file = Path(__file__).parent.parent / "data" / "quiz-content.json"
        if content_file.exists():
            with open(content_file, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
        else:
            existing_data = {"quizContents": []}
        
        # Remove existing entry for this quiz if it exists
        existing_data["quizContents"] = [
            item for item in existing_data["quizContents"] 
            if item.get("quizId") != quiz_id
        ]
        
        # Add new content entry
        new_entry = {
            "quizId": quiz_id,
            "categoryId": quiz["category"],
            "subcategoryId": subcategory,
            "title": content_title,
            "content": content,
            "knowledgeGraphHtml": knowledge_graph,
            "lastUpdated": datetime.now().isoformat(),
            "wordCount": len(content.split()),
            "generatedBy": "html_content_generator_v1",
            "success": True
        }
        
        existing_data["quizContents"].append(new_entry)
        
        # Save updated content
        with open(content_file, 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, indent=2, ensure_ascii=False)
        
        print("💾 Content saved to quiz-content.json")
        print(f"📊 Total content word count: {len(content.split())}")
        print(f"📋 Knowledge graph entities: {knowledge_graph.count('<tr>') - 1}")  # -1 for header row
        print(f"🎯 Content title: {content_title}")
        
        # Preview
        print(f"\n📄 Content preview: {content[:200]}...")
        print(f"\n🔗 Knowledge graph preview: {knowledge_graph[:200]}...")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    test_single_content() 