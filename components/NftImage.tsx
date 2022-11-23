import {
  Grid,
  Image,
  Skeleton,
  useColorModeValue,
  ResponsiveObject,
} from "@chakra-ui/react";
import { useState } from "react";

type NftImageProps = {
  number: string;
  size: ResponsiveObject<string> | string;
  grayscale?: boolean;
};

const NftImage = ({ number, size, grayscale = true }: NftImageProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Grid width={size} height="auto">
      <Image
        src={useColorModeValue("/placeholder-dark.svg", "/placeholder.svg")}
        alt="placeholder"
        width="100%"
        height="auto"
        gridArea="1 / 1"
      />
      {!loaded && <Skeleton width="100%" height="auto" gridArea="1 / 1" />}
      <Image
        src={`https://bafybeial7korh5zldyo7qmz4kkeeo5tt7tybhd7jiorz2nx7iwvpzeadhi.ipfs.nftstorage.link/assets/${number}.png`}
        alt={`Press Badge NFT #${number}`}
        width="100%"
        height="auto"
        fit="cover"
        filter={grayscale ? "grayscale()" : "none"}
        _hover={{ filter: "none" }}
        _active={{ filter: "none" }}
        gridArea="1 / 1"
        onLoad={() => setLoaded(true)}
      />
    </Grid>
  );
};

export default NftImage;
