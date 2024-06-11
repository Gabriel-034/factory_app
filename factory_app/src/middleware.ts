import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res })

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    console.log(session);

    const publicRoutes = ["/login", "/signup"]; // Add more public routes here

    // Check if the current route is a public route
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  
    // If there's no session and the current route is not a public route, redirect to signup
    if (!session && !isPublicRoute) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    return res
};

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|flavicon.ico).*)'
    ]
}