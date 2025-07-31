import { Subtitle, Title } from "@/components/resuable/title";
import CreateInterviewOptions from "./_create-options";

export default function CreateInterviewPage() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <div>
        <Title>How would you like to build your interview today?</Title>
        <Subtitle>
          Use AI voice, custom inputs, or your own questions to begin your
          interview.
        </Subtitle>
      </div>

      <div className="w-full flex flex-col items-center gap-5 flew-wrap md:flex-row justify-center">
        <CreateInterviewOptions />
      </div>
    </div>
  );
}
