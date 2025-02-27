import TagsList from '@/components/TagsList/TagsList';
import { ISlug, ITag } from '@/models';
import { PortableTextTypeComponentProps } from '@portabletext/react';
import { Property } from 'csstype';
import { FC } from 'react';

interface ArticleTagsBlockProps {
  primaryTags?: ITag<ISlug>[];
  otherTags?: ITag[] | null;
  dir?: 'left' | 'center' | 'right';
}

const ArticleTagsBlock: FC<
  PortableTextTypeComponentProps<ArticleTagsBlockProps>
> = ({ value, isInline }) => {
  const { primaryTags = [], otherTags = [] } = value;

  const tags = primaryTags
    .map((el) => ({ ...el, value: el.value.current }))
    .concat(otherTags ?? []);

  const justifyContent: Property.JustifyContent =
    value.dir === 'left'
      ? 'flex-start'
      : value.dir === 'center'
      ? 'center'
      : value.dir === 'right'
      ? 'flex-end'
      : 'flex-end';

  return (
    tags.length > 0 && (
      <div
        style={{
          marginBlock: '1rem',
          display: 'flex',
          justifyContent,
        }}
      >
        <TagsList tags={tags} dir={value.dir} />
      </div>
    )
  );
};

export default ArticleTagsBlock;
