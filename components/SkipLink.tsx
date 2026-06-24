/**
 * "Skip to main content" link (WCAG 2.4.1 Bypass Blocks).
 *
 * Hidden by default; visible when focused via keyboard.
 * Renders before <SiteHeader> so it's the first focusable element on the page.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed top-3 left-3 z-50 inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to main content
    </a>
  );
}
