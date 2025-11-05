import { useState } from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import type { Question, Answer } from '../lib/supabase';

type QuestionWithAnswers = Question & {
  answers: Answer[];
};

interface QuizViewProps {
  questions: QuestionWithAnswers[];
  quizTitle: string;
  onSubmit: (answers: Record<string, string[]>) => void;
  onBack: () => void;
}

export function QuizView({ questions, quizTitle, onSubmit, onBack }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];
  const userAnswer = answers[question.id] || [];

  const handleAnswerSelect = (answerId: string) => {
    if (question.question_type === 'multiple_select') {
      setAnswers(prev => {
        const current = prev[question.id] || [];
        const newAnswers = current.includes(answerId)
          ? current.filter(id => id !== answerId)
          : [...current, answerId];
        return { ...prev, [question.id]: newAnswers };
      });
    } else {
      setAnswers(prev => ({ ...prev, [question.id]: [answerId] }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const allQuestionsAnswered = questions.every(q => answers[q.id]?.length > 0);

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center max-w-md mx-auto">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Confirmar Envio
          </h2>
          <p className="text-gray-600 mb-6">
            Você respondeu {Object.keys(answers).length} de {questions.length} questões.
            Deseja enviar suas respostas?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Revisar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Enviar Avaliação
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{quizTitle}</h2>
        <p className="text-blue-100 text-sm mt-1">
          Questão {currentQuestion + 1} de {questions.length}
        </p>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-6">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
              {currentQuestion + 1}
            </span>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-900 mb-2">
                {question.question_text}
              </p>
              {question.question_type === 'multiple_select' && (
                <p className="text-sm text-gray-500">Selecione todas as opções corretas</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {question.answers.map(answer => {
              const isSelected = userAnswer.includes(answer.id);
              return (
                <label
                  key={answer.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type={question.question_type === 'multiple_select' ? 'checkbox' : 'radio'}
                      name={question.id}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(answer.id)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-gray-900">{answer.answer_text}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? 'bg-blue-600'
                    : answers[questions[index].id]?.length > 0
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!allQuestionsAnswered}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Finalizar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Próxima
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Voltar ao módulo
        </button>
      </div>
    </div>
  );
}

interface QuizResultProps {
  score: number;
  passed: boolean;
  onRetry: () => void;
  onContinue: () => void;
}

export function QuizResult({ score, passed, onRetry, onContinue }: QuizResultProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center max-w-md mx-auto">
        {passed ? (
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
        ) : (
          <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
        )}

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {passed ? 'Parabéns!' : 'Quase lá!'}
        </h2>

        <p className="text-gray-600 mb-6">
          {passed
            ? 'Você passou na avaliação!'
            : 'Continue estudando e tente novamente.'}
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {score}%
          </div>
          <p className="text-sm text-gray-600">Sua pontuação</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Tentar Novamente
          </button>
          {passed && (
            <button
              onClick={onContinue}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
