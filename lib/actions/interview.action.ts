"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

import { findCount, prismaClient } from "../prisma.sdk";
import { withAuth } from "./auth.action";
import { Interview } from "@prisma/client";
import { createInterviewPrompt } from "@/constants/openai";

type GetInterviewsParamsProps = {
  page?: number;
  limit?: number;
  search?: string;
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

export const generateInterview: (params: CreateInterviewProps) => Promise<{
  status: number;
  error?: string;
  success?: boolean;
}> = async (params) => {
  try {
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
};

export const createInterviewFromInputs: (
  params: CreateInterviewProps
) => Promise<{
  status: number;
  error?: string;
  success?: boolean;
}> = async (params) =>
  await withAuth(async (user: any) =>
    generateInterview({ ...params, userId: user.publicMetadata.userId })
  );

export const createInterviewFromQuestions: (params: {
  questions: string[];
  type: string;
}) => Promise<{
  status: number;
  error?: string;
  success?: boolean;
}> = async (params) =>
  await withAuth(async (user: any) => {
    try {
      const prismaResponse = await prismaClient.interview.create({
        data: {
          ...params,
          ownerId: user.publicMetadata.userId,
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
  });

export const getInterviews: (params: GetInterviewsParamsProps) => Promise<{
  status: number;
  error?: string;
  data?: GetInterviewsProps;
}> = async ({ page = 1, limit = 50, search }) =>
  await withAuth(async (user: any) => {
    try {
      const skip = (page - 1) * limit;
      const take = limit;
      const where = { ownerId: user.publicMetadata.userId };
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

export const getInterviewById: (id: string) => Promise<{
  status: number;
  error?: string;
  data?: Interview;
}> = async (id: string) =>
  await withAuth(async (user: any) => {
    try {
      const item = await prismaClient.interview.findUnique({
        where: { id, ownerId: user.publicMetadata.userId },
      });
      if (!item) return { status: 404, error: "No Interviews found" };
      return { status: 200, data: item };
    } catch (error) {
      console.error("🔴 Error::", error);
      return { status: 500, error: "Internal Server Error" };
    }
  });
