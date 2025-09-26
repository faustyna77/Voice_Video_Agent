import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.HEYGEN_API_KEY || "",
      },
    });

    if (!res.ok) {
      throw new Error("Błąd pobierania tokena z HeyGen");
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (err) {
    console.error("Błąd w /api/heygen-token:", err);
    return NextResponse.json({ data: null });
  }
}
