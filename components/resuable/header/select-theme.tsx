"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function SelectTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light" className="flex flex-row">
          <Sun className="w-4 h-4" />
          <div className="text-sm">Light</div>
        </SelectItem>
        <SelectItem value="dark">
          <Moon className="w-4 h-4" />
          <div className="text-sm">Dark</div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
