import Footer from '@/components/footer/Footer';
import Post from '@/components/Post/Post';
import ProjectBanner from '@/components/ProjectBanner/ProjectBanner';
import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { nextPrevProjQ, projectQ } from './data';
import styles from './page.module.scss';

const {
  Banner,
  PageContent,
  ArticleBackStrip,
  PaginationSection,
  PaginationTitle,
  PaginationNav,
} = styles;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const project = await client.fetch<IProject>(
    projectQ(slug),
    {},
    { next: { revalidate: 10 } }
  );

  const pagination = await client.fetch(
    nextPrevProjQ(),
    {
      lastCreatedAt: project._createdAt,
    },
    { next: { revalidate: 10 } }
  );
  // console.log(project.title, pagination);

  const prev: IProject = pagination.prev ?? pagination.last;
  const next: IProject = pagination.next ?? pagination.first;

  return (
    <>
      {project.banner && (
        <div className={Banner}>
          <ProjectBanner banner={project.banner} />

          <div className={ArticleBackStrip}></div>
        </div>
      )}

      <div className={PageContent}>
        {project.content && (
          <>
            <Post content={project.content} />
          </>
        )}
      </div>

      <section className={PaginationSection}>
        <h2 className={PaginationTitle}>More Projects</h2>

        <nav className={PaginationNav}>
          {[prev, next].map((proj) => {
            return (
              <Link key={proj.title} href={proj.slug.current}>
                <Image
                  src={proj.previewUrl}
                  alt={proj.title}
                  width={400}
                  height={300}
                />
              </Link>
            );
          })}
        </nav>
      </section>

      <Footer />
    </>
  );
};

export default Page;
