import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    let response;

    if (req.query.search) {
      response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${req.query.search}&client_id=${ACCESS_KEY}`
      );
    } else if (req.query.id) {
      response = await axios.get(
        `https://api.unsplash.com/photos/${req.query.id}?client_id=${ACCESS_KEY}`
      );
    } else {
      response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}`
      );
    }
    res.status(200).json(response?.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch Unsplash API:", error.message);

      return res
        .status(error.response?.status || 500)
        .json({ message: error.message });
    }

    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
}
