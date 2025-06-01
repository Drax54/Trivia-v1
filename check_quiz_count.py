import json
from collections import Counter

def analyze_quiz_data():
    """Analyze quiz data to find missing quizzes."""
    
    print("🔍 QUIZ COUNT ANALYSIS - TRIVIAZIGGLE")
    print("=" * 50)
    
    # Load quiz data from main file
    with open('data/quizzes.json', 'r', encoding='utf-8') as f:
        quizzes = json.load(f)
    
    print(f"📊 Total quizzes in data/quizzes.json: {len(quizzes)}")
    
    # Load quiz titles and IDs
    with open('quiz_titles_and_ids.json', 'r', encoding='utf-8') as f:
        expected_quizzes = json.load(f)
    
    print(f"📋 Expected total quizzes (quiz_titles_and_ids.json): {len(expected_quizzes)}")
    
    # Check for duplicates in main data
    quiz_ids = [quiz.get('id') for quiz in quizzes if quiz.get('id')]
    id_counts = Counter(quiz_ids)
    duplicates = {id_: count for id_, count in id_counts.items() if count > 1}
    
    if duplicates:
        print(f"⚠️  Found {len(duplicates)} duplicate IDs in data/quizzes.json:")
        for id_, count in duplicates.items():
            print(f"   - {id_}: {count} times")
    else:
        print("✅ No duplicate IDs found in data/quizzes.json")
    
    # Get unique quiz IDs from data
    unique_data_ids = set(quiz_ids)
    print(f"🎯 Unique quiz IDs in data: {len(unique_data_ids)}")
    
    # Get expected IDs from quiz_titles_and_ids.json
    expected_ids = set(quiz['id'] for quiz in expected_quizzes)
    print(f"🎯 Expected unique IDs: {len(expected_ids)}")
    
    # Find missing quizzes
    missing_from_data = expected_ids - unique_data_ids
    extra_in_data = unique_data_ids - expected_ids
    
    if missing_from_data:
        print(f"\n❌ Missing from data/quizzes.json ({len(missing_from_data)} quizzes):")
        for i, missing_id in enumerate(sorted(missing_from_data)[:10], 1):
            print(f"   {i}. {missing_id}")
        if len(missing_from_data) > 10:
            print(f"   ... and {len(missing_from_data) - 10} more")
    
    if extra_in_data:
        print(f"\n➕ Extra in data/quizzes.json ({len(extra_in_data)} quizzes):")
        for i, extra_id in enumerate(sorted(extra_in_data)[:10], 1):
            print(f"   {i}. {extra_id}")
        if len(extra_in_data) > 10:
            print(f"   ... and {len(extra_in_data) - 10} more")
    
    # Check build output
    import os
    quiz_dirs = []
    quiz_output_dir = "out/quiz"
    if os.path.exists(quiz_output_dir):
        quiz_dirs = [d for d in os.listdir(quiz_output_dir) 
                    if os.path.isdir(os.path.join(quiz_output_dir, d))]
    
    print(f"\n🏗️  Built quiz pages: {len(quiz_dirs)}")
    
    # Find quizzes that didn't build
    built_ids = set(quiz_dirs)
    should_build = unique_data_ids
    failed_to_build = should_build - built_ids
    
    if failed_to_build:
        print(f"\n⚠️  Failed to build ({len(failed_to_build)} quizzes):")
        for i, failed_id in enumerate(sorted(failed_to_build)[:10], 1):
            print(f"   {i}. {failed_id}")
        if len(failed_to_build) > 10:
            print(f"   ... and {len(failed_to_build) - 10} more")
    
    print(f"\n📈 SUMMARY:")
    print(f"   Expected quizzes: {len(expected_quizzes)}")
    print(f"   Quizzes in data:  {len(quizzes)}")
    print(f"   Unique in data:   {len(unique_data_ids)}")
    print(f"   Built pages:      {len(quiz_dirs)}")
    print(f"   Missing:          {len(missing_from_data)}")
    print(f"   Failed to build:  {len(failed_to_build)}")

if __name__ == "__main__":
    analyze_quiz_data() 