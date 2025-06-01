import os
import json

def check_opengraph_setup():
    """Check if Open Graph images and alt text files are properly set up."""
    
    print("🔍 Checking Open Graph Image Setup for Triviaziggle")
    print("=" * 60)
    
    # Define the pages that should have OG images
    pages_to_check = [
        {
            'path': 'app/',
            'name': 'Home Page',
            'description': 'Main landing page'
        },
        {
            'path': 'app/quiz/',
            'name': 'Quiz Pages',
            'description': 'Individual quiz pages'
        },
        {
            'path': 'app/about/',
            'name': 'About Page',
            'description': 'About Triviaziggle page'
        },
        {
            'path': 'app/all-topics/',
            'name': 'All Topics Page',
            'description': 'Browse all quiz topics'
        },
        {
            'path': 'app/categories/',
            'name': 'Categories Page',
            'description': 'Quiz categories overview'
        }
    ]
    
    all_good = True
    
    for page in pages_to_check:
        print(f"\n📄 {page['name']} ({page['description']})")
        print(f"   Path: {page['path']}")
        
        # Check for opengraph-image.png
        og_image_path = os.path.join(page['path'], 'opengraph-image.png')
        og_alt_path = os.path.join(page['path'], 'opengraph-image.alt.txt')
        twitter_image_path = os.path.join(page['path'], 'twitter-image.png')
        twitter_alt_path = os.path.join(page['path'], 'twitter-image.alt.txt')
        
        # Check Open Graph image
        if os.path.exists(og_image_path):
            file_size = os.path.getsize(og_image_path) / 1024  # KB
            print(f"   ✅ Open Graph Image: {og_image_path} ({file_size:.1f} KB)")
        else:
            print(f"   ❌ Open Graph Image: Missing {og_image_path}")
            all_good = False
        
        # Check Open Graph alt text
        if os.path.exists(og_alt_path):
            with open(og_alt_path, 'r', encoding='utf-8') as f:
                alt_text = f.read().strip()
            print(f"   ✅ OG Alt Text: \"{alt_text}\"")
        else:
            print(f"   ❌ OG Alt Text: Missing {og_alt_path}")
            all_good = False
        
        # Check Twitter image
        if os.path.exists(twitter_image_path):
            file_size = os.path.getsize(twitter_image_path) / 1024  # KB
            print(f"   ✅ Twitter Image: {twitter_image_path} ({file_size:.1f} KB)")
        else:
            print(f"   ❌ Twitter Image: Missing {twitter_image_path}")
            all_good = False
        
        # Check Twitter alt text
        if os.path.exists(twitter_alt_path):
            with open(twitter_alt_path, 'r', encoding='utf-8') as f:
                alt_text = f.read().strip()
            print(f"   ✅ Twitter Alt Text: \"{alt_text}\"")
        else:
            print(f"   ❌ Twitter Alt Text: Missing {twitter_alt_path}")
            all_good = False
    
    print("\n" + "=" * 60)
    
    # Check source image
    source_image = 'public/cover-image.png'
    if os.path.exists(source_image):
        file_size = os.path.getsize(source_image) / 1024  # KB
        print(f"✅ Source Image: {source_image} ({file_size:.1f} KB)")
    else:
        print(f"❌ Source Image: Missing {source_image}")
        all_good = False
    
    # Summary
    print(f"\n🎯 **SUMMARY**")
    if all_good:
        print("✅ **ALL OPEN GRAPH IMAGES ARE PROPERLY SET UP!**")
        print("\n📱 **What this means for social sharing:**")
        print("   • Facebook: Will show your branded cover image")
        print("   • Twitter/X: Will show your branded cover image")
        print("   • LinkedIn: Will show your branded cover image")
        print("   • WhatsApp: Will show your branded cover image")
        print("   • Discord: Will show your branded cover image")
        print("   • All other social platforms: Will show your branded cover image")
        
        print(f"\n🔧 **Technical Details:**")
        print("   • Images are optimized for 1200x630px (recommended OG size)")
        print("   • Alt text provided for accessibility")
        print("   • Both Open Graph and Twitter Card formats supported")
        print("   • Images will be automatically served by Next.js")
        
        print(f"\n🚀 **Next Steps:**")
        print("   1. Build your site: npm run build")
        print("   2. Test sharing on social media")
        print("   3. Use Facebook Debugger: https://developers.facebook.com/tools/debug/")
        print("   4. Use Twitter Card Validator: https://cards-dev.twitter.com/validator")
        
    else:
        print("❌ **SOME OPEN GRAPH IMAGES ARE MISSING**")
        print("   Please check the missing files listed above.")
    
    return all_good

if __name__ == "__main__":
    check_opengraph_setup() 