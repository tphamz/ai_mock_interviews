"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CSSProperties, use, useRef } from "react";
import animations from "../animations";

export default function BackButton({
  backPage,
  onBackButtonClick = () => {},
  style = {},
}: {
  backPage?: string;
  style?: CSSProperties;
  onBackButtonClick?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const handleBackButtonClick = () => {
    onBackButtonClick();
    router.push(
      backPage ? backPage : pathname.split("/").slice(0, -1).join("/")
    );
  };
  return (
    <animations.Appear
      options={{ delay: 1 }}
      className="flex items-center justify-start"
    >
      <Button
        variant="outline"
        onClick={handleBackButtonClick}
        style={{ ...style }}
        className="mb-3 text-muted-foreground hover:bg-transparent border-stone-300"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
    </animations.Appear>
  );
}
