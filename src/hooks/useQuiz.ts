import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Question } from '../lib/api';

export function useQuiz(quizId: number | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (quizId) {
      loadQuiz();
    }
  }, [quizId]);

  async function loadQuiz() {
    if (!quizId) return;

    try {
      const questionsData = await api.getQuizQuestions(quizId);
      setQuestions(questionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }

  return { questions, loading, error };
}

export async function submitQuizAttempt(
  userId: string,
  quizId: number,
  answers: Record<string, string[]>
) {
  try {
    const result = await api.submitQuizAttempt(quizId, userId, answers);
    return { score: result.score, passed: result.passed };
  } catch (error) {
    console.error('Error submitting quiz attempt:', error);
    throw error;
  }
}
