const jwt = require("jsonwebtoken");
const User = require("../schema/user");
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user? : any
}
const authorization = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token needed" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { _id } = decodedToken;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // Attach the user to the request object for later use
    next();
  } catch (err) {
    res.status(401).json({ error: "Authorization token not verified" });
  }
};

export default authorization;
