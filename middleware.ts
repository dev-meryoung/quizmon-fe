import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Next.js 프로젝트의 미들웨어
export function middleware(request: NextRequest) {
  //return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  //matcher: '/user',
};
