import { FC } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
};

export default Page;
