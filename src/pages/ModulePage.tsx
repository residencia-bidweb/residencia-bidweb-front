import { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { useModuleDetails } from '../hooks/useModules';
import { useQuiz, submitQuizAttempt } from '../hooks/useQuiz';
import { LessonViewer } from '../components/LessonViewer';
import { QuizView, QuizResult } from '../components/QuizView';

interface ModulePageProps {
  moduleId: string;
  onBack: () => void;
}

type ViewMode = 'overview' | 'lesson' | 'quiz' | 'result';

export function ModulePage({ moduleId, onBack }: ModulePageProps) {
  const { module, lessons, quiz, loading, error } = useModuleDetails(moduleId);
  const { questions, loading: quizLoading } = useQuiz(quiz?.id || null);

  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);

  const handleStartLessons = () => {
    setCurrentLessonIndex(0);
    setViewMode('lesson');
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handleCompleteLessons = () => {
    setViewMode('overview');
  };

  const handleStartQuiz = () => {
    setViewMode('quiz');
    setQuizResult(null);
  };

  const handleQuizSubmit = async (answers: Record<string, string[]>) => {
    if (!quiz) return;

    try {
      const userId = 1;
      const result = await submitQuizAttempt(userId, quiz.id, answers, questions);
      setQuizResult(result);
      setViewMode('result');
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    }
  };

  const handleRetryQuiz = () => {
    setViewMode('quiz');
    setQuizResult(null);
  };

  const handleContinue = () => {
    setViewMode('overview');
  };

  if (loading || quizLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Erro ao carregar módulo</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos módulos
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Conteúdo do Módulo
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Lições ({lessons.length})
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {lessons.map((lesson, index) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-3 text-gray-700 py-2 px-3 rounded hover:bg-gray-50"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </span>
                        <span>{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleStartLessons}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Iniciar Lições
                  </button>
                </div>

                {quiz && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Avaliação
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {quiz.title} - Nota mínima: {quiz.passing_score}%
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Iniciar Avaliação
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'lesson' && lessons[currentLessonIndex] && (
          <LessonViewer
            lesson={lessons[currentLessonIndex]}
            currentIndex={currentLessonIndex}
            totalLessons={lessons.length}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
            onComplete={handleCompleteLessons}
          />
        )}

        {viewMode === 'quiz' && quiz && (
          <QuizView
            questions={questions}
            quizTitle={quiz.title}
            onSubmit={handleQuizSubmit}
            onBack={() => setViewMode('overview')}
          />
        )}

        {viewMode === 'result' && quizResult && (
          <QuizResult
            score={quizResult.score}
            passed={quizResult.passed}
            onRetry={handleRetryQuiz}
            onContinue={handleContinue}
          />
        )}
      </main>
    </div>
  );
}
