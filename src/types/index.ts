export type Feature = {
  id: number;
  name: string;
};

type Select = {
  selected: boolean
}

export type FeatureSelect = Feature & Select