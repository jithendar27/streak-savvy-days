import { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Unit {
  id: string;
  name: string;
  isCompleted: boolean;
  coverage: number;
}

interface Subject {
  id: string;
  name: string;
  units: Unit[];
}

interface SubjectsTrackerProps {
  onBack: () => void;
}

export const SubjectsTracker = ({ onBack }: SubjectsTrackerProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 'ada',
      name: 'ADA',
      units: [
        { id: 'ada-unit1', name: 'Unit 1', isCompleted: false, coverage: 0 },
        { id: 'ada-unit2', name: 'Unit 2', isCompleted: false, coverage: 0 },
        { id: 'ada-unit3', name: 'Unit 3', isCompleted: false, coverage: 0 },
        { id: 'ada-unit4', name: 'Unit 4', isCompleted: false, coverage: 0 },
        { id: 'ada-unit5', name: 'Unit 5', isCompleted: false, coverage: 0 },
      ]
    },
    {
      id: 'ds',
      name: 'DS',
      units: [
        { id: 'ds-unit1', name: 'Unit 1', isCompleted: false, coverage: 0 },
        { id: 'ds-unit2', name: 'Unit 2', isCompleted: false, coverage: 0 },
        { id: 'ds-unit3', name: 'Unit 3', isCompleted: false, coverage: 0 },
        { id: 'ds-unit4', name: 'Unit 4', isCompleted: false, coverage: 0 },
        { id: 'ds-unit5', name: 'Unit 5', isCompleted: false, coverage: 0 },
      ]
    },
    {
      id: 'cn',
      name: 'CN',
      units: [
        { id: 'cn-unit1', name: 'Unit 1', isCompleted: false, coverage: 0 },
        { id: 'cn-unit2', name: 'Unit 2', isCompleted: false, coverage: 0 },
        { id: 'cn-unit3', name: 'Unit 3', isCompleted: false, coverage: 0 },
        { id: 'cn-unit4', name: 'Unit 4', isCompleted: false, coverage: 0 },
        { id: 'cn-unit5', name: 'Unit 5', isCompleted: false, coverage: 0 },
      ]
    },
    {
      id: 'webdev',
      name: 'WEB DEV',
      units: [
        { id: 'webdev-unit1', name: 'Unit 1', isCompleted: false, coverage: 0 },
        { id: 'webdev-unit2', name: 'Unit 2', isCompleted: false, coverage: 0 },
        { id: 'webdev-unit3', name: 'Unit 3', isCompleted: false, coverage: 0 },
        { id: 'webdev-unit4', name: 'Unit 4', isCompleted: false, coverage: 0 },
        { id: 'webdev-unit5', name: 'Unit 5', isCompleted: false, coverage: 0 },
      ]
    },
    {
      id: 'pe',
      name: 'PE',
      units: [
        { id: 'pe-unit1', name: 'Unit 1', isCompleted: false, coverage: 0 },
        { id: 'pe-unit2', name: 'Unit 2', isCompleted: false, coverage: 0 },
        { id: 'pe-unit3', name: 'Unit 3', isCompleted: false, coverage: 0 },
        { id: 'pe-unit4', name: 'Unit 4', isCompleted: false, coverage: 0 },
        { id: 'pe-unit5', name: 'Unit 5', isCompleted: false, coverage: 0 },
      ]
    },
    {
      id: 'oe',
      name: 'OE',
      units: [
        { id: 'oe-unit1', name: 'Unit 1', isCompleted: false, coverage: 0 },
        { id: 'oe-unit2', name: 'Unit 2', isCompleted: false, coverage: 0 },
        { id: 'oe-unit3', name: 'Unit 3', isCompleted: false, coverage: 0 },
        { id: 'oe-unit4', name: 'Unit 4', isCompleted: false, coverage: 0 },
        { id: 'oe-unit5', name: 'Unit 5', isCompleted: false, coverage: 0 },
      ]
    }
  ]);

  const handleUnitToggle = (subjectId: string, unitId: string) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject =>
        subject.id === subjectId
          ? {
              ...subject,
              units: subject.units.map(unit =>
                unit.id === unitId
                  ? { 
                      ...unit, 
                      isCompleted: !unit.isCompleted
                    }
                  : unit
              )
            }
          : subject
      )
    );
  };

  const getSubjectProgress = (subject: Subject) => {
    const completedUnits = subject.units.filter(unit => unit.isCompleted).length;
    return Math.round((completedUnits / subject.units.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
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
          <h1 className="text-3xl font-bold text-foreground">Subject Progress Goals</h1>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="bg-card border-border shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    {subject.name}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {getSubjectProgress(subject)}%
                  </Badge>
                </CardTitle>
                <Progress 
                  value={getSubjectProgress(subject)} 
                  className="h-2"
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subject.units.map((unit) => (
                    <div
                      key={unit.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleUnitToggle(subject.id, unit.id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={unit.isCompleted}
                          onChange={() => handleUnitToggle(subject.id, unit.id)}
                          className="mr-3 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                      <span className={`font-medium ${unit.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {unit.name}
                      </span>
                    </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};