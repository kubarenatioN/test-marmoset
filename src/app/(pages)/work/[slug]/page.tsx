import Footer from '@/components/footer/Footer';
import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import Image from 'next/image';
import { FC } from 'react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const projectQ = (slug: string) =>
  `*[_type == 'project' && slug.current == '${slug}'][0] {
  ...,
  banner->
}`;

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const project = await client.fetch<IProject>(
    projectQ(slug),
    {},
    { next: { revalidate: 10 } }
  );

  // console.log(project);

  return (
    <>
      <div>banner</div>
      <div>
        <h1 style={{ color: '#fff' }}>{project.title}</h1>
        <Image
          src={project.previewUrl}
          alt={project.title}
          width={600}
          height={400}
        />
      </div>
      <Footer />
    </>
  );
};

export default Page;
