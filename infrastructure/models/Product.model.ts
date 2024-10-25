import mongoose, { mongo } from "mongoose";

export interface iProductSchema {
  name: string;
  description: string;
  image: string;
  countInStock: number;
  brand: string;
  price: number;
  richDescription: string;
  images: string[];
  category: string;
  rating: number;
  numbReviews: number;
  isFeatured: boolean;
  dateCrated: Date;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  richDescription: {
    type: String,
    default: "",
  },
  images: {
    type: [{ type: String }],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numbReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCrated: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ProductSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
