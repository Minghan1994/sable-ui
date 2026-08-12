import { createContext, useContext } from 'react';

export interface TabsContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  baseId: string;
  orientation: 'horizontal' | 'vertical';
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`<${component}> must be rendered inside <Tabs>.`);
  return context;
}
