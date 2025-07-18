import jwt from "jsonwebtoken";

 const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next(); // aage badhne do
  } catch {
    return res.status(403).json({ message: "Token invalid." });
  }
};

export  default verifyToken;
