import React, { useContext, createContext } from "react";
import { useAccount } from "./AccountProvider";
import { SWRResponse } from "swr";
import {
  useKoinBalance,
  useManaBalance,
} from "./BalanceUtils";

type BalancesContextType = {
  koin?: SWRResponse;
  vhp?: SWRResponse;
  pvhp?: SWRResponse;
  pool?: SWRResponse;
  mana?: SWRResponse;
};

export const BalancesContext = createContext<BalancesContextType>({});

export const useAccountBalances = () => useContext(BalancesContext);

const AccountBalancesProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { account } = useAccount();

  const balances = {
    koin: useKoinBalance(account!),
    mana: useManaBalance(account!),
  };

  return (
    <BalancesContext.Provider value={balances}>
      {children}
    </BalancesContext.Provider>
  );
};

export default AccountBalancesProvider;
