import { ISlug } from './project';

export interface IHomepageSlide {
  title: string;
  text?: string;
  project?: {
    slug: ISlug;
  };
  imgUrl?: string;
  imgMobileUrl?: string;
  videoUrl?: string;
  videoMobileUrl?: string;
  videoLoop?: boolean;
}
