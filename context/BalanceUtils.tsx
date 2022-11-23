import { Contract, Provider, utils } from "koilib";
import useSWR from "swr";
import { useContracts } from "./ContractsProvider";

export const useKoinBalance = (account: string) => {
  const { koin } = useContracts();
  return useSWR(`${account}_koin`, getTokenBalanceFetcher(account, koin));
};

export const useManaBalance = (account: string) => {
  const { provider } = useContracts();
  return useSWR(`${account}_mana`, getManaBalanceFetcher(account, provider));
};

const getTokenBalanceFetcher =
  (
    owner: string | undefined,
    contract: Contract | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!owner || !contract) return;

    const { result } = await contract!.functions.balanceOf<{
      value: string;
    }>({
      owner,
    });

    return result?.value || "0";
  };

const getManaBalanceFetcher =
  (
    account: string | undefined,
    provider: Provider | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!account || !provider) return;

    const mana = await provider.getAccountRc(account);

    return mana || "0";
  };

export function asFloat(value: string): number {
  if (!value) return 0;
  return parseFloat(utils.formatUnits(value, 8));
}
