import type { CSSProperties } from "react";
import { responsive, type Responsive } from "@/lib/responsive";
import planeHolo from "@/assets/korea/plane-holo.webp";
import stampUnesco from "@/assets/korea/stamp-unesco.webp";

/* ---------- Copy and data (edit here)
 * Programme for the single group 21–30.03.2027, day texts as supplied by the client.
 * Softened facts, keep as written: day 5 Lotte World without Magic Pass details (rules
 * changed in 2026); day 7 no cable car promise (Сондо may close for maintenance in March),
 * «прогулянка узбережжям Сондо» instead; drone show «якщо дозволить погода». */

type Photo = { img: Responsive; alt: string };

/** Rendered photo width: full card width below lg (max 590 px), the 340 px column from lg. */
const PHOTO_SIZES = "(min-width: 1024px) 340px, (min-width: 680px) 590px, calc(100vw - 90px)";

type CityRow = {
  type: "city";
  kr: string;
  name: string;
  /** Tilted paper label, e.g. «Дні 1–4». */
  label: string;
  /** UNESCO stamp after the label (Gyeongju). */
  stamp?: boolean;
};

type DayRow = {
  type: "day";
  day: number;
  /** Korean day name (첫째 날 …), decorative. */
  kr: string;
  title: string;
  text: string;
  tags: string[];
  /** null: no photo (arrival day 1, departure day 10): the plane sticker replaces the number
   * on the rail and fills the media area. */
  photo: Photo | null;
};

