import type { ServiceGroup } from "@/lib/services-data";

export function ServiceDetailSection({ service }: { service: ServiceGroup }) {
  const serviceNumber = String(
    [
      "structural-design",
      "safety-inspection",
      "construction-safety",
      "demolition-review",
    ].indexOf(service.slug) + 1,
  ).padStart(2, "0");
  const details = service.details ?? [];

  return (
    <section
      id={service.slug}
      className="border-input scroll-mt-[120px] border-b py-[clamp(3.5rem,6.5vw,6rem)]"
    >
      <div className="container-site">
        <div className="border-heading flex flex-wrap gap-x-[clamp(1.5rem,3.4vw,3.5rem)] gap-y-3 border-b pb-[clamp(1.75rem,3vw,2.5rem)]">
          <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-3.5">
            <span className="text-brand text-[clamp(1.875rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums opacity-80">
              {serviceNumber}
            </span>
            <span className="text-heading text-xl font-bold tracking-[-0.025em]">
              {service.title}
            </span>
          </div>
          <div className="min-w-0 flex-[3_1_520px]">
            <h2 className="text-heading max-w-[24em] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.24] font-bold tracking-[-0.03em]">
              {service.headline}
            </h2>
            <div className="text-body-text mt-[22px] flex max-w-[52em] flex-col gap-4 text-[15.5px] leading-[1.85]">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <dl>
          {details.map((detail) => (
            <div
              key={detail.name}
              className="border-border flex flex-wrap gap-x-[clamp(1.5rem,3.4vw,3.5rem)] gap-y-1 border-b py-[22px]"
            >
              <dt className="text-heading min-w-0 flex-[1_1_200px] text-[15px] font-bold tracking-[-0.02em]">
                {detail.name}
              </dt>
              <dd className="text-body-text max-w-[58em] min-w-0 flex-[3_1_460px] text-[14.5px] leading-[1.8]">
                {detail.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-[clamp(1.75rem,3.4vw,2.75rem)] flex flex-wrap gap-[clamp(1.25rem,3vw,3rem)] bg-[#f1f6f2] p-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-3">
            <span className="text-sm font-bold tracking-[0.14em] text-[#094d30]">
              이런 경우에 필요합니다
            </span>
            <p className="text-[12.5px] leading-[1.75] text-[#6e756c]">{service.note}</p>
          </div>
          <ol className="grid min-w-0 flex-[2_1_440px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-[clamp(1.25rem,3vw,2.5rem)]">
            {service.situations.map((situation, index) => (
              <li
                key={situation}
                className="flex gap-[11px] border-b border-[#cde0d4] py-[11px] text-sm leading-[1.65] text-[#2c322c]"
              >
                <span className="text-brand pt-1 text-xs font-bold tracking-[0.08em] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {situation}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
