// Unit tests for `lib/facilities.ts`.
//
// The Facilities page renders one card per entry. If a title is missing
// or a duplicate title maps to the wrong icon, the page renders wrong.

// Stub Icon.tsx so this file doesn't pull in JSX.
// (vi.mock is hoisted, so the stubs must be inlined in the factory.)
import { describe, it, expect, vi } from 'vitest';

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

import { FACILITIES, getFacilityIcon } from './facilities';

describe('FACILITIES catalogue', () => {
  it('has at least 6 facility entries', () => {
    expect(FACILITIES.length).toBeGreaterThanOrEqual(6);
  });

  it('every facility has a unique title and a description', () => {
    const titles = FACILITIES.map((f) => f.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const f of FACILITIES) {
      expect(f.title.length).toBeGreaterThan(3);
      expect(f.description.length).toBeGreaterThan(20);
    }
  });
});

describe('getFacilityIcon', () => {
  it('returns an icon component for a known title', () => {
    const Icon = getFacilityIcon('Therapy Gyms');
    expect(Icon).toBeDefined();
    expect(typeof Icon).toBe('function');
  });

  it('returns undefined for a title not in the icon map', () => {
    // The function should degrade gracefully — never throw.
    expect(getFacilityIcon('Nonexistent Facility XYZ')).toBeUndefined();
  });

  it('every facility title in the catalogue has an icon mapping', () => {
    // This is the test that catches "added a new facility but forgot to
    // wire up its icon".
    for (const f of FACILITIES) {
      const Icon = getFacilityIcon(f.title);
      expect(Icon, `Facility "${f.title}" has no icon mapping`).toBeDefined();
    }
  });
});
