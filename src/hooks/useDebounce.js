import { useEffect, useState } from 'react';

function useDebounce(val, delay) {
  const [debounceValue, setDebounceValue] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(val);
    }, delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);
  return debounceValue;
}

export default useDebounce;
