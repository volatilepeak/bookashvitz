import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD

  // If no password is set in env, block admin entirely (fail closed)
  if (!password) {
    return new NextResponse('Admin access not configured', { status: 503 })
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="BookAShvitz Admin"' },
    })
  }

  try {
    const encoded = authHeader.split(' ')[1]
    const decoded = atob(encoded)
    const [, providedPassword] = decoded.split(':')

    if (providedPassword !== password) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="BookAShvitz Admin"' },
      })
    }
  } catch {
    return new NextResponse('Invalid authentication', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="BookAShvitz Admin"' },
    })
  }

  return NextResponse.next()
}

// Runs on /admin and /api/admin routes
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
