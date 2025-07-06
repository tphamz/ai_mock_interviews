"use server";

import { prismaClient } from "@/lib/prisma.sdk";
import { currentUser } from "@clerk/nextjs/server";

export async function withAuth<T>(callback: (user: any) => Promise<T>) {
  const user = await currentUser();
  if (!user) {
    return { status: 403 };
  }
  const res = await getUserDetail(user);
  if (!res) return { status: 403 };
  return callback(res);
}

const getUserDetail = async (clerkUser: any) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (user) return user;
    const newUser = await prismaClient.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName + " " + clerkUser.lastName,
        profileImage: clerkUser.imageUrl,
      },
    });
    return newUser;
  } catch (err) {
    return null;
  }
};

const handleIsAuthenticate = async (user: any) => {
  return { status: 200, data: user };
};

export const isAuthenticated = async () => {
  return await withAuth((user: any) => handleIsAuthenticate(user));
};
