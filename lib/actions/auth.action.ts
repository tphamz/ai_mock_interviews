"use server";

import { prismaClient } from "@/lib/prisma.sdk";
import { currentUser } from "@clerk/nextjs/server";

export async function withAuth<T>(callback: (user: any) => Promise<T>) {
  const user = await currentUser();
  if (!user) {
    return { status: 403 };
  }
  return callback(user);
}

const handleIsAuthenticate = async (user: any) => {
  try {
    const userExist = await prismaClient.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    const newUser = await prismaClient.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });

    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const isAuthenticated = async () => {
  return await withAuth((user: any) => handleIsAuthenticate(user));
};
