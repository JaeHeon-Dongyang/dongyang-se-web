import { ImageSlideshow } from "@/components/image-slideshow";

const serviceHeroImages = Array.from(
  { length: 5 },
  (_, i) => `/images/svc-hero-${i + 1}.jpg`,
);

export function ServicesHero() {
  return (
    <section className="border-input border-b">
      <div className="container-site flex flex-wrap items-stretch gap-x-[clamp(2rem,4vw,4.75rem)]">
        <div className="reveal-up min-w-0 flex-[1_1_380px]">
          <ImageSlideshow images={serviceHeroImages} />
        </div>

        <div className="reveal-up min-w-0 flex-[1_1_420px] py-[clamp(3.25rem,6vw,6rem)] [animation-delay:90ms]">
          <div className="flex flex-col gap-[clamp(1.5rem,2.8vw,2.375rem)] lg:ml-auto lg:w-full lg:max-w-[31rem]">
            <span className="text-brand text-xs font-bold tracking-[0.18em]">
              OUR SERVICES
            </span>
            <h1 className="text-heading text-[clamp(2.125rem,4.6vw,3.625rem)] leading-[1.06] font-semibold tracking-[-0.042em]">
              구조안전이 필요한
              <br />
              순간에 함께합니다
            </h1>
            <p className="text-body-text max-w-[27em] text-[16.5px] leading-[1.8] text-pretty">
              설계 단계의 구조 계획부터 사용 중 안전진단과 점검, 시공 중 안전관리, 해체
              단계의 구조검토까지 각 상황에 필요한 전문적인 기술 검토를 제공합니다. 판단의
              근거와 필요한 조치를 명확하게 설명하는 것을 중요하게 생각합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
