import { NextRequest, NextResponse } from "next/server";
import {  getProfile } from "./index";

export async function POST(req: NextRequest) {
  return getProfile(req)
}