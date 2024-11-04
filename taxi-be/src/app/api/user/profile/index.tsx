import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function getProfile(req: NextRequest){
    try {
        const id = req.headers.get('userId') || ''
        const user = await prisma.user.findUnique({
            where: { id }
        });

        return NextResponse.json({ 
            data: {
                name: user?.name,
                email: user?.email
            }
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function updateProfile(req: NextRequest) {
    try {
        const id = req.headers.get('userId') || ''
        const { name, email, password } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
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
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

