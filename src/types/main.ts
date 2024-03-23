export interface PhotoType {
  length?: number;
  alt_description: string;
  urls: {
    full: string;
    small: string;
    regular: string;
    thumb: string;
  };
  id: string;
  width: number;
  height: number;
  downloads: string;
  views: number;
  user: {
    name: string;
    portfolio_url: string;
    profile_image: {
      small: string;
      medium: string;
    };
  };
  location: {
    name: string;
    created_at: string;
  };
  exif: {
    name: string;
  };
}

export interface FavouriteType {
  _id: string;
  data: PhotoType;
}

export interface CommentType {
  _id: string;
  username: string;
  text: string;
  imageId: string;
  createdAt: string;
}
