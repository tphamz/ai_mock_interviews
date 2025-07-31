import { Subtitle, Title } from "@/components/resuable/title";
import QuestionList from "./_question_list";
import PromptInput from "./_prompt";
export default function CreateInterviewQuestions() {
  return (
    <div className="w-full h-full max-h-[100%] md:max-h-[80vh]  flex flex-col items-center gap-10">
      <div>
        <Title>Build Your Interview with Custom Questions</Title>
        <Subtitle>
          Drag and drop to reorder your questions, or add new ones as needed.
        </Subtitle>
      </div>

      <div className="w-full h-full flex flex-col items-center">
        <PromptInput />
        <QuestionList />
      </div>
    </div>
  );
}
