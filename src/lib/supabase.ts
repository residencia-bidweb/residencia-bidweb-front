import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Module = {
  id: number;
  title: string;
  description: string;
  order_index: number;
  icon: string;
  estimated_duration: number;
  created_at: string;
  updated_at: string;
};

export type Lesson = {
  id: number;
  module_id: number;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type Quiz = {
  id: number;
  module_id: number;
  title: string;
  passing_score: number;
  created_at: string;
  updated_at: string;
};

export type Question = {
  id: number;
  quiz_id: number;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'multiple_select';
  order_index: number;
  points: number;
  created_at: string;
};

export type Answer = {
  id: number;
  question_id: number;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
  created_at: string;
};

export type UserProgress = {
  id: number;
  user_id: number;
  module_id: number;
  lesson_id: number | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  passed: boolean;
  answers_data: Record<string, string[]>;
  completed_at: string;
  created_at: string;
};
