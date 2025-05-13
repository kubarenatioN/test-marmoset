import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const body = await request.json();
  const { _type, slug } = body;

  console.log('webhook body', body);

  revalidatePath('/(pages)/work/(index)', 'layout');

  // revalidatePath('/(pages)/work');
  // revalidatePath(`/(pages)/work/[slug]`, 'page');

  return Response.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: Request) {
  console.log('test revalidating GET');
  revalidatePath('/(pages)/work/(index)', 'layout');

  return new Response('ok');
}
