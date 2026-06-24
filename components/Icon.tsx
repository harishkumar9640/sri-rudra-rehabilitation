/**
 * Inline SVG icons for the homepage and services pages.
 *
 * Why inline SVG instead of emoji or an icon font:
 *  - Crisp at any size on any DPR
 *  - Inherit `currentColor`, so they work in both light and dark sections
 *  - No external dependency, no font-loading flash
 *  - Each icon is annotated with role="img" + title for screen readers
 */

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  /** Accessible name. If omitted, the icon is `aria-hidden`. */
  title?: string;
};

function Base({ title, children, ...props }: IconProps & { children: React.ReactNode }) {
  const labelled = title !== undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={labelled ? undefined : true}
      role={labelled ? 'img' : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pillar icons (used by the "How We Deliver" 4-up grid)              */
/* ------------------------------------------------------------------ */

export const PillarMilestoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20h16" />
    <path d="M7 20V8l5-3 5 3v12" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </Base>
);

export const PillarDoctorIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v3" />
    <path d="M9 6h6a3 3 0 0 1 3 3v1H6V9a3 3 0 0 1 3-3Z" />
    <path d="M6 10v3a6 6 0 0 0 12 0v-3" />
    <path d="M19 7h2v3h-2z" />
  </Base>
);

export const PillarTeamIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="9" r="3" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M3 19a6 6 0 0 1 12 0" />
    <path d="M14 19a4 4 0 0 1 8 0" />
  </Base>
);

export const PillarEquipmentIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="7" width="16" height="10" rx="2" />
    <path d="M12 3v4" />
    <circle cx="12" cy="12" r="2" />
    <path d="M4 17v3" />
    <path d="M20 17v3" />
  </Base>
);

/* ------------------------------------------------------------------ */
/* Service icons                                                       */
/* ------------------------------------------------------------------ */

export const ServiceNeuroIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4c-3.5 0-6 2.5-6 6 0 1.5.5 2.8 1.3 3.9C6.5 14.7 6 15.7 6 17c0 2 1.6 3 3 3" />
    <path d="M12 4c3.5 0 6 2.5 6 6 0 1.5-.5 2.8-1.3 3.9.8.8 1.3 1.8 1.3 3.1 0 2-1.6 3-3 3" />
    <path d="M9 12h6" />
    <path d="M10 16h4" />
  </Base>
);

export const ServiceOrthopedicIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 3l-3 5 3 5" />
    <path d="M17 3l3 5-3 5" />
    <path d="M4 8h6" />
    <path d="M14 8h6" />
    <path d="M9 14h6v6H9z" />
  </Base>
);

export const ServiceCardiacIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 12h4l2-4 3 8 2-5 2 3 2-2h3" />
  </Base>
);

export const ServiceCancerIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 8.5l7 7" />
    <path d="M15.5 8.5l-7 7" />
  </Base>
);

export const ServiceFractureIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12c0-3 2-5 5-5h2" />
    <path d="M14 7h2c3 0 5 2 5 5" />
    <path d="M9 11v3M12 9v6M15 11v3" />
  </Base>
);

export const ServiceHeadInjuryIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3a7 7 0 0 0-7 7v3l-2 3h18l-2-3v-3a7 7 0 0 0-7-7Z" />
    <path d="M9 11h.01" />
    <path d="M15 11h.01" />
  </Base>
);

export const ServiceSpinalCordIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18" />
    <circle cx="12" cy="6" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="18" r="1.5" />
    <path d="M9 6h6M9 12h6M9 18h6" />
  </Base>
);

export const ServiceSportsInjuryIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="14" cy="6" r="2" />
    <path d="M9 21l4-7" />
    <path d="M9 13l-3-3 3-2 3 2" />
    <path d="M13 9l4-3 3 2-2 4" />
  </Base>
);

export const ServiceKneeReplacementIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 4h6l-1 5-2 2 2 4 1 5H9l1-5 2-4-2-2-1-5Z" />
    <path d="M9 4v16M15 4v16" />
  </Base>
);

export const ServiceLongTermIcuIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M12 9v6" />
    <path d="M9 12h6" />
    <path d="M8 3v3M16 3v3" />
  </Base>
);

export const ServicePediatricIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </Base>
);

export const ServiceGeriatricIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="6" r="3" />
    <path d="M9 11h6l-1 4h-4z" />
    <path d="M9 15l-2 6" />
    <path d="M15 15l2 6" />
  </Base>
);

export const ServiceOldAgeCareIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12l8-8 8 8" />
    <path d="M6 11v9h12v-9" />
    <path d="M10 20v-5h4v5" />
  </Base>
);

export const ServicePulmonologyIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 4c-2 2-3 5-3 8 0 4 3 7 6 7h4c3 0 6-3 6-7 0-3-1-6-3-8" />
    <path d="M9 19c0-3 1-6 3-9 2 3 3 6 3 9" />
  </Base>
);

/* ------------------------------------------------------------------ */
/* UI icons                                                            */
/* ------------------------------------------------------------------ */

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Base>
);

export const WhatsappIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.7l-4.5.8Z" />
    <path d="M9 9c0-.6.4-1 1-1h.5c.3 0 .6.2.7.5l.7 1.7c.1.3 0 .6-.2.8l-.6.6c.5 1 1.4 1.9 2.4 2.4l.6-.6c.2-.2.5-.3.8-.2l1.7.7c.3.1.5.4.5.7v.5c0 .6-.4 1-1 1-3.3 0-7-3.7-7-7Z" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 17.8 5.7 21l1.2-7-5-4.9 7-1L12 2Z" />
  </Base>
);

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12l4 4 10-10" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
  </Base>
);
