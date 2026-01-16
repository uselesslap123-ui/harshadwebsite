'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarWithRingProps {
  imageUrl?: string;
  alt: string;
  className?: string;
  ringClassName?: string;
}

export function AvatarWithRing({
  imageUrl,
  alt,
  className,
  ringClassName,
}: AvatarWithRingProps) {
  return (
    <div
      className={cn(
        'relative h-12 w-12 rounded-full p-0.5',
        'bg-gradient-to-tr from-primary to-accent',
        ringClassName
      )}
    >
      <Avatar className={cn('h-full w-full', className)}>
        {imageUrl && <AvatarImage src={imageUrl} alt={alt} />}
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
