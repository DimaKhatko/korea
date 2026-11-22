import heartSticker from "@/assets/korea/sticker-heart-red.png";
import { GROUP_PHOTO } from "@/lib/korea";
import { PaperDivider } from "./PaperDivider";

/* ---------- Copy and data (edit here; the client will rewrite this section's copy) */

const COPY = {
  eyebrow: "Чому з нами",
  title: "Табори й подорожі для дітей і підлітків з 2011 року",
  intro: "Азія — наш новий напрямок: після трьох груп у Японії відкриваємо Корею і Китай.",
  photoCaption: "Група PointCamp у Японії",
};

type Stat = { value: string; text: string; lime?: boolean };

const STATS: Stat[] = [
  { value: "з 2011", text: "Організовуємо табори й подорожі для дітей і підлітків уже 15 років." },
  { value: "6000+", text: "учасників пройшли через наші табори й подорожі." },
  { value: "51", text: "мандрівник уже побував з нами в Японії за три поїздки.", lime: true },
  { value: "3 країни", text: "Азії у 2027: Японія, Корея і Китай." },
];

/**
 * Group photo: drop a file named photo-pointcamp-group.(webp|jpg|jpeg|png) into
 * src/assets/korea/ and it replaces the dashed «[ФОТО]» box on the next build.
 * The frame keeps its size (4:3 below lg, column height from lg), the photo is cropped to fit.
 */
const groupPhotoFiles = import.meta.glob<string>(
  "../../assets/korea/photo-pointcamp-group.{webp,jpg,jpeg,png}",
  { eager: true, query: "?url", import: "default" },
);
const groupPhotoSrc: string | undefined = Object.values(groupPhotoFiles)[0];

/**
 * Why-us from 03-why-us (#why): paper divider with the heart, intro, four stat cards and
 * the group photo slot. Below lg: one column, photo above the stats. From lg: text and
 * stats on the left, photo on the right spanning both rows (min 520 px).
 */
export function WhyUs() {
  return (
    <section id="why" className="pk-paper relative">
      <PaperDivider sticker={heartSticker} side="right" />
      <div className="mx-auto px-5 py-16 md:max-w-[680px] lg:max-w-[1280px] lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
              {COPY.eyebrow}
            </p>
            <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
              {COPY.title}
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:text-[19px]">
              {COPY.intro}
            </p>
          </div>

          {groupPhotoSrc ? (
            <figure className="m-0 aspect-[4/3] w-full overflow-hidden rounded-sm border-2 border-ink bg-paper-light lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[520px]">
              <img
                src={groupPhotoSrc}
                alt={COPY.photoCaption}
                width={1200}
                height={900}
                loading="lazy"
                className="block size-full object-cover"
              />
            </figure>
          ) : (
            <figure className="m-0 grid aspect-[4/3] w-full place-items-center rounded-sm border-2 border-dashed border-ink-line bg-paper-light p-6 text-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[520px]">
              <figcaption className="text-[15px] leading-[1.5] font-bold text-ink-soft">
                {GROUP_PHOTO}
                <br />
                {COPY.photoCaption}
              </figcaption>
            </figure>
          )}

          <div className="grid grid-cols-2 gap-3 lg:col-start-1 lg:row-start-2 lg:gap-5 lg:self-start">
            {STATS.map((stat) => (
              <article
                key={stat.value}
                className={`pk-card flex flex-col gap-2 p-4 lg:p-6 ${stat.lime ? "bg-lime" : ""}`}
              >
                <p className="m-0 text-[32px] leading-none font-black tracking-[-0.02em] lg:text-[48px]">
                  {stat.value}
                </p>
                <p
                  className={`m-0 text-[14px] leading-[1.5] lg:text-[15px] ${stat.lime ? "text-ink" : "text-ink-soft"}`}
                >
                  {stat.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
