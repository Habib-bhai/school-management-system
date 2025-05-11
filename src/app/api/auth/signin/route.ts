import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { SignInSchema } from "@/schema/signInFormSchema";
import { client } from "@/sanity/lib/client";
import jwt from "jsonwebtoken"

export  async function POST(request: NextRequest){
    const data = await request.json()

    // validating data using zod 
    const signInSchemaValidated = await SignInSchema.safeParseAsync(data);

    if (!signInSchemaValidated.success) {
        const errorMessage = signInSchemaValidated.error.errors[0]?.message || "Validation failed";
        return NextResponse.json({ error: errorMessage }, { status: 401 })
    }

    const query = `*[_type == "user" && email == $email]`;
    const user = await client.fetch(query, { email: signInSchemaValidated.data.Email });

    if (user.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(signInSchemaValidated.data.Password, user[0].password);

    if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }



    const token = jwt.sign({_id: user._id, role: user.role}, String(process.env.JWT_SECRET), {expiresIn: "2d"})

    const response = NextResponse.json({ data: user }, { status: 200 })
    response.cookies.set("jwtToken", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60
    })
    

    return response
}