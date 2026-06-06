import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ProgressBar = () => {
  const progress = useScrollProgress();
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: '4px',
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, #f5a623, #4a7c59)',
        zIndex: 50,
        transition: 'width 0.1s ease-out',
      }}
    />
  );
};
export default ProgressBar;
