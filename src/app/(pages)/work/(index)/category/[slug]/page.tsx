import { Metadata } from 'next';
import { FC } from 'react';
import Gallery from '../../../components/Gallery';
import { filters } from '../../../filters';

export const metadata: Metadata = {
  title: 'Work | Polyrhythm',
  description: `Discover my 3D modeling and texturing portfolio, showcasing realistic, high-quality visuals crafted with precision and creativity`,
};

export async function generateStaticParams() {
  const categories = filters.filter((el) => !!el.type).map((el) => el.type);

  const result = categories.map((c) => {
    return { slug: c };
  });

  return result;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  return (
    <>
      <Gallery type={slug} />
    </>
  );
};

export default Page;
