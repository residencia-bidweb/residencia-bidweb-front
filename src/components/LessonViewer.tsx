import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lesson } from '../lib/supabase';

interface LessonViewerProps {
  lesson: Lesson;
  currentIndex: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export function LessonViewer({
  lesson,
  currentIndex,
  totalLessons,
  onPrevious,
  onNext,
  onComplete,
}: LessonViewerProps) {
  const isLastLesson = currentIndex === totalLessons - 1;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
        <p className="text-blue-100 text-sm mt-1">
          Lição {currentIndex + 1} de {totalLessons}
        </p>
      </div>

      <div className="p-8">
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>

      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        {isLastLesson ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Concluir Lições
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Próxima
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
