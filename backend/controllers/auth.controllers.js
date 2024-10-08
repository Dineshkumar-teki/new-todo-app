import User from "../modal/user.modal.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await newUser.save();
    res.json("signup successfull");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, "dinesh");
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({rest,token});
  } catch (error) {
    next(error);
  }
};