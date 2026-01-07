import React, { useState } from 'react';
import Hero from './components/Hero';
import Builder from './components/Builder';
import { ResumeData, INITIAL_DATA } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'hero' | 'builder'>('hero');
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);

  return (
    <div className="font-mono text-slate-200 antialiased selection:bg-accent selection:text-black">
      {view === 'hero' ? (
        <Hero onStart={() => setView('builder')} />
      ) : (
        <Builder data={resumeData} setData={setResumeData} />
      )}
    </div>
  );
};

export default App;