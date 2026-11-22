import { useRef, useState, type FormEvent } from "react";
import { submitLead, type LeadData } from "@/lib/lead";

/* ---------- Copy (edit here) */

/** Personal-data document (same link as in the footer reference). */
const PRIVACY_URL = "https://drive.google.com/file/d/16D4I7OvCw2L4-G1QejjEtVx3G4P448ob/preview";

/** Telegram chat offered when sending fails (same as «Telegram» in the footer). */
const TELEGRAM_URL = "https://t.me/point_camp";

const COPY = {
  submit: "Залишити заявку",
  submitting: "Надсилаємо…",
  sendError: {
    title: "Не вдалося надіслати заявку",
    text: "Спробуйте ще раз або напишіть нам у Telegram — відповімо швидко.",
    telegram: "Написати в Telegram",
    retry: "Спробувати ще раз",
  },
  successTitle: "Дякуємо!",
  successText: "Ми звʼяжемося з вами найближчим часом.",
  errors: {
    name: "Вкажіть імʼя.",
    phoneEmpty: "Вкажіть номер телефону.",
    phoneInvalid: "Перевірте номер телефону, наприклад +380\u00a066\u00a0221\u00a073\u00a073.",
    email: "Перевірте e-mail, наприклад olena@gmail.com.",
    consent: "Потрібна ваша згода на обробку персональних даних.",
  },
};

type FieldName = "name" | "phone" | "email" | "consent";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

/** Order in which focus goes to the first invalid field. */
const FIELD_ORDER: FieldName[] = ["name", "phone", "email", "consent"];

const ID = {
  name: "lead-name",
  phone: "lead-phone",
  email: "lead-email",
  participant: "lead-participant",
  consent: "lead-consent",
  website: "lead-website",
} as const;

const errorId = (field: FieldName) => `${ID[field]}-error`;

