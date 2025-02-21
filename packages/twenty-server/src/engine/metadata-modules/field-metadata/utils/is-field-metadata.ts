import { FieldMetadataType } from 'twenty-shared';

import { FieldMetadataEntity } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';

export const isFieldMetadata = <
  T extends FieldMetadataType | 'default' = 'default',
>(
  value: unknown,
): value is FieldMetadataEntity<T> => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<FieldMetadataEntity<T>>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.objectMetadataId === 'string' &&
    typeof candidate.workspaceId === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.label === 'string' &&
    typeof candidate.type === 'string' &&
    Object.values(FieldMetadataType).includes(
      candidate.type as FieldMetadataType,
    ) &&
    typeof candidate.isCustom === 'boolean' &&
    typeof candidate.isActive === 'boolean' &&
    typeof candidate.isSystem === 'boolean' &&
    typeof candidate.isLabelSyncedWithName === 'boolean' &&
    (candidate.isNullable === null ||
      typeof candidate.isNullable === 'boolean') &&
    (candidate.isUnique === null || typeof candidate.isUnique === 'boolean') &&
    (candidate.description === null ||
      typeof candidate.description === 'string') &&
    (candidate.icon === null || typeof candidate.icon === 'string') &&
    (candidate.standardId === null ||
      typeof candidate.standardId === 'string') &&
    (candidate.relationTargetFieldMetadataId === null ||
      typeof candidate.relationTargetFieldMetadataId === 'string') &&
    (candidate.relationTargetObjectMetadataId === null ||
      typeof candidate.relationTargetObjectMetadataId === 'string') &&
    candidate.createdAt instanceof Date &&
    candidate.updatedAt instanceof Date
  );
};
