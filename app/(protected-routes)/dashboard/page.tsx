import { getReports } from "@/lib/actions/aggergation.action";
import { toast } from "sonner";
import Count from "./_count";
import CategoryScoreChart from "./_category-score-chart";
import TypeScoreChart from "./_type-score-chart";
import animations from "@/components/resuable/animations";

export default async function Dashboard() {
  const result: any = await getReports();
  if (result.error) {
    return toast.error("Error", { description: result.error });
  }
  const categoryScores = result.data.categoryScores || [];
  const types = Object.keys(result.data.scoreByTypes || {});
  const typeScores: any[] = [];
  for (let i = 0; i < categoryScores.length; i++) {
    typeScores[i] = { name: categoryScores[i].name };
    for (let type of types)
      typeScores[i][type] =
        result.data.scoreByTypes[type].categoryScores[i].score;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center gap-5 flew-wrap justify-center">
        <div className="grid grid-cols-3 gap-4 w-full">
          <animations.ScaleBounce>
            <Count
              title="Total Interviews"
              value={result.data.interviewCount || 0}
            />
          </animations.ScaleBounce>
          <animations.ScaleBounce options={{ delay: 0.2 }}>
            <Count
              title="Number Feedback"
              value={result.data.feedbackCount || 0}
            />
          </animations.ScaleBounce>
          <animations.ScaleBounce options={{ delay: 0.4 }}>
            <Count title="Avg Score" value={result.data.score || 0} />
          </animations.ScaleBounce>
        </div>

        <animations.Appear options={{ delay: 0.5 }} className="w-full h-full">
          <CategoryScoreChart data={categoryScores} />
        </animations.Appear>
        <animations.Appear options={{ delay: 0.5 }} className="w-full h-full">
          <TypeScoreChart types={types} data={typeScores} />
        </animations.Appear>
      </div>
    </div>
  );
}
