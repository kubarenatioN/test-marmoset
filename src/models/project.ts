export interface IProject {
  title: string;
  slug: { current: string };
  previewUrl: string;
  banner?: IProjectBanner;
}

export interface IProjectBanner {
  title: string;
  imgUrl: string;
  videoUrl: string;
  modelUrl: string;
}
