import { NextRequest } from "next/server";
import { getLocation, pathLocation } from "./index";

export async function POST(req: NextRequest) {
    return pathLocation(req)
}

export async function GET(req: NextRequest) {
    return getLocation(req)
}