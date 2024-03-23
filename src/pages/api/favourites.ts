import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Favourite from "@/models/Favourite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET" && !req.query.id) {
    try {
      const favourites = await Favourite.find({});

      res.status(200).json(favourites);
    } catch (error) {
      res.status(500).json({ error: "Error with GET method" });
    }
  } else if (req.method === "GET" && req.query.id) {
    try {
      const favourite = await Favourite.findOne({ "data.id": req.query.id });

      if (favourite) {
        res.status(200).json({ isPresent: true });
      } else {
        res.status(200).json({ isPresent: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Error with GET method or 'id' query." });
    }
  } else if (req.method === "POST") {
    try {
      const newFavourite = new Favourite(req.body);

      if (
        await Favourite.findOne({
          "data.id": req.body.data.id,
        })
      ) {
        res.status(403).json({ error: "Photo already present in DB." });
      } else {
        await newFavourite.save();
        res.status(201).json({ message: "Photo added to favourites" });
      }
    } catch (error) {
      res
        .status(400)
        .json({
          error: "Error with POST method, the favourite was not added.",
        });
    }
  } else if (req.method === "DELETE" && req.query.id) {
    try {
      await Favourite.findOneAndDelete({
        "data.id": req.query.id,
      });

      res.status(201).json({ message: "The photo was deleted." });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error with DELETE method, the favourite was not delete.",
        });
    }
  } else {
    res.status(405).json({ success: false });
  }
}
