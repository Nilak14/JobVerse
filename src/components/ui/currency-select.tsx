import React from "react";

import { cn } from "@/lib/utils";

// data
import { currencies as AllCurrencies } from "country-data-list";

// shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// radix-ui
import { SelectProps } from "@radix-ui/react-select";

// types
export interface Currency {
  code: string;
  decimals: number;
  name: string;
  number: string;
  symbol?: string;
}

// constants
import { customCurrencies, allCurrencies } from "@/lib/constants/currencies";

interface CurrencySelectProps extends Omit<SelectProps, "onValueChange"> {
  onValueChange?: (value: string) => void;
  onCurrencySelect?: (currency: Currency) => void;
  name: string;
  placeholder?: string;
  currencies?: "custom" | "all";
  variant?: "default" | "small";
  valid?: boolean;
}

const CurrencySelector = React.forwardRef<
  HTMLButtonElement,
  CurrencySelectProps
>(
  (
    {
      value,
      onValueChange,
      onCurrencySelect,
      name,
      placeholder = "Select currency",
      currencies = "withdrawal",
      variant = "default",
      valid = true,
      ...props
    },
    ref
  ) => {
    const [selectedCurrency, setSelectedCurrency] =
      React.useState<Currency | null>(null);

    const uniqueCurrencies = React.useMemo<Currency[]>(() => {
      const currencyMap = new Map<string, Currency>();

      AllCurrencies.all.forEach((currency: Currency) => {
        if (currency.code && currency.name && currency.symbol) {
          let shouldInclude = false;

          switch (currencies) {
            case "custom":
              shouldInclude = customCurrencies.includes(currency.code);
              break;
            case "all":
              shouldInclude = !allCurrencies.includes(currency.code);
              break;
            default:
              shouldInclude = !allCurrencies.includes(currency.code);
          }

          if (shouldInclude) {
            // Special handling for Euro
            if (currency.code === "EUR") {
              currencyMap.set(currency.code, {
                code: currency.code,
                name: "Euro",
                symbol: currency.symbol,
                decimals: currency.decimals,
                number: currency.number,
              });
            } else {
              currencyMap.set(currency.code, {
                code: currency.code,
                name: currency.name,
                symbol: currency.symbol,
                decimals: currency.decimals,
                number: currency.number,
              });
            }
          }
        }
      });

      // Convert the map to an array and sort by currency name
      return Array.from(currencyMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }, [currencies]);

    const handleValueChange = (newValue: string) => {
      const fullCurrencyData = uniqueCurrencies.find(
        (curr) => curr.code === newValue
      );
      if (fullCurrencyData) {
        setSelectedCurrency(fullCurrencyData);
        if (onValueChange) {
          onValueChange(newValue);
        }
        if (onCurrencySelect) {
          onCurrencySelect(fullCurrencyData);
        }
      }
    };

    void selectedCurrency;

    return (
      <Select
        value={value}
        onValueChange={handleValueChange}
        {...props}
        name={name}
        data-valid={valid}
      >
        <SelectTrigger
          className={cn("w-full", variant === "small" && "w-fit gap-2")}
          data-valid={valid}
          ref={ref}
        >
          {value && variant === "small" ? (
            <SelectValue placeholder={placeholder}>
              <span>{value}</span>
            </SelectValue>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className="!max-h-60 overflow-y-auto">
          <SelectGroup>
            {uniqueCurrencies.map((currency) => (
              <SelectItem key={currency?.code} value={currency?.code || ""}>
                <div className="flex items-center w-full gap-2">
                  <span className="text-sm text-muted-foreground w-8 text-left">
                    {currency?.code}
                  </span>
                  <span className="hidden">{currency?.symbol}</span>
                  <span>
                    {currency?.name} ({currency?.symbol})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

CurrencySelector.displayName = "CurrencySelect";

export const CurrencySelect = React.memo(CurrencySelector);
