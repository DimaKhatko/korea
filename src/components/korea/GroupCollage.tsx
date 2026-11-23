import type { CSSProperties } from "react";
import pcTokyo from "@/assets/korea/pointcamp/pc-tokyo.webp";
import pcCroatiaKayak from "@/assets/korea/pointcamp/pc-croatia-kayak.webp";
import pcWinter from "@/assets/korea/pointcamp/pc-winter.webp";
import pcNara from "@/assets/korea/pointcamp/pc-nara.webp";
import pcAdriatic from "@/assets/korea/pointcamp/pc-adriatic.webp";
import pcShibuya from "@/assets/korea/pointcamp/pc-shibuya.webp";

/* ---------- Data (edit here). Own PointCamp photos from past trips and camps, all square. */

type Box = { top: string; left: string; width: string };

type CollagePhoto = {
  src: string;
  alt: string;
  label: string;
  tilt: number;
  /** Position in % of the collage box. `mobile: false` hides the photo below lg. */
  mobile: false | Box;
  desktop: Box;
};

const PHOTOS: CollagePhoto[] = [
  {
    src: pcTokyo,
    alt: "Група PointCamp стрибає на набережній у Токіо",
    label: "Токіо",
    tilt: -4,
    mobile: { top: "0%", left: "0%", width: "56%" },
    desktop: { top: "0%", left: "0%", width: "37%" },
  },
  {
    src: pcCroatiaKayak,
    alt: "Учасники табору PointCamp з каяками на березі моря в Хорватії",
    label: "Хорватія",
    tilt: 4,
    mobile: { top: "3%", left: "44%", width: "56%" },
    desktop: { top: "3%", left: "32%", width: "36%" },
  },
  {
    src: pcWinter,
    alt: "Зимовий табір PointCamp: група обіймається на засніженому полі",
    label: "Зимовий табір",
    tilt: -2,
    mobile: { top: "52%", left: "22%", width: "56%" },
    desktop: { top: "0%", left: "63%", width: "37%" },
  },
  {
    src: pcNara,
    alt: "Учасники PointCamp фотографують оленів у Нарі",
    label: "Нара",
    tilt: 3,
    mobile: false,
    desktop: { top: "50%", left: "2%", width: "35%" },
  },
  {
    src: pcAdriatic,
    alt: "Дівчата з табору PointCamp на заході сонця біля Адріатики",
    label: "Адріатика",
    tilt: -3,
    mobile: false,
    desktop: { top: "53%", left: "33%", width: "35%" },
  },
  {
    src: pcShibuya,
    alt: "Група PointCamp увечері на Сібуї в Токіо",
    label: "Сібуя",
    tilt: 5,
    mobile: false,
    desktop: { top: "49%", left: "64%", width: "36%" },
  },
];

const vars = (p: CollagePhoto) =>
  ({
    "--tilt": `${p.tilt}deg`,
    ...(p.mobile ? { "--m-top": p.mobile.top, "--m-left": p.mobile.left, "--m-w": p.mobile.width } : {}),
    "--d-top": p.desktop.top,
    "--d-left": p.desktop.left,
    "--d-w": p.desktop.width,
  }) as CSSProperties;

/**
 * Polaroid collage of PointCamp photos for the why-us slot. Below lg: 3 photos.
 * From lg: 6 photos; the box starts a bit lower than the heading and stretches down to the
 * bottom of the stat cards. Positions are in %, nothing is cropped when the column resizes.
 */
export function GroupCollage({ caption }: { caption: string }) {
  return (
    <figure className="relative m-0 aspect-[10/14] w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-14 lg:aspect-auto lg:min-h-[520px]">
      {PHOTOS.map((p) => (
        <div
          key={p.label}
          className={`pk-collage__item absolute ${p.mobile ? "" : "hidden lg:block"}`}
          style={vars(p)}
        >
          <span className="pk-photo block w-full">
            <span className="pk-photo__tape" />
            <span className="pk-photo__paper pk-polaroid">
              <img
                src={p.src}
                alt={p.alt}
                width={640}
                height={640}
                loading="lazy"
                className="block aspect-square w-full object-cover"
              />
              <span className="pk-polaroid__caption">{p.label}</span>
            </span>
          </span>
        </div>
      ))}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
