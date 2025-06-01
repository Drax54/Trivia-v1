import json

def debug_quiz_mismatch():
    """Debug the mismatch between quiz_titles_and_ids.json and data/quizzes.json."""
    
    print("🔍 DEBUGGING QUIZ COUNT MISMATCH")
    print("=" * 50)
    
    # Load expected quizzes
    with open('quiz_titles_and_ids.json', 'r', encoding='utf-8') as f:
        expected_quizzes = json.load(f)
    
    # Load actual quiz data
    with open('data/quizzes.json', 'r', encoding='utf-8') as f:
        actual_quizzes = json.load(f)
    
    print(f"📋 quiz_titles_and_ids.json: {len(expected_quizzes)} quizzes")
    print(f"📊 data/quizzes.json: {len(actual_quizzes)} quizzes")
    print(f"❌ Difference: {len(expected_quizzes) - len(actual_quizzes)}")
    
    # Check the structure of both files
    print(f"\n🔍 Structure Analysis:")
    print(f"Expected quiz sample keys: {list(expected_quizzes[0].keys()) if expected_quizzes else 'None'}")
    print(f"Actual quiz sample keys: {list(actual_quizzes[0].keys()) if actual_quizzes else 'None'}")
    
    # Get all IDs from both files
    expected_ids = []
    for quiz in expected_quizzes:
        if 'id' in quiz:
            expected_ids.append(quiz['id'])
        else:
            print(f"⚠️  Quiz without ID in expected: {quiz}")
    
    actual_ids = []
    for quiz in actual_quizzes:
        if 'id' in quiz:
            actual_ids.append(quiz['id'])
        else:
            print(f"⚠️  Quiz without ID in actual: {quiz}")
    
    print(f"\n📊 ID Analysis:")
    print(f"Expected IDs collected: {len(expected_ids)}")
    print(f"Actual IDs collected: {len(actual_ids)}")
    
    # Check for duplicates in each file
    from collections import Counter
    
    expected_counts = Counter(expected_ids)
    actual_counts = Counter(actual_ids)
    
    expected_dupes = {id_: count for id_, count in expected_counts.items() if count > 1}
    actual_dupes = {id_: count for id_, count in actual_counts.items() if count > 1}
    
    if expected_dupes:
        print(f"\n⚠️  Duplicates in quiz_titles_and_ids.json: {len(expected_dupes)}")
        for id_, count in list(expected_dupes.items())[:5]:
            print(f"   - {id_}: {count} times")
    
    if actual_dupes:
        print(f"\n⚠️  Duplicates in data/quizzes.json: {len(actual_dupes)}")
        for id_, count in list(actual_dupes.items())[:5]:
            print(f"   - {id_}: {count} times")
    
    # Find unique IDs
    expected_unique = set(expected_ids)
    actual_unique = set(actual_ids)
    
    print(f"\n🎯 Unique ID Analysis:")
    print(f"Expected unique IDs: {len(expected_unique)}")
    print(f"Actual unique IDs: {len(actual_unique)}")
    
    # Find the differences
    missing_from_actual = expected_unique - actual_unique
    extra_in_actual = actual_unique - expected_unique
    
    print(f"\n❌ Missing from data/quizzes.json: {len(missing_from_actual)}")
    if missing_from_actual:
        for i, missing_id in enumerate(sorted(list(missing_from_actual))[:10], 1):
            # Find the title for this ID
            title = "Unknown"
            for quiz in expected_quizzes:
                if quiz.get('id') == missing_id:
                    title = quiz.get('title', 'Unknown')
                    break
            print(f"   {i}. {missing_id} - {title}")
        if len(missing_from_actual) > 10:
            print(f"   ... and {len(missing_from_actual) - 10} more")
    
    print(f"\n➕ Extra in data/quizzes.json: {len(extra_in_actual)}")
    if extra_in_actual:
        for i, extra_id in enumerate(sorted(list(extra_in_actual))[:10], 1):
            print(f"   {i}. {extra_id}")
        if len(extra_in_actual) > 10:
            print(f"   ... and {len(extra_in_actual) - 10} more")

if __name__ == "__main__":
    debug_quiz_mismatch() 