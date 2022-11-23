import type { NextPage } from "next";
import { Grid, Stack, StackDivider, Text } from "@chakra-ui/react";

import NftGridItem from "../components/NftGridItem";

const Home: NextPage = () => {
  return (
    <Stack>
      <Text as="h1" fontSize="4xl">
        Press Badge NFTs
      </Text>
      <Text>
        The first NFT collection launched on Koinos. Fifty unique images that
        represent the importance of freedom of the press, decentralized
        governance, and the role blockchain has to play in our future. Koinos
        was created to bridge the gap between dApps and normal people, and The
        Koin Press has been reporting on its development since November 2021.
        This collection is for the people who have supported this project from
        the beginning.
      </Text>
      <StackDivider />
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {Array.from(Array(50).keys())
          .map((i) => (i + 1).toString().padStart(2, "0"))
          .map((num) => (
            <NftGridItem key={num} number={num} />
          ))}
      </Grid>
    </Stack>
  );
};

export default Home;
