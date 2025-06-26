import Image from 'next/image';
import { Suspense } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Loading fallback component
const ImageSkeleton = ({ width, height, className, style }: { 
  width?: number; 
  height?: number; 
  className?: string; 
  style?: React.CSSProperties;
}) => (
  <div 
    className={`d-flex align-items-center justify-content-center bg-light ${className}`}
    style={{ width, height, ...style }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Server Component - no need for 'use client'
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  placeholder = 'empty',
  blurDataURL,
}) => {
  return (
    <Suspense fallback={<ImageSkeleton width={width} height={height} className={className} style={style} />}>
      <div className={`position-relative ${className}`} style={fill ? {} : { width, height, ...style }}>
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className="img-fluid"
          style={fill ? { objectFit: 'cover' } : {}}
          loading={priority ? 'eager' : 'lazy'}
          quality={85}
        />
      </div>
    </Suspense>
  );
};

export default OptimizedImage; 