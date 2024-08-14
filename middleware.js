import { NextResponse } from 'next/server'

export function middleware(request) {

  const token = request.cookies.get('token')
    console.log(token)
  if (request.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/message', request.url))
  }
  if (request.nextUrl.pathname === '/message' && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next() 
}

export const config = {
  matcher: ['/','/message'], 
}
