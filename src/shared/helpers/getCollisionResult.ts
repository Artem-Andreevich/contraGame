import type { TArea, TPrevPoint } from '../types';

import isCheckAABB from './isCheckAABB';

export type TCollisionResult = {
  horizontal: boolean;
  vertical: boolean;
};

const getCollisionResult = (aaRect: TArea, bbRect: TArea, aaPrevPoint: TPrevPoint): TCollisionResult => {
  const result = {
    horizontal: false,
    vertical: false,
  };

  if (!isCheckAABB(aaRect, bbRect)) {
    return result;
  }

  if (!isCheckAABB({ ...aaRect, y: aaPrevPoint.y }, bbRect)) {
    result.vertical = true;
    return result;
  }

  result.horizontal = true;
  return result;
};

export default getCollisionResult;
