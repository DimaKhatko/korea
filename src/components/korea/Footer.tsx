import type { ReactNode } from "react";
import { Logo } from "./Logo";

/* ---------- Copy and data (edit here; URLs as in the reference) */

const COPY = {
  description:
    "Подорож до Південної Кореї для підлітків та молоді: Сеул, Кьонджу, Пусан. Весняні канікули, березень 2027.",
  copyright: "© 2026 PointCamp. Усі права захищені.",
  privacy: {
    href: "https://drive.google.com/file/d/16D4I7OvCw2L4-G1QejjEtVx3G4P448ob/preview",
    text: "Обробка персональних даних",
  },
};

const SECTIONS: { href: string; text: string }[] = [
  { href: "#about", text: "Про подорож" },
  { href: "#why", text: "Чому з нами" },
  { href: "#route", text: "Маршрут" },
  { href: "#program", text: "Програма" },
  { href: "#price", text: "Вартість" },
  { href: "#contact", text: "Контакти" },
];

/**
 * Contact and social rows with a 40 px sticker icon: rounded square, colour cycling
 * lime / sakura / sun / white, white 3 px border, hard shadow, own tilt; stroke glyphs
 * copied from the reference.
 */
type IconLink = { href: string; text: string; bg: string; tilt: number; glyph: ReactNode };

const CONTACTS: IconLink[] = [
  {
    href: "tel:+380662217373",
    text: "+38 066 221 73 73",
    bg: "#c8f534",
    tilt: -8,
    glyph: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
  },
  {
    href: "https://t.me/point_camp",
    text: "Telegram",
    bg: "#ffb0c8",
    tilt: 6,
    glyph: (
      <>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22 11 13 2 9 22 2z" />
      </>
    ),
  },
  {
    href: "viber://chat?number=%2B380662217373",
    text: "Viber",
    bg: "#ffd41e",
    tilt: -4,
    glyph: (
      <>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </>
    ),
  },
  {
    href: "https://wa.me/+380662217373",
    text: "WhatsApp",
    bg: "#ffffff",
    tilt: 9,
    glyph: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  },
  {
    href: "mailto:contact@pointcamp.com.ua",
    text: "contact@pointcamp.com.ua",
    bg: "#c8f534",
    tilt: -6,
    glyph: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
  },
];

const SOCIALS: IconLink[] = [
  {
    href: "https://www.instagram.com/point_camp",
    text: "Instagram",
    bg: "#ffb0c8",
    tilt: -8,
    glyph: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="#121212" />
      </>
    ),
  },
  {
    href: "https://facebook.com/pointcamp",
    text: "Facebook",
    bg: "#ffd41e",
    tilt: 6,
    glyph: (
      <>
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      </>
    ),
  },
  {
    href: "https://t.me/pointcamp",
    text: "Telegram-канал",
    bg: "#ffffff",
    tilt: -4,
    glyph: (
      <>
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </>
    ),
  },
];

/** `wide`: the reference pins this item to 187 px from lg, so the line breaks there. */
const OTHER_PROGRAMS: { href: string; text: string; wide?: boolean }[] = [
  { href: "https://japan.pointcamp.com.ua/", text: "Подорож до Японії →" },
  { href: "https://croatia.pointcamp.com.ua/", text: "Літній табір у Хорватії →", wide: true },
];

/* ---------- */

/** http(s) links open in a new tab; anchors, tel:, viber: and mailto: stay in this one. */
const linkTarget = (href: string) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const LINK =
  "text-[15px] text-paper-light no-underline hover:text-lime hover:underline hover:underline-offset-[3px]";
const HEADING = "m-0 text-[13px] font-black tracking-[0.08em] text-[#bdb6a6] uppercase";

function IconList({ items }: { items: IconLink[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-[14px] p-0">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            {...linkTarget(item.href)}
            className={`${LINK} flex items-center gap-3`}
          >
            <span
              aria-hidden="true"
              className="box-content grid size-10 flex-none place-items-center rounded-[12px] border-[3px] border-white shadow-[3px_4px_0_rgba(0,0,0,0.45)]"
              style={{ background: item.bg, transform: `rotate(${item.tilt}deg)` }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#121212"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.glyph}
              </svg>
            </span>
            <span>{item.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Footer from 11-footer on ink. Below md: one column (brand, then the four lists), bottom
 * row stacked with the document link first. md–lg: 2 columns. From lg: 5 columns
 * 1.5fr 0.9fr 1.3fr 1fr 1fr; bottom row © left, document link right.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-sticker">
      <div className="mx-auto flex flex-col gap-8 px-5 pt-12 pb-8 md:max-w-[680px] md:gap-12 lg:max-w-[1280px] lg:px-10 lg:pt-[72px] lg:pb-9">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.3fr_1fr_1fr]">
          <div className="flex max-w-[360px] flex-col gap-[14px]">
            <Logo label="PointCamp" className="h-8 self-start text-white" />
            <p className="m-0 text-[15px] leading-[1.55] text-[#d7d1c3]">{COPY.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className={HEADING}>Розділи</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {SECTIONS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={LINK}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[14px]">
            <p className={HEADING}>Звʼязатися</p>
            <IconList items={CONTACTS} />
          </div>

          <div className="flex flex-col gap-[14px]">
            <p className={HEADING}>Соцмережі</p>
            <IconList items={SOCIALS} />
          </div>

          <div className="flex flex-col gap-3">
            <p className={HEADING}>Інші програми</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {OTHER_PROGRAMS.map((link) => (
                <li key={link.href} className={link.wide ? "lg:w-[187px]" : undefined}>
                  <a href={link.href} {...linkTarget(link.href)} className={LINK}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-[#3a3833] pt-5 md:flex-row md:flex-wrap md:justify-between md:gap-4 md:pt-6">
          <p className="m-0 text-[13px] text-[#bdb6a6]">{COPY.copyright}</p>
          <a
            href={COPY.privacy.href}
            {...linkTarget(COPY.privacy.href)}
            className={`${LINK} order-first md:order-none md:text-[13px]`}
          >
            {COPY.privacy.text}
          </a>
        </div>
      </div>
    </footer>
  );
}
