import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const body = await request.json();

  console.log('webhook request', request);
  console.log('webhook body', body);

  const { _type, slug } = body;

  console.log('_type', _type);

  if (_type === 'project') {
    revalidatePath('/work', 'page');
    revalidatePath(`/work/[slug]`, 'page');
  }

  return Response.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: Request) {
  console.log('webhook GET', request);

  return new Response('ok');
}
