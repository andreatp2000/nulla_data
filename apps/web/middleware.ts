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

    if (pathname.startsWith('/admin')) {
      if (role !== 'analyst' && role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    if (pathname.startsWith('/app')) {
      // clients, analysts and admins allowed
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
  matcher: ['/admin/:path*', '/app/:path*'],
}
