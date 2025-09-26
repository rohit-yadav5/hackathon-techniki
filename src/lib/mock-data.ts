// Mock data for Japanese learning platform
// TODO: Replace with actual Supabase queries

export interface Level {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
  lessonCount: number;
  color: string;
}

export interface Lesson {
  id: string;
  levelId: string;
  title: string;
  content: string;
  estimatedMinutes: number;
  mediaUrls: {
    image?: string;
    audio?: string;
    video?: string;
  };
  vocabulary: Array<{
    term: string;
    reading: string;
    meaning: string;
  }>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Array<{
    id: string;
    type: 'multiple-choice' | 'fill-blank' | 'typing';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  xp: number;
  currentLevel: string;
  badges: string[];
  joinedAt: string;
  streak: number;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completedAt: string;
  score: number;
  timeSpent: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  replyCount: number;
  upvotes: number;
  tags: string[];
  isSticky?: boolean;
}

export interface ForumReply {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  upvotes: number;
}

// Mock Data
export const mockLevels: Level[] = [
  {
    id: 'n5',
    slug: 'n5',
    title: 'N5 - Beginner',
    description: 'Basic hiragana, katakana, and simple kanji. Perfect for absolute beginners.',
    order: 1,
    estimatedHours: 150,
    lessonCount: 45,
    color: 'hsl(142 69% 58%)'
  },
  {
    id: 'n4',
    slug: 'n4',
    title: 'N4 - Elementary',
    description: 'Expanded vocabulary and basic grammar patterns.',
    order: 2,
    estimatedHours: 200,
    lessonCount: 60,
    color: 'hsl(220 91% 65%)'
  },
  {
    id: 'n3',
    slug: 'n3',
    title: 'N3 - Intermediate',
    description: 'Complex grammar and everyday conversation skills.',
    order: 3,
    estimatedHours: 300,
    lessonCount: 80,
    color: 'hsl(330 81% 60%)'
  },
  {
    id: 'n2',
    slug: 'n2',
    title: 'N2 - Upper Intermediate',
    description: 'Advanced grammar and business Japanese.',
    order: 4,
    estimatedHours: 400,
    lessonCount: 100,
    color: 'hsl(38 92% 50%)'
  },
  {
    id: 'n1',
    slug: 'n1',
    title: 'N1 - Advanced',
    description: 'Near-native fluency and complex texts.',
    order: 5,
    estimatedHours: 600,
    lessonCount: 120,
    color: 'hsl(0 84% 60%)'
  }
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    levelId: 'n5',
    title: 'Introduction to Hiragana',
    content: `# Welcome to Japanese!

Hiragana (ひらがな) is one of the three writing systems in Japanese. It consists of 46 basic characters, each representing a sound.

## The Five Vowels
- あ (a) - like "ah"
- い (i) - like "ee"  
- う (u) - like "oo"
- え (e) - like "eh"
- お (o) - like "oh"

## Practice
Try writing each character several times to build muscle memory.`,
    estimatedMinutes: 30,
    mediaUrls: {
      audio: '/audio/hiragana-intro.mp3',
      image: '/images/hiragana-chart.png'
    },
    vocabulary: [
      { term: 'ひらがな', reading: 'ひらがな', meaning: 'hiragana' },
      { term: 'あ', reading: 'あ', meaning: 'a (vowel)' },
      { term: 'い', reading: 'い', meaning: 'i (vowel)' }
    ],
    difficulty: 'beginner',
    tags: ['hiragana', 'writing', 'basics']
  },
  {
    id: 'lesson-2',
    levelId: 'n5',
    title: 'Basic Greetings',
    content: `# Basic Japanese Greetings

Learn essential greetings for daily conversation.

## Common Greetings
- おはよう (ohayou) - Good morning (casual)
- おはようございます (ohayou gozaimasu) - Good morning (polite)
- こんにちは (konnichiwa) - Hello/Good afternoon
- こんばんは (konbanwa) - Good evening

## Practice Scenarios
Try using these greetings in different situations.`,
    estimatedMinutes: 25,
    mediaUrls: {
      audio: '/audio/greetings.mp3'
    },
    vocabulary: [
      { term: 'おはよう', reading: 'おはよう', meaning: 'good morning (casual)' },
      { term: 'こんにちは', reading: 'こんにちは', meaning: 'hello' },
      { term: 'こんばんは', reading: 'こんばんは', meaning: 'good evening' }
    ],
    difficulty: 'beginner',
    tags: ['greetings', 'conversation', 'polite']
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Costa',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    xp: 2500,
    currentLevel: 'n4',
    badges: ['first-lesson', 'week-streak', 'kanji-master'],
    joinedAt: '2024-01-15',
    streak: 14
  },
  {
    id: 'user-2',
    name: 'Sakura Tanaka',
    email: 'sakura@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    xp: 4200,
    currentLevel: 'n3',
    badges: ['first-lesson', 'month-streak', 'grammar-guru', 'pronunciation-pro'],
    joinedAt: '2023-12-01',
    streak: 28
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    iconUrl: '🎌',
    criteria: 'Complete any lesson',
    rarity: 'common'
  },
  {
    id: 'week-streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    iconUrl: '🔥',
    criteria: 'Study for 7 consecutive days',
    rarity: 'rare'
  },
  {
    id: 'kanji-master',
    name: 'Kanji Master',
    description: 'Learn 100 kanji characters',
    iconUrl: '漢',
    criteria: 'Master 100 kanji',
    rarity: 'epic'
  }
];

export const mockThreads: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'Tips for memorizing hiragana quickly?',
    content: 'I\'m struggling to memorize all the hiragana characters. What techniques worked for you?',
    authorId: 'user-1',
    authorName: 'Alex Costa',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-20T10:30:00Z',
    replyCount: 15,
    upvotes: 23,
    tags: ['hiragana', 'memorization', 'tips']
  },
  {
    id: 'thread-2',
    title: 'Study group for N4 preparation',
    content: 'Looking for study partners to prepare for the JLPT N4 exam together!',
    authorId: 'user-2',
    authorName: 'Sakura Tanaka',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-19T15:45:00Z',
    replyCount: 8,
    upvotes: 18,
    tags: ['n4', 'study-group', 'jlpt'],
    isSticky: true
  }
];