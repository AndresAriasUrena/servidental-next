'use client';

import React, { useState, useEffect } from 'react';
import { WooCommerceProduct, ProductVariation, ProductAttribute } from '@/types/woocommerce';
import { formatPrice } from '@/utils/currency';

interface VariationSelectorProps {
  product: WooCommerceProduct;
  variations: ProductVariation[];
  onVariationChange: (variation: ProductVariation | null) => void;
}

interface SelectedAttributes {
  [key: string]: string;
}

export default function VariationSelector({
  product,
  variations,
  onVariationChange
}: VariationSelectorProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributes>({});
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  // Get attributes that are used for variations
  const variableAttributes = product.attributes.filter(attr => attr.variation);

  // Get available options for each attribute based on current selection
  // Only show options that have in-stock variations
  const getAvailableOptions = (attributeName: string): string[] => {
    const attribute = product.attributes.find(
      attr => attr.name === attributeName
    );

    if (!attribute) return [];

    // Filter variations that match current selected attributes (except for this attribute)
    const otherSelectedAttrs = Object.entries(selectedAttributes).filter(
      ([key]) => key !== attributeName
    );

    let compatibleVariations = variations;

    // If other attributes are selected, filter by them
    if (otherSelectedAttrs.length > 0) {
      compatibleVariations = variations.filter(variation => {
        return otherSelectedAttrs.every(([attrName, attrValue]) => {
          const varAttr = variation.attributes.find(
            va => va.name === attrName
          );
          return varAttr && varAttr.option === attrValue;
        });
      });
    }

    // Only include options from in-stock variations
    const availableOptions = new Set<string>();
    compatibleVariations.forEach(variation => {
      // Only add if variation is in stock
      if (variation.stock_status === 'instock') {
        const varAttr = variation.attributes.find(
          va => va.name === attributeName
        );
        if (varAttr) {
          availableOptions.add(varAttr.option);
        }
      }
    });

    return Array.from(availableOptions);
  };

  // Find matching variation based on selected attributes
  const findMatchingVariation = (attributes: SelectedAttributes): ProductVariation | null => {
    return variations.find(variation => {
      return variation.attributes.every(varAttr => {
        const selectedValue = attributes[varAttr.name];
        return selectedValue === varAttr.option;
      });
    }) || null;
  };

  // Handle attribute selection
  const handleAttributeChange = (attributeName: string, value: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [attributeName]: value
    };

    setSelectedAttributes(newSelectedAttributes);

    // Check if all required attributes are selected
    const allSelected = variableAttributes.every(
      attr => newSelectedAttributes[attr.name]
    );

    if (allSelected) {
      const matchingVariation = findMatchingVariation(newSelectedAttributes);
      setSelectedVariation(matchingVariation);
      onVariationChange(matchingVariation);
    } else {
      setSelectedVariation(null);
      onVariationChange(null);
    }
  };

  // Reset when product changes
  useEffect(() => {
    setSelectedAttributes({});
    setSelectedVariation(null);
    onVariationChange(null);
  }, [product.id]);

  if (variableAttributes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {variableAttributes.map(attribute => {
        const availableOptions = getAvailableOptions(attribute.name);
        const selectedValue = selectedAttributes[attribute.name];

        return (
          <div key={attribute.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {attribute.name}
            </label>
            <select
              value={selectedValue || ''}
              onChange={(e) => handleAttributeChange(attribute.name, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-servi_green focus:border-transparent"
            >
              <option value="">Seleccionar {attribute.name.toLowerCase()}</option>
              {availableOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {selectedVariation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Precio:</span>
            <span className="text-lg font-bold text-servi_green">
              {formatPrice(selectedVariation.price)}
            </span>
          </div>
          {selectedVariation.sku && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">SKU:</span>
              <span className="text-sm text-gray-900">{selectedVariation.sku}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Disponibilidad:</span>
            <span
              className={`text-sm font-medium ${
                selectedVariation.stock_status === 'instock'
                  ? 'text-green-600'
                  : 'text-orange-600'
              }`}
            >
              {selectedVariation.stock_status === 'instock'
                ? 'Entrega Inmediata'
                : 'Contra Pedido'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