/** +380 66 221 73 73, 066 221 73 73, (066) 221-73-73: digits, spaces, brackets, dashes, leading +; 10–15 digits. */
function isValidPhone(value: string): boolean {
  if (!/^\+?[\d\s()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 10 && digits <= 15;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function validateField(field: FieldName, form: HTMLFormElement): string | undefined {
  const data = new FormData(form);
  const value = String(data.get(field) ?? "").trim();
  switch (field) {
    case "name":
      return value ? undefined : COPY.errors.name;
    case "phone":
      if (!value) return COPY.errors.phoneEmpty;
      return isValidPhone(value) ? undefined : COPY.errors.phoneInvalid;
    case "email":
      return !value || isValidEmail(value) ? undefined : COPY.errors.email;
    case "consent":
      return data.get("consent") ? undefined : COPY.errors.consent;
  }
}

/**
 * Lead form from 10-form (#form). Client validation with Ukrainian messages under each
 * field (aria-invalid + aria-describedby), focus on the first invalid field, honeypot
 * `website`, states idle → submitting → success | error. Sending goes through
 * submitLead() in src/lib/lead.ts.
 * Error: the form stays mounted but hidden (so its values survive) and the error block
 * takes its place; «Спробувати ще раз» shows the filled form again. The #form anchor sits
 * on the wrapper, so it works in every state.
 * method="post" so that a submit before hydration never puts personal data into the URL.
 */
export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  function revalidate(field: FieldName) {
    if (!errors[field] || !formRef.current) return;
    const message = validateField(field, formRef.current);
    setErrors((prev) => ({ ...prev, [field]: message }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === "submitting") return;

    const next: Errors = {};
    for (const field of FIELD_ORDER) {
      const message = validateField(field, form);
      if (message) next[field] = message;
    }
    setErrors(next);
    const firstInvalid = FIELD_ORDER.find((field) => next[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${ID[firstInvalid]}`)?.focus();
      return;
    }

    const data = new FormData(form);
    // Honeypot filled: a bot. Pretend success, send nothing.
    if (String(data.get("website") ?? "").trim()) {
      setStatus("success");
      return;
    }

    const lead: LeadData = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      participant: String(data.get("participant") ?? "").trim(),
    };

    setStatus("submitting");
    const result = await submitLead(lead);
    setStatus(result.ok ? "success" : "error");
    requestAnimationFrame(() => (result.ok ? successRef : errorRef).current?.focus());
  }

  function retry() {
    setStatus("idle");
    requestAnimationFrame(() => submitRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div
        id="form"
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="pk-card grid gap-2 px-6 py-7"
      >
        <p className="m-0 text-[22px] leading-[1.25] font-black">{COPY.successTitle}</p>
        <p className="m-0 text-[17px] leading-[1.55] text-ink-soft">{COPY.successText}</p>
      </div>
    );
  }

  const fieldClass = (field: FieldName) => `pk-field${errors[field] ? " pk-field--error" : ""}`;
  const a11y = (field: FieldName) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": errorId(field) }
      : { "aria-invalid": false as const };
  const message = (field: FieldName) =>
    errors[field] ? (
      <span id={errorId(field)} className="pk-field__msg">
        {errors[field]}
      </span>
    ) : null;

  return (
    <div id="form">
      {status === "error" && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="pk-card grid gap-4 px-6 py-7">
          <h3 className="m-0 text-[22px] leading-[1.25] font-black text-marker-deep">
            {COPY.sendError.title}
          </h3>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft">{COPY.sendError.text}</p>
          <a
            className="pk-btn pk-btn--ink box-border min-h-14 w-full px-4 text-center"
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {COPY.sendError.telegram}
          </a>
          <button
            type="button"
            className="pk-btn pk-btn--ghost min-h-14 w-full px-4 text-center"
            onClick={retry}
          >
            {COPY.sendError.retry}
          </button>
        </div>
      )}
      <form
        ref={formRef}
        method="post"
        noValidate
        onSubmit={onSubmit}
        hidden={status === "error"}
        className="pk-card grid gap-4 px-6 py-7"
      >
        <div className={fieldClass("name")}>
          <label htmlFor={ID.name}>Імʼя</label>
          <input
            id={ID.name}
            name="name"
            placeholder="Олена"
            autoComplete="name"
            required
            onInput={() => revalidate("name")}
            {...a11y("name")}
          />
          {message("name")}
        </div>

        <div className={fieldClass("phone")}>
          <label htmlFor={ID.phone}>Телефон</label>
          <input
            id={ID.phone}
            name="phone"
            type="tel"
            placeholder="+380"
            inputMode="tel"
            autoComplete="tel"
            required
            onInput={() => revalidate("phone")}
            {...a11y("phone")}
          />
          {message("phone")}
        </div>

        <div className={fieldClass("email")}>
          <label htmlFor={ID.email}>E-mail</label>
          <input
            id={ID.email}
            name="email"
            type="email"
            placeholder="olena@gmail.com"
            inputMode="email"
            autoComplete="email"
            onInput={() => revalidate("email")}
            {...a11y("email")}
          />
          {message("email")}
        </div>

        <div className="pk-field">
          <label htmlFor={ID.participant}>Інформація про учасника</label>
          <input id={ID.participant} name="participant" placeholder="Імʼя та вік дитини" />
        </div>

        {/* Honeypot: invisible to people, left empty by them; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
          <label htmlFor={ID.website}>Website</label>
          <input id={ID.website} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-1.5">
          <label className="pk-check">
            <input
              id={ID.consent}
              name="consent"
              type="checkbox"
              required
              onChange={() => revalidate("consent")}
              {...a11y("consent")}
            />{" "}
            <span>
              Погоджуюсь на{" "}
              <a
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit underline underline-offset-2"
              >
                обробку персональних даних
              </a>
            </span>
          </label>
          {errors.consent && (
            <span id={errorId("consent")} className="pk-field__msg text-marker-deep">
              {errors.consent}
            </span>
          )}
        </div>

        <button
          ref={submitRef}
          className="pk-btn pk-btn--ink min-h-14 w-full"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? COPY.submitting : COPY.submit}
        </button>
      </form>
    </div>
  );
}
