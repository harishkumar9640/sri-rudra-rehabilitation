import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Accessible button / link primitives.
 *
 * HCI rules baked in:
 *  - minimum 44×44 px tap target (WCAG 2.5.5 / Apple HIG)
 *  - visible focus ring (WCAG 2.4.7)
 *  - distinct hover state with subtle motion cue (Nielsen #6)
 *  - explicit `active:` press feedback (Material Design)
 *  - cursor pointer for affordance (Don Norman)
 *  - disabled state with reduced opacity + not-allowed cursor
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'phone';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg ' +
  'transition-all duration-200 ease-out ' +
  'min-h-[44px] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ' +
  'active:scale-[0.98] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 shadow-sm',
  secondary:
    'bg-white text-brand-900 border border-brand-200 hover:border-teal-600 hover:text-teal-700 hover:shadow-md hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1ebe5b] hover:shadow-md hover:-translate-y-0.5 shadow-sm',
  phone:
    'bg-brand-800 text-white hover:bg-brand-900 hover:shadow-md hover:-translate-y-0.5 shadow-sm',
};

const SIZE: Record<Size, string> = {
  md: 'px-5 text-sm',
  lg: 'px-7 text-base',
};

function classes(variant: Variant, size: Size, extra?: string) {
  return [BASE, VARIANT[variant], SIZE[size], extra].filter(Boolean).join(' ');
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

/** Native <button> — use for actions that don't navigate. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={classes(variant, size, [fullWidth && 'w-full', className].filter(Boolean).join(' '))}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

/** <Link> styled as a button — use for in-app navigation. */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      {...rest}
      className={classes(variant, size, [fullWidth && 'w-full', className].filter(Boolean).join(' '))}
    >
      {children}
    </Link>
  );
}

type AnchorButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

/** <a> styled as a button — use for tel:, mailto:, WhatsApp, external URLs. */
export function AnchorButton({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...rest
}: AnchorButtonProps) {
  return (
    <a
      {...rest}
      className={classes(variant, size, [fullWidth && 'w-full', className].filter(Boolean).join(' '))}
    >
      {children}
    </a>
  );
}

/**
 * Inline text link — underlined, teal, with hover/focus affordance.
 * Use for inline references inside paragraphs (e.g. "Learn more →").
 */
export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        'font-medium text-teal-700 underline underline-offset-4 decoration-teal-600/40',
        'hover:text-teal-900 hover:decoration-teal-700',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 rounded-sm',
        'transition-colors',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  );
}
