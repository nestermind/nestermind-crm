import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';

export const isObjectMetadata = (
  value: unknown,
): value is ObjectMetadataEntity => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<ObjectMetadataEntity>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.nameSingular === 'string' &&
    typeof candidate.namePlural === 'string' &&
    typeof candidate.labelSingular === 'string' &&
    typeof candidate.labelPlural === 'string' &&
    typeof candidate.targetTableName === 'string' &&
    typeof candidate.workspaceId === 'string' &&
    typeof candidate.dataSourceId === 'string' &&
    typeof candidate.isCustom === 'boolean' &&
    typeof candidate.isRemote === 'boolean' &&
    typeof candidate.isActive === 'boolean' &&
    typeof candidate.isSystem === 'boolean' &&
    typeof candidate.isAuditLogged === 'boolean' &&
    typeof candidate.isLabelSyncedWithName === 'boolean' &&
    candidate.createdAt instanceof Date &&
    candidate.updatedAt instanceof Date
  );
};
