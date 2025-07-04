"use client";
import { useRouter } from "next/router";

export default function InterviewDetail() {
  const router = useRouter();
  return router.push("/interviews");
}
