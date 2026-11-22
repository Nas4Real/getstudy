export type PageType = 
  | 'landing'
  | 'dashboard' 
  | 'calendar' 
  | 'documents' 
  | 'tasks' 
  | 'subjects' 
  | 'flashcards'
  | 'ai-assistant' 
  | 'settings' 
  | 'notifications' 
  | 'auth'
  | 'week-variants'
  | 'emails';

export type CalendarViewType = 'day' | 'week' | 'month';

export type SidebarVariant = 'categorized' | 'tagged' | 'classic';

export type AuthViewType = 'signin' | 'signup' | 'forgot';

export type SessionType = 'revision' | 'exam' | 'university';

export interface SessionData {
  id?: string;
  title: string;
  subject: string;
  subjectColor?: string;
  boxColor?: string;
  date: string;
  time: string;
  room?: string;
  professor?: string;
  notes?: string[];
  description?: string;
  status?: 'past' | 'current' | 'upcoming';
  type?: string;
}

export interface TaskData {
  id?: string;
  title: string;
  subject: string;
  subjectColor?: string;
  boxColor?: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  description?: string;
  subtasks?: { text: string; completed: boolean }[];
  type?: string;
  completed?: boolean;
}

export type ChapterLevel = 'not_started' | 'beginner' | 'intermediate' | 'mastered';

export interface ChapterData {
  id: string;
  number: number;
  title: string;
  description?: string;
  level: ChapterLevel;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  estimatedHours?: number;
  lastStudied?: string;
}

export interface SubjectData {
  id: string;
  name: string;
  code?: string;
  color: string;
  icon?: string;
  professor?: string;
  coefficient?: number;
  chapters: ChapterData[];
}

export interface ExamChapter {
  id?: string;
  number: number;
  title: string;
  level: ChapterLevel;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topics?: string[];
}

export interface ExamData extends TaskData {
  id: string;
  type?: string;
  date: string;
  time: string;
  room: string;
  timeAndPlace: string;
  countdown: string;
  isUrgent?: boolean;
  coefficient?: number;
  duration?: string;
  allowedMaterial?: string;
  formatGuidelines?: string[];
  chapters: ExamChapter[];
}

export type FlashcardMastery = 'new' | 'learning' | 'review' | 'mastered';

export interface FlashcardItem {
  id: string;
  deckId: string;
  subject: string;
  subjectColor: string;
  chapterNumber?: number;
  front: string;
  back: string;
  subtext?: string;
  formula?: string;
  mastery: FlashcardMastery;
  nextReviewDate: string;
  reviewCount: number;
  streak: number;
  tags?: string[];
  due?: boolean;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  icon: string;
  totalCards: number;
  dueCards: number;
  masteredPercentage: number;
  description: string;
}
