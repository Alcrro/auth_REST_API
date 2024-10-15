import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
});

CategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CategorySchema.set("toJSON", {
  virtuals: true,
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
