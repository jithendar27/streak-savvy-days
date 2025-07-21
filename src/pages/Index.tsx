import { useState } from "react";
import { CoverPage } from "@/components/CoverPage";
import { DailyTracker } from "@/components/DailyTracker";
import { SubjectsTracker } from "@/components/SubjectsTracker";

type ViewType = 'cover' | 'tracker' | 'subjects';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('cover');

  if (currentView === 'tracker') {
    return <DailyTracker onBack={() => setCurrentView('cover')} />;
  }

  if (currentView === 'subjects') {
    return <SubjectsTracker onBack={() => setCurrentView('cover')} />;
  }

  return (
    <CoverPage 
      onEnter={() => setCurrentView('tracker')} 
      onProgressGoals={() => setCurrentView('subjects')}
    />
  );
};

export default Index;
