import '@/assets/styles/article.scss';
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import ArticleTagsBlock from './components/ArticleTagsBlock';
import { ColumnBlock, ColumnsBlock } from './components/ColumnsBlock';
import GalleryBlock from './components/GalleryBlock';
import ImageBlock from './components/ImageBlock';
import ModelBlockFacade from './components/ModelBlockFacade';
import VideoBlock from './components/VideoBlock';
import { getBlockAlign } from './marks/AlignMark';

interface PostProps {
  content: PortableTextBlock[];
}

const Post: FC<PostProps> = ({ content }) => {
  return (
    <article className={'post-article'}>
      <div style={{ position: 'fixed', top: 0, right: 0, opacity: 0 }}>
        <h2 id='test-time'>{new Date().toLocaleString()}</h2>
      </div>
      <PortableText
        value={content}
        components={{
          types: {
            modelBlock: ModelBlockFacade,
            imgBlock: ImageBlock,
            videoBlock: VideoBlock,
            galleryBlock: GalleryBlock,
            columns: ColumnsBlock,
            column: ColumnBlock,
            tagsBlock: ArticleTagsBlock,
          },
          block: (props: PortableTextComponentProps<PortableTextBlock>) => {
            const { value, children } = props;

            const align = getBlockAlign(value);
            const alignClass = align ? `align--${align}` : '';

            switch (value.style) {
              case 'h1':
              case 'h2':
              case 'h3':
              case 'h4':
              case 'h5':
              case 'h6':
                return (
                  <value.style className={clsx(alignClass)}>
                    {children}
                  </value.style>
                );
              case 'h1':
                return <h1 className={clsx(alignClass)}>{children}</h1>;
              case 'h2':
                return <h2 className={clsx(alignClass)}>{children}</h2>;
              case 'h3':
                return <h3 className={clsx(alignClass)}>{children}</h3>;
              case 'h4':
                return <h4 className={clsx(alignClass)}>{children}</h4>;
              case 'h5':
                return <h5 className={clsx(alignClass)}>{children}</h5>;
              case 'h6':
                return <h6 className={clsx(alignClass)}>{children}</h6>;
              case 'blockquote':
                return (
                  <blockquote className={clsx(alignClass)}>
                    {children}
                  </blockquote>
                );
            }

            // // otherwise, render normal block in paragraph
            return <p className={clsx(alignClass)}>{children}</p>;
          },
          // block: {
          //   h1: ({ value, children }) => {
          //     const align = getBlockAlign(value);
          //     return <h1 style={{ textAlign: align }}>{children}</h1>;
          //   },
          //   h2: ({ value, children }) => {
          //     const align = getBlockAlign(value);
          //     return <h2 style={{ textAlign: align }}>{children}</h2>;
          //   },
          //   h3: ({ value, children }) => {
          //     const align = getBlockAlign(value);
          //     return <h2 style={{ textAlign: align }}>{children}</h2>;
          //   },
          //   h4: ({ value, children }) => {
          //     const align = getBlockAlign(value);
          //     return <h2 style={{ textAlign: align }}>{children}</h2>;
          //   },
          //   normal: ({ value, children }) => {
          //     const align = getBlockAlign(value);

          //     // otherwise, render normal block in paragraph
          //     return <p style={{ textAlign: align }}>{children}</p>;
          //   },
          // },
          marks: {
            hyperlink: (
              props: PortableTextMarkComponentProps<{
                url: string;
                text?: string;
                _type: string;
              }>
            ) => {
              const { value, children } = props;
              if (!value) {
                return null;
              }
              const { url, text } = value;
              const external = url.includes('://');

              return (
                <Link
                  className='article-link'
                  href={url}
                  target={external ? '_blank' : undefined}
                >
                  {children}
                </Link>
              );
            },
            ['align--center']: ({ value, children }) => {
              return children;
            },
            ['align--left']: ({ value, children }) => {
              return children;
            },
            ['align--right']: ({ value, children }) => {
              return children;
            },
            // TODO: Remove
            ['align']: ({ value, children }) => {
              return children;
            },
          },
        }}
      />
    </article>
  );
};

export default Post;
