import { useState, useCallback, useEffect } from "react";

const LOCATION_CHANGE_EVENT = 'locationchange';

export const useQueryParam = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleLocationChange = useCallback(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has(key) && urlParams.get(key) !== value) {
      setValue(urlParams.get(key));
    }
  }, []);

  const handleValueChange = useCallback(newValue => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set(key, newValue);
    window.location.search = urlParams.toString();
  });

  useEffect(() => {
    window.addEventListener(LOCATION_CHANGE_EVENT, handleLocationChange)
    return () => {
      window.removeEventListener(LOCATION_CHANGE_EVENT, handleLocationChange)
    }
  }, [handleLocationChange]);

  useEffect(() => {
    handleLocationChange()
  }, []);

  return [value, handleValueChange];
}