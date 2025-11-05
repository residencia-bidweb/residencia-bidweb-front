import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';

function App() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
  };

  const handleBack = () => {
    setSelectedModuleId(null);
  };

  return (
    <>
      {selectedModuleId ? (
        <ModulePage moduleId={selectedModuleId} onBack={handleBack} />
      ) : (
        <HomePage onModuleSelect={handleModuleSelect} />
      )}
    </>
  );
}

export default App;
