// pages/api/favourites/index.ts
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/mongodb";
import Favourite from "@/models/Favourite";

// TODO: to be defined...
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const favourites = await Favourite.find({});

      res.status(200).json(favourites);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const newFavourite = new Favourite(req.body);
      const savedFavourite = await newFavourite.save();

      res.status(201).json(savedFavourite);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ success: false });
  }
}
