// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Get auth state (must be awaited)
  const { userId } = await auth();

  // Redirect to sign-up if trying to access protected routes
  if (!isPublicRoute(req) && !userId) {
    return Response.redirect(new URL("/sign-up", req.url));
  }

  // Allow access to public routes
  return undefined;
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
