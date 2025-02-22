import Footer from '@/components/footer/Footer';
import ModelViewerScene from '@/components/ModelViewerScene/ModelViewerScene';
import ProjectBanner from '@/components/ProjectBanner/ProjectBanner';
import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import { PortableText, PortableTextComponentProps } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import Image from 'next/image';
import { FC } from 'react';
import styles from './page.module.scss';

const { Banner, PageContent, ModelContainer, Article } = styles;

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

  // console.log(project.content);

  return (
    <>
      {project.banner && (
        <div className={Banner}>
          <ProjectBanner banner={project.banner} />
        </div>
      )}
      <div className={PageContent}>
        <article className={Article}>
          {project.content && (
            <PortableText
              value={project.content}
              components={{
                types: {
                  // TODO: move all this in separate components
                  modelBlock: ({ value }) => {
                    return (
                      <div
                        style={{
                          marginBlock: '2rem',
                          position: 'relative',
                          width: '100%',
                          height: 'auto',
                          aspectRatio: 16 / 9,
                        }}
                      >
                        <ModelViewerScene modelUrl={value.url} />
                      </div>
                    );
                  },
                  imgBlock: ({ value }) => {
                    return (
                      <div
                        style={{
                          marginBlock: '2rem',
                        }}
                      >
                        <Image
                          src={value.url}
                          width={1600}
                          height={900}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: 'auto',
                          }}
                          alt=''
                        />
                      </div>
                    );
                  },
                  columns: (
                    props: PortableTextComponentProps<{
                      columns: TypedObject[];
                    }>
                  ) => {
                    const { value, renderNode } = props;

                    const nodes = value.columns.map((col, i) =>
                      renderNode({
                        index: i,
                        isInline: false,
                        renderNode,
                        node: col,
                      })
                    );

                    return (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
                          columnGap: '1rem',
                        }}
                      >
                        {nodes}
                      </div>
                    );
                  },
                  column: (
                    props: PortableTextComponentProps<{
                      content: TypedObject[];
                    }>
                  ) => {
                    const { value, renderNode } = props;

                    const nodes = value.content.map((col, i) =>
                      renderNode({
                        index: i,
                        isInline: false,
                        renderNode,
                        node: col,
                      })
                    );

                    return <div>{nodes}</div>;
                  },
                },
              }}
            />
          )}
        </article>

        {/* <div
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
            <p></p>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Page;
