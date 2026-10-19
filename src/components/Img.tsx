import type { ImgHTMLAttributes } from 'react'

export type SceneName = 'sales-training' | 'executive-coaching' | 'sales-strategy' | 'performance-audit' | 'recruitment' | 'launch-lab' | 'programme-still-life'

interface SceneProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> {
  name: SceneName
  alt: string
  sizes: string
  priority?: boolean
}

/** Responsive 3:2 scene photograph; width/height reserve space to avoid layout shift. */
export function SceneImg({ name, alt, sizes, priority = false, ...rest }: SceneProps) {
  return (
    <img
      src={`/images/${name}-960.webp`}
      srcSet={[480, 960, 1440].map(width => `/images/${name}-${width}.webp ${width}w`).join(', ')}
      sizes={sizes}
      width={1536}
      height={1024}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )
}

/** Programme cover artwork. Its words repeat the live heading beside it, so it is decorative. */
export function CoverImg({ cover, sizes, className }: { cover: string; sizes: string; className?: string }) {
  return (
    <img
      className={className}
      src={`/images/${cover}-500.webp`}
      srcSet={`/images/${cover}-500.webp 500w, /images/${cover}-1000.webp 1000w`}
      sizes={sizes}
      width={1000}
      height={1200}
      alt=""
      loading="lazy"
      decoding="async"
    />
  )
}
