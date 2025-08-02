import { Subtitle, Title } from "@/components/resuable/title";
import RoleForm from "./_form";

export default function CreateInterviewByRole() {
  return (
    <div className="w-full h-full  flex flex-col items-center gap-10 overflow-auto">
      <div>
        <Title>Build Your Interview with Your Inputs</Title>
        <Subtitle>
          Choose your role, tech stack, and interview type — we'll generate
          tailored questions for you.
        </Subtitle>
      </div>

      <div className="w-full h-full flex flex-col items-center">
        <RoleForm />
      </div>
    </div>
  );
}
