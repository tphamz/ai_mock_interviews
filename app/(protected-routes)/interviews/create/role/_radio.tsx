"use client";
import animations, { Stagger } from "@/components/resuable/animations";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReactNode, useRef, useState } from "react";

type Props = {
  data?: string;
  list: string[];
  label: string;
  onDataChange: (val: string) => void;
  actions?: ReactNode;
};

const DEBOUNCE_TIMEOUT = 500;
export default function RadioPrompt({
  data = "",
  label,
  list,
  actions,
  onDataChange,
}: Props) {
  const [value, setValue] = useState(data || list[0]);
  const handleChange = (val: string) => {
    setValue(val);
    onDataChange(val);
  };
  return (
    <animations.Stagger className="flex flex-col sm:flex-row justify-between mb-10 items-left rounded-xl bg-muted-foreground/10 w-full p-6">
      <div className="flex flex-col flex-grow">
        <span className="text-foreground text-lg font-bold">{label}</span>
        <RadioGroup
          value={value}
          className="flex row-flex py-5"
          onValueChange={handleChange}
        >
          {list.map((item: string, index: number) => (
            <div className="flex items-center gap-3" key={item}>
              <RadioGroupItem value={item} id={index.toString()} />
              <Label htmlFor={index.toString()}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-center gap-3">{actions}</div>
    </animations.Stagger>
  );
}
