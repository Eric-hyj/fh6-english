import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/membership/portal', '/payment']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))

  if (!isProtected) return NextResponse.next()

  // 检查客户端是否有 JWT (通过 cookie 或 header)
  // 由于 JWT 存在 localStorage，middleware 无法直接读取
  // 这里做轻量保护：通过 Next.js rewrite 到登录页前的检查
  // 真正的权限验证在页面渲染时由 AuthContext 处理
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|opengraph-image).*)'],
}
