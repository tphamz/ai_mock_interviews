import { createInterview } from "@/lib/actions/interview.action";

const ALLOWED_ORIGIN = "*";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

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
      {
        status: response.status,
        headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN },
      }
    );
  } catch (error) {
    console.error("🔴 Error::", error);
    return Response.json(
      { success: false, error: error },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN },
      }
    );
  }
}

export async function GET() {
  return Response.json(
    { success: true, data: "Thank you!" },
    { status: 200, headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN } }
  );
}
