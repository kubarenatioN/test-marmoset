import Footer from '@/components/footer/Footer';
import ModelViewerScene from '@/components/ModelViewerScene/ModelViewerScene';
import ProjectBanner from '@/components/ProjectBanner/ProjectBanner';
import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import Image from 'next/image';
import { FC } from 'react';
import styles from './page.module.scss';

const { Banner, PageContent, ModelContainer } = styles;

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

  return (
    <>
      {project.banner && (
        <div className={Banner}>
          <ProjectBanner banner={project.banner} />
        </div>
      )}
      <div className={PageContent}>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
          }}
        >
          {project.modelUrl && (
            <div className={ModelContainer}>
              <ModelViewerScene modelUrl={project.modelUrl} />
            </div>
          )}

          <div style={{ color: '#fff' }}>
            <h1>{project.title}</h1>
            <p>Описание проекта с тегами, программами и тд.</p>
          </div>
        </div>
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
