import { NextRequest } from "next/server";
import { getProfile, updateProfile } from "./index";

export async function GET(req: NextRequest) {
  return getProfile(req);
}

export async function POST(req: NextRequest) {
  return updateProfile(req);
}
