import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

interface OutboundLinkProps {
  href: string;
  children: React.ReactNode;
  fontSize?: string;
}

export default function OutboundLink({ href, children, fontSize }: OutboundLinkProps) {
  return (
    <Text as="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "underline" }}
      fontSize={fontSize}
    >
      {children}
      <ExternalLinkIcon paddingBottom="0.2em" />
    </Text>
  );
}
