export interface IPlatformParams {
  width?: number;
  color?: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  jumpThrough?: boolean;
  type?: 'box' | 'platform';
}

export type TPlatformPosition = {
  x: number;
  y: number;
};
