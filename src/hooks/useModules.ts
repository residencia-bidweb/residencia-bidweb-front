import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Module, Lesson, Quiz } from '../lib/api';

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadModules();
  }, []);

  async function loadModules() {
    try {
      const data = await api.getModules();
      setModules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load modules');
    } finally {
      setLoading(false);
    }
  }

  return { modules, loading, error };
}

export function useModuleDetails(moduleId: string) {
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (moduleId) {
      loadModuleDetails();
    }
  }, [moduleId]);

  async function loadModuleDetails() {
    try {
      const data = await api.getModuleDetails(parseInt(moduleId));
      setModule(data.module);
      setLessons(data.lessons);
      setQuiz(data.quiz);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load module details');
    } finally {
      setLoading(false);
    }
  }

  return { module, lessons, quiz, loading, error };
}
