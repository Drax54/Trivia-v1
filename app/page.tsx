import { Metadata } from 'next';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  BookOpen,
  Atom,
  Globe,
  BookText,
  Film,
  Trophy,
  Cpu,
  Utensils,
  Palette,
  Leaf
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Category, TrendingQuiz, Stats, Subcategory } from '@/types';

// Import data
import categoriesData from '@/data/categories.json';
import subcategoriesData from '@/data/subcategories.json';
import trendingData from '@/data/trending.json';
import statsData from '@/data/stats.json';

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

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      
      <div className="container relative flex flex-col items-center justify-center text-center">
        <div className="mb-8 animate-bounce">
          <Brain className="h-20 w-20 text-purple-600" />
        </div>
        
        <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Challenge Your Knowledge
        </h1>
        
        <p className="mb-10 max-w-2xl text-lg md:text-xl text-muted-foreground">
          Join millions of quiz enthusiasts and test your expertise across various categories
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/categories">
            <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
              Explore Categories
              <span className="text-lg">🎓</span>
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button size="lg" variant="outline" className="gap-2">
              View Leaderboard
              <span className="text-lg">🏆</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ stats }: { stats: Stats }) {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600">{stats.activeUsers}</p>
            <p className="text-base md:text-lg text-muted-foreground">Active Users</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600">{stats.totalQuizzes}</p>
            <p className="text-base md:text-lg text-muted-foreground">Quizzes</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600">{stats.categories}</p>
            <p className="text-base md:text-lg text-muted-foreground">Categories</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600">{stats.userRating}</p>
            <p className="text-base md:text-lg text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingTopicsSection() {
  const trendingTopics = [
    { name: "Marvel", size: "text-4xl", color: "bg-red-100 text-red-700 hover:bg-red-200", category: "entertainment" },
    { name: "AI", size: "text-3xl", color: "bg-purple-100 text-purple-700 hover:bg-purple-200", category: "technology" },
    { name: "World Wars", size: "text-2xl", color: "bg-orange-100 text-orange-700 hover:bg-orange-200", category: "history" },
    { name: "Space", size: "text-5xl", color: "bg-blue-100 text-blue-700 hover:bg-blue-200", category: "science" },
    { name: "Harry Potter", size: "text-2xl", color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200", category: "entertainment" },
    { name: "Biology", size: "text-3xl", color: "bg-green-100 text-green-700 hover:bg-green-200", category: "science" },
    { name: "Breaking Bad", size: "text-xl", color: "bg-gray-100 text-gray-700 hover:bg-gray-200", category: "entertainment" },
    { name: "Medieval", size: "text-3xl", color: "bg-amber-100 text-amber-700 hover:bg-amber-200", category: "history" },
    { name: "Gaming", size: "text-2xl", color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200", category: "technology" },
    { name: "Chemistry", size: "text-xl", color: "bg-teal-100 text-teal-700 hover:bg-teal-200", category: "science" }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold">Trending Topics</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the hottest quiz topics everyone's talking about
          </p>
        </div>

        {/* Cloud Tags Layout */}
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto">
          {trendingTopics.map((topic, index) => (
            <Link
              key={topic.name}
              href={`/all-topics?tag=${encodeURIComponent(topic.name)}`}
              className={`inline-block px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${topic.size} ${topic.color} animate-slide-in cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {topic.name}
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/all-topics" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-lg hover:underline"
          >
            Explore All Topics
            <TrendingUp className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection({ categories, subcategories }: { categories: Category[], subcategories: Subcategory[] }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-6 w-6 text-purple-600" />;
      case "Atom":
        return <Atom className="h-6 w-6 text-purple-600" />;
      case "Globe":
        return <Globe className="h-6 w-6 text-purple-600" />;
      case "BookText":
        return <BookText className="h-6 w-6 text-purple-600" />;
      case "Film":
        return <Film className="h-6 w-6 text-purple-600" />;
      case "Trophy":
        return <Trophy className="h-6 w-6 text-purple-600" />;
      case "Cpu":
        return <Cpu className="h-6 w-6 text-purple-600" />;
      case "Utensils":
        return <Utensils className="h-6 w-6 text-purple-600" />;
      case "Palette":
        return <Palette className="h-6 w-6 text-purple-600" />;
      case "Leaf":
        return <Leaf className="h-6 w-6 text-purple-600" />;
      default:
        return <BookOpen className="h-6 w-6 text-purple-600" />;
    }
  };

  // Filter to only show featured categories
  const featuredCategories = categories.filter(category => category.featured);

  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Star className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold">Featured Categories</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">Explore our most popular quiz categories</p>
          <Link href="/categories" className="text-purple-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => {
            const categorySubcategories = subcategories.filter(sub => sub.categoryId === category.id);
            
            return (
              <Link href={`/${category.id}`} key={category.id}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      {getIcon(category.icon)}
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {categorySubcategories.slice(0, 2).map((subcategory) => (
                        <Badge key={subcategory.id} variant="outline" className="bg-purple-50">
                          {subcategory.name}
                        </Badge>
                      ))}
                      {categorySubcategories.length > 2 && (
                        <Badge variant="outline" className="bg-purple-50">
                          +{categorySubcategories.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <p className="text-sm text-muted-foreground">
                      {category.totalQuizzes} quizzes available
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const categories: Category[] = categoriesData.categories;
  const subcategories: Subcategory[] = subcategoriesData.subcategories;
  const trending: TrendingQuiz[] = trendingData.trending;
  const stats: Stats = statsData.stats;

  return (
    <>
      <HeroSection />
      <StatsSection stats={stats} />
      <TrendingTopicsSection />
      <CategoriesSection categories={categories} subcategories={subcategories} />
    </>
  );
} 