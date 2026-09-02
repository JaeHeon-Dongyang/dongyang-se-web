import { ExternalLink, Mail, MapPin, Phone, Printer } from "lucide-react";
import { NaverMapEmbed } from "@/components/contact/naver-map-embed";
import { company, contactLinks } from "@/lib/site";

const infoItems: Array<{
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}> = [
  { icon: MapPin, label: "주소", value: company.address },
  { icon: Phone, label: "전화", value: company.tel, href: contactLinks.tel },
  { icon: Printer, label: "팩스", value: company.fax },
  { icon: Mail, label: "이메일", value: company.email, href: contactLinks.mailto },
];

const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(company.address)}`;

export function ContactInfo() {
  return (
    <div className="border-border bg-surface flex flex-col gap-6 rounded-2xl border p-8">
      <h3 className="text-heading text-lg font-bold">오시는 길</h3>
      <ul className="flex flex-col gap-5">
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex items-start gap-3">
              <span className="bg-accent-green-light text-brand mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs font-medium">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-body-text hover:text-brand text-sm leading-relaxed underline-offset-4 hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-body-text text-sm leading-relaxed">
                    {item.value}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <NaverMapEmbed address={company.address} />
      <a
        href={naverMapUrl}
        target="_blank"
        rel="noreferrer"
        className="border-border bg-surface text-heading hover:border-brand/50 hover:text-brand focus-visible:ring-focus-ring inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        네이버 지도에서 위치 보기
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
