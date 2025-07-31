"use server";

import { prismaClient } from "@/lib/prisma.sdk";
import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function withAuth<T>(callback: (user: any) => Promise<T>) {
  let user: any = await currentUser();
  if (!user) {
    return { status: 403 };
  }
  if (user.publicMetadata.userId) return callback(user);
  const res = await createUser(user);
  if (!res) return { status: 403 };
  user = await clerkClient.users.updateUser(user.id, {
    publicMetadata: {
      userId: res.id,
    },
  });
  return callback(user);
}

const createUser = async (clerkUser: any) => {
  try {
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
