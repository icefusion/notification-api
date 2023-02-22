export default {
  jwt: {
    secret: process.env.APP_SECRET || "default",
    expiresIn: "1d",
  },
  senders: {
    number: process.env.SENDER_PHONE_NUMBER || "",
    email: process.env.SENDER_EMAIL || ""
  }
};
