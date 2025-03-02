import Footer from '@/components/footer/Footer';
import Post from '@/components/Post/Post';
import ProjectBanner from '@/components/ProjectBanner/ProjectBanner';
import { urlFor } from '@/helpers/url-builder';
import { IProject } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getProject, getProjectPagination } from './data';
import styles from './page.module.scss';

const {
  Banner,
  PageContent,
  ArticleBackStrip,
  PaginationSection,
  PaginationTitle,
  PaginationNav,
  SoftwareUsedBlock,
  SoftwareUsedTitle,
  SoftwareUsedList,
  SoftwareUsedItem,
} = styles;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const project = await getProject(slug);

  const pagination = await getProjectPagination({
    lastCreatedAt: project._createdAt,
  });

  // console.log(project.softwareUsed[0].icon);

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

      <section className={PageContent}>
        {project.content && (
          <>
            <Post content={project.content} />
          </>
        )}
        <div className={SoftwareUsedBlock}>
          <h2 className={SoftwareUsedTitle}>Software Used</h2>

          {project.softwareUsed && (
            <ul className={SoftwareUsedList}>
              {project.softwareUsed.map((soft) => {
                const url = urlFor(soft.icon.asset).fit('clip').url();

                return (
                  <li key={soft.slug.current} className={SoftwareUsedItem}>
                    {soft.icon && (
                      <Image
                        src={url}
                        alt={soft.name}
                        width={20}
                        height={20}
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    )}
                    <span>{soft.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

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
