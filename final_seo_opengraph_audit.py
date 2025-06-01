import json
import os
from collections import Counter, defaultdict

def check_duplicate_meta_descriptions():
    """Check for duplicate meta descriptions in quiz data."""
    print("🔍 Checking for Duplicate Meta Descriptions...")
    
    # Load quiz data
    with open('data/quizzes.json', 'r', encoding='utf-8') as f:
        quizzes = json.load(f)
    
    # Extract meta descriptions
    meta_descriptions = []
    for quiz in quizzes:
        if 'metaDescription' in quiz and quiz['metaDescription']:
            meta_descriptions.append(quiz['metaDescription'])
    
    # Count duplicates
    description_counts = Counter(meta_descriptions)
    duplicates = {desc: count for desc, count in description_counts.items() if count > 1}
    
    print(f"   📊 Total quiz meta descriptions: {len(meta_descriptions)}")
    print(f"   📊 Unique descriptions: {len(description_counts)}")
    print(f"   📊 Duplicate descriptions: {len(duplicates)}")
    
    if duplicates:
        print(f"   ❌ Found {len(duplicates)} duplicate meta descriptions:")
        for desc, count in list(duplicates.items())[:5]:  # Show first 5
            print(f"      • \"{desc[:60]}...\" (used {count} times)")
        if len(duplicates) > 5:
            print(f"      ... and {len(duplicates) - 5} more")
        return False
    else:
        print(f"   ✅ All meta descriptions are unique!")
        return True

def check_opengraph_images():
    """Check Open Graph image setup."""
    print(f"\n🖼️ Checking Open Graph Images...")
    
    pages = [
        ('app/', 'Home Page'),
        ('app/quiz/', 'Quiz Pages'),
        ('app/about/', 'About Page'),
        ('app/all-topics/', 'All Topics'),
        ('app/categories/', 'Categories')
    ]
    
    all_good = True
    for path, name in pages:
        og_image = os.path.join(path, 'opengraph-image.png')
        twitter_image = os.path.join(path, 'twitter-image.png')
        
        if os.path.exists(og_image) and os.path.exists(twitter_image):
            print(f"   ✅ {name}: Open Graph & Twitter images present")
        else:
            print(f"   ❌ {name}: Missing social images")
            all_good = False
    
    return all_good

def check_page_metadata():
    """Check metadata in page files."""
    print(f"\n📄 Checking Page Metadata...")
    
    # Check main pages
    pages_to_check = [
        ('app/page.tsx', 'Home Page'),
        ('app/quiz/[quizId]/page.tsx', 'Quiz Pages'),
        ('app/about/page.tsx', 'About Page'),
        ('app/all-topics/page.tsx', 'All Topics'),
        ('app/categories/page.tsx', 'Categories')
    ]
    
    metadata_issues = []
    
    for file_path, page_name in pages_to_check:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            has_metadata = 'metadata' in content or 'generateMetadata' in content
            has_title = 'title:' in content
            has_description = 'description:' in content
            has_robots = 'robots:' in content or 'robots =' in content
            
            if has_metadata and has_title and has_description:
                robots_status = "✅" if has_robots else "⚠️"
                print(f"   ✅ {page_name}: Complete metadata {robots_status}")
            else:
                print(f"   ❌ {page_name}: Incomplete metadata")
                metadata_issues.append(page_name)
        else:
            print(f"   ❌ {page_name}: File not found")
            metadata_issues.append(page_name)
    
    return len(metadata_issues) == 0

def check_technical_seo():
    """Check technical SEO files."""
    print(f"\n🔧 Checking Technical SEO Files...")
    
    files_to_check = [
        ('app/sitemap.ts', 'Sitemap'),
        ('app/robots.ts', 'Robots.txt'),
        ('next.config.js', 'Next.js Config'),
        ('app/layout.tsx', 'Root Layout')
    ]
    
    all_present = True
    for file_path, file_name in files_to_check:
        if os.path.exists(file_path):
            print(f"   ✅ {file_name}: Present")
        else:
            print(f"   ❌ {file_name}: Missing")
            all_present = False
    
    return all_present

def main():
    """Run comprehensive SEO audit."""
    print("🎯 COMPREHENSIVE SEO AUDIT - TRIVIAZIGGLE")
    print("=" * 60)
    
    # Run all checks
    meta_ok = check_duplicate_meta_descriptions()
    images_ok = check_opengraph_images()
    pages_ok = check_page_metadata()
    tech_ok = check_technical_seo()
    
    # Final summary
    print(f"\n" + "=" * 60)
    print(f"🎯 **FINAL SEO AUDIT RESULTS**")
    print(f"=" * 60)
    
    if meta_ok and images_ok and pages_ok and tech_ok:
        print(f"🎉 **EXCELLENT! ALL SEO CHECKS PASSED**")
        print(f"\n✅ **What's Working:**")
        print(f"   • Unique meta descriptions for all quizzes")
        print(f"   • Open Graph images for social sharing")
        print(f"   • Complete page metadata")
        print(f"   • Technical SEO files in place")
        
        print(f"\n📱 **Social Media Ready:**")
        print(f"   • Facebook sharing will show branded images")
        print(f"   • Twitter/X cards will display properly")
        print(f"   • LinkedIn posts will have rich previews")
        print(f"   • WhatsApp links will show thumbnails")
        
        print(f"\n🚀 **SEO Benefits:**")
        print(f"   • Better click-through rates from social media")
        print(f"   • Improved brand recognition")
        print(f"   • Enhanced user experience")
        print(f"   • Search engine friendly structure")
        
        print(f"\n🔧 **Ready for Production:**")
        print(f"   • Run: npm run build")
        print(f"   • Deploy to production")
        print(f"   • Test social sharing")
        print(f"   • Monitor analytics")
        
    else:
        print(f"⚠️ **SOME ISSUES FOUND**")
        if not meta_ok:
            print(f"   • Fix duplicate meta descriptions")
        if not images_ok:
            print(f"   • Add missing Open Graph images")
        if not pages_ok:
            print(f"   • Complete page metadata")
        if not tech_ok:
            print(f"   • Add missing technical SEO files")

if __name__ == "__main__":
    main() 