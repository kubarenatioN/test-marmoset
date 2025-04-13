export interface IContacts {
  vimeo: string;
  instagram: string;
  email: string;
  artstation: string;
  xcom: string;
  bgUrl: string;
}

export function getSocials(data: IContacts) {
  return {
    artstation: data.artstation,
    instagram: data.instagram,
    vimeo: data.vimeo,
    xcom: data.xcom,
  };
}

export const socialsTypeToLabelMap: {
  [key: string]: string;
} = {
  artstation: 'Artstation',
  instagram: 'Instagram',
  vimeo: 'Vimeo',
  xcom: 'X.com',
};
