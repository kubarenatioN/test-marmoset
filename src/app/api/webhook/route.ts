import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const body = await request.json();
  const { _type, slug } = body;

  console.log('revalidate path', '/', body);

  revalidatePath('/(pages)/work/(index)', 'layout');
  revalidatePath('/(pages)/work/(index)', 'page');
  revalidatePath('/', 'layout');
  revalidatePath('/');

  return Response.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: Request) {
  console.log('test revalidating GET');
  revalidatePath('/', 'layout');

  return new Response('ok');
}
