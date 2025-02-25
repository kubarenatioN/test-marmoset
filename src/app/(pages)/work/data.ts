import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';
import { FilteredResponseQueryOptions } from '@sanity/client';

const allQuery = `*[_type == 'project'] | order(_createdAt asc)`;

const query = (category: string) => {
  return `*[_type == 'project' && references(*[_type == 'primaryTag' && value.current == '${category}']._id)] | order(_createdAt asc) {
    slug,
    title,
    previewUrl,
    }`;
};

const options: FilteredResponseQueryOptions = {
  next: { revalidate: 10 },
};

export const getProjects = async (
  category?: string | null
): Promise<IProject[]> => {
  if (!category || category === 'all') {
    return client.fetch<IProject[]>(allQuery, {}, options);
  }

  return client.fetch<IProject[]>(query(category), {}, options);
};
