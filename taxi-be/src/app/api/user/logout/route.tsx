import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { checkStatus } from "./index";

const prisma = new PrismaClient();

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export async function GET(req: NextRequest) {
    const status = await checkStatus(req)
    if (status) {
        const id = req.headers.get("userId") || "";
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (user) {
            try {
                const userData = await prisma.user.update({
                    where: { id },
                    data: {
                    tokenVersion: user.tokenVersion + 1
                    }
                });
                return NextResponse.json({status: true, message: "Sukses LogOut"}, {status: 200})
            } catch (error: any){
                return NextResponse.json({message: error.message}, {status: 500})
            }
        }
    }

    return NextResponse.json({status: status, message: "Anda Tidak Memiliki Akses"}, {status: 200})
}