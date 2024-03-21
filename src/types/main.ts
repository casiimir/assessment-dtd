export interface PhotoType {
  alt_description: string;
  urls: {
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
