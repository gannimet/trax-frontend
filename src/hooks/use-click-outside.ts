import React, { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
): void => {
  const rootDiv = document.getElementById('root');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback();
    };

    rootDiv?.addEventListener('mousedown', handleClickOutside);

    return () => {
      rootDiv?.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, rootDiv]);
};
