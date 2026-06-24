import type { ReactNode } from 'react';

/**
 * Service catalog — single source of truth used by the Services grid,
 * the homepage preview, and (in future) the per-service pages.
 *
 * Each entry includes an accessible icon label (no emoji — we render
 * a small inline SVG in the UI), a one-line description, and the
 * canonical route under /services/.
 */

type Service = {
  slug: string;
  name: string;
  description: string;
  /** Name of the inline icon to render from components/ServiceIcon.tsx */
  icon: ServiceIconName;
  /** Long-form blurb for the per-service page (Markdown-ready plain text). */
  longDescription: string;
  benefits: readonly string[];
};

export type ServiceIconName =
  | 'neuro'
  | 'orthopedic'
  | 'cardiac'
  | 'cancer'
  | 'fracture'
  | 'headInjury'
  | 'spinalCord'
  | 'sportsInjury'
  | 'kneeReplacement'
  | 'longTermIcu'
  | 'pediatric'
  | 'geriatric'
  | 'oldAgeCare'
  | 'pulmonology';

export const SERVICES: readonly Service[] = [
  {
    slug: 'neuro-rehabilitation',
    name: 'Neuro Rehabilitation',
    description:
      'Specialized care for stroke, traumatic brain injury, and neurological conditions.',
    icon: 'neuro',
    longDescription:
      'Our neuro rehabilitation program helps patients recover from stroke, traumatic brain injury, spinal cord injuries, and neurodegenerative diseases using evidence-based, milestone-driven therapy.',
    benefits: [
      'Gait & mobility training',
      'Speech & swallowing therapy',
      'Cognitive rehabilitation',
      'Activities of daily living (ADL) retraining',
    ],
  },
  {
    slug: 'orthopedic-rehabilitation',
    name: 'Orthopedic Rehabilitation',
    description:
      'Post-surgical rehabilitation for joint replacements, fractures, and sports injuries.',
    icon: 'orthopedic',
    longDescription:
      'Post-surgical rehabilitation for joint replacements, fractures, and sports injuries — focused on restoring strength, range of motion, and safe mobility.',
    benefits: [
      'Joint replacement recovery',
      'Post-fracture rehabilitation',
      'Manual therapy & mobilization',
      'Strength & conditioning',
    ],
  },
  {
    slug: 'cardio-rehabilitation',
    name: 'Cardiac Rehabilitation',
    description:
      'Comprehensive care for heart conditions and post-cardiac surgery recovery.',
    icon: 'cardiac',
    longDescription:
      'Comprehensive cardiac rehabilitation for heart conditions and post-cardiac surgery recovery, including supervised exercise, education, and risk-factor counselling.',
    benefits: [
      'Supervised exercise training',
      'Heart-healthy lifestyle education',
      'Risk-factor management',
      'Emotional & psychological support',
    ],
  },
  {
    slug: 'cancer-rehabilitation',
    name: 'Cancer Rehabilitation',
    description:
      'Supportive care during and after cancer treatment to manage symptoms and improve quality of life.',
    icon: 'cancer',
    longDescription:
      'Supportive care during and after cancer treatment, helping patients manage fatigue, pain, and deconditioning while working alongside oncology providers.',
    benefits: [
      'Fatigue & pain management',
      'Lymphedema care',
      'Gentle strength reconditioning',
      'Nutrition & emotional support',
    ],
  },
  {
    slug: 'fracture-rehabilitation',
    name: 'Fracture Rehabilitation',
    description: 'Focused recovery for various types of fractures and bone injuries.',
    icon: 'fracture',
    longDescription:
      'Focused, staged recovery for various types of fractures and bone injuries, from initial protection through full weight-bearing and functional return.',
    benefits: [
      'Progressive weight-bearing',
      'Joint stiffness reduction',
      'Strength rebuilding',
      'Functional return-to-activity',
    ],
  },
  {
    slug: 'head-injury-rehabilitation',
    name: 'Head Injury Rehabilitation',
    description:
      'Comprehensive care for traumatic brain injuries and concussions, combining cognitive, physical, and behavioral therapies.',
    icon: 'headInjury',
    longDescription:
      'Comprehensive care for traumatic brain injuries and concussions, combining cognitive, physical, and behavioral therapies to support recovery from mild to severe head injuries.',
    benefits: [
      'Cognitive rehabilitation',
      'Vestibular & balance therapy',
      'Behavioral therapy',
      'Family & caregiver education',
    ],
  },
  {
    slug: 'spinal-cord-rehabilitation',
    name: 'Spinal Cord Rehabilitation',
    description: 'Specialized programs for spinal cord injuries and paralysis.',
    icon: 'spinalCord',
    longDescription:
      'Specialized programs for spinal cord injuries and paralysis, focused on maximizing function, independence, and quality of life.',
    benefits: [
      'Mobility & transfer training',
      'Wheelchair skills',
      'Bowel & bladder management',
      'Autonomic dysreflexia education',
    ],
  },
  {
    slug: 'sports-injury-rehabilitation',
    name: 'Sports Injury Rehabilitation',
    description:
      'Sports-specific rehabilitation for athletes and active individuals.',
    icon: 'sportsInjury',
    longDescription:
      'Sports-specific rehabilitation for athletes and active individuals — restoring strength, agility, and confidence for safe return to play.',
    benefits: [
      'Sport-specific training',
      'Agility & plyometric work',
      'Injury-prevention coaching',
      'Return-to-play testing',
    ],
  },
  {
    slug: 'total-knee-replacement-rehabilitation',
    name: 'Total Knee Replacement Rehab',
    description: 'Post-operative care and rehabilitation for knee replacement surgery.',
    icon: 'kneeReplacement',
    longDescription:
      'Post-operative care and rehabilitation for total knee replacement surgery, focused on regaining range of motion, strength, and confident walking.',
    benefits: [
      'Early mobilization',
      'Range-of-motion restoration',
      'Gait retraining',
      'Long-term joint protection',
    ],
  },
  {
    slug: 'long-term-icu-rehabilitation',
    name: 'Long-Term ICU Rehabilitation',
    description: 'Specialized care for patients recovering from prolonged ICU stays.',
    icon: 'longTermIcu',
    longDescription:
      'Specialized care for patients recovering from prolonged ICU stays — addressing deconditioning, respiratory weakness, and post-ICU syndrome.',
    benefits: [
      'Respiratory muscle training',
      'ICU-acquired weakness recovery',
      'Swallowing & nutrition',
      'Psychological recovery',
    ],
  },
  {
    slug: 'pediatric-rehabilitation',
    name: 'Pediatric Rehabilitation',
    description: 'Child-focused rehabilitation for developmental and physical challenges.',
    icon: 'pediatric',
    longDescription:
      'Child-focused rehabilitation for developmental, neurological, and physical challenges — delivered in a supportive, play-based environment.',
    benefits: [
      'Developmental therapy',
      'Neurodevelopmental techniques',
      'Family-centered care',
      'School-readiness support',
    ],
  },
  {
    slug: 'geriatric-rehabilitation',
    name: 'Geriatric Rehabilitation',
    description: 'Age-appropriate rehabilitation for older adults.',
    icon: 'geriatric',
    longDescription:
      'Age-appropriate rehabilitation for older adults — focused on fall prevention, mobility, and maintaining independence at home.',
    benefits: [
      'Balance & fall prevention',
      'Strength & mobility',
      'Home safety assessment',
      'Medication & chronic-disease support',
    ],
  },
  {
    slug: 'old-age-care',
    name: 'Old Age Care',
    description: 'Comprehensive care and support for elderly patients.',
    icon: 'oldAgeCare',
    longDescription:
      'Comprehensive care and support for elderly patients, with round-the-clock attention to comfort, dignity, and quality of life.',
    benefits: [
      '24/7 personal care',
      'Medication management',
      'Companionship & recreation',
      'Family communication',
    ],
  },
  {
    slug: 'pulmonology-rehabilitation',
    name: 'Pulmonology Rehabilitation',
    description:
      'Respiratory rehabilitation for lung conditions and breathing difficulties.',
    icon: 'pulmonology',
    longDescription:
      'Respiratory rehabilitation for lung conditions and breathing difficulties, with structured exercise, breathing retraining, and education.',
    benefits: [
      'Breathing retraining',
      'Pulmonary exercise programs',
      'Secretion clearance techniques',
      'Energy-conservation coaching',
    ],
  },
] as const;

