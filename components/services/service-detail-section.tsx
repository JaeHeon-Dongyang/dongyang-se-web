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
      className="scroll-mt-[120px] pt-[clamp(5.25rem,9vw,9rem)] pb-[clamp(3.5rem,6.5vw,6rem)]"
    >
      <div className="container-site">
        <div className="mb-[clamp(1.625rem,3vw,2.5rem)] flex flex-wrap items-baseline gap-x-[clamp(1.5rem,3.4vw,4rem)] gap-y-2.5">
          <span className="text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.82] font-extralight tracking-[-0.05em] text-[#cde0d4] tabular-nums">
            {serviceNumber}
          </span>
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
            <span className="text-brand text-[13px] font-bold tracking-[0.02em]">
              {service.title}
            </span>
            <h2 className="text-heading max-w-[22em] text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.16] font-bold tracking-[-0.034em]">
              {service.headline}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-[clamp(1.375rem,3vw,4rem)] gap-y-5 pb-[clamp(2.125rem,4vw,3.75rem)]">
          {service.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-body-text min-w-0 flex-[1_1_320px] text-base leading-[1.9] text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="mb-[clamp(2rem,3.8vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[clamp(0.875rem,1.6vw,1.25rem)]">
          {details.map((detail) => (
            <div
              key={detail.name}
              className="border-border flex flex-col gap-3 border bg-white p-[clamp(1.5rem,2.8vw,2.375rem)]"
            >
              <dt className="text-heading text-[17px] leading-[1.34] font-bold tracking-[-0.028em]">
                {detail.name}
              </dt>
              <dd className="text-body-text text-[14.5px] leading-[1.85]">
                {detail.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-[clamp(1.5rem,3vw,3.5rem)] bg-[#f1f6f2] p-[clamp(1.75rem,3.2vw,3rem)]">
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3.5">
            <h3 className="text-[clamp(1.1875rem,2vw,1.5rem)] leading-[1.3] font-bold tracking-[-0.03em] text-[#094d30]">
              이런 경우에 필요합니다
            </h3>
            <p className="max-w-[30em] text-[13px] leading-[1.8] text-[#56604f]">
              {service.note}
            </p>
          </div>
          <ul className="grid min-w-0 flex-[2_1_460px] grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-x-[clamp(1.5rem,3vw,2.75rem)] gap-y-3.5">
            {service.situations.map((situation) => (
              <li key={situation} className="text-[14.5px] leading-[1.7] text-[#2c322c]">
                {situation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
