import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';

const allQuery = `*[_type == 'project'] | order(_createdAt asc)`;

const query = (category: string) => {
  return `*[_type == 'project' && references(*[_type == 'primaryTag' && value.current == '${category}']._id)] {
    slug,
    title,
    previewUrl,
    }`;
};

export const getProjects = async (category?: string): Promise<IProject[]> => {
  if (!category || category === 'all') {
    return client.fetch<IProject[]>(allQuery, {}, { next: { revalidate: 10 } });
  }

  return client.fetch<IProject[]>(
    query(category),
    {},
    { next: { revalidate: 10 } }
  );
};
