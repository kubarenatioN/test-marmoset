import { sanityFetch } from '@/helpers/sanity-client';
import { IHomepageSlide } from '@/models';

const query = `*[_type == 'homepageSlide'] {
  ...,
  project->{
    slug 
  }
} | order(order asc, _createdAt asc)`;

export const getSlides = async () => {
  return sanityFetch<IHomepageSlide[]>(
    query,
    {},
    {
      next: { tags: ['homepage-slides'] },
    }
  );
};
