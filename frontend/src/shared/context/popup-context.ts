import { createContext } from "react";

export type EntityListPopupContextModel =
  | {
      setVisibleSearchBar: (v: boolean) => void;
    }
  | undefined;

export const EntityListPopupContext =
  createContext<EntityListPopupContextModel>(undefined);
