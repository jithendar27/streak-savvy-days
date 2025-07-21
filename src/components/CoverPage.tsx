import { Calendar, CheckSquare, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoverPageProps {
  onEnter: () => void;
  onProgressGoals: () => void;
}

export const CoverPage = ({ onEnter, onProgressGoals }: CoverPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-6">
      <div className="text-center text-white max-w-2xl mx-auto">
        <div className="mb-8 relative">
          <div className="absolute inset-0 blur-3xl bg-white/20 rounded-full animate-pulse"></div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 relative z-10 drop-shadow-2xl">
            Daily Tracker
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-12 text-white/90 font-light">
          Track your progress, build habits, and achieve your goals
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <CheckSquare className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Daily Tasks</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Calendar className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Date Tracking</span>
          </div>
          <div 
            className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all duration-300"
            onClick={onProgressGoals}
          >
            <Target className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Progress Goals</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Analytics</span>
          </div>
        </div>
        
        <Button 
          onClick={onEnter}
          size="lg" 
          className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-glow transform hover:scale-105 transition-all duration-300"
        >
          Start Tracking
        </Button>
      </div>
    </div>
  );
};