import json

def update_meta_descriptions():
    """Update quiz meta descriptions with Groq-generated ones."""
    
    # Load the Groq-generated meta descriptions
    with open('quiz_meta_descriptions_groq_final.json', 'r', encoding='utf-8') as f:
        groq_metas = json.load(f)
    
    # Create a mapping from quiz ID to meta description
    meta_mapping = {quiz['id']: quiz['meta_description'] for quiz in groq_metas}
    
    print(f"Loaded {len(meta_mapping)} Groq-generated meta descriptions")
    
    # Update quizzes-backup.json (main file)
    with open('data/quizzes-backup.json', 'r', encoding='utf-8') as f:
        quizzes = json.load(f)
    
    updated_count = 0
    not_found = []
    
    for quiz in quizzes:
        quiz_id = quiz.get('id')
        if quiz_id in meta_mapping:
            old_meta = quiz.get('metaDescription', '')
            new_meta = meta_mapping[quiz_id]
            quiz['metaDescription'] = new_meta
            updated_count += 1
            print(f"Updated {quiz_id}:")
            print(f"  Old: {old_meta[:80]}...")
            print(f"  New: {new_meta}")
            print()
        else:
            not_found.append(quiz_id)
    
    # Save the updated quizzes
    with open('data/quizzes-backup.json', 'w', encoding='utf-8') as f:
        json.dump(quizzes, f, indent=2, ensure_ascii=False)
    
    # Also update the main quizzes.json file
    try:
        with open('data/quizzes.json', 'r', encoding='utf-8') as f:
            main_quizzes = json.load(f)
        
        main_updated = 0
        for quiz in main_quizzes:
            quiz_id = quiz.get('id')
            if quiz_id in meta_mapping:
                quiz['metaDescription'] = meta_mapping[quiz_id]
                main_updated += 1
        
        with open('data/quizzes.json', 'w', encoding='utf-8') as f:
            json.dump(main_quizzes, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Updated main quizzes.json: {main_updated} descriptions updated")
        
    except Exception as e:
        print(f"⚠️  Could not update main quizzes.json: {e}")
    
    print(f"\n✅ SUCCESS!")
    print(f"📊 Statistics:")
    print(f"   Total Groq descriptions: {len(meta_mapping)}")
    print(f"   Descriptions updated: {updated_count}")
    print(f"   Not found in quiz data: {len(not_found)}")
    
    if not_found:
        print(f"\n❌ Quiz IDs not found in data:")
        for quiz_id in not_found[:10]:  # Show first 10
            print(f"   - {quiz_id}")
        if len(not_found) > 10:
            print(f"   ... and {len(not_found) - 10} more")
    
    print(f"\n🎉 Meta descriptions have been successfully updated!")
    print(f"📁 Files updated:")
    print(f"   - data/quizzes-backup.json")
    print(f"   - data/quizzes.json")

if __name__ == "__main__":
    update_meta_descriptions() 