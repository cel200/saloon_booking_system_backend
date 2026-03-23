const stripe = require("../config/stripe");

const paymentController = {
  createPaymentIntent: async (req, res) => {
    try {

      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({ message: "Amount is required" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount:amount, // amount in paise
        currency: "inr",

        payment_method_types: ["card"] // ✅ only card
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret
      });

    } catch (error) {

      res.status(500).json({
        message: "Payment failed",
        error: error.message
      });

    }
  }
};

module.exports = paymentController;