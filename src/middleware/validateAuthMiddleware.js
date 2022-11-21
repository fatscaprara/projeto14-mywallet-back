import db from "../database/db";

const sessions = db.collection("sessions");
const users = db.collection("users");

async function validateAuthMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.statusStatus(401);
  }

  try {
    const session = sessions.findOne({ token });
    const user = users.findOne({ _id: session.userId });

    if (!session || !user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
