import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "../context/AccountProvider";
import { useContracts } from "../context/ContractsProvider";
import { useNft, useOwner } from "../context/NftProvider";
import KondorConnector from "./KondorConnector";
import NftImage from "./NftImage";
import { utils } from "koilib";

interface NftMintButtonProps {
  number: string;
  unhoveredText?: string;
}

export default function NftMintButton({
  number,
  unhoveredText,
}: NftMintButtonProps) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { nft } = useContracts();
  const { account } = useAccount();
  const { isAccountWhitelisted, totalReserved, totalSupply } = useNft();
  const owner = useOwner(number);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [hovering, setHovering] = useState(false);
  const price = isAccountWhitelisted?.data ? "FREE" : "500 KOIN";

  const onMint = async () => {
    if (!nft) return;

    setLoading(true);

    try {
      const buffer = new TextEncoder().encode(number);
      const tokenId = `0x${utils.toHexString(buffer)}`;

      const result = await nft!.functions.mint(
        {
          to: account,
          tokenId,
        },
        isAccountWhitelisted?.data
          ? {
              payer: process.env.NEXT_PUBLIC_TKP_PAYER_ADDR,
            }
          : undefined
      );

      toast({
        title: `NFT mint submitted`,
        description: `The transaction containing your NFT mint is being processed, this may take some time.`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });

      await result.transaction?.wait();

      toast({
        title: `NFT mint succeeded`,
        description: `The transaction containing your NFT mint succeeded! Have a great day!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();

      owner.mutate();
      isAccountWhitelisted?.mutate();
      totalReserved?.mutate();
      totalSupply?.mutate();
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      toast({
        title: `NFT mint failed`,
        description: `The transaction containing your NFT mint failed with error message: ${e}`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (process.env.NEXT_PUBLIC_MINTING_LIVE === "false") {
    return <Button disabled>SOON</Button>;
  }

  if (typeof owner.data === "undefined") {
    return <Spinner />;
  }

  if (owner.data) {
    return <Button disabled>MINTED</Button>;
  }

  if (
    !isAccountWhitelisted?.data &&
    parseInt(totalReserved?.data) + parseInt(totalSupply?.data) >= 50
  ) {
    return <Button disabled>RESERVED</Button>;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        disabled={loading}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {loading ? (
          <Spinner />
        ) : !unhoveredText || hovering || isOpen ? (
          price
        ) : (
          unhoveredText
        )}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint Press Badge #{number}?</ModalHeader>
          <ModalBody>
            {!account ? (
              <Box textAlign="center" marginTop={10} marginBottom={10}>
                <KondorConnector />
                <Text>to continue</Text>
              </Box>
            ) : (
              <>
                <Text marginBottom={6}>
                  Minting this NFT will{" "}
                  {isAccountWhitelisted?.data
                    ? "use your whitelist spot"
                    : "cost 500 KOIN"}
                  . Are you sure?
                </Text>
                <NftImage number={number} grayscale={false} size="100%" />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                colorScheme="green"
                onClick={onMint}
                disabled={!account || loading}
              >
                {loading ? <Spinner /> : `Yes! Mint for ${price}`}
              </Button>
              <Button onClick={onClose} disabled={loading}>
                No, Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
