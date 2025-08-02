"use client";
import { Pencil, Plus, RefreshCcw } from "lucide-react";
import ChipPrompt from "./_chips";
import IconButton from "./_icon-button";
import InputPrompt from "./_prompt";
import RadioPrompt from "./_radio";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { createInterviewFromInputs } from "@/lib/actions/interview.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import animations from "@/components/resuable/animations";

type FormProps = {
  type?: string;
  role?: string;
  level?: string;
  techStack?: string;
};

export default function RoleForm() {
  const formData = useRef<FormProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onDataChange = (key: string) => (value: string) => {
    if (!formData.current) formData.current = {};
    formData.current![key as keyof FormProps] = value;
  };

  const onCreate = async () => {
    if (!formData.current) return;
    if (!formData.current.type) formData.current.type = "Behavioral";
    if (
      !formData.current.role ||
      !formData.current.level ||
      !formData.current.techStack
    )
      return;
    setLoading(true);
    const res = await createInterviewFromInputs(formData.current as any);
    setLoading(false);
    if (res.error) toast.error("Error", { description: res.error });
    return redirect("/interviews");
  };

  return (
    <>
      <RadioPrompt
        label="Interview Type"
        list={["Behavioral", "Technical"]}
        onDataChange={onDataChange("type")}
      />
      <InputPrompt
        label="Role / Position"
        placeholder="e.g. Frontend Engineer, DevOps, Product Manager"
        onDataChange={onDataChange("role")}
        actions={<IconButton icon={<Pencil className="w-4 h-4" />} disabled />}
      />
      <InputPrompt
        label="Experience Level"
        placeholder="e.g. Entry, Mid-level, Senior, Lead"
        onDataChange={onDataChange("level")}
        actions={<IconButton icon={<Pencil className="w-4 h-4" />} disabled />}
      />
      <ChipPrompt
        label="Tech Stack / Skills"
        placeholder="e.g. React, Go, AWS"
        onDataChange={onDataChange("techStack")}
      />
      <div className="flex flex-row justify-center items-center w-full">
        <animations.Appear options={{ delay: 1.2 }}>
          <Button onClick={onCreate} disabled={loading}>
            {loading && <RefreshCcw className="animate-spin" />}
            Create Interview
          </Button>
        </animations.Appear>
      </div>
    </>
  );
}
