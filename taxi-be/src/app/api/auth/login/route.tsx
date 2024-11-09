import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || ""; // Replace with an environment variable in production

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, version: user.tokenVersion }, JWT_SECRET, {
      expiresIn: "1h",
      subject: "app",
      algorithm: "HS256",
      allowInsecureKeySizes: true,
    });

    // Return the token to the client
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
