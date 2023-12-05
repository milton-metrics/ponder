import { z } from 'zod'

export const questionsCreationSchema = z.object({
  topic: z.string().min(4, {message:"Topic must be at least 4 characters long"}).max(50), 
  type: z.enum(["multiple_choice", "open_ended"]),
  amount: z.number().min(1).max(10),
})