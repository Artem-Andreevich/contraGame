export interface IPlatformParams {
  width?: number;
  color?: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  jumpThrough?: boolean;
  type?: 'box' | 'platform';
  isStepladder?: boolean;
}

export type TPlatformPosition = {
  x: number;
  y: number;
};
