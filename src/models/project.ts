import { PortableTextBlock } from '@portabletext/react';

export interface ISlug {
  current: string;
}

export interface IProject {
  title: string;
  slug: ISlug;
  previewUrl: string;
  modelUrl?: string;
  banner?: IProjectBanner;
  content?: PortableTextBlock[];
  primaryTags?: ITag[];
  otherTags?: ITag[] | null;
}

export interface IProjectBanner {
  title: string;
  imgUrl: string;
  videoUrl: string;
  // modelUrl: string; for now we don't support 3D models in banner
}

export interface ITag<T = string> {
  value: T;
  label: string;
}
