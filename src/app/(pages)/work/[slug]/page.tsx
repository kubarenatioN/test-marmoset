import Footer from '@/components/footer/Footer';
import { client } from '@/helpers/sanity-client';
import Image from 'next/image';
import { FC } from 'react';
import { IProject } from '../page';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const query = (slug: string) =>
  `*[_type == 'project' && slug.current == '${slug}'][0]`;

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const data = await client.fetch<IProject>(
    query(slug),
    {},
    { next: { revalidate: 10 } }
  );

  return (
    <>
      <div>
        <h1 style={{ color: '#fff' }}>{data.title}</h1>
        <Image
          src={data.previewUrl}
          alt={data.title}
          width={600}
          height={400}
        />
      </div>
      <Footer />
    </>
  );
};

export default Page;
