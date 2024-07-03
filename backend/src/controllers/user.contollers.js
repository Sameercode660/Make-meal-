import { User } from "../models/user.models.js";
import { comparePassword, encryptPassword } from "../utils/bcrypt.utils.js";
import { jwtSign, verify } from "../utils/jwtToken.utils.js";
import jwt from "jsonwebtoken";
import { nodeMailer } from "../utils/nodemailer.utils.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// login user controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Anyone field is empty", status: false });
    }

    const check = await User.findOne({ email });

    if (!check) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", status: false });
    }

    const compare = await comparePassword(password, check.password);

    if (!compare) {
      return res
        .status(401)
        .json({ message: "Invalid password", status: false });
    }

    const token = jwtSign(email);

    res
      .status(200)
      .json({ message: "Successfully Logged in", response: check, token });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// signup user controller
const signup = async (req, res) => {
  try {
    const { fullName, email, mobile, password, orders } = req.body;

    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({ message: "Anyone field is empty" });
    }

    const checkUser = await User.find({ email });

    console.log(checkUser);

    if (checkUser.length) {
      return res
        .status(400)
        .json({ message: "Email already Exists", status: false });
    }

    const otp = await nodeMailer(email);

    const data = {
      fullName,
      email,
      mobile,
      password: await encryptPassword(password),
      otp,
    };

    const response = await User.create(data);

    if (!response) {
      return res
        .status(501)
        .json({ message: "Unable to create the user", status: false });
    }

    return res
      .status(200)
      .json({ message: "User Created sucessfully", response, status: true });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ messag: "Unable to create the user" });
  }
};

// login user with token only
const LoginWithToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token does not exist", status: false });
    }

    const correct = verify(token);

    if (!correct) {
      return res
        .status(401)
        .json({ message: "Token in not valid", status: false });
    }

    const decode = jwt.decode(token);

    const response = await User.findOne({ email: decode.data }).select(
      "-password"
    );

    res.status(200).json({
      message: "Token successfully Logged In",
      status: true,
      response,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const otpVerification = async (req, res) => {
  try {
    const { _id, otp } = req.body;
    console.log(_id, otp);

    const response = await User.findOne({ _id }).select("-password");
    console.log(response);

    if (response.otp != otp) {
      return res
        .status(401)
        .json({ message: "Entered otp is wrong", status: false });
    }

    const token = jwtSign(response.email);

    return res.status(200).json({
      response,
      message: "verified successfully",
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Unable to verify the user", status: false });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token)

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    console.log(email, name)
    res.json({ email, name });
    
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Unauthorised acess", status: false });
  }
};
export { login, signup, LoginWithToken, otpVerification, googleAuth };
