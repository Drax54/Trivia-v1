export interface Category {
  id: string;
  name: string;
  description: string;
  metaDescription: string;
  icon: string;
  color: string;
  tags: string[];
  featured: boolean;
  totalQuizzes: number;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  metaDescription: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  metaDescription: string;
  category: string;
  categoryDescription: string;
  tags: string[];
  difficulty: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrendingQuiz {
  id: string;
  title: string;
  category: string;
  participants: number;
  duration: number;
  difficulty: string;
  image: string;
}

export interface Stats {
  activeUsers: string;
  totalQuizzes: string;
  categories: string;
  userRating: string;
} 