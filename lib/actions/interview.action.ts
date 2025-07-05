"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

import { findCount, prismaClient } from "../prisma.sdk";
import { withAuth } from "./auth.action";
import { Interview } from "@prisma/client";
import { createInterviewPrompt } from "@/constants/openai";
import { vapi, vapiAPI } from "../vapi.sdk";

type GetInterviewsParamsProps = {
  page?: number;
  limit: number;
};

type GetInterviewsProps = {
  items: Interview[];
  total?: number;
  totalPage?: number;
  page: Number;
};

type CreateInterviewProps = {
  type: string;
  role: string;
  level: string;
  techStack: string;
  numberOfQuestions: string;
  userId: string;
};

export async function getCreateInterviewSummary(id: string) {
  try {
    const res = await vapiAPI.calls.get(id);
    if (!res) return { status: 400, error: "Call is not found" };
    console.log(res);
    return res.analysis?.summary;
  } catch (error) {
    console.error("🔴 Error::", error);
    return { status: 500, error: "Internal Server Error" };
  }
}

export async function createInterview(params: CreateInterviewProps) {
  try {
    console.log("params::", params);
    const res = await generateText({
      model: openai("gpt-4o"),
      prompt: createInterviewPrompt(params),
    });

    const prismaResponse = await prismaClient.interview.create({
      data: {
        role: params.role,
        type: params.type,
        level: params.level,
        techStack: params.techStack.split(","),
        questions: JSON.parse(res.text),
        ownerId: params.userId,
        cover: `cover${Math.floor(10 * Math.random()) + 1}.jpg`,
        createdAt: new Date().toISOString(),
      },
    });
    if (!prismaResponse) throw new Error("failed to create interview");
    return { status: 201, success: true };
  } catch (error) {
    console.error("🔴 Error::", error);
    return { status: 500, error: "Internal Server Error" };
  }
}

export const getInterviews = async ({
  page = 1,
  limit,
}: GetInterviewsParamsProps) =>
  await withAuth(async (user: any) => {
    try {
      const skip = (page - 1) * limit;
      const take = limit;
      const where = { ownerId: user.id };
      const items = await prismaClient.interview.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      });

      if (!items) return { status: 404, error: "No Interviews found" };
      const data: GetInterviewsProps = {
        items,
        page,
      };

      if (!skip) {
        const totalCount =
          (await findCount(prismaClient.interview, where)) || 0;
        data.total = totalCount;
        data.totalPage = Math.ceil(totalCount / limit);
      }
      return { status: 200, data };
    } catch (error) {
      console.error("🔴 Error::", error);
      return { status: 500, error: "Internal Server Error" };
    }
  });
