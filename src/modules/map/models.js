export const createMeasurePoint = (id, color, layerId, sourceId, item) => ({
  id,
  color,
  layerId,
  sourceId,
  item,
});

export const createMarker = (id, item) => ({ id, item });

export const createRadarMarker = (id, item) => ({ id, item });
