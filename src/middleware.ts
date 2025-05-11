import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("jwtToken")?.value

    const path = req.nextUrl.pathname

    if (token) {

        if (path == "/auth/signin" || path == "/auth/signup") return NextResponse.redirect(new URL("/", req.url))
    }

    if (!token) {

        if (path == "/") return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
}




export const config = {
    matcher : ["/auth/signin","/auth/signup","/"]
}