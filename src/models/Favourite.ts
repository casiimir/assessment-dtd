import mongoose from "mongoose";

// TODO: to be defined...
const FavouriteSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.models.Comment ||
  mongoose.model("Favourite", FavouriteSchema);
