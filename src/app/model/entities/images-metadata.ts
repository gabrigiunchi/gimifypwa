export interface ImageMetadata {
  id: string;
  lastModified: number;
  type?: ImageType;
}

export enum ImageType {
  avatar = 'avatar',
  profile = 'profile'
}
