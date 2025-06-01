import json
import os
from collections import defaultdict

def remove_duplicate_quizzes():
    """Remove duplicate quiz entries from data files."""
    print("🔧 Fixing duplicate quiz entries...")
    
    # Load and deduplicate quizzes.json
    with open('data/quizzes.json', 'r', encoding='utf-8') as f:
        quizzes = json.load(f)
    
    print(f"📊 Original quiz count: {len(quizzes)}")
    
    # Group by ID and keep first occurrence
    seen_ids = set()
    unique_quizzes = []
    duplicates_removed = 0
    
    for quiz in quizzes:
        quiz_id = quiz.get('id')
        if quiz_id not in seen_ids:
            seen_ids.add(quiz_id)
            unique_quizzes.append(quiz)
        else:
            duplicates_removed += 1
            print(f"   Removed duplicate: {quiz_id}")
    
    print(f"📊 Deduplicated quiz count: {len(unique_quizzes)}")
    print(f"🗑️  Removed {duplicates_removed} duplicates")
    
    # Save deduplicated quizzes
    with open('data/quizzes.json', 'w', encoding='utf-8') as f:
        json.dump(unique_quizzes, f, indent=2, ensure_ascii=False)
    
    # Also fix backup file
    with open('data/quizzes-backup.json', 'r', encoding='utf-8') as f:
        backup_quizzes = json.load(f)
    
    backup_seen_ids = set()
    unique_backup_quizzes = []
    
    for quiz in backup_quizzes:
        quiz_id = quiz.get('id')
        if quiz_id not in backup_seen_ids:
            backup_seen_ids.add(quiz_id)
            unique_backup_quizzes.append(quiz)
    
    with open('data/quizzes-backup.json', 'w', encoding='utf-8') as f:
        json.dump(unique_backup_quizzes, f, indent=2, ensure_ascii=False)
    
    return len(unique_quizzes)

def add_robots_meta_to_pages():
    """Add missing robots meta to page files."""
    print("\n🔧 Adding missing robots meta to page files...")
    
    pages_to_fix = [
        {
            'file': 'app/layout.tsx',
            'robots': 'index, follow'
        },
        {
            'file': 'app/about/page.tsx', 
            'robots': 'index, follow'
        },
        {
            'file': 'app/all-topics/page.tsx',
            'robots': 'index, follow'
        },
        {
            'file': 'app/quiz/[quizId]/page.tsx',
            'robots': 'index, follow'
        }
    ]
    
    for page_info in pages_to_fix:
        file_path = page_info['file']
        robots_value = page_info['robots']
        
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if robots meta already exists
            if 'robots:' not in content:
                # Find the metadata object and add robots
                if 'export const metadata' in content:
                    # Find the metadata object
                    metadata_start = content.find('export const metadata')
                    if metadata_start != -1:
                        # Find the opening brace
                        brace_start = content.find('{', metadata_start)
                        if brace_start != -1:
                            # Insert robots after the opening brace
                            insert_pos = brace_start + 1
                            robots_line = f'\n  robots: "{robots_value}",'
                            new_content = content[:insert_pos] + robots_line + content[insert_pos:]
                            
                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            
                            print(f"   ✅ Added robots meta to {file_path}")
                        else:
                            print(f"   ❌ Could not find metadata object in {file_path}")
                    else:
                        print(f"   ❌ Could not find metadata export in {file_path}")
                elif 'generateMetadata' in content:
                    print(f"   ⚠️  {file_path} uses generateMetadata - manual update needed")
                else:
                    print(f"   ⚠️  No metadata found in {file_path}")
            else:
                print(f"   ✅ {file_path} already has robots meta")

