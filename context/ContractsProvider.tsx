import React, { useContext, createContext } from "react";
import { Contract, Provider, Signer, utils } from "koilib";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import { useAccount } from "./AccountProvider";
import { useRpc } from "./RpcProvider";
import nftAbiJson from "../contract/abi/nft_abi_js.json";
import { Abi } from "koilib/lib/interface";

const nftAbi: Abi = {
  koilib_types: nftAbiJson.types,
  ...nftAbiJson
};

type ContractsContextType = {
  provider?: Provider;
  koin?: Contract;
  nft?: Contract;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContracts = () => useContext(ContractsContext);

export const ContractsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { account } = useAccount();
  const { rpc } = useRpc();

  const provider = new Provider(rpc!);
  const signer = account ? kondor.getSigner(account) as Signer : undefined;

  return (
    <ContractsContext.Provider
      value={{
        provider: provider,
        koin: new Contract({
          id: process.env.NEXT_PUBLIC_KOIN_CONTRACT_ADDR,
          abi: utils.tokenAbi,
          provider: provider,
          signer: signer,
        }),
        nft: new Contract({
          id: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDR,
          abi: nftAbi,
          provider: provider,
          signer: signer,
        }),
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
