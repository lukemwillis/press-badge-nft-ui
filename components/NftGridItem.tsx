import { Button, Flex, GridItem, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import NftImage from "./NftImage";

type NftGridItemProps = {
  number: string;
};

export default function NftGridItem({ number }: NftGridItemProps) {
  return (
    <GridItem>
      <Stack>
        <Link href={`/nft/${number}`}>
          <a>
            <NftImage number={number} size="100%" />
          </a>
        </Link>
        <Flex justifyContent="space-between" alignItems="end">
          <Text as="h2" fontSize="2xl">
            #{number}
          </Text>
          <Button colorScheme="blue">Claim</Button>
        </Flex>
      </Stack>
    </GridItem>
  );
}
