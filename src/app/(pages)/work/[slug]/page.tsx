import Footer from '@/components/footer/Footer';
import Post from '@/components/Post/Post';
import ProjectBanner from '@/components/ProjectBanner/ProjectBanner';
import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import { FC } from 'react';
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
  banner->,
  primaryTags[]->,
  content[]{
    ...,
    _type == 'tagsBlock' => {
      "primaryTags": project->primaryTags[]->,
      "otherTags": project->otherTags[]
    }
  }
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
      {/* <div>
        <span>
          <Link href={'/work'} className={BannerBackLink}>
            <IoIosArrowRoundBack size={20} />
            Back to Projects
          </Link>
        </span>
      </div> */}
      <div className={PageContent}>
        {project.content && <Post content={project.content} />}
      </div>
      <Footer />
    </>
  );
};

export default Page;
