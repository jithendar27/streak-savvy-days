import { useState, useEffect } from 'react';

export interface TaskData {
  id: string;
  title: string;
  isCompleted: boolean;
  comment: string;
  subtasks?: TaskData[];
}

export interface DayData {
  tasks: TaskData[];
  date: string;
}

const STORAGE_KEY = 'daily-tracker-data';

export const useLocalStorage = () => {
  const [data, setData] = useState<Record<string, DayData>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, []);

  const saveData = (newData: Record<string, DayData>) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const getDefaultTasks = (): TaskData[] => [
    { id: 'dsa', title: 'Daily DSA', isCompleted: false, comment: '' },
    { id: 'webdev', title: 'Learn Web Development', isCompleted: false, comment: '' },
    { id: 'aptitude', title: 'Daily Aptitude', isCompleted: false, comment: '' },
    { id: 'communication', title: 'Learning Communication', isCompleted: false, comment: '' },
    {
      id: 'sem-prep',
      title: 'Sem Preparation',
      isCompleted: false,
      comment: '',
      subtasks: [
        { id: 'ada', title: 'ADA', isCompleted: false, comment: '' },
        { id: 'ds', title: 'DS', isCompleted: false, comment: '' },
        { id: 'cn', title: 'CN', isCompleted: false, comment: '' },
        { id: 'webdev-sub', title: 'WEB DEV', isCompleted: false, comment: '' },
        { id: 'pe', title: 'PE', isCompleted: false, comment: '' },
        { id: 'oe', title: 'OE', isCompleted: false, comment: '' },
      ]
    }
  ];

  const getDataForDate = (date: Date): DayData => {
    const dateKey = date.toISOString().split('T')[0];
    return data[dateKey] || { tasks: getDefaultTasks(), date: dateKey };
  };

  const updateDataForDate = (date: Date, dayData: DayData) => {
    const dateKey = date.toISOString().split('T')[0];
    const newData = { ...data, [dateKey]: dayData };
    saveData(newData);
  };

  return {
    getDataForDate,
    updateDataForDate,
  };
};