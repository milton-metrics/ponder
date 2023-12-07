import { strict_output } from "@/lib/gpt"
import { getAuthSession } from "@/lib/nextauth"
import { questionsCreationSchema } from "@/schemas/form/questions"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

// mapped to route - /api/questions
export const POST = async (req: Request, res: Response) => {

  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in to create a question set."
        }, 
        {
          status: 401
        }
      )
    }

    const body = await req.json()
    // Zod used to guarantee if schema creation succeeds type will be amount, topic, type. 
    const { amount, topic, type } = questionsCreationSchema.parse(body)

    let questions: any
    if (type === 'open_ended') {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of questions and answers, the length of the answer should not exceed 15 words, store all the pairs of questions and answers in a JSON array",
        new Array(amount).fill(`You are to generate a random hard open-ended question about ${topic}`),
        {
          question: "question",
          answer: "answer with a max length of 15 words"
        }
        )
    } else if (type === 'multiple_choice') {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(`You are to generate a random hard multiple choice question about ${topic}`),
        {
          question: "question",
          answer: "answer with a max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
        )
    }
    
    return NextResponse.json(
      {
        questions,
      },
      {
        status: 200
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
          error: error.issues
        }, 
        {
          status: 400
        }
      )
    }
  }
}