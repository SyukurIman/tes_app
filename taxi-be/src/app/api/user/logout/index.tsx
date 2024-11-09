/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkStatus(req: NextRequest) {
    const version = req.headers.get("version") || 1;
    const id = req.headers.get("userId") || "";
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (user && user.tokenVersion == version) {
            return true
        }
    } catch(err: any) {
        return err.message
    }
    return false
}