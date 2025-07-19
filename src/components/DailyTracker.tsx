import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DatePicker";
import { ProgressBar } from "./ProgressBar";
import { TaskItem } from "./TaskItem";
import { useLocalStorage, TaskData } from "@/hooks/useLocalStorage";

interface DailyTrackerProps {
  onBack: () => void;
}

export const DailyTracker = ({ onBack }: DailyTrackerProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getDataForDate, updateDataForDate } = useLocalStorage();
  
  const dayData = getDataForDate(selectedDate);
  const [tasks, setTasks] = useState(dayData.tasks);

  const handleDateChange = (date: Date) => {
    // Save current tasks before switching dates
    updateDataForDate(selectedDate, { ...dayData, tasks });
    
    setSelectedDate(date);
    const newDayData = getDataForDate(date);
    setTasks(newDayData.tasks);
  };

  const updateTasks = (newTasks: TaskData[]) => {
    setTasks(newTasks);
    updateDataForDate(selectedDate, { ...dayData, tasks: newTasks });
  };

  const handleTaskToggle = (taskId: string) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newTask = { ...task, isCompleted: !task.isCompleted };
        
        // If it's sem preparation, update all subtasks
        if (task.subtasks) {
          newTask.subtasks = task.subtasks.map(subtask => ({
            ...subtask,
            isCompleted: newTask.isCompleted
          }));
        }
        
        return newTask;
      }
      return task;
    });
    updateTasks(newTasks);
  };

  const handleCommentChange = (taskId: string, comment: string) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, comment } : task
    );
    updateTasks(newTasks);
  };

  const handleSubtaskToggle = (parentId: string, subtaskId: string) => {
    const newTasks = tasks.map(task => {
      if (task.id === parentId && task.subtasks) {
        const newSubtasks = task.subtasks.map(subtask =>
          subtask.id === subtaskId 
            ? { ...subtask, isCompleted: !subtask.isCompleted }
            : subtask
        );
        
        // Update parent completion based on subtasks
        const allSubtasksCompleted = newSubtasks.every(subtask => subtask.isCompleted);
        
        return {
          ...task,
          subtasks: newSubtasks,
          isCompleted: allSubtasksCompleted
        };
      }
      return task;
    });
    updateTasks(newTasks);
  };

  const handleSubtaskCommentChange = (parentId: string, subtaskId: string, comment: string) => {
    const newTasks = tasks.map(task => {
      if (task.id === parentId && task.subtasks) {
        const newSubtasks = task.subtasks.map(subtask =>
          subtask.id === subtaskId ? { ...subtask, comment } : subtask
        );
        return { ...task, subtasks: newSubtasks };
      }
      return task;
    });
    updateTasks(newTasks);
  };

  // Calculate progress
  const getTotalTasks = (tasks: TaskData[]): number => {
    return tasks.reduce((total, task) => {
      return total + 1 + (task.subtasks ? task.subtasks.length : 0);
    }, 0);
  };

  const getCompletedTasks = (tasks: TaskData[]): number => {
    return tasks.reduce((total, task) => {
      const taskCount = task.isCompleted ? 1 : 0;
      const subtaskCount = task.subtasks 
        ? task.subtasks.filter(subtask => subtask.isCompleted).length 
        : 0;
      return total + taskCount + subtaskCount;
    }, 0);
  };

  const totalTasks = getTotalTasks(tasks);
  const completedTasks = getCompletedTasks(tasks);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cover
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Daily Tracker</h1>
        </div>

        {/* Date Picker */}
        <DatePicker date={selectedDate} onDateChange={handleDateChange} />

        {/* Progress Bar */}
        <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />

        {/* Tasks */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Daily Tasks</h2>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              isCompleted={task.isCompleted}
              comment={task.comment}
              onToggle={handleTaskToggle}
              onCommentChange={handleCommentChange}
              subtasks={task.subtasks}
              onSubtaskToggle={handleSubtaskToggle}
              onSubtaskCommentChange={handleSubtaskCommentChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};