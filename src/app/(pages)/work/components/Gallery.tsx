import { FC, Suspense } from 'react';
import { getProjects } from '../data';
import GalleryFilters from './GalleryFilters';
import GalleryGrid from './GalleryGrid';
import GallerySkeleton from './GallerySkeleton';

interface GalleryProps {
  searchParams?: Promise<{
    type?: string;
  }>;
}

const Gallery: FC<GalleryProps> = async ({ searchParams }) => {
  const type = (await searchParams)?.type;

  const projects = getProjects(type);

  return (
    <>
      <GalleryFilters type={type} />

      <Suspense key={`gallery-${type ?? 'all'}`} fallback={<GallerySkeleton />}>
        <GalleryGrid data={projects} />
      </Suspense>
    </>
  );
};

export default Gallery;
