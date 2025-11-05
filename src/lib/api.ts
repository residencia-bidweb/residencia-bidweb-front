const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
  answers?: Answer[];
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

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Module endpoints
  async getModules(): Promise<Module[]> {
    return this.request<Module[]>('/modules');
  }

  async getModule(id: number): Promise<Module> {
    return this.request<Module>(`/modules/${id}`);
  }

  async getModuleDetails(id: number): Promise<{ module: Module; lessons: Lesson[]; quiz: Quiz | null }> {
    return this.request(`/modules/${id}/details`);
  }

  // Quiz endpoints
  async getQuiz(id: number): Promise<Quiz> {
    return this.request<Quiz>(`/quizzes/${id}`);
  }

  async getQuizQuestions(id: number): Promise<Question[]> {
    return this.request<Question[]>(`/quizzes/${id}/questions`);
  }

  async submitQuizAttempt(quizId: number, userId: string, answersData: Record<string, string[]>): Promise<QuizAttempt> {
    return this.request<QuizAttempt>(`/quizzes/${quizId}/attempt`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, answers_data: answersData }),
    });
  }
}

export const api = new APIClient(API_URL);
