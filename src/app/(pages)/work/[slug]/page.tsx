import Footer from '@/components/footer/Footer';
import Post from '@/components/Post/Post';
import ProjectBanner from '@/components/ProjectBanner/ProjectBanner';
import TagsList from '@/components/TagsList/TagsList';
import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import Link from 'next/link';
import { FC } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import styles from './page.module.scss';

const { Banner, BannerBackLink, PageContent } = styles;

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
          <Link href={'/work'} className={BannerBackLink}>
            <IoIosArrowRoundBack size={20} />
            Back to Projects
          </Link>
          <ProjectBanner banner={project.banner} />
        </div>
      )}
      <div className={PageContent}>
        {project.tags && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TagsList tags={project.tags} />
          </div>
        )}

        {project.content && <Post content={project.content} />}
      </div>
      <Footer />
    </>
  );
};

export default Page;
