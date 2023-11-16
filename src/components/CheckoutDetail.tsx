import { Flex, Heading, Image, Skeleton, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Loading from "./LoadingPage";

type ProductType = {
  title: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
  thumbnail: string;
};

interface CheckoutDetailProps {
  productdata?: ProductType;
  isLoading?: boolean;
}

const CheckoutDetail: React.FC<CheckoutDetailProps> = ({ productdata }) => {
  const subTotal = (productdata?.price || 0) * (productdata?.quantity || 0);

  return (
    <div>
      <Flex gap={2}>
        <Image
          objectFit={"contain"}
          src={productdata?.thumbnail}
          w={100}
          h={100}
        />
        <div>
          <Text fontWeight={"semibold"}>{productdata?.title}</Text>
          <Text>{productdata?.size}</Text>
          <Text>{productdata?.quantity}x</Text>
          <Text>Rp.{productdata?.price.toLocaleString("id-ID")}</Text>
        </div>
      </Flex>
      <Heading size="md" mt={8}>
        Subtotal: Rp.{subTotal.toLocaleString("id-ID")}
      </Heading>
    </div>
  );
};

export default CheckoutDetail;
