import json
from collections import OrderedDict

def fix_quiz_titles_duplicates():
    """Remove duplicate entries from quiz_titles_and_ids.json."""
    
    print("🔧 FIXING DUPLICATE ENTRIES IN QUIZ_TITLES_AND_IDS.JSON")
    print("=" * 60)
    
    # Load the file with duplicates
    with open('quiz_titles_and_ids.json', 'r', encoding='utf-8') as f:
        all_quizzes = json.load(f)
    
    print(f"📋 Original file: {len(all_quizzes)} entries")
    
    # Track duplicates
    seen_ids = set()
    unique_quizzes = []
    duplicates_found = []
    
    for quiz in all_quizzes:
        quiz_id = quiz['id']
        if quiz_id not in seen_ids:
            seen_ids.add(quiz_id)
            unique_quizzes.append(quiz)
        else:
            duplicates_found.append(quiz)
    
    print(f"✅ Unique quizzes: {len(unique_quizzes)}")
    print(f"❌ Duplicates removed: {len(duplicates_found)}")
    
    # Show the duplicates that were removed
    print(f"\n🗑️  REMOVED DUPLICATES:")
    for i, dup in enumerate(duplicates_found, 1):
        print(f"   {i:2d}. #{dup['number']:3d} - {dup['id']}")
        print(f"       Title: {dup['title']}")
    
    # Renumber the unique quizzes sequentially
    for i, quiz in enumerate(unique_quizzes, 1):
        quiz['number'] = i
    
    # Save the cleaned version
    with open('quiz_titles_and_ids_clean.json', 'w', encoding='utf-8') as f:
        json.dump(unique_quizzes, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Saved clean version to: quiz_titles_and_ids_clean.json")
    print(f"📊 Final count: {len(unique_quizzes)} unique quizzes")
    
    # Verify against data/quizzes.json
    with open('data/quizzes.json', 'r', encoding='utf-8') as f:
        data_quizzes = json.load(f)
    
    data_ids = set(quiz['id'] for quiz in data_quizzes)
    clean_ids = set(quiz['id'] for quiz in unique_quizzes)
    
    missing_from_data = clean_ids - data_ids
    extra_in_data = data_ids - clean_ids
    
    print(f"\n🔍 VERIFICATION AGAINST DATA/QUIZZES.JSON:")
    print(f"   Clean file IDs: {len(clean_ids)}")
    print(f"   Data file IDs: {len(data_ids)}")
    print(f"   Missing from data: {len(missing_from_data)}")
    print(f"   Extra in data: {len(extra_in_data)}")
    
    if len(missing_from_data) == 0 and len(extra_in_data) == 0:
        print("✅ Perfect match! All quiz IDs align between files.")
        
        # Replace the original file
        with open('quiz_titles_and_ids.json', 'w', encoding='utf-8') as f:
            json.dump(unique_quizzes, f, indent=2, ensure_ascii=False)
        print("✅ Updated original quiz_titles_and_ids.json file")
    else:
        print("⚠️  There are still mismatches between the files.")

if __name__ == "__main__":
    fix_quiz_titles_duplicates() 