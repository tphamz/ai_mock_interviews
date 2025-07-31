import { User } from "@/types";
import { create } from "zustand";

type Props = {
  user: User | null;
  setUser: (val: User) => void;
};

export const useLoggedInUser = create<Props>((set) => ({
  user: null,
  setUser: (user: User) => set((state) => ({ user })),
}));
