import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { allPostsQuery } from "../../utils/queries";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const query = allPostsQuery();
    const user = req.body;
    client
      .createIfNotExists(user)
      .then(() => res.status(201).json({ message: "login successful" }));
  }
}
