import Head from "next/head";
import { Lato } from "next/font/google";
import MetaTag from "@/components/MetaTag";
import { Colors } from "@/components/ColorScheme";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";
import { useRouter } from "next/dist/client/router";
import ProductsList from "@/components/ProductsList";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Category from "@/components/Category";
import Loading from "@/components/LoadingPage";
import { useProducts } from "@/hooks/useProducts";

export default function Home({ content }: any) {
  const { push, reload } = useRouter();
  const { data, isLoading, error } = useProducts();

  if (content.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <MetaTag />
      </Head>
      <main style={{ backgroundColor: Colors.fourthirty }}>
        <div className="banner-home">
          <Container maxW={"container.xl"} px={{ base: 3, md: 5, lg: 10 }}>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justify={"center"}
              align={"center"}
            >
              <Box
                mt={{ base: 150, lg: 0 }}
                color="white"
                w={{ base: "full", lg: "50%" }}
              >
                <Heading
                  as="h1"
                  fontWeight={900}
                  size={{ base: "2xl", lg: "3xl" }}
                >
                  {content[0]?.heading}
                </Heading>
                <Text
                  opacity={"90%"}
                  my={3}
                  fontSize={{ base: "md", lg: "xl" }}
                >
                  {content[0]?.description}
                </Text>
                <HStack mt={{ base: 5, lg: 10 }} spacing={{ base: 3, lg: 6 }}>
                  <Button
                    onClick={() => push("/products")}
                    _hover={{
                      bg: Colors.hoverPrimary,
                      color: "white",
                    }}
                    bg={Colors.tertiary}
                    fontSize={{ base: "md", lg: "xl" }}
                    p={{ base: 5, lg: 8 }}
                  >
                    Beli Sekarang
                  </Button>
                  <Button
                    onClick={() => push("/contact")}
                    color={"white"}
                    bg={"transparent"}
                    _hover={{
                      bg: Colors.hoverPrimary,
                    }}
                    border={"1px solid" + Colors.hoverPrimary}
                    fontSize={{ base: "md", lg: "xl" }}
                    p={{ base: 4, lg: 7 }}
                  >
                    Hubungi Sekarang
                  </Button>
                </HStack>
              </Box>
              <Box
                mt={20}
                display={"flex"}
                h={"full"}
                w={{ base: "full", lg: "30%" }}
                ml={"auto"}
                bg={"white"}
              >
                <Image
                  src={content[0]?.banner}
                  mx={"auto"}
                  w={{ base: "70%", lg: 320 }}
                />
              </Box>
            </Flex>
          </Container>
        </div>

        <Container maxW="container.xl" px={{ base: 3, md: 5, lg: 10 }}>
          <Box
            py={5}
            display={"flex"}
            gap={{ base: 5, lg: 0 }}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Box w={{ base: "full", lg: "75%" }}>
              <Carousel images={content[2]?.images} />
            </Box>
            <Box
              bg={"white"}
              ml={"auto"}
              w={{ base: "full", lg: "23%" }}
              h={"full"}
            >
              <Image
                src={content[2]?.model}
                mx={"auto"}
                w={{ base: "70%", lg: "full" }}
                objectFit={"cover"}
                h={{ base: "full", lg: "400px" }}
              />
            </Box>
          </Box>

          <div style={{ marginBottom: 20 }}>
            <hr />
            <Heading
              color={Colors.secondary}
              fontSize={{ base: "2xl", md: "3xl" }}
              mt={{ base: 5, md: 7 }}
              mb={5}
              as={"h2"}
            >
              Kategori Produk
            </Heading>
            <Category />
          </div>

          <div>
            <hr />
            <Heading
              color={Colors.secondary}
              fontSize={{ base: "2xl", md: "3xl" }}
              mt={{ base: 5, md: 10 }}
              mb={5}
              as={"h2"}
            >
              Rekomendasi Produk
            </Heading>
            <ProductsList
              data={data?.products}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </Container>

        {/* ABOUT SECTION */}
        <p id="about"></p>
        <Box
          mt={10}
          pt={5}
          px={{ base: 3, md: 5, lg: 10 }}
          bg={Colors.primary}
          w={"full"}
        >
          <Flex
            gap={5}
            align={"center"}
            justify={"center"}
            direction={{ base: "column", lg: "row" }}
          >
            <Box w={{ base: "full", lg: "30%" }}>
              <Text
                mb={4}
                fontWeight={300}
                fontSize={"xl"}
                color={"white"}
                as={"p"}
              >
                {content[1]?.description}
              </Text>
              <Link
                fontSize={"lg"}
                fontWeight={700}
                href={"https://wa.me/6285770274043"}
                color={Colors.secondary}
              >
                Hubungi Sekarang
              </Link>
            </Box>
            <Box w={{ base: "full", lg: "50%" }}>
              <Image w={250} mx={"auto"} src={content[1]?.image} />
            </Box>
          </Flex>
        </Box>

        <div>
          <Contact />
        </div>

        <div>
          <Footer />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/get/content");
  const data = await response.json();

  return {
    props: {
      content: data.content,
    },
  };
}