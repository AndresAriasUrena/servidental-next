'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { BillingAddress, ShippingAddress } from '@/types/woocommerce';
import { formatPrice } from '@/utils/currency';
import TilopayPaymentSDK from './TilopayPaymentSDK';
import TrustBadges from '@/components/common/TrustBadges';

// Costa Rica geographic data
const COSTA_RICA_LOCATIONS: Record<string, Record<string, string[]>> = {
  'San José': {
    'San José': ['Carmen', 'Merced', 'Hospital', 'Catedral', 'Zapote', 'San Francisco de Dos Ríos', 'Uruca', 'Mata Redonda', 'Pavas', 'Hatillo', 'San Sebastián'],
    'Escazú': ['Escazú', 'San Antonio', 'San Rafael'],
    'Desamparados': ['Desamparados', 'San Miguel', 'San Juan de Dios', 'San Rafael Arriba', 'San Antonio', 'Frailes', 'Patarrá', 'San Cristóbal', 'Rosario', 'Damas', 'San Rafael Abajo', 'Gravilias', 'Los Guido'],
    'Puriscal': ['Santiago', 'Mercedes Sur', 'Barbacoas', 'Grifo Alto', 'San Rafael', 'Candelarita', 'Desamparaditos', 'San Antonio', 'Chires'],
    'Tarrazú': ['San Marcos', 'San Lorenzo', 'San Carlos'],
    'Aserrí': ['Aserrí', 'Tarbaca', 'Vuelta de Jorco', 'San Gabriel', 'Legua', 'Monterrey', 'Salitrillos'],
    'Mora': ['Colón', 'Guayabo', 'Tabarcia', 'Piedras Negras', 'Picagres', 'Jaris'],
    'Goicoechea': ['Guadalupe', 'San Francisco', 'Calle Blancos', 'Mata de Plátano', 'Ipís', 'Rancho Redondo', 'Purral'],
    'Santa Ana': ['Santa Ana', 'Salitral', 'Pozos', 'Uruca', 'Piedades', 'Brasil'],
    'Alajuelita': ['Alajuelita', 'San Josecito', 'San Antonio', 'Concepción', 'San Felipe'],
    'Vásquez de Coronado': ['San Isidro', 'San Rafael', 'Dulce Nombre de Jesús', 'Patalillo', 'Cascajal'],
    'Acosta': ['San Ignacio', 'Guaitil', 'Palmichal', 'Cangrejal', 'Sabanillas'],
    'Tibás': ['San Juan', 'Cinco Esquinas', 'Anselmo Llorente', 'León XIII', 'Colima'],
    'Moravia': ['San Vicente', 'San Jerónimo', 'Trinidad'],
    'Montes de Oca': ['San Pedro', 'Sabanilla', 'Mercedes', 'San Rafael'],
    'Turrubares': ['San Pablo', 'San Pedro', 'San Juan de Mata', 'San Luis', 'Carara'],
    'Dota': ['Santa María', 'Jardín', 'Copey'],
    'Curridabat': ['Curridabat', 'Granadilla', 'Sánchez', 'Tirrases'],
    'Pérez Zeledón': ['San Isidro de El General', 'El General', 'Daniel Flores', 'Rivas', 'San Pedro', 'Platanares', 'Pejibaye', 'Cajón', 'Barú', 'Río Nuevo', 'Páramo'],
    'León Cortés Castro': ['San Pablo', 'San Andrés', 'Llano Bonito', 'San Isidro', 'Santa Cruz', 'San Antonio']
  },
  'Alajuela': {
    'Alajuela': ['Alajuela', 'San José', 'Carrizal', 'San Antonio', 'Guácima', 'San Isidro', 'Sabanilla', 'San Rafael', 'Río Segundo', 'Desamparados', 'Turrúcares', 'Tambor', 'Garita', 'Sarapiquí'],
    'San Ramón': ['San Ramón', 'Santiago', 'San Juan', 'Piedades Norte', 'Piedades Sur', 'San Rafael', 'San Isidro', 'Ángeles', 'Alfaro', 'Volio', 'Concepción', 'Zapotal', 'Peñas Blancas'],
    'Grecia': ['Grecia', 'San Isidro', 'San José', 'San Roque', 'Tacares', 'Río Cuarto', 'Puente de Piedra', 'Bolívar'],
    'San Mateo': ['San Mateo', 'Desmonte', 'Jesús María'],
    'Atenas': ['Atenas', 'Jesús', 'Mercedes', 'San Isidro', 'Concepción', 'San José', 'Santa Eulalia', 'Escobal'],
    'Naranjo': ['Naranjo', 'San Miguel', 'San José', 'Cirrí Sur', 'San Jerónimo', 'San Juan', 'Rosario', 'Palmitos'],
    'Palmares': ['Palmares', 'Zaragoza', 'Buenos Aires', 'Santiago', 'Candelaria', 'Esquipulas', 'La Granja'],
    'Poás': ['San Pedro', 'San Juan', 'San Rafael', 'Carrillos', 'Sabana Redonda'],
    'Orotina': ['Orotina', 'El Mastate', 'Hacienda Vieja', 'Coyolar', 'La Ceiba'],
    'San Carlos': ['Quesada', 'Florencia', 'Buenavista', 'Aguas Zarcas', 'Venecia', 'Pital', 'La Fortuna', 'La Tigra', 'La Palmera', 'Venado', 'Cutris', 'Monterrey', 'Pocosol'],
    'Zarcero': ['Zarcero', 'Laguna', 'Tapesco', 'Guadalupe', 'Palmira', 'Zapote', 'Brisas'],
    'Valverde Vega': ['Sarchí Norte', 'Sarchí Sur', 'Toro Amarillo', 'San Pedro', 'Rodríguez'],
    'Upala': ['Upala', 'Aguas Claras', 'San José', 'Bijagua', 'Delicias', 'Dos Ríos', 'Yolillal'],
    'Los Chiles': ['Los Chiles', 'Caño Negro', 'El Amparo', 'San Jorge'],
    'Guatuso': ['San Rafael', 'Buenavista', 'Cote', 'Katira']
  },
  'Cartago': {
    'Cartago': ['Oriental', 'Occidental', 'Carmen', 'San Nicolás', 'Aguacaliente', 'Guadalupe', 'Corralillo', 'Tierra Blanca', 'Dulce Nombre', 'Llano Grande', 'Quebradilla'],
    'Paraíso': ['Paraíso', 'Santiago', 'Orosi', 'Cachí', 'Llanos de Santa Lucía'],
    'La Unión': ['Tres Ríos', 'San Diego', 'San Juan', 'San Rafael', 'Concepción', 'Dulce Nombre', 'San Ramón', 'Río Azul'],
    'Jiménez': ['Juan Viñas', 'Tucurrique', 'Pejibaye'],
    'Turrialba': ['Turrialba', 'La Suiza', 'Peralta', 'Santa Cruz', 'Santa Teresita', 'Pavones', 'Tuis', 'Tayutic', 'Santa Rosa', 'Tres Equis', 'La Isabel', 'Chirripó'],
    'Alvarado': ['Pacayas', 'Cervantes', 'Capellades'],
    'Oreamuno': ['San Rafael', 'Cot', 'Potrero Cerrado', 'Cipreses', 'Santa Rosa'],
    'El Guarco': ['El Tejar', 'San Isidro', 'Tobosi', 'Patio de Agua']
  },
  'Heredia': {
    'Heredia': ['Heredia', 'Mercedes', 'San Francisco', 'Ulloa', 'Varablanca'],
    'Barva': ['Barva', 'San Pedro', 'San Pablo', 'San Roque', 'Santa Lucía', 'San José de la Montaña'],
    'Santo Domingo': ['Santo Domingo', 'San Vicente', 'San Miguel', 'Paracito', 'Santo Tomás', 'Santa Rosa', 'Tures', 'Pará'],
    'Santa Bárbara': ['Santa Bárbara', 'San Pedro', 'San Juan', 'Jesús', 'Santo Domingo', 'Purabá'],
    'San Rafael': ['San Rafael', 'San Josecito', 'Santiago', 'Ángeles', 'Concepción'],
    'San Isidro': ['San Isidro', 'San José', 'Concepción', 'San Francisco'],
    'Belén': ['San Antonio', 'La Ribera', 'La Asunción'],
    'Flores': ['San Joaquín', 'Barrantes', 'Llorente'],
    'San Pablo': ['San Pablo', 'Rincón de Sabanilla'],
    'Sarapiquí': ['Puerto Viejo', 'La Virgen', 'Horquetas', 'Llanuras del Gaspar', 'Cureña']
  },
  'Guanacaste': {
    'Liberia': ['Liberia', 'Cañas Dulces', 'Mayorga', 'Nacascolo', 'Curubandé'],
    'Nicoya': ['Nicoya', 'Mansión', 'San Antonio', 'Quebrada Honda', 'Sámara', 'Nosara', 'Belén de Nosarita'],
    'Santa Cruz': ['Santa Cruz', 'Bolívar', 'Veintisiete de Abril', 'Tempate', 'Cartagena', 'Cuajiniquil', 'Diriá', 'Cabo Velas', 'Tamarindo'],
    'Bagaces': ['Bagaces', 'La Fortuna', 'Mogote', 'Río Naranjo'],
    'Carrillo': ['Filadelfia', 'Palmira', 'Sardinal', 'Belén'],
    'Cañas': ['Cañas', 'Palmira', 'San Miguel', 'Bebedero', 'Porozal'],
    'Abangares': ['Las Juntas', 'Sierra', 'San Juan', 'Colorado'],
    'Tilarán': ['Tilarán', 'Quebrada Grande', 'Tronadora', 'Santa Rosa', 'Líbano', 'Tierras Morenas', 'Arenal'],
    'Nandayure': ['Carmona', 'Santa Rita', 'Zapotal', 'San Pablo', 'Porvenir', 'Bejuco'],
    'La Cruz': ['La Cruz', 'Santa Cecilia', 'La Garita', 'Santa Elena'],
    'Hojancha': ['Hojancha', 'Monte Romo', 'Puerto Carrillo', 'Huacas']
  },
  'Puntarenas': {
    'Puntarenas': ['Puntarenas', 'Pitahaya', 'Chomes', 'Lepanto', 'Paquera', 'Manzanillo', 'Guacimal', 'Barranca', 'Monteverde', 'Isla del Coco', 'Cóbano', 'Chacarita', 'Chira', 'Acapulco', 'El Roble', 'Arancibia'],
    'Esparza': ['Espíritu Santo', 'San Juan Grande', 'Macacona', 'San Rafael', 'San Jerónimo'],
    'Buenos Aires': ['Buenos Aires', 'Volcán', 'Potrero Grande', 'Boruca', 'Pilas', 'Colinas', 'Chánguena', 'Biolley', 'Brunka'],
    'Montes de Oro': ['Miramar', 'La Unión', 'San Isidro'],
    'Osa': ['Puerto Cortés', 'Palmar', 'Sierpe', 'Bahía Ballena', 'Piedras Blancas'],
    'Quepos': ['Quepos', 'Savegre', 'Naranjito'],
    'Golfito': ['Golfito', 'Puerto Jiménez', 'Guaycará', 'Pavón'],
    'Coto Brus': ['San Vito', 'Sabalito', 'Aguabuena', 'Limoncito', 'Pittier'],
    'Parrita': ['Parrita'],
    'Corredores': ['Corredor', 'La Cuesta', 'Paso Canoas', 'Laurel'],
    'Garabito': ['Jacó', 'Tárcoles']
  },
  'Limón': {
    'Limón': ['Limón', 'Valle La Estrella', 'Río Blanco', 'Matama'],
    'Pococí': ['Guápiles', 'Jiménez', 'Rita', 'Roxana', 'Cariari', 'Colorado'],
    'Siquirres': ['Siquirres', 'Pacuarito', 'Florida', 'Germania', 'Cairo', 'Alegría'],
    'Talamanca': ['Bratsi', 'Sixaola', 'Cahuita', 'Telire'],
    'Matina': ['Matina', 'Batán', 'Carrandi'],
    'Guácimo': ['Guácimo', 'Mercedes', 'Pocora', 'Río Jiménez', 'Duacarí']
  }
};

