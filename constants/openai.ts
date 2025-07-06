import z from "zod";

export const createInterviewPrompt = (params: {
  role: string;
  level: string;
  techStack: string;
  type: string;
  numberOfQuestions: string;
}) => `Prepare questions for a job interview.
        The job role is ${params.role}.
        The job experience level is ${params.level}.
        The tech stack used in the job is: ${params.techStack}.
        The focus between behavioural and technical questions should lean towards: ${params.type}.
        The amount of questions required is: ${params.numberOfQuestions}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        `;
export const createFeedbackPrompt = (params: {
  transcript: string;
}) => `You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${params.transcript}
        Please score the candidate from 0 to 5 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
       `;

export const feedbackSystem = `You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories`;

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z
    .array(
      z.object({
        name: z.enum([
          "Communication Skills",
          "Technical Knowledge",
          "Problem Solving",
          "Cultural Fit",
          "Confidence and Clarity",
        ]),
        score: z.number(),
        comment: z.string(),
      })
    )
    .length(5),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
});
