import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const body = await request.json();
  const { _type, slug } = body;

  console.log('*** [DEBUG] revalidate path ***', body);

  revalidateTag('all');

  revalidatePath('/(pages)/work/(index)', 'layout');
  revalidatePath('/(pages)', 'layout');
  revalidatePath('/');

  return Response.json({
    revalidated: true,
    now: new Date(Date.now()).toLocaleString(),
  });
}

export async function GET(request: Request) {
  console.log('test revalidating GET');

  revalidateTag('all');

  revalidatePath('/(pages)/work/(index)', 'layout');
  revalidatePath('/(pages)', 'layout');
  revalidatePath('/');

  return Response.json({
    revalidated: true,
    now: new Date(Date.now()).toLocaleString(),
  });
}
