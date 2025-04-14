import { client } from '@/helpers/sanity-client';
import { IProject } from '@/models';

export const projectQ = (slug: string) =>
  `*[_type == 'project' && slug.current == '${slug}'][0] {
  ...,
  banner->,
  primaryTags[]->,
  content[]{
    ...,
    _type == 'tagsBlock' => {
      "primaryTags": project->primaryTags[]->,
      "otherTags": project->otherTags[]
    }
  },
  softwareUsed[]->
}`;

export const nextPrevProjQ = () => {
  const select = `
    title,
    slug,
    previewUrl,
    _createdAt
  `;
  return `{
    "next": *[_type == 'project' && _createdAt > $lastCreatedAt] | order(_createdAt asc) [0] {
      ${select}
    },
    "prev": *[_type == 'project' && _createdAt < $lastCreatedAt] | order(_createdAt desc) [0] {
      ${select}
    },
    "first": *[_type == 'project'] | order(_createdAt asc) [0] {
      ${select}
    },
    "last": *[_type == 'project'] | order(_createdAt desc) [0] {
      ${select}
    }
  }
`;
};

export function getProject(slug: string) {
  return client.fetch<IProject>(
    projectQ(slug),
    {},
    {
      cache: 'default',
      next: {},
    }
  );
}

export function getProjectPagination(params = {}) {
  return client.fetch(nextPrevProjQ(), params, {
    cache: 'default',
    next: {},
  });
}
