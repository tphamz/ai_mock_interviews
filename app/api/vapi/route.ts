import { createInterview } from "@/lib/actions/interview.action";

export async function POST(request: Request) {
  try {
    const { type, role, level, techStack, numberOfQuestions, userId } =
      await request.json();
    const response = await createInterview({
      type,
      role,
      level,
      techStack,
      numberOfQuestions,
      userId,
    });
    return Response.json(
      { success: response.error ? false : true },
      { status: response.status }
    );
  } catch (error) {
    console.error("🔴 Error::", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
