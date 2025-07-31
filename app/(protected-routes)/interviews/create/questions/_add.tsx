import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

export default function Add({ onAdd }: { onAdd: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onAdd}
          size="icon"
          aria-label="Add Question"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add</p>
      </TooltipContent>
    </Tooltip>
  );
}
