import Image from 'next/image';
import { useMemo } from 'react';

const MediaViewer = (props: { mediaType: 'IMAGE' | 'VIDEO'; src: string; size?: string; objectFit?: 'cover' | 'contain'; withBorder?: boolean }) => {
  const { mediaType, src, size, objectFit = 'contain', withBorder } = props;

  const className = useMemo(
    () => (size ? size : 'w-[100px] h-[100px] rounded-lg') + ` object-${objectFit} ` + (withBorder ? 'm-1 border border-zinc-600' : ''),
    [size, objectFit, withBorder]
  );

  const w = Number(className.split(' ')[0]?.replace('w-[', '')?.replace('px]', ''));
  const h = Number(className.split(' ')[1]?.replace('h-[', '')?.replace('px]', ''));

  return mediaType === 'IMAGE' ? (
    <Image src={src} alt='' className={className} width={Number.isNaN(w) ? 420 : w} height={Number.isNaN(h) ? 420 : h} priority unoptimized />
  ) : mediaType === 'VIDEO' ? (
    <video src={src} controls className={className} />
  ) : null;
};

export default MediaViewer;
