import { createContext, SetStateAction, useContext, useState } from "react";
import { ICustomer } from "../interfaces/customer";

interface IAppContext {
  activeCustomer: ICustomer | null;
  setActiveCustomer: React.Dispatch<SetStateAction<ICustomer | null>>;
}

const AppContext = createContext<IAppContext>({
  activeCustomer: null,
  setActiveCustomer: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeCustomer, setActiveCustomer] = useState<ICustomer | null>(null);

  return (
    <AppContext.Provider
      value={{
        activeCustomer,
        setActiveCustomer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useCustomer = () => useContext(AppContext);
