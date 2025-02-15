import { useEffect, useState } from 'react';

// This hook is used to initialize form input values as draft values from the field value
export const useFieldValueAsDraft = <T>(
  fieldValue: T,
  setDraftValue: (value?: T) => void,
) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && Boolean(fieldValue)) {
      setDraftValue(fieldValue);
      setInitialized(true);
    }
    // Artificially makes sure that shown value is not empty
    setTimeout(() => {
      setInitialized(true);
    }, 150);
  }, [fieldValue, setDraftValue, initialized]);

  return initialized;
};
