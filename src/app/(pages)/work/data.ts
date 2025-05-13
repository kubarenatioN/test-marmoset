import { client } from '@/helpers/sanity-client';
import { IPageBanner, IProject } from '@/models';
import { FilteredResponseQueryOptions } from '@sanity/client';

const allQuery = `*[_type == 'project'] | order(_createdAt desc)`;

const query = (category: string) => {
  return `*[_type == 'project' && references(*[_type == 'primaryTag' && value.current == '${category}']._id)] | order(_createdAt desc) {
    slug,
    title,
    previewUrl,
    }`;
};

const options: FilteredResponseQueryOptions = {
  next: {
    tags: ['projects', 'all'],
  },
};

export const getProjects = async (
  category?: string | null
): Promise<IProject[]> => {
  if (!category || category === 'all') {
    return client.fetch<IProject[]>(allQuery, {}, options);
  }

  return client.fetch<IProject[]>(query(category), {}, options);
};

export const getBanner = async () => {
  return client.fetch<IPageBanner>(`*[_type == 'workBanner'][0]`, {});
};
