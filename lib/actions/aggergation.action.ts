import { memo } from "react";
import { prismaClient } from "../prisma.sdk";
import { FeedbackItem, getFeedbacks } from "./feedback.action";

export type AggregationProps = {
  interviewCount?: number;
  feedbackCount?: number;
  score?: number;
  categoryScores?: { name: string; score: number }[];
  scoreByTypes?: any;
};

// const findAverageScoresByInterviewType = async (userId: string) => {
//   const result = await prismaClient.$queryRaw`
//   SELECT i.type, AVG(f.score) AS score
//   FROM "Interview" i
//   JOIN "Feedback" f ON i.id = f."interviewId"
//   WHERE f."userID" = ${userId}
//   GROUP BY i.type
// `;
//   return result;
// };

export const getReports: () => Promise<{
  status: number;
  error?: string;
  data?: AggregationProps;
}> = async () => {
  const params = {
    limit: 100,
    page: 1,
    include: { Interview: { select: { type: true } } },
  };
  let totalPage: number = 0;
  const res = await getFeedbacks(params);
  if (res.error) return { status: res.status, error: res.error };
  totalPage = res.data?.totalPage || 0;
  const memo = new Set<string>();
  let result: AggregationProps = aggregate(res.data!.items, memo);
  const range = Array.from({ length: totalPage - 1 }, (_, i) => i + 1);

  for (let i of range) {
    params.page += 1;
    const res = await getFeedbacks(params);
    if (res.error) return { status: res.status, error: res.error };
    result = aggregate(res.data!.items, memo, result);
  }

  formatResultScores(result);
  return { status: 200, data: result };
};

const aggregate: (
  items: FeedbackItem[],
  memo: Set<string>,
  data?: AggregationProps
) => AggregationProps = (items, memo, data = {}) => {
  for (const item of items) {
    if (!data.categoryScores) data.categoryScores = [];
    if (!data.scoreByTypes) data.scoreByTypes = {};
    if (!data.scoreByTypes[item.Interview!.type!])
      data.scoreByTypes[item.Interview!.type!] = {
        interviewCount: 0,
        feedbackCount: 0,
        score: 0,
        categoryScores: [],
      };

    if (!memo.has(item.interviewId!)) {
      data.interviewCount = 1 + (data.interviewCount || 0);
      data.scoreByTypes[item.Interview!.type!].interviewCount++;
    }

    memo.add(item.interviewId!);

    data.feedbackCount = 1 + (data.feedbackCount || 0);
    data.scoreByTypes[item.Interview!.type!].feedbackCount++;

    data.score =
      ((data.score || 0) * (data.feedbackCount - 1) + item.totalScore) /
      data.feedbackCount;

    data.scoreByTypes[item.Interview!.type!].score =
      (data.scoreByTypes[item.Interview!.type!].score *
        (data.scoreByTypes[item.Interview!.type!].feedbackCount - 1) +
        item.totalScore) /
      data.scoreByTypes[item.Interview!.type!].feedbackCount;

    for (let i = 0; i < item.categoryScores.length; i++) {
      const { name, score } = item.categoryScores[i] as {
        name: string;
        score: number;
      };
      data.categoryScores[i] = {
        name,
        score:
          ((data.categoryScores[i] || { score: 0 }).score *
            (data.feedbackCount - 1) +
            score) /
          data.feedbackCount,
      };

      data.scoreByTypes[item.Interview!.type!].categoryScores[i] = {
        name,
        score:
          ((
            data.scoreByTypes[item.Interview!.type!].categoryScores[i] || {
              score: 0,
            }
          ).score *
            (data.scoreByTypes[item.Interview!.type!].feedbackCount - 1) +
            score) /
          data.scoreByTypes[item.Interview!.type!].feedbackCount,
      };
    }
  }
  return data;
};

const formatResultScores: (data: AggregationProps) => AggregationProps = (
  data
) => {
  data.score = toTwoDecimalPlaces(data.score || 0);
  for (let item of data.categoryScores || []) {
    item.score = toTwoDecimalPlaces(item.score || 0);
  }

  for (let key in data.scoreByTypes) {
    data.scoreByTypes[key].score = toTwoDecimalPlaces(
      data.scoreByTypes[key].score || 0
    );
    for (let item of data.scoreByTypes[key].categoryScores) {
      item.score = toTwoDecimalPlaces(item.score || 0);
    }
  }
  return data;
};

const toTwoDecimalPlaces: (val: number) => number = (val) =>
  parseFloat(val.toFixed(2));
