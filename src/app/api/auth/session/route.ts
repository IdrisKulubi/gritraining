import { NextResponse } from "next/server";
import { getCurrentEmployee } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get("session");
    console.log("Session cookie:", sessionCookie?.value);

    const employee = await getCurrentEmployee();
    console.log("Employee found:", !!employee);

    return NextResponse.json({
      authenticated: !!employee,
      employee: employee || null,
    });
  } catch (error) {
    console.error("Authentication check failed:", error);
    return NextResponse.json(
      { authenticated: false, error: "Authentication failed" },
      { status: 401 }
    );
  }
}
