import { Suspense, lazy, useRef, useState, type MouseEvent } from "react";
import { Logo } from "./Logo";

const loadMenu = () => import("./MobileMenu");
const MobileMenu = lazy(loadMenu);
/** Start fetching the menu chunk as soon as the burger is hovered, touched or focused. */
const preloadMenu = () => void loadMenu();

/**
 * Section anchors shown in the desktop nav and in the mobile menu. `wideOnly`: in the
 * desktop nav only from xl (1280 px); below that the inline row has no room for it (the
 * mobile menu always lists it).
 */
const NAV_LINKS: readonly { href: string; label: string; wideOnly?: boolean }[] = [
  { href: "#about", label: "Про подорож" },
  { href: "#route", label: "Маршрут" },
  { href: "#program", label: "Програма" },
  { href: "#price", label: "Вартість" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#faq", label: "Питання", wideOnly: true },
];

/**
 * Site header from 01-header-hero.
 * Below lg: sticky paper bar with hairline, «Заявка» and a burger that opens the menu sheet
 * (MobileMenu, lazy-loaded on the first tap).
 * From lg: logo, inline anchors and «Залишити заявку»; not sticky (as in the desktop reference).
 */
export function Header() {
  const [open, setOpen] = useState(false);
  // The lazy menu is mounted on the first open and stays mounted (keeps its close animation).
  const [menuRequested, setMenuRequested] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  // Anchor picked in the menu: scrolled to once the sheet has closed and released the scroll lock.
  const pendingHash = useRef<string | null>(null);

  function onMenuLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }

  function onMenuCloseAutoFocus(event: Event) {
    event.preventDefault();
    const hash = pendingHash.current;
    // Closed with Escape, the overlay or the close button: focus goes back to the burger.
    if (!hash) {
      burgerRef.current?.focus();
      return;
    }
    pendingHash.current = null;
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.history.pushState(null, "", hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  return (
    <header className="pk-paper sticky top-0 z-40 border-b border-line max-lg:bg-none lg:static lg:border-b-0">
      <div className="mx-auto flex items-center justify-between gap-3 px-5 py-3 md:max-w-[680px] lg:max-w-[1360px] lg:flex-wrap lg:gap-6 lg:px-10 lg:py-5">
        <a href="#top" aria-label="PointCamp — на початок сторінки" className="block leading-none">
          <Logo className="h-6 text-ink lg:h-[30px]" />
        </a>

        <nav aria-label="Розділи сторінки" className="hidden flex-wrap gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[16px] font-bold no-underline hover:underline hover:underline-offset-4 ${link.wideOnly ? "hidden xl:inline" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Short label between lg and xl, where the full one would push the button onto a
            second row; the accessible name is always the full label. */}
        <a
          className="pk-btn pk-btn--ink hidden min-h-12 lg:inline-flex"
          href="#form"
          aria-label="Залишити заявку"
        >
          <span className="xl:hidden">Заявка</span>
          <span className="hidden xl:inline">Залишити заявку</span>
        </a>

        <div className="flex items-center gap-2.5 lg:hidden">
          <a className="pk-btn pk-btn--ink min-h-11 px-4 text-[15px]" href="#form">
            Заявка
          </a>

          <button
            ref={burgerRef}
            type="button"
            aria-label="Відкрити меню"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => {
              setMenuRequested(true);
              setOpen(true);
            }}
            onPointerEnter={preloadMenu}
            onTouchStart={preloadMenu}
            onFocus={preloadMenu}
            className="grid size-11 cursor-pointer place-items-center rounded-sm border-2 border-ink bg-sticker"
          >
            <BurgerIcon />
          </button>
          {menuRequested && (
            <Suspense fallback={null}>
              <MobileMenu
                open={open}
                onOpenChange={setOpen}
                links={NAV_LINKS}
                onLinkClick={onMenuLinkClick}
                onCloseAutoFocus={onMenuCloseAutoFocus}
              />
            </Suspense>
          )}
        </div>
      </div>
    </header>
  );
}

function BurgerIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <path
        d="M1 1h18M1 7h18M1 13h18"
        stroke="#121212"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
