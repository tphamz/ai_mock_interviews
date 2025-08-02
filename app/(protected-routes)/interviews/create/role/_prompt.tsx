"use client";
import animations from "@/components/resuable/animations";
import { Input } from "@/components/ui/input";
import { ReactNode, useRef, useState } from "react";

type Props = {
  data?: string;
  label: string;
  placeholder: string;
  onDataChange: (val: string) => void;
  handleKeyDown?: (key: string) => void;
  actions?: ReactNode;
};

const DEBOUNCE_TIMEOUT = 500;
export default function InputPrompt({
  data = "",
  label,
  placeholder,
  actions,
  onDataChange,
  handleKeyDown = () => {},
}: Props) {
  const [value, setValue] = useState(data);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onDataChange(evt.target.value);
    }, DEBOUNCE_TIMEOUT);
  };
  return (
    <animations.Stagger className="flex flex-col sm:flex-row justify-between items-left rounded-xl bg-muted-foreground/10 w-full p-6">
      <div className="flex flex-col flex-grow">
        <span className="text-foreground text-lg font-bold">{label}</span>
        <Input
          required
          placeholder={placeholder}
          className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 !bg-transparent w-full"
          value={value}
          onChange={handleChange}
          onKeyDown={(evt) => handleKeyDown(evt.key)}
        />
      </div>
      <div className="flex items-center gap-3">{actions}</div>
    </animations.Stagger>
  );
}
