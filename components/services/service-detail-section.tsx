import { CheckCircle2 } from "lucide-react";
import type { ServiceGroup } from "@/lib/services-data";

export function ServiceDetailSection({ service }: { service: ServiceGroup }) {
  const Icon = service.icon;

  return (
    <section
      id={service.slug}
      className="container-site border-border scroll-mt-32 border-t pt-14 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-col gap-3">
        <span className="bg-accent-green-light text-brand flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-brand text-sm font-semibold">{service.title}</p>
        <h2 className="text-heading text-2xl font-bold tracking-tight text-balance md:text-3xl">
          {service.headline}
        </h2>
      </div>

      <div className="content-measure mt-6 flex flex-col gap-4">
        {service.intro.map((p, i) => (
          <p key={i} className="text-body-text text-base leading-relaxed text-pretty">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] md:gap-14">
        <div className="flex flex-col gap-6">
          {service.details ? (
            <dl className="divide-border border-border flex flex-col divide-y border-y">
              {service.details.map((d) => (
                <div key={d.name} className="flex flex-col gap-1.5 py-4">
                  <dt className="text-heading text-sm font-semibold">{d.name}</dt>
                  <dd className="text-body-text text-sm leading-relaxed text-pretty">
                    {d.description}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {service.reviewItems ? (
            <div className="flex flex-col gap-3">
              <span className="text-heading text-sm font-semibold">주요 검토 내용</span>
              <ul className="flex flex-col gap-2">
                {service.reviewItems.map((item) => (
                  <li
                    key={item}
                    className="text-body-text flex items-start gap-2.5 text-sm"
                  >
                    <CheckCircle2
                      className="text-brand mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="border-border bg-surface flex flex-col gap-4 rounded-2xl border p-6">
          <span className="text-heading text-sm font-semibold">
            이런 경우에 필요합니다
          </span>
          <ul className="flex flex-col gap-3">
            {service.situations.map((situation) => (
              <li
                key={situation}
                className="text-body-text flex items-start gap-2.5 text-sm"
              >
                <CheckCircle2
                  className="text-brand mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="leading-relaxed text-pretty">{situation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-body-text/80 mt-6 text-xs leading-relaxed">{service.note}</p>
    </section>
  );
}
