import type { SVGProps } from "react";

export const BVCOELogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>BVCOE Logo</title>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const WallEIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>WALL-E Icon</title>
      {/* Body */}
      <rect x="6" y="10" width="12" height="10" rx="1" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" />
      {/* Treads */}
      <rect x="4" y="14" width="2" height="6" rx="1" fill="hsl(var(--foreground))" />
      <rect x="18" y="14" width="2" height="6" rx="1" fill="hsl(var(--foreground))" />
      {/* Neck */}
      <path d="M12 10V8" stroke="hsl(var(--foreground))" />
      {/* Head */}
      <path d="M9 4L7 6" stroke="hsl(var(--foreground))" />
      <path d="M15 4L17 6" stroke="hsl(var(--foreground))" />
      {/* Eyes */}
      <circle cx="8" cy="4" r="2" fill="hsl(var(--foreground))" />
      <circle cx="16" cy="4" r="2" fill="hsl(var(--foreground))" />
      <circle cx="8" cy="4" r="0.5" fill="white" />
      <circle cx="16" cy="4" r="0.5" fill="white" />
    </svg>
  );
  
