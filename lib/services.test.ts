// Unit tests for `lib/services.ts`.
//
// The 14 service entries power 14 dynamic pages + the homepage preview.
// If `slug` or `icon` is wrong, the dynamic route breaks or the icon
// doesn't render. If `benefits` array is empty, the service detail page
// renders an empty list. These tests catch those regressions.

import { describe, it, expect } from 'vitest';
import {
  SERVICES,
  getServiceBySlug,
  DELIVERY_PILLARS,
  HOME_STATS,
  CONDITIONS_TREATED,
  WHY_CHOOSE,
  type ServiceIconName,
} from './services';

// Stub Icon.tsx so this test doesn't pull in JSX. Every export the
// production file provides is preserved as a no-op function so type
// imports still resolve.
import { vi } from 'vitest';
vi.mock('@/components/Icon', () => {
  const noop = () => null;
  const names = [
    'PillarMilestoneIcon', 'PillarDoctorIcon', 'PillarTeamIcon', 'PillarEquipmentIcon',
    'ServiceNeuroIcon', 'ServiceOrthopedicIcon', 'ServiceCardiacIcon', 'ServiceCancerIcon',
    'ServiceFractureIcon', 'ServiceHeadInjuryIcon', 'ServiceSpinalCordIcon', 'ServiceSportsInjuryIcon',
    'ServiceKneeReplacementIcon', 'ServiceLongTermIcuIcon', 'ServicePediatricIcon',
    'ServiceGeriatricIcon', 'ServiceOldAgeCareIcon', 'ServicePulmonologyIcon',
    'ArrowRightIcon', 'PhoneIcon', 'WhatsappIcon', 'StarIcon', 'MapPinIcon',
    'CheckIcon', 'InstagramIcon', 'PlayIcon',
  ];
  const stubs: Record<string, unknown> = {};
  for (const n of names) stubs[n] = noop;
  return stubs;
});

// All 14 icon names the service detail page expects to find in Icon.tsx.
// If anyone adds a new icon key here without exporting a matching
// `ServiceXxxIcon` component, the dynamic service page will crash.
const ALL_SERVICE_ICONS: ServiceIconName[] = [
  'neuro', 'orthopedic', 'cardiac', 'cancer', 'fracture',
  'headInjury', 'spinalCord', 'sportsInjury', 'kneeReplacement',
  'longTermIcu', 'pediatric', 'geriatric', 'oldAgeCare', 'pulmonology',
];

describe('SERVICES catalogue', () => {
  it('contains exactly 14 service entries', () => {
    expect(SERVICES).toHaveLength(14);
  });

  it('every service has unique slug, name, and icon', () => {
    const slugs = SERVICES.map((s) => s.slug);
    const names = SERVICES.map((s) => s.name);
    const icons = SERVICES.map((s) => s.icon);
    expect(new Set(slugs).size).toBe(14);
    expect(new Set(names).size).toBe(14);
    expect(new Set(icons).size).toBe(14);
  });

  it('every slug is URL-safe (lowercase letters, digits, hyphens only)', () => {
    for (const s of SERVICES) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('every service has at least 4 benefits listed', () => {
    for (const s of SERVICES) {
      expect(s.benefits.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('every icon key matches the known set', () => {
    for (const s of SERVICES) {
      expect(ALL_SERVICE_ICONS).toContain(s.icon);
    }
  });

  it('every service has a meaningful description and longDescription', () => {
    for (const s of SERVICES) {
      expect(s.description.length).toBeGreaterThan(20);
      expect(s.longDescription.length).toBeGreaterThan(40);
    }
  });
});

describe('getServiceBySlug', () => {
  it('returns the matching service for a known slug', () => {
    const service = getServiceBySlug('neuro-rehabilitation');
    expect(service).toBeDefined();
    expect(service?.name).toBe('Neuro Rehabilitation');
  });

  it('returns undefined for an unknown slug (used for 404 detection)', () => {
    expect(getServiceBySlug('does-not-exist')).toBeUndefined();
  });
});

describe('DELIVERY_PILLARS', () => {
  it('has exactly 4 pillars (one per delivery principle)', () => {
    expect(DELIVERY_PILLARS).toHaveLength(4);
  });

  it('every pillar has a title and description', () => {
    for (const p of DELIVERY_PILLARS) {
      expect(p.title.length).toBeGreaterThan(5);
      expect(p.description.length).toBeGreaterThan(20);
    }
  });
});

describe('HOME_STATS', () => {
  it('has exactly 4 home-page stats', () => {
    expect(HOME_STATS).toHaveLength(4);
  });

  it('every stat has value, label, and sub', () => {
    for (const s of HOME_STATS) {
      expect(s.value.length).toBeGreaterThan(0);
      expect(s.label.length).toBeGreaterThan(0);
      expect(s.sub.length).toBeGreaterThan(0);
    }
  });
});

describe('CONDITIONS_TREATED', () => {
  it('has at least 8 condition pills', () => {
    expect(CONDITIONS_TREATED.length).toBeGreaterThanOrEqual(8);
  });

  it('contains no empty strings or duplicates', () => {
    expect(CONDITIONS_TREATED).not.toContain('');
    expect(new Set(CONDITIONS_TREATED).size).toBe(CONDITIONS_TREATED.length);
  });
});

describe('WHY_CHOOSE', () => {
  it('has exactly 6 features (one per tile)', () => {
    expect(WHY_CHOOSE).toHaveLength(6);
  });

  it('every feature title is unique', () => {
    const titles = WHY_CHOOSE.map((w) => w.title);
    expect(new Set(titles).size).toBe(6);
  });
});
