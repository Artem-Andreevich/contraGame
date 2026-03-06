import { TArea } from '../types';

const isCheckAABB = (entity: TArea, area: TArea): boolean => {
  return (
    entity.x < area.x + area.width &&
    entity.x + entity.width > area.x &&
    entity.y < area.y + area.height &&
    entity.y + entity.height > area.y
  );
};

export default isCheckAABB;
