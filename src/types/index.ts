export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  genre: string[];
  rating: string;
  duration: string;
  thumbnailUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  isOriginal?: boolean;
  scenes?: Scene[];
}

export interface Scene {
  id: number;
  movieId: number;
  timestamp: string; // format: "HH:MM:SS"
  description: string;
  screenshotUrl: string;
}

export interface Category {
  id: number;
  name: string;
  movies: Movie[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  profileImg?: string;
}