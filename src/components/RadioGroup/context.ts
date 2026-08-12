import { createContext, useContext } from 'react';

export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onSelect: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/** `null` when a Radio is used on its own, which is allowed as long as it carries its own `name`. */
export const useRadioGroup = () => useContext(RadioGroupContext);
