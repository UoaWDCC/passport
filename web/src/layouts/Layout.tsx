import { twMerge } from 'tailwind-merge';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const mergedClassName = twMerge(
    'w-screen h-svh flex flex-col justify-center items-center bg-base-100 overflow-hidden',
    className
  );
  return <div className={mergedClassName}>{children}</div>;
}
