import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const body = await request.json();
  const { _type, slug } = body;

  console.log('*** [DEBUG] revalidate path ***', body);

  revalidatePath('/', 'layout');

  return Response.json({
    revalidated: true,
    now: new Date(Date.now()).toLocaleString(),
  });
}

export async function GET(request: Request) {
  console.log('test revalidating GET');
  revalidatePath('/', 'layout');

  return Response.json({
    revalidated: true,
    now: new Date(Date.now()).toLocaleString(),
  });
}
