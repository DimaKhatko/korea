/**
 * Placeholder: site header from 01-header-hero (sticky on mobile). Rendered as the
 * <header> landmark; it has no anchor of its own (the hero below is #top).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper px-5 py-3 md:px-10">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
        <p className="m-0 text-label uppercase">Header</p>
        <a className="pk-btn pk-btn--ink" href="#form">
          Заявка
        </a>
      </div>
    </header>
  );
}
