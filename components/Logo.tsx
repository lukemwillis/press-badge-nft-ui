import { useColorModeValue, Image, ResponsiveValue } from "@chakra-ui/react";

interface LogoProps {
    size: ResponsiveValue<string>;
}

export default function Logo({ size }: LogoProps) {
  return (
      <Image
        src="/logo.png"
        alt="TKP Logo"
        width={size}
        height={size}
      />
  );
}
