/**
 * Placeholder: final CTA with the lead form from 10-form (#contact, form #form).
 * The empty #form target keeps the «Заявка» links working until the form is built.
 */
export function FinalCTA() {
  return (
    <section
      id="contact"
      className="pk-paper border-t border-line px-5 py-space-10 md:px-10 md:py-space-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-[30px] leading-[1.05] font-black md:text-h2">FinalCTA · Заявка</h2>
        <p className="mt-space-2 text-body-sm text-ink-soft">Заглушка секції</p>
        <div id="form" />
      </div>
    </section>
  );
}
