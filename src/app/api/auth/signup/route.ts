import { NextRequest, NextResponse } from "next/server";
import SignUpSchema from "../../../../schema/signUpFormSchema"
import { createClient } from "next-sanity";
import bcrypt from "bcrypt"

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2025-01-18'
})

export async function POST(request: NextRequest) {
    const data = await request.json()


    // validating data using zod 
    const signUpSchemaValidated = await SignUpSchema.safeParseAsync(data);

    if (!signUpSchemaValidated.success) {
        const errorMessage = signUpSchemaValidated.error.errors[0]?.message || "Validation failed";
        return NextResponse.json({ error: errorMessage }, { status: 401 })
    }

    const query = `*[_type == "user" && email == $email]`;
    const user = await client.fetch(query, { email: signUpSchemaValidated.data.Email });
    
    if (user.length > 0) {
        return NextResponse.json({ error: "User already exists" }, { status: 401 })
    }

    // encrypting password
    const hashedPassword = await bcrypt.hash(signUpSchemaValidated.data.Password, 10)

    const sanityUserCreationResponse = await client.create({
        _type: "user",
        firstName: signUpSchemaValidated.data.FirstName,
        lastName: signUpSchemaValidated.data.LastName,
        email: signUpSchemaValidated.data.Email,
        password: hashedPassword,
        role: signUpSchemaValidated.data.role
    })

    return NextResponse.json({ data: sanityUserCreationResponse}, { status: 200 })

}