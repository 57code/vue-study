// 声明Feature类型
export type Feature = {
  id: number;
  name: string;
};

// export type Select = {
//   selected: boolean
// }
// 接口形式
export interface Select {
  selected: boolean
}

export type FeatureSelect = Feature & Select