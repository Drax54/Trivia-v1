import json
import os
from collections import Counter, defaultdict
import re

def extract_metadata_from_file(file_path):
    """Extract metadata from a Next.js page file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        metadata = {
            'file': file_path,
            'title': None,
            'description': None,
            'keywords': None,
            'robots': None,
            'openGraph': {},
            'twitter': {},
            'canonical': None,
            'viewport': None
        }
        
        # Look for metadata export or generateMetadata function
        if 'export const metadata' in content or 'export async function generateMetadata' in content:
            # Extract title
            title_match = re.search(r'title:\s*[\'"`]([^\'"`]+)[\'"`]', content)
            if title_match:
                metadata['title'] = title_match.group(1)
            
            # Extract description
            desc_match = re.search(r'description:\s*[\'"`]([^\'"`]+)[\'"`]', content)
            if desc_match:
                metadata['description'] = desc_match.group(1)
            
            # Extract keywords
            keywords_match = re.search(r'keywords:\s*[\'"`]([^\'"`]+)[\'"`]', content)
            if keywords_match:
                metadata['keywords'] = keywords_match.group(1)
            
            # Extract robots
            robots_match = re.search(r'robots:\s*[\'"`]([^\'"`]+)[\'"`]', content)
            if robots_match:
                metadata['robots'] = robots_match.group(1)
            
            # Extract Open Graph
            og_title_match = re.search(r'openGraph:\s*{[^}]*title:\s*[\'"`]([^\'"`]+)[\'"`]', content, re.DOTALL)
            if og_title_match:
                metadata['openGraph']['title'] = og_title_match.group(1)
            
            og_desc_match = re.search(r'openGraph:\s*{[^}]*description:\s*[\'"`]([^\'"`]+)[\'"`]', content, re.DOTALL)
            if og_desc_match:
                metadata['openGraph']['description'] = og_desc_match.group(1)
            
            og_url_match = re.search(r'openGraph:\s*{[^}]*url:\s*[\'"`]([^\'"`]+)[\'"`]', content, re.DOTALL)
            if og_url_match:
                metadata['openGraph']['url'] = og_url_match.group(1)
            
            og_type_match = re.search(r'openGraph:\s*{[^}]*type:\s*[\'"`]([^\'"`]+)[\'"`]', content, re.DOTALL)
            if og_type_match:
                metadata['openGraph']['type'] = og_type_match.group(1)
            
            # Extract Twitter
            twitter_card_match = re.search(r'twitter:\s*{[^}]*card:\s*[\'"`]([^\'"`]+)[\'"`]', content, re.DOTALL)
            if twitter_card_match:
                metadata['twitter']['card'] = twitter_card_match.group(1)
            
            twitter_title_match = re.search(r'twitter:\s*{[^}]*title:\s*[\'"`]([^\'"`]+)[\'"`]', content, re.DOTALL)
            if twitter_title_match:
                metadata['twitter']['title'] = twitter_title_match.group(1)
        
        return metadata
    
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

def check_quiz_metadata():
    """Check metadata from quiz data files."""
    quiz_metadata = []
    
    try:
        # Check main quiz data
        with open('data/quizzes.json', 'r', encoding='utf-8') as f:
            quizzes = json.load(f)
        
        for quiz in quizzes:
            metadata = {
                'file': f"quiz/{quiz.get('id')}",
                'title': quiz.get('title'),
                'description': quiz.get('metaDescription'),
                'category': quiz.get('category'),
                'difficulty': quiz.get('difficulty'),
                'keywords': quiz.get('keywords'),
                'id': quiz.get('id')
            }
            quiz_metadata.append(metadata)
        
        return quiz_metadata
    
    except Exception as e:
        print(f"Error reading quiz data: {e}")
        return []

def check_page_files():
    """Check metadata from page files."""
    page_metadata = []
    
    # Define pages to check
    pages_to_check = [
        'app/page.tsx',  # Home page
        'app/layout.tsx',  # Root layout
        'app/about/page.tsx',  # About page
        'app/all-topics/page.tsx',  # All topics page
        'app/quiz/[quizId]/page.tsx',  # Quiz template
        'app/sitemap.ts',  # Sitemap
        'app/robots.ts'  # Robots
    ]
    
    for page_path in pages_to_check:
        if os.path.exists(page_path):
            metadata = extract_metadata_from_file(page_path)
            if metadata:
                page_metadata.append(metadata)
    
    return page_metadata

def analyze_duplicates(quiz_metadata):
    """Analyze duplicate meta descriptions."""
    descriptions = [quiz.get('description', '') for quiz in quiz_metadata if quiz.get('description')]
    description_counts = Counter(descriptions)
    
    duplicates = {desc: count for desc, count in description_counts.items() if count > 1}
    
    return duplicates, description_counts

def audit_seo_completeness(quiz_metadata, page_metadata):
    """Audit SEO completeness across all pages."""
    issues = []
    
    # Check quiz pages
    missing_descriptions = []
    missing_titles = []
    long_descriptions = []
    
    for quiz in quiz_metadata:
        quiz_id = quiz.get('id', 'unknown')
        
        if not quiz.get('description'):
            missing_descriptions.append(quiz_id)
        elif len(quiz.get('description', '')) > 160:
            long_descriptions.append({
                'id': quiz_id,
                'length': len(quiz.get('description', '')),
                'description': quiz.get('description', '')[:100] + '...'
            })
        
        if not quiz.get('title'):
            missing_titles.append(quiz_id)
    
    # Check page files
    page_issues = []
    for page in page_metadata:
        page_file = page.get('file', 'unknown')
        page_problems = []
        
        if not page.get('title'):
            page_problems.append('Missing title')
        
        if not page.get('description'):
            page_problems.append('Missing description')
        
        if not page.get('openGraph'):
            page_problems.append('Missing Open Graph')
        
        if not page.get('robots'):
            page_problems.append('Missing robots meta')
        
        if page_problems:
            page_issues.append({
                'file': page_file,
                'issues': page_problems
            })
    
    return {
        'missing_descriptions': missing_descriptions,
        'missing_titles': missing_titles,
        'long_descriptions': long_descriptions,
        'page_issues': page_issues
    }

def main():
    """Main SEO audit function."""
    print("🔍 Starting Comprehensive SEO Audit...")
    print("=" * 60)
    
    # Get quiz metadata
    quiz_metadata = check_quiz_metadata()
    print(f"📊 Found {len(quiz_metadata)} quiz pages")
    
    # Get page metadata
    page_metadata = check_page_files()
    print(f"📄 Found {len(page_metadata)} page files")
    
    print("\n" + "=" * 60)
    print("🔍 DUPLICATE META DESCRIPTION CHECK")
    print("=" * 60)
    
    # Check for duplicates
    duplicates, description_counts = analyze_duplicates(quiz_metadata)
    
    if duplicates:
        print(f"❌ Found {len(duplicates)} duplicate meta descriptions:")
        for desc, count in duplicates.items():
            print(f"\n📝 Appears {count} times:")
            print(f"   '{desc[:100]}{'...' if len(desc) > 100 else ''}'")
            
            # Find which quizzes have this description
            matching_quizzes = [q.get('id') for q in quiz_metadata if q.get('description') == desc]
            print(f"   Used by: {', '.join(matching_quizzes[:5])}")
            if len(matching_quizzes) > 5:
                print(f"   ... and {len(matching_quizzes) - 5} more")
    else:
        print("✅ No duplicate meta descriptions found!")
    
    print(f"\n📊 Total unique descriptions: {len(description_counts)}")
    print(f"📊 Average description length: {sum(len(d) for d in description_counts.keys()) / len(description_counts):.1f} characters")
    
    print("\n" + "=" * 60)
    print("🔍 SEO COMPLETENESS AUDIT")
    print("=" * 60)
    
    # Audit SEO completeness
    seo_issues = audit_seo_completeness(quiz_metadata, page_metadata)
    
    # Missing descriptions
    if seo_issues['missing_descriptions']:
        print(f"\n❌ {len(seo_issues['missing_descriptions'])} quizzes missing descriptions:")
        for quiz_id in seo_issues['missing_descriptions'][:10]:
            print(f"   - {quiz_id}")
        if len(seo_issues['missing_descriptions']) > 10:
            print(f"   ... and {len(seo_issues['missing_descriptions']) - 10} more")
    else:
        print("\n✅ All quizzes have meta descriptions")
    
    # Long descriptions
    if seo_issues['long_descriptions']:
        print(f"\n⚠️  {len(seo_issues['long_descriptions'])} descriptions over 160 characters:")
        for item in seo_issues['long_descriptions'][:5]:
            print(f"   - {item['id']}: {item['length']} chars")
            print(f"     '{item['description']}'")
    else:
        print("\n✅ All descriptions are under 160 characters")
    
    # Page issues
    if seo_issues['page_issues']:
        print(f"\n❌ SEO issues found in {len(seo_issues['page_issues'])} page files:")
        for page_issue in seo_issues['page_issues']:
            print(f"\n📄 {page_issue['file']}:")
            for issue in page_issue['issues']:
                print(f"   - {issue}")
    else:
        print("\n✅ All page files have complete SEO metadata")
    
    print("\n" + "=" * 60)
    print("🔍 PAGE METADATA DETAILS")
    print("=" * 60)
    
    for page in page_metadata:
        print(f"\n📄 {page.get('file', 'Unknown')}:")
        print(f"   Title: {page.get('title', 'MISSING')}")
        print(f"   Description: {page.get('description', 'MISSING')}")
        print(f"   Keywords: {page.get('keywords', 'MISSING')}")
        print(f"   Robots: {page.get('robots', 'MISSING')}")
        
        og = page.get('openGraph', {})
        if og:
            print(f"   Open Graph:")
            print(f"     - Title: {og.get('title', 'MISSING')}")
            print(f"     - Description: {og.get('description', 'MISSING')}")
            print(f"     - URL: {og.get('url', 'MISSING')}")
            print(f"     - Type: {og.get('type', 'MISSING')}")
        else:
            print(f"   Open Graph: MISSING")
        
        twitter = page.get('twitter', {})
        if twitter:
            print(f"   Twitter:")
            print(f"     - Card: {twitter.get('card', 'MISSING')}")
            print(f"     - Title: {twitter.get('title', 'MISSING')}")
        else:
            print(f"   Twitter: MISSING")
    
    print("\n" + "=" * 60)
    print("📊 FINAL SUMMARY")
    print("=" * 60)
    
    total_issues = (
        len(duplicates) + 
        len(seo_issues['missing_descriptions']) + 
        len(seo_issues['long_descriptions']) +
        len(seo_issues['page_issues'])
    )
    
    if total_issues == 0:
        print("🎉 PERFECT! No SEO issues found!")
        print("✅ All meta descriptions are unique")
        print("✅ All pages have complete SEO metadata")
        print("✅ All descriptions are under 160 characters")
    else:
        print(f"⚠️  Found {total_issues} SEO issues to address:")
        if duplicates:
            print(f"   - {len(duplicates)} duplicate descriptions")
        if seo_issues['missing_descriptions']:
            print(f"   - {len(seo_issues['missing_descriptions'])} missing descriptions")
        if seo_issues['long_descriptions']:
            print(f"   - {len(seo_issues['long_descriptions'])} descriptions too long")
        if seo_issues['page_issues']:
            print(f"   - {len(seo_issues['page_issues'])} pages with SEO issues")
    
    print(f"\n📊 Quiz Pages: {len(quiz_metadata)}")
    print(f"📊 Static Pages: {len(page_metadata)}")
    print(f"📊 Total Pages Audited: {len(quiz_metadata) + len(page_metadata)}")

if __name__ == "__main__":
    main() 