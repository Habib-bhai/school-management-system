import { z } from "zod"

const SignUpSchema = z.object({
    FirstName: z.string().min(3, {message: "First name must be at least 3 characters long"}).max(50),
    LastName: z.string().min(3, {message: "Last name must be at least 3 characters long"}).max(50),
    Email: z.string().email(),
    Password: z.string().min(8, {message: "Password must be at least 8 characters long"}).max(50),
    role: z.enum(["Admin", "Teacher", "Student", "Parent"])
})

export default SignUpSchema