import React, { memo, useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

type SmartImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK_SRC = '/assets/images/med-placeholder.svg';

export const SmartImage = memo(function SmartImageFn({
  src,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  alt,
  loading = 'lazy',
  ...restProps
}: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const onError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setError(true);
    }
  };

  return (
    <Image
      {...restProps}
      className={`bg-background-2 rounded-lg ${restProps?.className ?? ''}`}
      src={imgSrc}
      alt={alt || 'image'}
      draggable={false}
      onError={onError}
      loading={loading}
      unoptimized={!error}
    />
  );
});

export default SmartImage;
