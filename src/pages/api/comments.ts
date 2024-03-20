import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { imageId } = req.query;

    if (!imageId) {
      return res
        .status(400)
        .json({ error: "imageId is required as a query parameter." });
    }

    try {
      const comments = await Comment.find({ imageId: imageId.toString() });

      res.status(200).json(comments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const comment = await Comment.create(req.body);

      res.status(201).json({ success: true, data: comment });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          "'username', 'text' and 'imageId' are required as body content.",
      });
    }
  } else {
    res.status(405).json({ success: false });
  }
}
