const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{
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
    billamount: { type: Number, required: true },
    shippingcharges: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, enum: ["pending", "paid", "delivered"] },
},
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);