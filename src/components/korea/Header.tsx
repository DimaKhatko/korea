import { useRef, useState, type MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Logo } from "./Logo";

/** Section anchors shown in the desktop nav and in the mobile menu. */
const NAV_LINKS = [
  { href: "#about", label: "Про подорож" },
  { href: "#route", label: "Маршрут" },
  { href: "#program", label: "Програма" },
  { href: "#price", label: "Вартість" },
  { href: "#reviews", label: "Відгуки" },
] as const;

/**
 * Site header from 01-header-hero.
 * Below lg: sticky paper bar with hairline, «Заявка» and a burger that opens the menu sheet.
 * From lg: logo, inline anchors and «Залишити заявку»; not sticky (as in the desktop reference).
 */
export function Header() {
  const [open, setOpen] = useState(false);
  // Anchor picked in the menu: scrolled to once the sheet has closed and released the scroll lock.
  const pendingHash = useRef<string | null>(null);

  function onMenuLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }

  function onMenuCloseAutoFocus(event: Event) {
    const hash = pendingHash.current;
    if (!hash) return;
    pendingHash.current = null;
    event.preventDefault();
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
              className="text-[16px] font-bold no-underline hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="pk-btn pk-btn--ink hidden min-h-12 lg:inline-flex" href="#form">
          Залишити заявку
        </a>

        <div className="flex items-center gap-2.5 lg:hidden">
          <a className="pk-btn pk-btn--ink min-h-11 px-4 text-[15px]" href="#form">
            Заявка
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              type="button"
              aria-label="Відкрити меню"
              className="grid size-11 cursor-pointer place-items-center rounded-sm border-2 border-ink bg-sticker"
            >
              <BurgerIcon />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 lg:hidden" />
              <Dialog.Content
                aria-describedby={undefined}
                onCloseAutoFocus={onMenuCloseAutoFocus}
                className="pk-paper fixed inset-y-0 box-border right-0 z-50 flex w-[min(100%,360px)] flex-col gap-6 overflow-y-auto border-l-2 border-ink px-5 pt-3 pb-8 motion-safe:duration-200 motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:slide-out-to-right motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:slide-in-from-right lg:hidden"
              >
                <div className="flex min-h-[50px] items-center justify-between gap-3">
                  <Dialog.Title className="m-0 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
                    Меню
                  </Dialog.Title>
                  <Dialog.Close
                    type="button"
                    aria-label="Закрити меню"
                    className="grid size-11 cursor-pointer place-items-center rounded-sm border-2 border-ink bg-sticker"
                  >
                    <CloseIcon />
                  </Dialog.Close>
                </div>

                <nav aria-label="Розділи сторінки">
                  <ul className="m-0 list-none border-t-2 border-ink p-0">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href} className="border-b border-line">
                        <a
                          href={link.href}
                          onClick={(event) => onMenuLinkClick(event, link.href)}
                          className="flex min-h-14 items-center text-[22px] font-black no-underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <a
                  className="pk-btn box-border min-h-14 w-full"
                  href="#form"
                  onClick={(event) => onMenuLinkClick(event, "#form")}
                >
                  Залишити заявку
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M2 2l14 14M16 2L2 16"
        stroke="#121212"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
