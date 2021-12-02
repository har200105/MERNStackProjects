const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);