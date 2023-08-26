import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <img
      ref={ref}
      {...props}
      src={src || fallback}
      alt={alt}
      className={classNames(styles.wrapper, className)}
      onError={handleError}
    />
  );
});

export default Image;
