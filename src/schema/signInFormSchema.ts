import { z } from "zod";

export const SignInSchema = z.object({
    Email: z.string().email(),
    Password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50)
})