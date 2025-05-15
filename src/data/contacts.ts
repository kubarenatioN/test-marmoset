import { sanityFetch } from '@/helpers/sanity-client';
import { IContacts } from '@/models/contacts';

export const getContacts = async () => {
  return sanityFetch<IContacts>(
    `*[_type == 'contactPage'][0]`,
    {},
    {
      next: {
        tags: ['contacts'],
      },
    }
  );
};
