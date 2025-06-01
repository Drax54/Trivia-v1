# 🧠 Trivia Master

A modern, colorful, and engaging trivia website built with Next.js and Static Site Generation (SSG). Test your knowledge across multiple categories with our beautiful, responsive interface.

## ✨ Features

- **🎯 Multiple Categories**: Technology, History, Science, Entertainment
- **🏷️ Tag-based Filtering**: Filter quizzes by specific topics within each category
- **📱 Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **⚡ Fast Performance**: Built with Next.js SSG for lightning-fast loading
- **🎨 Modern UI**: Beautiful design with smooth animations and micro-interactions
- **♿ Accessible**: Built with accessibility best practices
- **⏱️ Real-time Timer**: Track your quiz completion time
- **📊 Progress Tracking**: Visual progress indicators and detailed results
- **🔍 Search Functionality**: Search for specific quizzes within categories

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trivia-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This will generate a static export in the `out` directory that can be deployed to any static hosting service.

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page
│   ├── about/                   # About page
│   ├── categories/              # Categories overview page
│   └── category/                # Dynamic category and quiz pages
│       └── [categoryId]/
│           ├── page.tsx         # Category page with filtering
│           └── quiz/
│               └── [quizId]/
│                   └── page.tsx # Quiz taking interface
├── components/                   # Reusable components
│   └── Navigation.tsx           # Main navigation component
├── data/                        # Static data files
│   ├── categories.json          # Category definitions
│   └── quizzes.json            # Quiz questions and answers
└── public/                      # Static assets
```

## 🎨 Design System

### Color Palette
- **Purple**: Primary brand color for buttons and accents
- **Orange**: History category and warm highlights  
- **Teal**: Science category and success states
- **Blue**: Technology and information elements

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners (2xl), subtle shadows, hover effects
- **Buttons**: Rounded (2xl), smooth transitions, hover animations
- **Tags**: Pill-shaped, color-coded by state

## 📊 Data Structure

### Categories
Each category includes:
- Unique ID and name
- Description and icon
- Color theme
- Associated tags for filtering

### Quizzes
Each quiz contains:
- Title, description, and difficulty level
- Category and tag associations
- Array of questions with multiple choice answers
- Explanations for correct answers

## 🔧 Customization

### Adding New Categories
1. Add category definition to `data/categories.json`
2. Add corresponding color class to Tailwind config
3. Create quizzes with the new category ID

### Adding New Quizzes
1. Add quiz object to `data/quizzes.json`
2. Include questions with options, correct answers, and explanations
3. Assign appropriate category and tags

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for component styles
- Colors and animations can be adjusted in the config files

## 🚀 Deployment

This project is configured for static export and can be deployed to:

- **Vercel**: `vercel --prod`
- **Netlify**: Deploy the `out` folder after `npm run build`
- **GitHub Pages**: Deploy the `out` folder to gh-pages branch
- **Any static hosting**: Upload the `out` folder contents

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Static Site Generation (SSG)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column, collapsible navigation)
- **Tablet**: 768px - 1024px (2-column layouts)
- **Desktop**: > 1024px (full multi-column layouts)

## ♿ Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels and roles
- High contrast color ratios
- Focus indicators
- Screen reader friendly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Tailwind CSS 