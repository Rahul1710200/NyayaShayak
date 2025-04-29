// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) {
      auth().protect();
    }
  },
  {
    publicRoutes: [
      "/",
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/about",
      "/api(.*)",
      "/favicon.ico",
    ],
    ignoredRoutes: ["/_next(.*)", "/favicon.ico"],
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
