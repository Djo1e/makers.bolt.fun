const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");
const {
  generateAuthToken,
  getAuthCookieConfig,
  createNewUser,
} = require("../../auth/utils/helperFuncs");

const loginEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpExist = await prisma.otp.findFirst({
      where: {
        address: email,
        otp: otp,
      },
    });

    if (!otpExist) {
      return res.status(401).json({ status: "ERROR", message: "Invalid OTP" });
    }

    const isExpired = otpExist.expiresAt < new Date();

    if (isExpired) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "OTP Expired. Request New One." });
    }

    const [userExist] = await Promise.all([
      prisma.userEmail.findFirst({
        where: {
          email,
        },
      }),
      prisma.otp.delete({
        where: {
          id: otpExist.id,
        },
      }),
    ]);

    let userId = userExist?.user_id;

    if (!userId) {
      userId = (await createNewUser()).id;

      await prisma.userEmail.create({
        data: {
          email,
          user_id: userId,
        },
      });
    }

    const authToken = await generateAuthToken(userId, null);

    const cookieConfig = getAuthCookieConfig();

    return res
      .status(200)
      .set("Cache-Control", "no-store")
      .cookie("Authorization", authToken, cookieConfig)
      .json({ logged_in: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/login-email", loginEmail);
} else {
  const router = express.Router();
  router.post("/login-email", loginEmail);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
