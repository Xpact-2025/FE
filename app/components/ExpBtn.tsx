import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ExpBtnProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export default function ExpBtn({
  href,
  onClick,
  className,
  children,
  type = 'button',
}: ExpBtnProps) {
  const baseClass =
    'w-20 py-3 text-sm text-center font-semibold rounded-lg flex items-center justify-center active:scale-[0.90]';

  if (href) {
    return (
      <Link href={href} className={cn(baseClass, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(baseClass, className)}>
      {children}
    </button>
  );
}
