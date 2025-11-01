import { ShieldCheckIcon, TruckIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

export default function StoreBenefitsBanner() {
  const benefits = [
    {
      icon: ShieldCheckIcon,
      text: 'Garantía',
    },
    {
      icon: TruckIcon,
      text: 'Envío gratuito dentro del Área Metropolitana',
    },
    {
      icon: WrenchScrewdriverIcon,
      text: 'Mantenimiento y servicio técnico',
    },
  ];

  return (
    <div className="bg-white border-y border-gray-200 py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-servi_dark font-semibold mb-4 text-sm sm:text-base">
          Al adquirir nuestros equipos cuenta con:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-3 sm:gap-2"
            >
              <benefit.icon className="h-8 w-8 text-servi_green flex-shrink-0" />
              <span className="text-gray-700 text-center sm:text-left text-sm sm:text-base">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
