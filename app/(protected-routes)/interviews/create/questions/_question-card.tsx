import { Card, CardContent } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_TIMEOUT = 500;

type Props = {
  hasAdd?: boolean;
  index: number;
  question: { id: number; value: string };
  onRemoveQuestion: (index: number) => void;
  onEditQuestion: (index: number, value: string) => void;
  onAddQuestion: (index: number) => void;
};

export default function QuestionCard({
  hasAdd = true,
  index,
  question,
  onRemoveQuestion,
  onEditQuestion,
  onAddQuestion,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });
  const [value, setValue] = useState(question.value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    setValue(question.value);
  }, [question.value]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onEditQuestion(index, evt.target.value);
    }, DEBOUNCE_TIMEOUT);
  };

  return (
    <>
      <Card
        style={{ ...style }}
        ref={setNodeRef}
        className="border-none shadow-sm w-full rounded-xl"
      >
        <CardContent className="flex row-flex justify-between no-wrap gap-3 items-center">
          <span className="text-lg font-semibold">{index + 1}</span>
          <Input
            required
            placeholder="Add a new question"
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 !bg-transparent flex-grow"
            value={value}
            onChange={handleChange}
          />
          <Button
            variant="ghost"
            size="icon"
            className="cursor-grab p-1 hover:bg-gray-200"
            aria-label="Drag handle"
            onClick={() => onRemoveQuestion(index)}
          >
            <Trash size={18} />
          </Button>
          <Button
            {...attributes}
            {...listeners}
            className="cursor-grab p-1 hover:bg-gray-200"
            size="icon"
            variant="ghost"
            aria-label="Drag handle"
          >
            <GripVertical size={18} />
          </Button>
        </CardContent>
      </Card>
      {hasAdd ? (
        <div className="w-full flex row-flex justify-center items-center opacity-0 hover:opacity-[100%] hover:py-10 hover:h-10 h-1 transition-all duration-200 py-2">
          <div className="flex-auto h-1 border-t-1 border-muted mr-2 ml-20" />
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 text-muted-foreground hover:bg-transparent border-stone-300 rounded-4xl"
            onClick={() => onAddQuestion(index)}
          >
            <Plus className="w-10 h-10" />
          </Button>
          <div className="flex-auto h-1 border-t-1 border-muted ml-2 mr-20" />
        </div>
      ) : (
        <div className="h-1 py-2" />
      )}
    </>
  );
}
