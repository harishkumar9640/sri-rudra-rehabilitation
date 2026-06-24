/** Facilities list — single source of truth for the Facilities page. */
import * as Icons from '@/components/Icon';

/** Inline SVG component type used by the icon map below. */
type IconCmp = React.ComponentType<{ className?: string; title?: string }>;

/**
 * Map each facility title to a semantic SVG icon. The map is intentionally
 * hand-curated — not all facilities have a 1:1 medical icon, so for some
 * we reuse the closest one and rely on the title to disambiguate.
 */
const FACILITY_ICONS: Record<string, IconCmp> = {
  'Therapy Gyms': Icons.PillarEquipmentIcon,
  'Robotic & VR Rehab': Icons.PillarEquipmentIcon,
  'Inpatient Rooms': Icons.PillarTeamIcon,
  'Speech & Swallowing Suite': Icons.PillarTeamIcon,
  'Neuropsychology Wing': Icons.ServiceNeuroIcon,
  'Outdoor Therapy Garden': Icons.PillarMilestoneIcon,
  'ICU Facility': Icons.ServiceLongTermIcuIcon,
  'Dining Hall': Icons.PillarTeamIcon,
  'Recreation Room': Icons.PillarTeamIcon,
};

export function getFacilityIcon(title: string): IconCmp | undefined {
  return FACILITY_ICONS[title];
}

export const FACILITIES = [
  {
    icon: 'dumbbell', // placeholder; resolved at render via getFacilityIcon()
    title: 'Therapy Gyms',
    description:
      'Spacious, well-equipped gyms for physical and occupational therapy — parallel bars, resistance equipment, and balance tools.',
  },
  {
    icon: 'robot',
    title: 'Robotic & VR Rehab',
    description:
      'Robotic-assisted gait training and virtual reality systems that make therapy engaging and drive neuroplastic recovery.',
  },
  {
    icon: 'bed',
    title: 'Inpatient Rooms',
    description:
      'Comfortable, accessible private and semi-private rooms designed for long-term stays and around-the-clock nursing care.',
  },
  {
    icon: 'speech',
    title: 'Speech & Swallowing Suite',
    description:
      'Dedicated space for speech-language therapy, including videofluoroscopy-supported swallowing assessments.',
  },
  {
    icon: 'brain',
    title: 'Neuropsychology Wing',
    description:
      'Quiet, purpose-built rooms for cognitive assessments, counselling, and behavioural therapy.',
  },
  {
    icon: 'tree',
    title: 'Outdoor Therapy Garden',
    description:
      'Accessible garden with varied terrain for real-world mobility practice in a calm, natural setting.',
  },
  {
    icon: 'hospital',
    title: 'ICU Facility',
    description:
      'In-house intensive care with ventilator support and continuous medical monitoring for medically complex patients.',
  },
  {
    icon: 'dining',
    title: 'Dining Hall',
    description:
      'Therapeutic diets prepared under the supervision of in-house dietitians, served in a comfortable communal space.',
  },
  {
    icon: 'art',
    title: 'Recreation Room',
    description:
      'Bright, social space for group activities, arts, music, and gentle re-introduction to daily life.',
  },
] as const;
