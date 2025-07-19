import { useState } from "react";
import { ChevronDown, ChevronRight, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
  comment: string;
}

interface TaskItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  comment: string;
  onToggle: (id: string) => void;
  onCommentChange: (id: string, comment: string) => void;
  subtasks?: SubTask[];
  onSubtaskToggle?: (parentId: string, subtaskId: string) => void;
  onSubtaskCommentChange?: (parentId: string, subtaskId: string, comment: string) => void;
}

export const TaskItem = ({
  id,
  title,
  isCompleted,
  comment,
  onToggle,
  onCommentChange,
  subtasks,
  onSubtaskToggle,
  onSubtaskCommentChange
}: TaskItemProps) => {
  const [showComment, setShowComment] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const handleCommentSave = (newComment: string) => {
    onCommentChange(id, newComment);
    setShowComment(false);
  };

  const handleSubtaskCommentSave = (subtaskId: string, newComment: string) => {
    if (onSubtaskCommentChange) {
      onSubtaskCommentChange(id, subtaskId, newComment);
    }
  };

  return (
    <div className="space-y-3">
      <Card className="p-4 bg-gradient-secondary border-0 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onToggle(id)}
            className="data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
          
          <span className={`flex-1 font-medium ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {title}
          </span>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowComment(!showComment)}
              className="text-muted-foreground hover:text-primary"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
            
            {subtasks && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="text-muted-foreground hover:text-primary"
              >
                {showSubtasks ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
        
        {showComment && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">What did you learn?</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowComment(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Share your insights and learnings..."
              value={comment}
              onChange={(e) => handleCommentSave(e.target.value)}
              className="min-h-[80px] bg-white border-border focus:border-primary"
            />
          </div>
        )}
      </Card>
      
      {subtasks && showSubtasks && (
        <div className="ml-6 space-y-2 border-l-2 border-border pl-4">
          {subtasks.map((subtask) => (
            <Card key={subtask.id} className="p-3 bg-white border-border shadow-soft">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={subtask.isCompleted}
                  onCheckedChange={() => onSubtaskToggle && onSubtaskToggle(id, subtask.id)}
                  className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                />
                
                <span className={`flex-1 text-sm ${subtask.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {subtask.title}
                </span>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const currentlyShowing = subtask.comment || showComment;
                    setShowComment(!currentlyShowing);
                  }}
                  className="text-muted-foreground hover:text-primary"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
              
              {(subtask.comment || showComment) && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Share your insights..."
                    value={subtask.comment}
                    onChange={(e) => handleSubtaskCommentSave(subtask.id, e.target.value)}
                    className="min-h-[60px] bg-gray-50 border-border focus:border-primary text-sm"
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};