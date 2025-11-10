// import {GET, POST} from "@/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request:NextRequest) {
    const authToken = request.cookies.get('authToken'); // Replace 'authToken' with your actual cookie name
    debugger;
    if (!authToken) {
        const loginUrl = new URL('/api/auth/signin', request.url);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname); // Optional: add a redirect param
        console.log('signin page');
        return NextResponse.redirect(loginUrl);

    }
    // Allow the request to proceed if not a protected route or if authenticated
    return NextResponse.next();
}