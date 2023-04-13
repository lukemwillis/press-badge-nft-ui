import React, { useContext, createContext } from "react";
import { useAccount } from "./AccountProvider";
import useSWR, { SWRResponse } from "swr";
import { useContracts } from "./ContractsProvider";
import { utils } from "koilib";

type NftContextType = {
  isAccountWhitelisted?: SWRResponse;
  totalReserved?: SWRResponse;
  totalSupply?: SWRResponse;
};

export const NftContext = createContext<NftContextType>({});

export const useNft = () => useContext(NftContext);

export const useOwner = (num: string) => {
  const { nft } = useContracts();
  return useSWR(`nft_${num}_owner`, async () => {
    const buffer = new TextEncoder().encode(num);
    const tokenId = `0x${utils.toHexString(buffer)}`;

    const { result } = await nft!.functions.owner_of<{
      value: string;
    }>({ tokenId });

    return result?.value || "";
  });
};

const NftProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { nft } = useContracts();
  const { account } = useAccount();

  const data = {
    isAccountWhitelisted: useSWR(`is_${account}_whitelisted`, async () => {
      const { result } = await nft!.functions.is_whitelisted<{
        value: boolean;
      }>({ address: account });

      return result?.value || "";
    }),
    totalSupply: useSWR(`nft_total_supply`, async () => {
      const { result } = await nft!.functions.total_supply<{
        value: number;
      }>();

      return result?.value || 0;
    }),
    totalReserved: useSWR(`nft_total_reserved`, async () => {
      const { result } = await nft!.functions.total_reserved<{
        value: number;
      }>();

      return result?.value || 0;
    }),
  };

  return <NftContext.Provider value={data}>{children}</NftContext.Provider>;
};

export default NftProvider;
