import { Subtitle, Title } from "@/components/resuable/title";
import RoleForm from "./_form";

export default function CreateInterviewByRole() {
  return (
    <div className="w-full h-full max-h-[100%] md:max-h-[80vh]  flex flex-col items-center gap-10">
      <div>
        <Title>Build Your Interview with Your Inputs</Title>
        <Subtitle>
          Choose your role, tech stack, and interview type — we'll generate
          tailored questions for you.
        </Subtitle>
      </div>

      <div className="w-full h-full flex flex-col items-center overflow-auto">
        <RoleForm />
      </div>
    </div>
  );
}
