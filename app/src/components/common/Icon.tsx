import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', width = 16, height }) => {
  return (
    <iconify-icon
      icon={name}
      className={className}
      width={width}
      height={height || width}
    />
  );
};
