// import { Center, Box } from "@chakra-ui/react";
import { Center, Circle, Square } from "@chakra-ui/react";
import { HStack, Stack, VStack } from "@chakra-ui/react"


export default function AuthLayout({ children }) {
  return (
      <Center bg="grey" h="100vh" color="yellow">
              {children}
    </Center>
  );
}
