import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  console.log('webhook', request);

  revalidatePath('/work', 'page');
  revalidatePath(`/work/[slug]`, 'page');

  return Response.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: Request) {
  console.log('webhook GET', request);

  return new Response('ok');
}
