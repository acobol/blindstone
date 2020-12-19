import React from "react";
import { AppStore } from "./AppStore";

export const AppContext = React.createContext<AppStore>(new AppStore());

//TODO add children prop type
export const AppStoreProvider: React.FC = ({ children }: any): JSX.Element => {
  const appStore = new AppStore();
  window.ipcRenderer.listenParse((lines: string[]) => appStore.addLines(lines));
  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};
