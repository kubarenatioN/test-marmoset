export interface IProject {
  title: string;
  slug: { current: string };
  previewUrl: string;
  modelUrl?: string;
  banner?: IProjectBanner;
}

export interface IProjectBanner {
  title: string;
  imgUrl: string;
  videoUrl: string;
  // modelUrl: string; for now we don't support 3D models in banner
}
