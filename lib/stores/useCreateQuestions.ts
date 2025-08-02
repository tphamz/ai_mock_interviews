import { type } from "os";
import { create } from "zustand";

type Question = {
  id: number;
  value: string;
};
type Props = {
  LIMIT: number;
  questions: Question[];
  type: string;
  onAdd: (val: string) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, val: string) => void;
  onReset: () => void;
  onSetQuestions: (questions: Question[]) => void;
  onTypeChange: (type: string) => void;
};

export const useCreateQuestions = create<Props>((set) => ({
  LIMIT: 3,
  questions: [],
  type: "Behavioral",
  onAdd: (val: string) =>
    set(({ questions }) => ({
      questions: [...questions, { id: Date.now(), value: val }],
    })),
  onRemove: (index: number) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  onReset: () => set({ questions: [] }),
  onUpdate: (index: number, val: string) =>
    set(({ questions }) => {
      questions[index] = { ...questions[index], value: val };
      return {
        questions: [...questions],
      };
    }),
  onTypeChange: (type: string) => set(() => ({ type })),
  onSetQuestions: (questions: Question[]) => set(() => ({ questions })),
}));
