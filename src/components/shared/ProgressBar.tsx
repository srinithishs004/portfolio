import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ProgressBar: React.FC = () => {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary via-[#4a8fa8] to-[#ff6b35] z-50 transition-all duration-100 ease-out"
      style={{ width: `${progress * 100}%` }}
    />
  );
};
export default ProgressBar;
