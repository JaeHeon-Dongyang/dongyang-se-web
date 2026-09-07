import { ExternalLink } from "lucide-react";
import { NaverMapEmbed } from "@/components/contact/naver-map-embed";
import { company, contactLinks } from "@/lib/site";

const infoItems: Array<{ label: string; value: string; href?: string }> = [
  { label: "주소", value: company.address },
  { label: "전화", value: company.tel, href: contactLinks.tel },
  { label: "팩스", value: company.fax },
  { label: "이메일", value: company.email, href: contactLinks.mailto },
];

const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(company.address)}`;

export function ContactInfo() {
  return (
    <aside className="flex flex-col gap-6 self-start bg-[#f1f6f2] p-6 md:p-8">
      <div>
        <span className="text-brand text-xs font-bold tracking-[0.14em]">OFFICE</span>
        <h2 className="text-heading mt-3.5 text-xl font-bold tracking-[-0.03em]">
          오시는 길
        </h2>
      </div>
      <dl>
        {infoItems.map((item) => {
          return (
            <div
              key={item.label}
              className="flex flex-col gap-1.5 border-b border-[#cde0d4] py-3.5"
            >
              <dt className="text-[11px] font-bold tracking-[0.14em] text-[#6e756c]">
                {item.label}
              </dt>
              <dd className="text-heading text-[15px] leading-[1.6] tabular-nums">
                {item.href ? (
                  <a href={item.href} className="hover:text-brand">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      <NaverMapEmbed address={company.address} location={company.location} />
      <a
        href={naverMapUrl}
        target="_blank"
        rel="noreferrer"
        className="bg-brand hover:bg-brand-hover focus-visible:ring-focus-ring inline-flex items-center justify-between gap-2 px-5 py-4 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        네이버 지도에서 보기
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </aside>
  );
}
