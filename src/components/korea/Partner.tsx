/* ---------- Copy (edit here; the client will rewrite this section) */

const COPY = {
  kr: "함께",
  krCaption: "Разом",
  title: "Ми робимо цю подорож разом із Корейсько-українським центром",
  body: "Тому в Кореї у групи щодня свій супровід: перекладач центру весь час поруч.",
  points: [
    {
      kr: "통역",
      title: "Перекладач щодня з групою",
      text: "У музеях, кафе, метро і готелі — без «на пальцях».",
    },
    {
      kr: "문화",
      title: "Пояснює Корею зсередини",
      text: "Звичаї, меню, правила поведінки — до того, як виникне питання.",
    },
    {
      kr: "팀",
      title: "Плюс команда PointCamp",
      text: "Щонайменше троє дорослих, які відповідають за дітей.",
    },
  ],
};

/**
 * Partner from 06-partner (#partner): one lime panel (the only lime area on its screen)
 * with ink border and hard shadow. Below lg: stacked, padding 28/22. From lg: two columns,
 * padding 56 (left: 함께, heading, body; right: the three points).
 */
export function Partner() {
  return (
    <section id="partner" className="pk-paper border-t border-line">
      <div className="mx-auto px-5 py-16 md:max-w-[680px] lg:max-w-[1280px] lg:px-10 lg:py-24">
        <div className="flex flex-col gap-[18px] rounded-sm border-2 border-ink bg-lime px-[22px] py-7 text-on-lime shadow-hard lg:grid lg:grid-cols-2 lg:items-start lg:gap-14 lg:p-14">
          <div className="flex flex-col gap-[18px] lg:gap-[22px]">
            <div className="flex flex-col gap-1.5 lg:gap-2">
              <p
                lang="ko"
                aria-hidden="true"
                className="m-0 font-kr text-[88px] leading-[0.9] lg:text-[140px]"
              >
                {COPY.kr}
              </p>
              <p className="m-0 text-[14px] font-black tracking-[0.06em] uppercase">
                {COPY.krCaption}
              </p>
            </div>
            <h2 className="m-0 text-[28px] leading-[1.08] font-black tracking-[-0.01em] lg:text-[40px] lg:leading-[1.05]">
              {COPY.title}
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] lg:text-[19px]">{COPY.body}</p>
          </div>

          <ul className="m-0 mt-1 flex list-none flex-col gap-4 p-0 lg:mt-0 lg:gap-6">
            {COPY.points.map((point) => (
              <li
                key={point.kr}
                className="grid grid-cols-[56px_1fr] items-start gap-[14px] border-t-2 border-ink pt-4"
              >
                <span lang="ko" aria-hidden="true" className="font-kr text-[22px] leading-[1.2]">
                  {point.kr}
                </span>
                <span className="flex flex-col gap-1">
                  <strong className="text-[17px] leading-[1.25] font-black lg:text-[20px]">
                    {point.title}
                  </strong>
                  <span className="text-[15px] leading-[1.5]">{point.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
