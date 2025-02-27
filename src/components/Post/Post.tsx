import '@/assets/styles/article.scss';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { FC } from 'react';
import ArticleTagsBlock from './components/ArticleTagsBlock';
import { ColumnBlock, ColumnsBlock } from './components/ColumnsBlock';
import GalleryBlock from './components/GalleryBlock';
import ImageBlock from './components/ImageBlock';
import ModelBlock from './components/ModelBlock';
import VideoBlock from './components/VideoBlock';
import AlignMark from './marks/AlignMark';

interface PostProps {
  content: PortableTextBlock[];
}

const Post: FC<PostProps> = ({ content }) => {
  return (
    <article className={'post-article'}>
      <PortableText
        value={content}
        components={{
          types: {
            modelBlock: ModelBlock,
            imgBlock: ImageBlock,
            videoBlock: VideoBlock,
            galleryBlock: GalleryBlock,
            columns: ColumnsBlock,
            column: ColumnBlock,
            tagsBlock: ArticleTagsBlock,
          },
          block: {
            normal: ({ value, children }) => {
              // if normal node contains "align" mark,
              // we render it in div, to apply alignment deeper
              if (value.markDefs?.find((el) => el._type === 'align')) {
                return <div>{children}</div>;
              }

              // otherwise, render normal block in paragraph
              return <p>{children}</p>;
            },
          },
          marks: {
            align: AlignMark,
          },
        }}
      />
    </article>
  );
};

export default Post;
