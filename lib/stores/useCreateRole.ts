import { create } from "zustand";

type Props = {
  role: string;
  level: string;
  techStack: string[];
  type: "Technical" | "Behavioral";
  onUpdate: (key: string, value: string) => void;
};

export const useCreateRole = create<Props>((set) => ({
  role: "",
  level: "",
  techStack: [],
  type: "Behavioral",
  onUpdate: (key: string, value: string | string[]) =>
    set((state) => ({ ...state, [key]: value })),
}));
