import { NextResponse } from "next/server";
import { getCurrentEmployee } from "@/lib/auth";

export async function GET() {
  try {
    const employee = await getCurrentEmployee();
    return NextResponse.json({
      authenticated: !!employee,
      employee: employee || null,
    });
  } catch (error) {
    console.error("Authentication check failed 🤔:", error);
    return NextResponse.json(
      { authenticated: false, error: "Authentication failed" },
      { status: 401 }
    );
  }
}
