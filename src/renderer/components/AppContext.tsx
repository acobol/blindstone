import React from "react";
import { Action } from "../../sharedTypes/sharedTypes";
import { AppStore } from "./AppStore";

export const AppContext = React.createContext<AppStore>(new AppStore());

//TODO add children prop type
export const AppStoreProvider: React.FC = ({ children }: any): JSX.Element => {
  const appStore = new AppStore();
  window.ipcRenderer.listenParse((action: Action) => appStore.processAction(action));
  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};