/** Quick lookup helper used by the per-service pages. */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Common "How We Deliver" reasons shown on home + about. */
export const DELIVERY_PILLARS = [
  {
    title: 'Milestone-Based Approach',
    description:
      'Clear, measurable goals at every step of the recovery journey — so progress is visible to patients and families.',
    icon: 'milestone' as const,
  },
  {
    title: 'Doctor-Led Care',
    description:
      'Care led by Physical Medicine & Rehabilitation specialists working alongside experienced nurses and therapists.',
    icon: 'doctor' as const,
  },
  {
    title: 'Multidisciplinary Team',
    description:
      'Doctors, physiotherapists, occupational therapists, speech therapists, nutritionists, and nurses working together.',
    icon: 'team' as const,
  },
  {
    title: 'Advanced Equipment',
    description:
      'Robotic-assisted therapy, balance trainers, and AI-tracked progress tools that shorten recovery time.',
    icon: 'equipment' as const,
  },
] as const;

/** Stats strip numbers — honest claims sourced from the institute's own marketing. */
export const HOME_STATS = [
  { value: '30', label: 'Inpatient beds', sub: 'AC & Non-AC' },
  { value: '24/7', label: 'Doctors & nurses', sub: 'Always on duty' },
  { value: 'ICU', label: 'In-house facility', sub: 'With ventilator support' },
  { value: '14', label: 'Specialized programs', sub: 'Neuro to geriatric' },
] as const;

