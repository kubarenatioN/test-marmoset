import { createClient, FilteredResponseQueryOptions } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const client = createClient({
  projectId: '431j9lom',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'development' ? false : true, // production
  // useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2022-03-07', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
});

export const sanityFetch = <T = any>(
  query: string,
  params = {},
  options: FilteredResponseQueryOptions = {}
) => {
  return client.fetch<T>(query, params, {
    ...options,
    cacheMode: process.env.NODE_ENV === 'development' ? undefined : 'noStale',
    next: {
      tags: ['all', ...(options.next?.tags ?? [])],
    },
  });
};

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