def fix_home_page_metadata():
    """Add metadata to home page."""
    print("\n🔧 Adding metadata to home page...")
    
    home_page_path = 'app/page.tsx'
    
    if os.path.exists(home_page_path):
        with open(home_page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if metadata already exists
        if 'export const metadata' not in content and 'generateMetadata' not in content:
            # Add metadata export at the top of the file (after imports)
            import_end = content.rfind('import')
            if import_end != -1:
                # Find the end of the last import line
                next_newline = content.find('\n', import_end)
                if next_newline != -1:
                    metadata_block = '''
export const metadata = {
  title: "Triviaziggle - Interactive Trivia Quizzes & Knowledge Tests",
  description: "Challenge your mind with hundreds of interactive trivia quizzes covering movies, TV, music, technology, history, and science. Free brain training games with instant feedback.",
  keywords: "trivia quiz, knowledge test, brain training, interactive quiz, trivia questions, quiz games, education, learning",
  robots: "index, follow",
  openGraph: {
    title: "Triviaziggle - Interactive Trivia Quizzes",
    description: "Challenge your mind with hundreds of interactive trivia quizzes covering movies, TV, music, technology, history, and science.",
    url: "https://triviaziggle.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triviaziggle - Interactive Trivia Quizzes",
    description: "Challenge your mind with hundreds of interactive trivia quizzes covering movies, TV, music, technology, history, and science.",
  },
}
'''
                    new_content = content[:next_newline + 1] + metadata_block + content[next_newline + 1:]
                    
                    with open(home_page_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    print(f"   ✅ Added complete metadata to {home_page_path}")
                else:
                    print(f"   ❌ Could not find insertion point in {home_page_path}")
            else:
                print(f"   ❌ Could not find imports in {home_page_path}")
        else:
            print(f"   ✅ {home_page_path} already has metadata")

def create_fixed_groq_descriptions():
    """Create a new Groq descriptions file without duplicates."""
    print("\n🔧 Creating deduplicated Groq descriptions...")
    
    with open('quiz_meta_descriptions_groq_final.json', 'r', encoding='utf-8') as f:
        groq_descriptions = json.load(f)
    
    print(f"📊 Original Groq descriptions: {len(groq_descriptions)}")
    
    # Remove duplicates based on ID
    seen_ids = set()
    unique_descriptions = []
    
    for desc in groq_descriptions:
        desc_id = desc.get('id')
        if desc_id not in seen_ids:
            seen_ids.add(desc_id)
            unique_descriptions.append(desc)
    
    print(f"📊 Unique Groq descriptions: {len(unique_descriptions)}")
    print(f"🗑️  Removed {len(groq_descriptions) - len(unique_descriptions)} duplicates")
    
    # Save deduplicated descriptions
    with open('quiz_meta_descriptions_groq_final_fixed.json', 'w', encoding='utf-8') as f:
        json.dump(unique_descriptions, f, indent=2, ensure_ascii=False)
    
    return len(unique_descriptions)

def main():
    """Main function to fix all SEO issues."""
    print("🚀 Starting SEO Issues Fix...")
    print("=" * 60)
    
    # 1. Remove duplicate quizzes
    unique_quiz_count = remove_duplicate_quizzes()
    
    # 2. Create fixed Groq descriptions
    unique_desc_count = create_fixed_groq_descriptions()
    
    # 3. Add robots meta to pages
    add_robots_meta_to_pages()
    
    # 4. Fix home page metadata
    fix_home_page_metadata()
    
    print("\n" + "=" * 60)
    print("🎉 SEO FIXES COMPLETED!")
    print("=" * 60)
    print(f"✅ Deduplicated quizzes: {unique_quiz_count} unique entries")
    print(f"✅ Deduplicated Groq descriptions: {unique_desc_count} unique entries")
    print("✅ Added robots meta to page files")
    print("✅ Added complete metadata to home page")
    
    print("\n📋 NEXT STEPS:")
    print("1. Run the SEO audit again to verify fixes")
    print("2. Update meta descriptions with fixed Groq file")
    print("3. Test the website to ensure all pages work correctly")
    
    print(f"\n📁 Files modified:")
    print(f"   - data/quizzes.json (deduplicated)")
    print(f"   - data/quizzes-backup.json (deduplicated)")
    print(f"   - quiz_meta_descriptions_groq_final_fixed.json (created)")
    print(f"   - app/page.tsx (added metadata)")
    print(f"   - app/layout.tsx (added robots)")
    print(f"   - app/about/page.tsx (added robots)")
    print(f"   - app/all-topics/page.tsx (added robots)")
    print(f"   - app/quiz/[quizId]/page.tsx (added robots)")

if __name__ == "__main__":
    main() 