import { client } from '@/helpers/sanity-client';
import { IContacts } from '@/models/contacts';

export const getContacts = async () => {
  return client.fetch<IContacts>(
    `*[_type == 'contactPage'][0]`,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ['contacts'],
      },
    }
  );
};
