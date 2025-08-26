import { logHeaders } from "@/utils/logger";
import { NextResponse } from "next/server";

export default function middleware(request: Response) {
    // logHeaders(request);
    return NextResponse;
}