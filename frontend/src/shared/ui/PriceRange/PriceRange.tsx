"use client";

import React, { useEffect, useState } from "react";
import { Slider, Input } from "antd-mobile";

interface SliderRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  withSlider?: boolean;
}

const PriceRange: React.FC<SliderRangeProps> = ({
  value,
  onChange,
  min,
  max,
  withSlider,
}) => {
  const [minPrice, setMinPrice] = useState(value[0] ?? min);
  const [maxPrice, setMaxPrice] = useState(value[1] ?? max);

  useEffect(() => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, [value]);

  const handleSliderChange = (newValue: [number, number]) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
    onChange(newValue);
  };

  const handleMinPriceChange = (v: string) => {
    const newMin = Math.max(min, Math.min(Number(v), max));
    setMinPrice(newMin);
    onChange([newMin, maxPrice]);
  };

  const handleMaxPriceChange = (v: string) => {
    const newMax = Math.min(max, Math.max(Number(v), min));
    setMaxPrice(newMax);
    onChange([minPrice, newMax]);
  };

  return (
    <div className="p-4 bg-white">
      {withSlider && (
        <Slider
          range
          value={[minPrice, maxPrice]}
          min={min}
          max={max}
          onChange={(v) => Array.isArray(v) && handleSliderChange(v)}
          className="mb-4"
        />
      )}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            от
          </span>
          <Input
            type="number"
            value={minPrice?.toString()}
            onChange={handleMinPriceChange}
            placeholder="Минимальная цена"
            className="border rounded-lg p-2 pl-8 w-full"
          />
        </div>
        <div className="flex-1 relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            до
          </span>
          <Input
            type="number"
            value={maxPrice?.toString()}
            onChange={handleMaxPriceChange}
            placeholder="Максимальная цена"
            className="border rounded-lg p-2 pl-8 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
