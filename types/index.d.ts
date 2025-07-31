import { User as NextUser } from "@clerk/nextjs/server";
import { User as SDKUser } from "@clerk/clerk-sdk-node";

export type User = {
  id: string;
  userId: string;
  name: string;
  email: string;
  imageUrl: string;
};
