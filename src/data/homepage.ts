import { client } from '@/helpers/sanity-client';
import { IHomepageSlide } from '@/models';

const query = `*[_type == 'homepageSlide'] | order(order asc, _createdAt asc)`;

export const getSlides = async () => {
  return client.fetch<IHomepageSlide[]>(
    query,
    {},
    {
      next: {
        revalidate: 20,
      },
    }
  );
};
