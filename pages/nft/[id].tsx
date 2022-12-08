import {
  Box,
  Flex,
  Grid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NftImage from "../../components/NftImage";
import NftMintButton from "../../components/NftMintButton";
import OutboundLink from "../../components/OutboundLink";
import { useOwner } from "../../context/NftProvider";

const Nft = () => {
  const router = useRouter();
  const { id } = router.query;
  const number = id as string;
  const owner = useOwner(number);

  const contractAddr = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDR;

  return (
    <Stack>
      <Text as="h1" fontSize="4xl">
        Press Badge #{id}
      </Text>
      <StackDivider />
      <Flex gap={6} flexDirection={{ base: "column", md: "row" }} width="100%">
        <Box flexGrow="0">
          <NftImage number={number} size="100%" grayscale={false} />
        </Box>
        <Stack flexGrow="1">
          <Text>
            This press badge was created as one of 50 unique images. Owning this
            one-of-a-kind NFT grants you behind-the-scenes access to{" "}
            <OutboundLink href="https://thekoinpress.com">
              The Koin Press
            </OutboundLink>
            , <OutboundLink href="https://burnkoin.com">Burn Koin</OutboundLink>
            ,{" "}
            <OutboundLink href="https://kap.domains">
              Koinos Address Protocol
            </OutboundLink>
            , and other projects by{" "}
            <OutboundLink href="https://lukewillis.com">
              Luke Willis
            </OutboundLink>
            .
          </Text>

          <StackDivider />
          <Flex
            borderWidth="thin"
            borderColor="inherit"
            borderRadius="md"
            padding="4"
            justifyContent="space-between"
            alignItems="center"
          >
            {owner.data ? (
              <>
                <Text fontSize="2xl">Owned by</Text>
                <OutboundLink
                  href={`https://koinosblocks.com/address/${owner.data}`}
                  fontSize="2xl"
                >
                  {owner.data.substring(0, 4)}...
                  {owner.data.substring(owner.data.length - 4)}
                </OutboundLink>
              </>
            ) : (
              <>
                <Text fontSize="3xl">Mint Now</Text>
                <NftMintButton number={number} />
              </>
            )}
          </Flex>
          <StackDivider />

          <Text as="h2" fontSize="2xl">
            NFT Details
          </Text>
          <Grid as="dl" templateColumns="repeat(2, 1fr)" columnGap={6}>
            <Text as="dt">Artist</Text>
            <Text as="dd">
              <OutboundLink href="https://planetkoinos.com">
                Dokterkraakbeen
              </OutboundLink>
            </Text>

            <Text as="dt">Collection Size</Text>
            <Text as="dd">50 items</Text>

            <Text as="dt">Token Id</Text>
            <Text as="dd">{number}</Text>

            <Text as="dt">Contract Address</Text>
            <Text as="dd">
              {contractAddr ? (
                <OutboundLink
                  href={`https://koinosblocks.com/address/${contractAddr}`}
                >
                  {contractAddr.substring(0, 4)}...
                  {contractAddr.substring(contractAddr.length - 4)}
                </OutboundLink>
              ) : (
                "unknown"
              )}
            </Text>

            <Text as="dt">Chain</Text>
            <Text as="dd">Koinos</Text>
          </Grid>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Nft;
