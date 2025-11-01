// src/components/common/TrustBadges.tsx
import Image from "next/image";

type Variant = "pdp" | "cart" | "checkout" | "footer";

const BADGES = [
  { key: "visa", label: "Visa", src: "/badges/visa.png", group: "payments" },
  { key: "mc", label: "Mastercard", src: "/badges/mastercard.png", group: "payments" },
  { key: "amex", label: "American Express", src: "/badges/amex.png", group: "payments" },
  { key: "tasa0", label: "Tasa 0", src: "/badges/tasa0.png", group: "financing" },
  { key: "minicuotas", label: "Minicuotas", src: "/badges/minicuotas.png", group: "financing" },
];

export default function TrustBadges({ variant = "pdp" }: { variant?: Variant }) {
  const size = variant === "footer" ? 32 : 36;
  const wrap = variant === "footer" ? "justify-start" : variant === "checkout" ? "justify-start" : "justify-center";
  const tone = "opacity-100"; // Opacidad 100% para footer y checkout
  const gap = "gap-4 sm:gap-5";
  const badgeBackground = variant === "footer" ? "bg-white rounded px-2 py-1" : "";

  return (
    <div
      className={`not-prose mt-4 ${variant !== "footer" ? "pt-2" : ""}`}
      aria-label="Pagos y envíos disponibles"
    >
      <div className={`flex flex-wrap ${wrap} ${gap} ${tone} transition-opacity duration-200`}>
        {BADGES.map(b => (
          <div key={b.key} className={`flex items-center ${badgeBackground}`} title={b.label}>
            <Image
              src={b.src}
              alt={b.label}
              width={Math.round(size * 2.2)}
              height={size}
              className={`${variant === "footer" ? "h-[32px]" : "h-[36px]"} w-auto`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
