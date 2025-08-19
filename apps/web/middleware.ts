import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const role = token.role as string

    if (pathname.startsWith('/dashboard') || pathname.startsWith('/cases')) {
      if (role !== 'client') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    if (pathname.startsWith('/admin') || pathname.startsWith('/manage')) {
      if (role !== 'analyst' && role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cases/:path*',
    '/admin/:path*',
    '/manage/:path*',
  ],
}