// Constante configurable para costo de envío fuera GAM
const SHIPPING_COST_OUTSIDE_GAM = 9;

interface CheckoutFormData {
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  customer_note: string;
  personal_info: {
    company_name: string;
    id_number: string;
    client_type: 'odontologo' | 'tecnico' | 'otro';
    client_type_other: string; // Campo para especificar cuando es "otro"
    contact_numbers: {
      cellphone: string;
      other: string;
    };
    emails: {
      billing: string; // Correo de facturación (antes personal)
      other: string;
    };
    address: {
      province: string;
      canton: string;
      district: string;
      other_details: string;
    };
  };
  shipping_option: 'messenger' | 'pickup' | 'other' | 'gam_free' | 'outside_gam';
  shipping_other_details: string;
  // Nuevos campos de datos de contacto opcionales
  contact_data: {
    name: string;
    email: string;
    phone: string;
  };
}

/**
 * Helper para detectar si un producto es equipo (no repuesto)
 * Considera repuesto si tiene tag "repuesto" o "repuestos" (case-insensitive)
 * Todo lo demás se considera equipo
 */
const isEquipment = (product: any): boolean => {
  const hasRepuestoTag = product.tags?.some(
    (tag: any) => tag.name?.toLowerCase().includes('repuesto')
  );
  return !hasRepuestoTag;
};