/** Conditions treated — used in the "Who we help" pill row. */
export const CONDITIONS_TREATED = [
  'Stroke recovery',
  'Paralysis',
  'Head & brain injury',
  'Spinal cord injury',
  'Joint replacement',
  'Fractures',
  'Sports injuries',
  'Heart conditions',
  'Lung conditions',
  'Cancer recovery',
  'ICU deconditioning',
  'Pediatric conditions',
] as const;

/**
 * Inline-SVG components for each "Why Choose" feature tile.
 * Using SVGs (not emoji) keeps the line weight, alignment, and hover
 * recoloring consistent with the rest of the site.
 */
import {
  PillarDoctorIcon,
  PillarMilestoneIcon,
  PillarTeamIcon,
  PillarEquipmentIcon,
  ServiceOldAgeCareIcon,
  CheckIcon,
} from '@/components/Icon';
import type { ComponentType } from 'react';

const ICON_DOCTOR: ComponentType<{ className?: string }> = PillarDoctorIcon;
const ICON_MILESTONE: ComponentType<{ className?: string }> = PillarMilestoneIcon;
const ICON_TEAM: ComponentType<{ className?: string }> = PillarTeamIcon;
const ICON_EQUIPMENT: ComponentType<{ className?: string }> = PillarEquipmentIcon;
const ICON_HOME: ComponentType<{ className?: string }> = ServiceOldAgeCareIcon;
const ICON_CHECK: ComponentType<{ className?: string }> = CheckIcon;

/** Six-tile "Why Choose Sri Rudra" feature grid. */
export const WHY_CHOOSE = [
  {
    title: 'Doctor-Led, 24×7',
    description:
      'Continuous medical supervision by qualified doctors and skilled nurses — every hour of every day.',
    icon: 'doctor' as const,
  },
  {
    title: 'Milestone-Based Recovery',
    description:
      'Clear, measurable goals at every stage so you can see — and celebrate — real progress.',
    icon: 'milestone' as const,
  },
  {
    title: 'Multidisciplinary Team',
    description:
      'Physiotherapists, occupational therapists, speech therapists, dietitians and psychologists, working together.',
    icon: 'team' as const,
  },
  {
    title: 'Advanced Equipment',
    description:
      'Robotic-assisted therapy, balance trainers, and AI-tracked progress to shorten recovery time.',
    icon: 'equipment' as const,
  },
  {
    title: 'Home-Like Environment',
    description:
      'Comfortable AC and Non-AC rooms, indoor therapy garden, and family-friendly spaces.',
    icon: 'home' as const,
  },
  {
    title: 'NABH-Standard Protocols',
    description:
      'Strict infection control, safety checks, and clinical protocols that match hospital standards.',
    icon: 'check' as const,
  },
] as const;

export const WHY_CHOOSE_ICONS: Record<
  (typeof WHY_CHOOSE)[number]['icon'],
  ComponentType<{ className?: string }>
> = {
  doctor: ICON_DOCTOR,
  milestone: ICON_MILESTONE,
  team: ICON_TEAM,
  equipment: ICON_EQUIPMENT,
  home: ICON_HOME,
  check: ICON_CHECK,
};

/** Trust strip text (we don't have hospital partner logos; we use clean text). */
export const TRUST_TEXT =
  'Patients from leading hospitals across Telangana choose Sri Rudra for post-acute rehabilitation.';

// Convenience type re-export so other files don't need to import ReactNode.
export type { ReactNode };
