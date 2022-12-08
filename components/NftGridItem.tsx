import {
  Box,
  Button,
  Flex,
  GridItem,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAccount } from "../context/AccountProvider";
import { useOwner } from "../context/NftProvider";
import NftMintButton from "./NftMintButton";
import NftImage from "./NftImage";

type NftGridItemProps = {
  number: string;
};

export default function NftGridItem({ number }: NftGridItemProps) {
  const { account } = useAccount();
  const owner = useOwner(number);
  const isAccountOwner =
    typeof owner.data !== "undefined" && owner.data === account;
  const background = useColorModeValue("gray.800", "white");
  const foreground = useColorModeValue("white", "gray.800");

  return (
    <GridItem
      padding={2}
      borderRadius={4}
      background={isAccountOwner ? background : undefined}
    >
      <Stack>
        <Link href={`/nft/${number}`}>
          <a>
            <NftImage number={number} size="100%" grayscale={!isAccountOwner} />
          </a>
        </Link>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            as="h2"
            fontSize="2xl"
            color={isAccountOwner ? foreground : undefined}
          >
            #{number}
          </Text>
          {typeof owner.data === "undefined" ? (
            <Spinner />
          ) : !!owner.data ? (
            <Tooltip
              label={`Owned by ${owner.data}`}
              placement="bottom"
              hasArrow
            >
              <Box
                boxSizing="border-box"
                height="40px"
                borderWidth="thin"
                borderColor={isAccountOwner ? foreground : "inherit"}
                borderRadius="md"
                padding="2"
                color={isAccountOwner ? foreground : undefined}
              >
                {owner.data.substring(0, 4)}...
                {owner.data.substring(owner.data.length - 4)}
              </Box>
            </Tooltip>
          ) : (
            <NftMintButton number={number} unhoveredText="MINT NOW" />
          )}
        </Flex>
      </Stack>
    </GridItem>
  );
}
