import type { MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly { href: string; label: string }[];
  onLinkClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
  onCloseAutoFocus: (event: Event) => void;
};

/**
 * Mobile menu sheet (Radix Dialog: focus trap, Escape, scroll lock). Lazy-loaded by Header
 * on the first burger tap, so Radix stays out of the initial JS; its content is never in
 * the prerendered HTML anyway (closed portal).
 */
export default function MobileMenu({
  open,
  onOpenChange,
  links,
  onLinkClick,
  onCloseAutoFocus,
}: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 lg:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={onCloseAutoFocus}
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
              {links.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <a
                    href={link.href}
                    onClick={(event) => onLinkClick(event, link.href)}
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
            onClick={(event) => onLinkClick(event, "#form")}
          >
            Залишити заявку
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
