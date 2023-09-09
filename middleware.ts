import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
  // const { pathname } = request.nextUrl;
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
}