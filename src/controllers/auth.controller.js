import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true, // js access disabled to prevent xss attacks
    path: "/", // cookie available for entire site
    secure: process.env.NODE_ENV === "production", // Use secure flag in production to prevent cookie from being sent over non-HTTPS connections
    sameSite: "strict", // SameSite attribute for security to prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    path: "/", // Ensure cookie is cleared for the entire site
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expiration set to a past date → browser deletes it immediately
  });

  res.status(200).json({ message: "Logged out successfully" });
};
