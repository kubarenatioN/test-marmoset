import { FC } from 'react';
import { getProjects } from '../data';
import GalleryFilters from './GalleryFilters';
import GalleryGrid from './GalleryGrid';

interface GalleryProps {
  type?: string;
}

const Gallery: FC<GalleryProps> = async ({ type }) => {
  const projects = getProjects(type);

  return (
    <>
      <GalleryFilters type={type} />

      <GalleryGrid data={projects} />
    </>
  );
};

export default Gallery;
