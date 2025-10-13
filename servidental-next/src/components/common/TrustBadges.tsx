// src/components/common/TrustBadges.tsx
import Image from "next/image";

type Variant = "pdp" | "cart" | "checkout" | "footer";

const BADGES = [
  { key: "correos", label: "Correos de Costa Rica", src: "/badges/correos-cr.svg", group: "shipping" },
  { key: "sinpe", label: "SINPE Móvil", src: "/badges/sinpe-movil.svg", group: "payments" },
  { key: "tasa0", label: "Tasa 0 BAC", src: "/badges/tasa0-bac.svg", group: "financing" },
  { key: "visa", label: "Visa", src: "/badges/visa.svg", group: "payments" },
  { key: "mc", label: "Mastercard", src: "/badges/mastercard.svg", group: "payments" },
  { key: "amex", label: "American Express", src: "/badges/amex.svg", group: "payments" },
];

export default function TrustBadges({ variant = "pdp" }: { variant?: Variant }) {
  const size = variant === "footer" ? 22 : 26;
  const wrap = variant === "footer" ? "justify-start" : variant === "checkout" ? "justify-start" : "justify-center";
  const tone = variant === "footer" ? "opacity-70 hover:opacity-100" : "opacity-80 hover:opacity-100";
  const gap = "gap-4 sm:gap-5";

  return (
    <div
      className={`not-prose mt-4 ${variant !== "footer" ? "pt-2" : ""}`}
      aria-label="Pagos y envíos disponibles"
    >
      <div className={`flex flex-wrap ${wrap} ${gap} ${tone} transition-opacity duration-200`}>
        {BADGES.map(b => (
          <div key={b.key} className="flex items-center" title={b.label}>
            <Image
              src={b.src}
              alt={b.label}
              width={Math.round(size * 2.2)}
              height={size}
              className={`${variant === "footer" ? "h-[22px]" : "h-[26px]"} w-auto`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
