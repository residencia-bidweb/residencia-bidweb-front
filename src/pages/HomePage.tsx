import { Shield, BookOpen, Award } from 'lucide-react';
import { ModuleCard } from '../components/ModuleCard';
import { useModules } from '../hooks/useModules';

interface HomePageProps {
  onModuleSelect: (moduleId: string) => void;
}

export function HomePage({ onModuleSelect }: HomePageProps) {
  const { modules, loading, error } = useModules();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Erro ao carregar módulos</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Plataforma de Treinamento
              </h1>
              <p className="text-sm text-gray-600">
                Cybersegurança para Empresas
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Bem-vindo ao Treinamento de Cybersegurança
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Aprenda a proteger sua empresa e seus dados contra ameaças cibernéticas.
            Complete os módulos e teste seus conhecimentos com mini provas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Conteúdo Estruturado
            </h3>
            <p className="text-sm text-gray-600">
              Módulos organizados com lições práticas e fáceis de entender
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Avaliações Práticas
            </h3>
            <p className="text-sm text-gray-600">
              Mini provas ao final de cada módulo para testar seu conhecimento
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Segurança em Primeiro Lugar
            </h3>
            <p className="text-sm text-gray-600">
              Aprenda as melhores práticas de segurança cibernética
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Módulos de Treinamento
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={() => onModuleSelect(module.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
