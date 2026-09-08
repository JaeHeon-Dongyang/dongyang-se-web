import { headers } from "next/headers";
import { isIntranetRequest } from "@/lib/intranet";

export const dynamic = "force-dynamic";

export async function GET() {
  const intranet = isIntranetRequest(await headers());

  return Response.json(
    { intranet },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}
