import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RotateCcw } from "lucide-react";

export default function Reset({ onReset }: { onReset: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onReset}
          size="icon"
          aria-label="Reset Cards"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Reset</p>
      </TooltipContent>
    </Tooltip>
  );
}
