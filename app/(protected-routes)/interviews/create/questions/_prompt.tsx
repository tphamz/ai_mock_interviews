"use client";
import { Input } from "@/components/ui/input";
import Add from "./_add";
import Reset from "./_reset";
import { useState } from "react";
import { useCreateQuestions } from "@/lib/stores/useCreateQuestions";
import animations from "@/components/resuable/animations";
import RadioPrompt from "../role/_radio";

export default function PromptInput() {
  const { questions, onReset, onAdd, LIMIT, type, onTypeChange } =
    useCreateQuestions();
  const [value, setValue] = useState("");
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setValue(evt.target.value);

  const handleReset = () => {
    setValue("");
    onReset();
  };

  const handleAdd = () => {
    if (value.trim() === "") return;
    onAdd(value);
    setValue("");
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      handleAdd();
    }
  };

  return (
    <>
      <RadioPrompt
        label=""
        list={["Behavioral", "Technical"]}
        data={type}
        onDataChange={(value) => onTypeChange(value)}
      />
      <animations.Stagger className="flex flex-col sm:flex-row justify-between mb-15 items-center rounded-xl bg-muted-foreground/10 w-full p-6">
        <Input
          required
          placeholder="Enter a question to add to the list..."
          className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 !bg-transparent flex-grow"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center gap-3">
          {questions.length < LIMIT && <Add onAdd={handleAdd} />}
          <Reset onReset={handleReset} />
        </div>
      </animations.Stagger>
    </>
  );
}
