import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { getToken } from "next-auth/jwt";

const onlyAdmin = ["/dashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL("/auth/login", req.url);
        return NextResponse.redirect(url);
      }
      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        const url = new URL("/404", req.url);
        return NextResponse.redirect(url);
      }
    }
    return middleware(req, next);
  };
}
