"use client";
import ChipPrompt from "./_chips";
import InputPrompt from "./_prompt";
import RadioPrompt from "./_radio";

export default function RoleForm() {
  const onDataChange = (key: string) => (value: string | string[]) => {};
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
      />
      <InputPrompt
        label="Experience Level"
        placeholder="e.g. Entry, Mid-level, Senior, Lead"
        onDataChange={onDataChange("role")}
      />
      <ChipPrompt
        label="Tech Stack / Skills"
        placeholder="e.g. React, Go, AWS"
        onDataChange={onDataChange("techStack")}
      />
    </>
  );
}
