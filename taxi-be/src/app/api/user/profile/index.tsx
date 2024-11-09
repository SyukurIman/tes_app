/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { checkStatus } from "../logout";

const prisma = new PrismaClient();

export async function getProfile(req: NextRequest) {
  const status = await checkStatus(req)
  if (status) {
    try {
      const id = req.headers.get("userId") || "";
      const user = await prisma.user.findUnique({
        where: { id },
      });
  
      return NextResponse.json(
        {
          data: {
            name: user?.name,
            email: user?.email,
          },
        },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({status: status, message: "Anda Tidak Memiliki Akses"}, {status: 200})  
}

export async function updateProfile(req: NextRequest) {
  const status = await checkStatus(req)
  if (status) {
    try {
      const id = req.headers.get("userId") || "";
      const { name, email, password } = await req.json();
  
      if (!id) {
        return NextResponse.json(
          { error: "User ID is missing" },
          { status: 400 }
        );
      }
  
      const updateData: any = {
        name,
        email,
      };
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
  
      const user = await prisma.user.update({
        where: { id },
        data: updateData,
      });
  
      return NextResponse.json(
        {
          data: {
            name: user?.name,
            email: user?.email,
          },
        },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({status: status, message: "Anda Tidak Memiliki Akses"}, {status: 200})
    
  
}
