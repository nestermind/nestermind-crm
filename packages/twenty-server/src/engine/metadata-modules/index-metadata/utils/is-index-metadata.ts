import {
  IndexMetadataEntity,
  IndexType,
} from 'src/engine/metadata-modules/index-metadata/index-metadata.entity';

export const isIndexMetadata = (
  value: unknown,
): value is IndexMetadataEntity => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<IndexMetadataEntity>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.objectMetadataId === 'string' &&
    typeof candidate.isCustom === 'boolean' &&
    typeof candidate.isUnique === 'boolean' &&
    (candidate.workspaceId === null ||
      typeof candidate.workspaceId === 'string') &&
    (candidate.indexWhereClause === null ||
      candidate.indexWhereClause === null ||
      typeof candidate.indexWhereClause === 'string') &&
    (candidate.indexType === undefined ||
      Object.values(IndexType).includes(candidate.indexType)) &&
    candidate.createdAt instanceof Date &&
    candidate.updatedAt instanceof Date
  );
};
