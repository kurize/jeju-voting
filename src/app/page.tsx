'use client';

import { useState, useCallback } from 'react';
import { Landing } from '@/components/landing';
import { Survey } from '@/components/survey';
import { Results } from '@/components/results';

type View = 'landing' | 'survey' | 'results';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [voter, setVoter] = useState('');

  const startVoting = useCallback((name: string) => {
    setVoter(name);
    setView('survey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showResults = useCallback(() => {
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const backToLanding = useCallback(() => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (view === 'survey') {
    return <Survey voter={voter} onComplete={showResults} onBack={backToLanding} />;
  }

  if (view === 'results') {
    return <Results onBack={backToLanding} onVoteAgain={() => setView('landing')} />;
  }

  return <Landing onStart={startVoting} onViewResults={showResults} />;
}
