import {
  createFeedbackPrompt,
  feedbackSchema,
  feedbackSystem,
} from "@/constants/openai";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { withAuth } from "./auth.action";
import { findCount, prismaClient } from "../prisma.sdk";
import { Feedback } from "@prisma/client";
import { error } from "console";

type GetFeedbacksProps = {
  items: Feedback[];
  total?: number;
  totalPage?: number;
  page: number;
  limit: number;
};

type GetFeedbackParamsProps = {
  interviewId?: string;
  page?: number;
  limit: number;
};

export async function createFeedback(params: CreateFeedbackParams) {
  return await withAuth(async (user: any) => {
    const { interviewId, userId, transcript, feedbackId } = params;

    try {
      const { object }: { object: any } = await generateObject({
        model: openai("gpt-4o", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,
        prompt: createFeedbackPrompt({
          transcript: params.transcript
            .map(
              (sentence: { role: string; content: string }) =>
                `- ${sentence.role}: ${sentence.content}\n`
            )
            .join(""),
        }),
        system: feedbackSystem,
      });

      const data = await prismaClient.feedback.create({
        data: {
          interviewId: params.interviewId,
          userId: userId,
          totalScore: object.totalScore,
          categoryScores: object.categoryScores,
          strengths: object.strengths,
          areasForImprovement: object.areasForImprovement,
          createdAt: new Date().toISOString(),
        },
      });

      if (!data) return { status: 400, error: "Failed to create feedback" };
      return { status: 201, data };
    } catch (error) {
      console.error("🔴 Error::", error);
      return { status: 500, error: "Internal Server Error" };
    }
  });
}

export async function getFeedbacks({
  interviewId,
  page = 1,
  limit,
}: GetFeedbackParamsProps) {
  return await withAuth(async (user: any) => {
    try {
      const skip = (page - 1) * limit;
      const take = limit;
      const where: any = { userId: user.id };
      if (interviewId) where.interviewId = interviewId;
      const items = await prismaClient.feedback.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      });
      if (!items) return { status: 404, error: "Feedbacks not found" };
      const data: GetFeedbacksProps = { items, page, limit };
      if (!skip) {
        const totalCount = (await findCount(prismaClient.feedback, where)) || 0;
        data.total = totalCount;
        data.totalPage = Math.ceil(totalCount / limit);
      }
      return { status: 200, data };
    } catch (error) {
      console.error("🔴 Error::", error);
      return { status: 500, error: "Internal Server Error" };
    }
  });
}
