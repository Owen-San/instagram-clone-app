import { withAuth } from "next-auth/middleware";

const publicPaths = ["/login", "/signup", "/forgot-password"];

export default withAuth({
  pages: { signIn: "/login" },
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;
      const isPublic = publicPaths.includes(pathname);
      if (isPublic) return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js)).*)",
  ],
};
