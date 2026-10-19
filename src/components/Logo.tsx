const Logo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="16" className="fill-primary" />
    <path d="M18 42V24l7 10 7-10 7 10 7-10v18" fill="none" className="stroke-primary-foreground" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default Logo;
