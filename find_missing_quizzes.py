import json

def find_missing_quizzes():
    """Find the exact quizzes that are missing from data/quizzes.json."""
    
    print("🔍 FINDING MISSING QUIZZES")
    print("=" * 40)
    
    # Load expected quizzes (317 total)
    with open('quiz_titles_and_ids.json', 'r', encoding='utf-8') as f:
        expected_quizzes = json.load(f)
    
    # Load actual quiz data (287 total)
    with open('data/quizzes.json', 'r', encoding='utf-8') as f:
        actual_quizzes = json.load(f)
    
    print(f"📋 Expected quizzes: {len(expected_quizzes)}")
    print(f"📊 Actual quizzes in data: {len(actual_quizzes)}")
    print(f"❌ Missing: {len(expected_quizzes) - len(actual_quizzes)}")
    
    # Create sets of IDs for comparison
    expected_ids = set(quiz['id'] for quiz in expected_quizzes)
    actual_ids = set(quiz['id'] for quiz in actual_quizzes)
    
    # Find missing quiz IDs
    missing_ids = expected_ids - actual_ids
    
    print(f"\n🚨 MISSING QUIZ IDs ({len(missing_ids)}):")
    print("-" * 40)
    
    # Get the missing quiz details from expected list
    missing_quizzes = [quiz for quiz in expected_quizzes if quiz['id'] in missing_ids]
    
    for i, quiz in enumerate(sorted(missing_quizzes, key=lambda x: x['number']), 1):
        print(f"{i:2d}. #{quiz['number']:3d} - {quiz['id']}")
        print(f"     Title: {quiz['title']}")
        print()
    
    # Check if there's a backup file
    try:
        with open('data/quizzes-backup.json', 'r', encoding='utf-8') as f:
            backup_quizzes = json.load(f)
        
        backup_ids = set(quiz['id'] for quiz in backup_quizzes)
        missing_in_backup = missing_ids - backup_ids
        found_in_backup = missing_ids & backup_ids
        
        print(f"📁 Backup file has {len(backup_quizzes)} quizzes")
        print(f"✅ Found in backup: {len(found_in_backup)}")
        print(f"❌ Still missing in backup: {len(missing_in_backup)}")
        
        if found_in_backup:
            print(f"\n🔄 Can recover {len(found_in_backup)} quizzes from backup!")
        
    except FileNotFoundError:
        print("📁 No backup file found")

if __name__ == "__main__":
    find_missing_quizzes() 