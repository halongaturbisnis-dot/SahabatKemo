import React from 'react';
import { cn } from '@/src/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200",
        className
      )}
    />
  );
};

export const InlineSkeleton: React.FC<{ width?: string }> = ({ width = "w-24" }) => (
  <Skeleton className={cn("h-4 inline-block align-middle mx-1", width)} />
);
