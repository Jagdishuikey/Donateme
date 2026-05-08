type IconProps = {
  className?: string;
};

export function ArrowRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 20s-7-4.35-9.2-8.65C1.1 8 3.1 4.5 6.7 4.5c2 0 3.35 1.05 4.1 2.1.75-1.05 2.1-2.1 4.1-2.1 3.6 0 5.6 3.5 3.9 6.85C16.6 15.65 12 20 12 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path d="M18 8a3 3 0 1 0-2.7-4.3A3 3 0 0 0 18 8ZM6 15a3 3 0 1 0-2.7-4.3A3 3 0 0 0 6 15Zm12 6a3 3 0 1 0-2.7-4.3A3 3 0 0 0 18 21ZM8.7 13.4l6.6 3.2M15.3 7.4 8.7 10.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 3 5 6v5.4c0 4.6 3 7.8 7 9.6 4-1.8 7-5 7-9.6V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m8.7 12.2 2.1 2.1 4.6-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
