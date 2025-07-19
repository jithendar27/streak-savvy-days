import { useState } from "react";
import { CoverPage } from "@/components/CoverPage";
import { DailyTracker } from "@/components/DailyTracker";

const Index = () => {
  const [showTracker, setShowTracker] = useState(false);

  if (showTracker) {
    return <DailyTracker onBack={() => setShowTracker(false)} />;
  }

  return <CoverPage onEnter={() => setShowTracker(true)} />;
};

export default Index;
