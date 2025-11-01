'use client';

import { useEffect, useState } from 'react';
import { WooCommerceProduct } from '@/types/woocommerce';
import { getProductBrand } from '@/utils/woocommerce';
import { getBrandLogo } from '@/utils/brandLogos';
import Image from 'next/image';

export default function DebugBrandsPage() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/woocommerce/products?per_page=50');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8">Loading products for brand debug...</div>;
  }

  // Find products that should have DOF brand or others with issues
  const problematicProducts = products.filter(product => {
    const brandName = getProductBrand(product);
    const brandLogo = getBrandLogo(brandName);
    
    // Look for products that should have brands but don't have logos
    return brandName && !brandLogo;
  });

  const dofProducts = products.filter(product => {
    const brandName = getProductBrand(product);
    return brandName.toLowerCase().includes('dof');
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Brand Logo Debug Tool</h1>
      
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">DOF Products ({dofProducts.length})</h2>
          <div className="grid gap-4">
            {dofProducts.map(product => {
              const brandName = getProductBrand(product);
              const brandLogo = getBrandLogo(brandName);
              
              return (
                <div key={product.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Detected Brand:</strong> "{brandName}"</p>
                    <p><strong>Logo Path:</strong> {brandLogo || 'NULL'}</p>
                    <p><strong>Logo Status:</strong> 
                      <span className={brandLogo ? 'text-green-600' : 'text-red-600'}>
                        {brandLogo ? ' ✅ Found' : ' ❌ Missing'}
                      </span>
                    </p>
                    
                    {brandLogo && (
                      <div className="mt-2">
                        <p><strong>Logo Preview:</strong></p>
                        <div className="bg-white border rounded p-2 inline-block">
                          <Image
                            src={brandLogo}
                            alt={`${brandName} logo`}
                            width={60}
                            height={30}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                    
                    <details className="mt-2">
                      <summary className="cursor-pointer text-blue-600">View Raw Product Data</summary>
                      <div className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                        <p><strong>Attributes:</strong></p>
                        <pre>{JSON.stringify(product.attributes, null, 2)}</pre>
                        <p><strong>Meta Data (first 5):</strong></p>
                        <pre>{JSON.stringify(product.meta_data?.slice(0, 5), null, 2)}</pre>
                      </div>
                    </details>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Products with Brand but No Logo ({problematicProducts.length})</h2>
          <div className="grid gap-4">
            {problematicProducts.slice(0, 10).map(product => {
              const brandName = getProductBrand(product);
              const brandLogo = getBrandLogo(brandName);
              
              return (
                <div key={product.id} className="border p-4 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Detected Brand:</strong> "{brandName}"</p>
                    <p><strong>Logo Path:</strong> {brandLogo || 'NULL'}</p>
                    <p className="text-orange-600"><strong>Issue:</strong> Brand detected but no logo mapping found</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">All Available Brand Logos</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              'bioart', 'coxo', 'dof', 'meyer', 'micro nx', 'siger', 'tpc', 
              'xpect vision', 'dentech', 'dentafilm', 'launca', 'elec', 
              'epdent', 'mdmed', 'sturdy', 'artelectron', 'dimed', 'fame'
            ].map(brand => {
              const logo = getBrandLogo(brand);
              return (
                <div key={brand} className="border p-2 rounded text-center">
                  <p className="font-semibold capitalize">{brand}</p>
                  {logo ? (
                    <div className="bg-white border rounded p-2 mt-2">
                      <Image
                        src={logo}
                        alt={`${brand} logo`}
                        width={60}
                        height={30}
                        className="object-contain mx-auto"
                      />
                    </div>
                  ) : (
                    <p className="text-red-500 mt-2">No logo</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}