export default function Checkout() {
  const { cart } = useCart();
  const [showTilopayCheckout, setShowTilopayCheckout] = useState(false);

  // Detectar si el carrito tiene equipos (al menos 1)
  const hasEquipment = cart.items.some(item => isEquipment(item));

  const [formData, setFormData] = useState<CheckoutFormData>({
    billing: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'CR',
      email: '',
      phone: ''
    },
    shipping: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'CR'
    },
    payment_method: 'tilopay',
    customer_note: '',
    personal_info: {
      company_name: '',
      id_number: '',
      client_type: 'odontologo',
      client_type_other: '',
      contact_numbers: {
        cellphone: '',
        other: ''
      },
      emails: {
        billing: '',
        other: ''
      },
      address: {
        province: '',
        canton: '',
        district: '',
        other_details: ''
      }
    },
    shipping_option: hasEquipment ? 'gam_free' : 'messenger', // Default basado en tipo de carrito
    shipping_other_details: '',
    contact_data: {
      name: '',
      email: '',
      phone: ''
    }
  });
  
  const [isSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update billing info from personal_info for compatibility
    const updatedFormData = {
      ...formData,
      billing: {
        ...formData.billing,
        first_name: formData.personal_info.company_name,
        email: formData.personal_info.emails.billing,
        phone: formData.personal_info.contact_numbers.cellphone,
        address_1: `${formData.personal_info.address.province}, ${formData.personal_info.address.canton}, ${formData.personal_info.address.district}`,
        address_2: formData.personal_info.address.other_details,
        city: formData.personal_info.address.canton,
        state: formData.personal_info.address.province
      }
    };

    localStorage.setItem('checkout-form-data', JSON.stringify(updatedFormData));
    setShowTilopayCheckout(true);
  };

  const getShippingCost = () => {
    // Todos los envíos son gratis o se coordinan después
    // No se cobra ningún costo adicional en el checkout
    return 0;
  };

  const getTotalWithShipping = () => {
    return cart.total + getShippingCost();
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          No hay productos en el carrito
        </h1>
        <p className="text-gray-600 mb-8">
          Agrega algunos productos antes de proceder al checkout
        </p>
        <a
          href="/tienda"
          className="bg-servi_green text-white px-6 py-3 rounded-md hover:bg-servi_dark transition-colors"
        >
          Ver productos
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Información de Facturación</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre o razón social *"
                  required
                  value={formData.personal_info.company_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal_info: { ...prev.personal_info, company_name: e.target.value }
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Cédula de identidad o jurídica *"
                  required
                  value={formData.personal_info.id_number}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal_info: { ...prev.personal_info, id_number: e.target.value }
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de cliente *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="client_type"
                        value="odontologo"
                        checked={formData.personal_info.client_type === 'odontologo'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personal_info: { 
                            ...prev.personal_info, 
                            client_type: e.target.value as 'odontologo' | 'tecnico' | 'otro',
                            client_type_other: '' // Reset when changing type
                          }
                        }))}
                      />
                      <span>Odontólogo</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="client_type"
                        value="tecnico"
                        checked={formData.personal_info.client_type === 'tecnico'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personal_info: { 
                            ...prev.personal_info, 
                            client_type: e.target.value as 'odontologo' | 'tecnico' | 'otro',
                            client_type_other: '' // Reset when changing type
                          }
                        }))}
                      />
                      <span>Técnico</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="client_type"
                        value="otro"
                        checked={formData.personal_info.client_type === 'otro'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personal_info: { 
                            ...prev.personal_info, 
                            client_type: e.target.value as 'odontologo' | 'tecnico' | 'otro'
                          }
                        }))}
                      />
                      <span>Otro</span>
                    </label>
                  </div>
                  
                  {/* Campo adicional cuando selecciona "Otro" */}
                  {formData.personal_info.client_type === 'otro' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Especifique su profesión/área *"
                        required
                        value={formData.personal_info.client_type_other}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personal_info: { 
                            ...prev.personal_info, 
                            client_type_other: e.target.value
                          }
                        }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de teléfono:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Celular *"
                      required
                      value={formData.personal_info.contact_numbers.cellphone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personal_info: { 
                          ...prev.personal_info, 
                          contact_numbers: { ...prev.personal_info.contact_numbers, cellphone: e.target.value }
                        }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <input
                      type="tel"
                      placeholder="Otro"
                      value={formData.personal_info.contact_numbers.other}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personal_info: { 
                          ...prev.personal_info, 
                          contact_numbers: { ...prev.personal_info.contact_numbers, other: e.target.value }
                        }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Correo de facturación *"
                      required
                      value={formData.personal_info.emails.billing}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personal_info: { 
                          ...prev.personal_info, 
                          emails: { ...prev.personal_info.emails, billing: e.target.value }
                        }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    El correo de facturación se usará para envío de facturas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección: Provincia, Cantón, distrito y otras señas
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Province Dropdown */}
                    <select
                      required
                      value={formData.personal_info.address.province}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personal_info: { 
                          ...prev.personal_info, 
                          address: { 
                            ...prev.personal_info.address, 
                            province: e.target.value,
                            canton: '', // Reset canton when province changes
                            district: '' // Reset district when province changes
                          }
                        }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                      <option value="">Provincia *</option>
                      {Object.keys(COSTA_RICA_LOCATIONS).map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>

                    {/* Canton Dropdown */}
                    <select
                      required
                      value={formData.personal_info.address.canton}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personal_info: { 
                          ...prev.personal_info, 
                          address: { 
                            ...prev.personal_info.address, 
                            canton: e.target.value,
                            district: '' // Reset district when canton changes
                          }
                        }
                      }))}
                      disabled={!formData.personal_info.address.province}
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Cantón *</option>
                      {formData.personal_info.address.province && 
                        Object.keys(COSTA_RICA_LOCATIONS[formData.personal_info.address.province] || {}).map(canton => (
                          <option key={canton} value={canton}>{canton}</option>
                        ))
                      }
                    </select>

                    {/* District Dropdown */}
                    <select
                      required
                      value={formData.personal_info.address.district}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personal_info: { 
                          ...prev.personal_info, 
                          address: { ...prev.personal_info.address, district: e.target.value }
                        }
                      }))}
                      disabled={!formData.personal_info.address.canton}
                      className="border border-gray-300 rounded-md px-3 py-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Distrito *</option>
                      {formData.personal_info.address.province && 
                       formData.personal_info.address.canton &&
                       (COSTA_RICA_LOCATIONS[formData.personal_info.address.province]?.[formData.personal_info.address.canton] || []).map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))
                      }
                    </select>
                  </div>
                  <textarea
                    placeholder="Otras señas *"
                    required
                    rows={3}
                    value={formData.personal_info.address.other_details}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personal_info: { 
                        ...prev.personal_info, 
                        address: { ...prev.personal_info.address, other_details: e.target.value }
                      }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>

                        {/* Datos de contacto */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Datos de contacto
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Información adicional de contacto (opcional)
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.contact_data.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact_data: { ...prev.contact_data, name: e.target.value }
                    }))}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                  <input
                    type="email"
                    placeholder="Correo"
                    value={formData.contact_data.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact_data: { ...prev.contact_data, email: e.target.value }
                    }))}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                  <input
                    type="tel"
                    placeholder="Whatsapp"
                    value={formData.contact_data.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact_data: { ...prev.contact_data, phone: e.target.value }
                    }))}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <p className="text-xs text-gray-500">
                  Estos datos son opcionales y se utilizarán como información de contacto adicional
                </p>
              </div>
            </div>

            {/* Opciones de envío */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Opciones de envío
              </h2>
              <div className="space-y-4">
                {hasEquipment ? (
                  // Opciones cuando hay equipos en el carrito
                  <>
                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="gam_free"
                          checked={formData.shipping_option === 'gam_free'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">Envío dentro del Área Metropolitana</div>
                          <div className="text-sm text-gray-500">
                            Gratuito. Disponible para entregas por mensajería.
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="outside_gam"
                          checked={formData.shipping_option === 'outside_gam'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">Encomienda, envío o instalación fuera del Área Metropolitana</div>
                          <div className="text-sm text-gray-500">
                            El costo se calcula según la ubicación y el tipo de servicio requerido.<br />
                            Debe ser cancelado adicionalmente una vez analizados los datos de entrega o instalación.
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="pickup"
                          checked={formData.shipping_option === 'pickup'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">Retiro en showroom</div>
                          <div className="text-sm text-gray-500">
                            Sin costo adicional.<br />
                            Puede retirar su pedido en nuestro showroom ubicado en San Pedro de Montes de Oca.
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="other"
                          checked={formData.shipping_option === 'other'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Otro</div>
                          <div className="text-sm text-gray-500 mb-2">
                            Indique su preferencia (por ejemplo, Uber Flash coordinado por el cliente)
                          </div>
                          {formData.shipping_option === 'other' && (
                            <textarea
                              placeholder="Describa su preferencia de envío... *"
                              rows={3}
                              required
                              value={formData.shipping_other_details}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                shipping_other_details: e.target.value
                              }))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </>
                ) : (
                  // Opciones cuando solo hay repuestos en el carrito
                  <>
                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="messenger"
                          checked={formData.shipping_option === 'messenger'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">Envío dentro del Área Metropolitana</div>
                          <div className="text-sm text-gray-500">
                            Gratuito. Disponible para entregas por mensajería.
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="pickup"
                          checked={formData.shipping_option === 'pickup'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium">Retiro en showroom</div>
                          <div className="text-sm text-gray-500">
                            Sin costo adicional.<br />
                            Puede retirar su pedido en nuestro showroom ubicado en San Pedro de Montes de Oca.
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="border border-gray-300 rounded-md p-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          value="other"
                          checked={formData.shipping_option === 'other'}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            shipping_option: e.target.value as CheckoutFormData['shipping_option']
                          }))}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Otro</div>
                          <div className="text-sm text-gray-500 mb-2">
                            Indique su preferencia (por ejemplo, Uber Flash coordinado por el cliente)
                          </div>
                          {formData.shipping_option === 'other' && (
                            <textarea
                              placeholder="Describa su preferencia de envío... *"
                              rows={3}
                              required
                              value={formData.shipping_other_details}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                shipping_other_details: e.target.value
                              }))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </>
                )}

                {/* Mensaje informativo */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> Nos aseguramos de ofrecer la mejor opción de envío según su ubicación para garantizar un servicio rápido y seguro.
                  </p>
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Método de pago
              </h2>
              <div className="p-3 border border-gray-300 rounded-md bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment_method"
                    value="tilopay"
                    checked={formData.payment_method === 'tilopay'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      payment_method: e.target.value
                    }))}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Tarjeta de crédito/débito (TiloPay)</div>
                    <div className="text-sm text-gray-500">
                      Pago seguro con tarjeta a través de TiloPay
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notas del pedido */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Notas del pedido
              </h2>
              <textarea
                placeholder="Notas sobre tu pedido (opcional)"
                rows={4}
                value={formData.customer_note}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customer_note: e.target.value
                }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumen del pedido
              </h2>
              
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>
                    {formData.shipping_option === 'gam_free'
                      ? 'Gratis'
                      : formData.shipping_option === 'outside_gam'
                      ? 'Por coordinar'
                      : formData.shipping_option === 'messenger'
                      ? 'Gratis'
                      : formData.shipping_option === 'pickup'
                      ? 'Gratis'
                      : 'Por coordinar'
                    }
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      {getShippingCost() > 0
                        ? formatPrice(getTotalWithShipping())
                        : formatPrice(cart.total)
                      }
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-servi_green text-white py-3 px-4 rounded-md hover:bg-servi_dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Procesando...' : 'Realizar pedido'}
              </button>

              {/* Trust Badges */}
              <TrustBadges variant="checkout" />

              {/* Información importante */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-semibold text-blue-900 mb-2">Importante</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Una vez realizada su compra, recibirá un correo de confirmación con los detalles del pedido.</li>
                  <li>• ServiDental procesará su orden y en un máximo de 48 horas se coordinará la entrega según la opción seleccionada.</li>
                  <li>• Para consultas, actualizaciones o soporte, puede escribirnos al WhatsApp <strong>2101-6114</strong>.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>

      {showTilopayCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
            <button
              onClick={() => setShowTilopayCheckout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <TilopayPaymentSDK
              customerInfo={{
                firstName: formData.personal_info.company_name,
                lastName: '',
                email: formData.personal_info.emails.billing,
                phone: formData.personal_info.contact_numbers.cellphone,
                address: {
                  line1: `${formData.personal_info.address.province}, ${formData.personal_info.address.canton}, ${formData.personal_info.address.district}`,
                  line2: formData.personal_info.address.other_details,
                  city: formData.personal_info.address.canton,
                  state: formData.personal_info.address.province,
                  postalCode: '',
                  country: 'CR',
                },
              }}
              cart={{
                items: cart.items.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  sku: item.sku,
                })),
                total: getShippingCost() > 0 ? getTotalWithShipping() : cart.total,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}