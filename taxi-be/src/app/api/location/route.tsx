import { NextRequest } from "next/server";
import { pathLocation } from "./index";

export async function POST(req: NextRequest) {
  return pathLocation(req);
}
