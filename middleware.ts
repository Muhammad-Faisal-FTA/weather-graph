// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const res = NextResponse.next();

//   // Allow frontend origin
//   res.headers.set("Access-Control-Allow-Origin", process.env.FRONTEND_URL!);
//   res.headers.set("Access-Control-Allow-Credentials", "true");
//   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return new Response(null, {
//       headers: res.headers,
//     });
//   }

//   return res;
// }

// export const config = {
//   matcher: ["/api/:path*"], // only apply CORS on API routes
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
console.log("Middleware is working....")
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 👇 IMPORTANT: allow your frontend URL
  res.headers.set("Access-Control-Allow-Origin", process.env.FRONTEND_URL!);
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*"], // apply only on API routes
};
