/* ---------- Copy (edit here; the JSON-LD FAQPage in src/routes/index.tsx reads this array) */

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "Коли виїжджаємо і повертаємося?",
    answer:
      "Виїзд із Києва — 18 березня. З 19 на 20 березня ночуємо в Європі, 20 березня вилітаємо з Будапешта або Варшави. У Кореї ми з 21 по 30 березня. 31 березня прилітаємо до Європи й одразу вирушаємо в Україну, 1 квітня — у Києві. Разом 15 днів, із них 10 — у Кореї.",
  },
  {
    question: "Хто супроводжує групу?",
    answer:
      "Щонайменше троє дорослих. Команда PointCamp їде з групою від Києва і до повернення, а в Кореї з нами наша людина: живе там, говорить корейською й українською та знає країну зсередини.",
  },
  {
    question: "Як оформлюється віза?",
    answer:
      "Громадянам України потрібна туристична віза C-3-9 — електронний дозвіл K-ETA для українців не діє. Візу оформлюємо з візовим агентом: ми надсилаємо детальну інструкцію, як подати документи через наших партнерів у Києві. Послуги агента — 100 €, оплачуються окремо.",
  },
  {
    question: "Як забронювати й оплатити?",
    answer: "Аванс — 1500 € під час бронювання. Решту, 1650 €, ви сплачуєте після отримання візи.",
  },
  {
    question: "Що, якщо відмовлять у візі?",
    answer:
      "Повертаємо аванс за поїздку повністю. Послуги візового агента (100 €) не повертаються.",
  },
  {
    question: "Як ми летимо?",
    answer:
      "З Будапешта або Варшави. Квитки бронюємо лише після того, як група отримає візи, тож ви не ризикуєте грошима за переліт. Оформлюють їх наші партнери, за переліт ви платите напряму їм — від 1200 €.",
  },
  {
    question: "Як дістатися до міста вильоту?",
    answer:
      "Дорогу з Києва до Будапешта чи Варшави і назад організовуємо ми: із супроводом PointCamp і ночівлею в готелі перед вильотом. Близько 310 €, оплачується окремо.",
  },
  {
    question: "Як харчуються діти?",
    answer:
      "Сніданок у готелі й ще один прийом їжі щодня — обід або вечеря, залежно від програми дня. Ще один прийом їжі на день дитина оплачує сама.",
  },
  {
    question: "Скільки дати кишенькових?",
    answer:
      "На ваш розсуд. Врахуйте, що один прийом їжі на день дитина оплачує сама. Орієнтир — близько 300 € включно із сувенірами.",
  },
  {
    question: "Чи входить страховка?",
    answer:
      "Так, стандартне туристичне страхування входить у вартість. Аптечка завжди з нами, з дрібними проблемами зі здоровʼям допоможемо на місці.",
  },
  {
    question: "Як ми тримаємо звʼязок із батьками?",
    answer:
      "Для батьків є окремий Telegram-канал із фотозвітами з поїздки. Також розповідаємо про поїздку в наших соцмережах.",
  },
  {
    question: "Як із мобільним звʼязком та інтернетом?",
    answer:
      "Найпростіше — eSIM для Кореї, наприклад від Airalo. Купуєте онлайн і встановлюєте вдома ще до виїзду, а в Кореї інтернет вмикається одразу після посадки. Пакети лише з інтернетом, без корейського номера, тож дзвонимо через Telegram чи Viber. Заздалегідь перевірте, чи телефон підтримує eSIM. Wi-Fi також є в готелях, метро й більшості кафе.",
  },
  {
    question: "Чи можуть поїхати батьки?",
    answer:
      "Так, якщо вам підходить наша програма. Вартість та сама — 3150 €. Одномісне проживання коштує дорожче, ціну назвемо на запит.",
  },
];

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
