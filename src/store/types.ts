export interface IRootState {
  id?: string;
}

export type CatAPIResponse = CatBreed[];

export interface CatBreed {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  child_friendly: number;
  country_code: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  intelligence: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppress_tail: number;
  temperament: string;
  vocalisation: number;
  weight_imperial: string;
  wikipedia_url: string;
}

export interface CatState {
  cats: CatBreed[];
  images: CatImage[];
  selectedCat: CatImage | null;
  navigation: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    itemsPerPage: number;
  };
}

export interface CatImage {
  breeds: CatBreed[];
  id: string;
  url: string;
  width: number;
  height: number;
}
