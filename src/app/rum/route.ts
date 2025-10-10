export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "production") {
    try { console.log("RUM batch:", await req.text()); } catch {}
  }
  return new Response(null, { status: 204 });
}
