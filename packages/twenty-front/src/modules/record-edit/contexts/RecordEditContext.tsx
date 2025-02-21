import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { FieldDefinition } from '@/object-record/record-field/types/FieldDefinition';
import { FieldMetadata } from '@/object-record/record-field/types/FieldMetadata';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useBlocker } from 'react-router-dom';

type FieldUpdate = {
  fieldName: string;
  value: unknown;
  fieldDefinition: FieldDefinition<FieldMetadata>;
};

export type RecordEditContextType = {
  objectMetadataItem: ObjectMetadataItem;
  updateField: (update: FieldUpdate) => void;
  getUpdatedFields: () => Record<string, unknown>;
  isDirty: boolean;
  resetFields: () => void;
  initialRecord: ObjectRecord | null;
};

export const RecordEditContext = createContext<RecordEditContextType | null>(
  null,
);

type RecordEditProviderProps = {
  objectMetadataItem: ObjectMetadataItem;
  initialRecord: ObjectRecord | null;
} & PropsWithChildren;

export const RecordEditProvider = ({
  children,
  objectMetadataItem,
  initialRecord,
}: RecordEditProviderProps) => {
  const [fieldUpdates, setFieldUpdates] = useState<Record<string, unknown>>({});
  const [isDirty, setIsDirty] = useState(false);

  const updateField = useCallback(
    (update: FieldUpdate, fieldValue?: unknown) => {
      const { fieldName, value } = update;

      if (fieldValue === update.value) {
        setFieldUpdates((prev) => {
          const { [fieldName]: _, ...rest } = prev;
          const hasRemainingUpdates = Object.keys(rest).length > 0;
          setIsDirty(hasRemainingUpdates);
          return rest;
        });
        return;
      }
      setFieldUpdates((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      setIsDirty(true);
    },
    [],
  );

  const getUpdatedFields = useCallback(() => fieldUpdates, [fieldUpdates]);

  const resetFields = useCallback(() => {
    setFieldUpdates({});
    setIsDirty(false);
  }, []);

  // This is used to block the user from leaving the page if there are unsaved changes
  useBlocker(({ currentLocation, nextLocation }) => {
    // If there are no unsaved changes or the user is navigating to the same page, don't block
    if (!isDirty || nextLocation.pathname.includes(currentLocation.pathname))
      return false;

    const confirmLeave = window.confirm(
      'You have unsaved changes. Are you sure you want to leave?',
    );

    if (confirmLeave) {
      resetFields();
      return false; // Allow navigation
    }

    return true; // Block navigation
  });

  return (
    <RecordEditContext.Provider
      value={{
        objectMetadataItem,
        updateField,
        getUpdatedFields,
        isDirty,
        resetFields,
        initialRecord,
      }}
    >
      {children}
    </RecordEditContext.Provider>
  );
};

export const useRecordEdit = () => {
  const context = useContext(RecordEditContext);

  if (!context) {
    throw new Error('useRecordEdit must be used within a RecordEditProvider');
  }

  return context;
};
