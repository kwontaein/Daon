import { AsideOptions } from "@/model/constants/routes/asideOptions"


export type ClientMousePosition = {
    x:number,
    y:number
}


export type PageByProps ={
    searchParams: Promise<{
        page: number| undefined
    }>
}
export type SearchNameProps ={
    searchParams: Promise<{
        page: number| undefined,
        searchName : string,
    }>
}


export type ModeByProps ={
    searchParams: Promise<{
        mode: CateMode
    }>
}
export type CateMode = 'add' | 'edit' | null

export type DetailPageProps ={
    searchParams: Promise<{
        target:string
        mode: 'detail' | 'edit'
    }>
}


type AsideItem = {
    name: string;
    link: string;
  };
  
  type AsideOptionsType = typeof AsideOptions;
  
  // kebab-case → camelCase 변환 함수
  type KebabToCamelCase<S extends string> = S extends `${infer T}-${infer U}`
    ? `${T}${Capitalize<KebabToCamelCase<U>>}`
    : S;
  
  // 모든 `link` 값의 타입을 infer로 추출 타입추론
  type ExtractLinks<T> = T extends { asideItems: infer Items }
    ? Items extends Array<infer Item> //배열여부
      ? Item extends { link: infer L } //link인지여부
        ? L extends string //link의 요소가 string인지
          ? KebabToCamelCase<L> //camelCase 전환
          : never
        : never
      : never
    : never;
  
  type AllLinks = {
    [K in keyof AsideOptionsType]: ExtractLinks<AsideOptionsType[K]>
  }[keyof AsideOptionsType]; //[keyof AsideOptionsType]으로 인해 value값들이 추출됨
  
  // 결과 타입: link 이름을 camelCase로 변환한 boolean map
  export type ListOfAside = {
    [K in AllLinks]: boolean;
  };
  
  // export type EnableUrlType ={
  //   [K in keyof AsideOptionsType] :ExtractLinks<AsideOptionsType[K]>
  // }
  
  export type EnableUrlType = {
    [K in keyof AsideOptionsType]: {
      [Item in AsideOptionsType[K]['asideItems'][number]['link'] as KebabToCamelCase<Item>]: boolean;
    };
  };