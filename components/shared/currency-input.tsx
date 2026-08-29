"use client";

import { useState } from "react";

function formatRupiah(value: string): string {
  const numberOnly = value.replace(/\D/g, "");
  if (!numberOnly) return "";
  return new Intl.NumberFormat("id-ID").format(Number(numberOnly));
}

export function CurrencyInput({
  name,
  defaultValue,
  required,
  disabled,
}: {
  name: string;
  defaultValue?: number;
  required?: boolean;
  disabled?: boolean;
}) {
  const [display, setDisplay] = useState(
    defaultValue ? formatRupiah(String(defaultValue)) : ""
  );
  const [raw, setRaw] = useState(defaultValue ? String(defaultValue) : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberOnly = e.target.value.replace(/\D/g, "");
    setRaw(numberOnly);
    setDisplay(formatRupiah(numberOnly));
  };

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        disabled={disabled}
        placeholder="0"
        className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 focus:border-brand focus:outline-none disabled:bg-gray-50"
      />
      <input type="hidden" name={name} value={raw} required={required} />
    </div>
  );
}