/** Timeline in order: city header rows followed by their days. */
const TIMELINE: (CityRow | DayRow)[] = [
  { type: "city", kr: "서울", name: "Сеул", label: "Дні 1–5" },
  {
    type: "day",
    day: 1,
    kr: "첫째 날",
    title: "Приліт до Сеула",
    text: "Прилітаємо в аеропорт Інчхон, там нас зустрічає наша людина в Кореї, і заселяємося в готель. Перший день — на адаптацію до часового поясу: брифінг про правила й безпеку, знайомство з містом, перша спільна вечеря.",
    tags: ["Інчхон", "Брифінг", "Адаптація"],
    photo: null,
  },
  {
    type: "day",
    day: 2,
    kr: "둘째 날",
    title: "Естетика стародавнього Сеула",
    text: "Одягаємо ханбоки й ідемо на фотосесію до палацу Кьонбоккун, дивимося зміну королівської варти, гуляємо ханоковим селом Пукчхон і пробуємо стріт-фуд в Інсадоні.",
    tags: ["Ханбок", "Кьонбоккун", "Інсадон"],
    photo: {
      img: responsive("photo-seoul-hanbok"),
      alt: "Дівчата в ханбоках біля палацу Кьонбоккун",
    },
  },
  {
    type: "day",
    day: 3,
    kr: "셋째 날",
    title: "K-pop вайб і панорама",
    text: "Кампус-тур Korea University, пробуємо себе в K-pop в AR-залах HiKR Ground, гуляємо ханоковими провулками Іксондону, а на захід сонця піднімаємося на N Seoul Tower.",
    tags: ["Korea University", "HiKR Ground", "N Seoul Tower"],
    photo: {
      img: responsive("photo-seoul-korea-university"),
      alt: "Головний корпус Korea University",
    },
  },
  {
    type: "day",
    day: 4,
    kr: "넷째 날",
    title: "Гангнам і футуризм",
    text: "KWANGYA від SM, пікнік у парку Йоідо Ханган біля річки, а ввечері COEX, бібліотека Starfield і вулиці Gangnam Style.",
    tags: ["KWANGYA", "Йоідо", "Starfield"],
    photo: {
      img: responsive("photo-seoul-han-river"),
      alt: "Річка Хан і квартали Сеула",
    },
  },
  {
    type: "day",
    day: 5,
    kr: "다섯째 날",
    title: "Lotte World на весь день",
    text: "Цілий день у парку розваг Lotte World. За бажанням — фото в корейській шкільній формі.",
    tags: ["Lotte World", "Шкільна форма"],
    photo: {
      img: responsive("photo-seoul-lotte-world"),
      alt: "Атракціони Lotte World серед квітучих дерев",
    },
  },
  { type: "city", kr: "경주", name: "Кьонджу", label: "День 6", stamp: true },
  {
    type: "day",
    day: 6,
    kr: "여섯째 날",
    title: "Кьонджу — корейська «машина часу»",
    text: "KTX до стародавньої столиці королівства Сілла і тур місцями ЮНЕСКО: храм Пульгукса, грот Соккурам, зелені пагорби-гробниці королів. Увечері переїжджаємо до Пусана.",
    tags: ["KTX", "ЮНЕСКО", "Сілла"],
    photo: {
      img: responsive("photo-gyeongju-tombs"),
      alt: "Пагорби-гробниці королів Сілла в Кьонджу",
    },
  },
  { type: "city", kr: "부산", name: "Пусан", label: "Дні 7–8" },
  {
    type: "day",
    day: 7,
    kr: "일곱째 날",
    title: "Пусан — місто океану",
    text: "Пляж Хеунде, океан зі 100-го поверху Busan X the Sky, кольорові вулички Камчхону і прогулянка узбережжям Сондо. Увечері — пляж Кваналлі і шоу дронів над мостом, якщо дозволить погода.",
    tags: ["X the Sky", "Камчхон", "Шоу дронів"],
    photo: {
      img: responsive("photo-busan-drone-show"),
      alt: "Пляж Хеунде у Пусані: океан і хмарочоси",
    },
  },
  {
    type: "day",
    day: 8,
    kr: "여덟째 날",
    title: "ARTE Museum і стежка над океаном",
    text: "Пляжний поїзд Blueline Park уздовж узбережжя, цифрові зали ARTE Museum Busan і прибережна стежка Ігіде на захід сонця.",
    tags: ["Blueline Park", "ARTE Museum", "Ігіде"],
    photo: {
      img: responsive("photo-busan-arte-museum"),
      alt: "Зал ARTE Museum з проєкціями квітів",
    },
  },
  { type: "city", kr: "서울", name: "Сеул", label: "Дні 9–10" },
  {
    type: "day",
    day: 9,
    kr: "아홉째 날",
    title: "Шопінг і прощальна вечеря",
    text: "Повертаємося до Сеула, останній шопінг — канцелярія, косметика, K-pop альбоми — і прощальна вечеря всією групою.",
    tags: ["Сеул", "Шопінг", "Прощальна вечеря"],
    photo: {
      img: responsive("photo-seoul-shop"),
      alt: "Мьондон удень: магазини косметики й канцелярії ART BOX",
    },
  },
  {
    type: "day",
    day: 10,
    kr: "열째 날",
    title: "Виліт до Європи",
    text: "Збираємо валізи, прощаємося з Кореєю і летимо додому з новими друзями та історіями.",
    tags: ["Виліт"],
    photo: null,
  },
];

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * Program from 08-program (#program): one <ol> timeline with a background-gradient rail
 * (rail column 44 px below lg, 72 px from lg; the line runs from 40 px below the top to
 * 40 px above the bottom). City header rows carry a ringed dot, day rows a number circle.
 * Cards: photo 16:9 on top below lg; from lg a 340 px photo column (min 230 px tall) next
 * to the body. Content max width 1080 px from lg.
 */
export function Program() {
  return (
    <section
      id="program"
      className="pk-paper border-t border-line"
    >
      <div className="mx-auto flex flex-col gap-6 pt-16 pr-3.5 pb-16 pl-3 md:max-w-[680px] lg:max-w-[1080px] lg:gap-10 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-4 pr-1.5 pl-2 lg:max-w-[760px] lg:gap-5 lg:px-0">
          <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
            <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
              일정
            </span>
            <span>Програма</span>
          </p>
          <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
            Плани на кожен день
          </h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:text-[19px]">
            Щодня нові локації, цікава їжа, яскраві емоції.
          </p>
        </div>

        <ol className="m-0 list-none bg-[linear-gradient(#121212,#121212)] bg-[size:3px_calc(100%_-_80px)] bg-[position:20.5px_40px] bg-no-repeat p-0 lg:bg-[position:34.5px_40px]">
          {TIMELINE.map((row) =>
            row.type === "city" ? (
              <CityHeader key={`${row.name}-${row.label}`} row={row} />
            ) : (
              <DayItem key={row.day} row={row} />
            ),
          )}
        </ol>
      </div>
    </section>
  );
}

function CityHeader({ row }: { row: CityRow }) {
  return (
    <li className="grid grid-cols-[44px_1fr] items-center gap-4 pt-5 pb-2 lg:grid-cols-[72px_1fr]">
      <span className="grid place-items-center">
        <span
          aria-hidden="true"
          className="size-[26px] rounded-full border-4 border-ink bg-sticker lg:size-[30px]"
        />
      </span>
      <div className="flex flex-wrap items-end gap-[14px]">
        <p className="pk-kr text-[44px] lg:text-[72px]" lang="ko">
          {row.kr}
        </p>
        <p className="pk-city text-[36px] lg:text-[64px]">{row.name}</p>
        <span className="pk-label mb-1" style={tilt(-2)}>
          <span>{row.label}</span>
        </span>
        {row.stamp && (
          <img
            className="pk-sticker w-[86px] lg:w-[153px]"
            src={stampUnesco}
            alt="Штамп «ЮНЕСКО»: памʼятки Кьонджу входять до Світової спадщини"
            width={336}
            height={83}
            loading="lazy"
            decoding="async"
            style={tilt(-6)}
          />
        )}
      </div>
    </li>
  );
}

function DayItem({ row }: { row: DayRow }) {
  /** Days without a photo (arrival, departure) show the plane on the rail and in the media area. */
  const isTravelDay = row.photo === null;
  return (
    <li className="grid grid-cols-[44px_1fr] items-start gap-4 py-2.5 lg:grid-cols-[72px_1fr]">
      <span className="grid place-items-center pt-3.5 lg:pt-6">
        {isTravelDay ? (
          <img
            className="pk-sticker block w-[52px] lg:w-16"
            src={planeHolo}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            decoding="async"
            style={tilt(0)}
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-ink text-[16px] font-black text-sticker lg:size-12 lg:text-[21px]"
          >
            {row.day}
          </span>
        )}
      </span>
      <article className="pk-card flex flex-col lg:grid lg:grid-cols-[340px_1fr] lg:items-stretch">
        <div className="relative aspect-video overflow-hidden bg-paper-light lg:aspect-auto lg:min-h-[230px]">
          {row.photo ? (
            <img
              src={row.photo.img.src}
              srcSet={row.photo.img.srcSet}
              sizes={PHOTO_SIZES}
              alt={row.photo.alt}
              width={row.photo.img.width}
              height={row.photo.img.height}
              loading="lazy"
              decoding="async"
              className="block size-full object-cover"
            />
          ) : (
            <span className="grid size-full place-items-center">
              <img
                className="pk-sticker w-[110px]"
                src={planeHolo}
                alt=""
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
                style={tilt(0)}
              />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4 lg:px-[26px] lg:py-[22px]">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-[13px] font-black tracking-[0.06em] uppercase">
              День {row.day}
            </span>
            <span className="pk-day__kr" lang="ko" aria-hidden="true">
              {row.kr}
            </span>
          </div>
          <h3 className="m-0 text-[19px] leading-[1.2] font-[750] lg:text-[22px]">{row.title}</h3>
          <p className="m-0 text-[15px] leading-[1.55] text-ink-soft">{row.text}</p>
          <div className="pk-day__tags mt-2 flex flex-wrap gap-2">
            {row.tags.map((tag) => (
              <span key={tag} className="pk-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}
