import { productsData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const category = await productsData("category");
  res.status(200).json({ status: true, statuCode: 200, category });
}
