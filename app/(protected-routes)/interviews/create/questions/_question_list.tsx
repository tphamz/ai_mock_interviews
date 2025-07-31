"use client";
import React, { useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import QuestionCard from "./_question-card";
import { useCreateQuestions } from "@/lib/stores/useCreateQuestions";
import { Button } from "@/components/ui/button";
import animations from "@/components/resuable/animations";

export default function QuestionList() {
  const { questions, onSetQuestions, onUpdate, LIMIT } = useCreateQuestions();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const indexes = new Map(questions.map((item, index) => [item.id, index]));
      const oldIndex = indexes.get(active.id)!;
      const newIndex = indexes.get(over.id)!;
      onSetQuestions(arrayMove(questions, oldIndex, newIndex));
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    onSetQuestions(updatedQuestions);
  };

  const handleChangeQuestion = (index: number, value: string) => {
    onUpdate(index, value);
  };

  const handleAddQuestion = (index: number) => {
    questions.splice(index + 1, 0, { id: Date.now(), value: "" });
    onSetQuestions([...questions]);
  };

  useEffect(() => {
    onSetQuestions([]);
  }, []);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions}
          strategy={verticalListSortingStrategy}
        >
          {questions.map((item, index) => (
            <QuestionCard
              key={index}
              index={index}
              hasAdd={questions.length < LIMIT}
              question={item}
              onRemoveQuestion={handleRemoveQuestion}
              onEditQuestion={handleChangeQuestion}
              onAddQuestion={handleAddQuestion}
            />
          ))}
        </SortableContext>
      </DndContext>
      <animations.Stagger>
        <Button
          className="p-5 cursor-pointer mt-5"
          disabled={!questions.length}
        >
          Create Interview
        </Button>
      </animations.Stagger>
    </>
  );
}
