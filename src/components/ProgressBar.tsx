import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
}

export const ProgressBar = ({ completedTasks, totalTasks }: ProgressBarProps) => {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="bg-gradient-secondary p-6 rounded-xl shadow-soft border border-border">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">Daily Progress</h2>
        <span className="text-2xl font-bold text-primary">{percentage}%</span>
      </div>
      
      <Progress 
        value={percentage} 
        className="h-3 bg-secondary"
      />
      
      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
        <span>{completedTasks} of {totalTasks} tasks completed</span>
        <span className="font-medium">
          {percentage === 100 ? "🎉 All done!" : `${totalTasks - completedTasks} remaining`}
        </span>
      </div>
    </div>
  );
};