import {
  Container,
  Flex,
  Heading,
  Box,
  Center,
  Avatar,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Colors } from "./ColorScheme";
import Link from "next/link";

type BCProps = {
  role: string | null;
  href: string;
  username: string;
  profilesData: Array<{ title: string; path: string }>;
  isLogin?: boolean;
};

const Breadcrumbs: React.FC<BCProps> = ({
  username,
  role,
  profilesData,
  isLogin,
}) => {
  const toast = useToast();

  const onComing = () => {
    toast({
      title: "Segera Hadir",
      description: "Fitur ini sedang dalam tahap pengembangan",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      pt={{ base: 280, md: 300 }}
      h={300}
      justify="center"
      align={"center"}
      w={"full"}
      bg={Colors.secondary}
    >
      <Container maxW={"container.lg"}>
        <Stack
          rounded={"lg"}
          bg={"white"}
          p={{ base: 2, md: 5 }}
          shadow={"lg"}
          pb={10}
        >
          <div style={{ textAlign: "center" }}>
            <Avatar />
            <Heading size={"lg"}>{username}</Heading>
            <Text>{role}</Text>
          </div>
          <div style={{ marginTop: 10 }}>
            {!isLogin ? (
              <Link href="/auth/login">
                <Box
                  mt={3}
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    width: "100%",
                  }}
                  border={"2px"}
                  borderColor={Colors.fourthirty}
                  _hover={{ bg: Colors.fourthirty }}
                  p={3}
                  rounded={"lg"}
                >
                  Login
                </Box>
              </Link>
            ) : (
              profilesData?.map((link) => (
                // <Link href={link.path}>
                <Box
                  onClick={() => onComing()}
                  mt={3}
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    width: "100%",
                  }}
                  border={"2px"}
                  borderColor={Colors.fourthirty}
                  _hover={{ bg: Colors.fourthirty }}
                  p={3}
                  rounded={"lg"}
                >
                  {link.title}
                </Box>
                // </Link>
              ))
            )}
          </div>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Breadcrumbs;
