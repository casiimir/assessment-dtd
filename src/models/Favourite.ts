import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.models.Favourite ||
  mongoose.model("Favourite", FavouriteSchema);
