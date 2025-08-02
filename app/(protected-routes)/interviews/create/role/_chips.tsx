"use client";
import animations from "@/components/resuable/animations";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import IconButton from "./_icon-button";

type Props = {
  data?: string;
  label: string;
  placeholder: string;
  onDataChange: (val: string) => void;
};

const DEBOUNCE_TIMEOUT = 500;
export default function ChipPrompt({
  data = "",
  label,
  placeholder,
  onDataChange,
}: Props) {
  const [value, setValue] = useState(data);
  const [values, setValues] = useState(data ? [data] : []);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      handleAddValue();
    }
  };

  const handleAddValue = () => {
    if (!value) return;
    const result = [...values, value];
    setValues(result);
    setValue("");
    onDataChange(result.join(","));
  };

  const handleDelete = (index: number) => () => {
    values.splice(index, 1);
    const result = [...values];
    setValues(result);
    onDataChange(result.join(","));
  };

  return (
    <animations.Stagger className="flex flex-col sm:flex-row justify-between mb-10 items-left rounded-xl bg-muted-foreground/10 w-full p-6">
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
        <div className="flex flex-row flex-wrap gap-x-2">
          {values.map((item, index) => (
            <Badge
              key={index}
              className="row-flex justify-between items-center rounded-4xl p-2 gap-x-2"
            >
              <span>{item}</span>
              <Button
                size="icon"
                onClick={handleDelete(index)}
                variant="ghost"
                className="rounded-4xl w-5 h-5"
              >
                <X className="w-2 h-2" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          disabled={!Boolean(value)}
          onClick={handleAddValue}
          label="Add Skill"
          icon={<Plus className="w-6 h-6" />}
        />
      </div>
    </animations.Stagger>
  );
}
