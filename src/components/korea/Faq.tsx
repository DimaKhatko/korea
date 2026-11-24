import { FAQ } from "@/lib/faq";

/**
 * FAQ (#faq), between Price and the lead form. Native <details> (first one open), no JS
 * accordion, so every answer is in the prerendered HTML for crawlers and AI search. The
 * +/× icon and marker reset are the `.kr-faq` rules in src/styles.css.
 * Below 960 px (60rem): one column. From 960 px: 1fr / 1.9fr, the left column sticks at 96 px.
 */
export function Faq() {
  return (
    <section id="faq" className="pk-paper border-t border-line">
      <div className="mx-auto flex flex-col gap-6 px-5 py-16 md:max-w-[680px] min-[60rem]:grid min-[60rem]:max-w-[1280px] min-[60rem]:grid-cols-[1fr_1.9fr] min-[60rem]:items-start min-[60rem]:gap-14 min-[60rem]:px-10 min-[60rem]:py-24">
        <div className="flex flex-col gap-5 min-[60rem]:sticky min-[60rem]:top-24">
          <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
            <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
              질문
            </span>
            <span>Питання</span>
          </p>
          <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] min-[60rem]:text-[40px]">
            Часті питання батьків
          </h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft min-[60rem]:text-[19px]">
            Не знайшли відповіді?{" "}
            <a href="#form" className="font-bold text-ink underline underline-offset-[3px]">
              Залиште заявку
            </a>{" "}
            — ми зателефонуємо й усе розповімо.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {FAQ.map((item, i) => (
            <details key={item.question} className="kr-faq pk-card" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-[18px] text-[17px] leading-[1.3] font-extrabold min-[60rem]:text-[19px]">
                {item.question}
              </summary>
              <p className="m-0 px-5 pb-5 text-[15px] leading-[1.55] text-ink-soft min-[60rem]:text-[16px]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
