import React from 'react';
import Link from 'next/link';
import { MessageCircle, ShoppingBag } from 'lucide-react';

const CTAButtons = ({ className = '' }) => {
  return (
    <div className={`flex flex-row gap-2 w-full lg:w-auto lg:min-w-[500px] ${className}`}>
      <Link
        href="https://api.whatsapp.com/send?phone=50621016114"
        target="_blank"
        className="flex-1 lg:flex-initial flex items-center justify-center gap-1 px-3 lg:px-6 py-2 
                   bg-[#003B46] text-white border border-white rounded-lg 
                   hover:bg-white hover:text-[#003B46] hover:border-[#003B46] 
                   transition-all duration-300 font-semibold text-sm sm:text-base"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Servicio Técnico</span>
      </Link>

      <Link
        href="/tienda"
        className="flex-1 lg:flex-initial flex items-center justify-center gap-1 px-3 lg:px-6 py-2
                   bg-white text-[#003B46] border border-[#003B46] rounded-lg
                   hover:bg-[#003B46] hover:text-white hover:border-white
                   transition-all duration-300 font-semibold text-sm sm:text-base"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Equipo Médico</span>
      </Link>
    </div>
  );
};

export default CTAButtons;