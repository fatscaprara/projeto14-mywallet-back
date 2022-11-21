import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

export async function signIn(req, res) {
  const user = req.body;

  try {
    const { error } = signInSchema.validate(user);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const userExist = await usersCollection.findOne({ email: user.email });

    if (!userExist) {
      return res.status(422).send("O email ou senha estão incorretos.");
    }

    const passwordOk = bcrypt.compareSync(user.password, userExist.password);

    if (!passwordOk) {
      return res.status(422).send("O email ou senha estão incorretos.");
    }

    const token = uuidV4();
    await sessionsCollection.insertOne({
      token,
      userId: userExist._id,
    });

    res.status(200).send({ token, userId: userExist._id });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const user = req.body;

  try {
    const { error } = signUpSchema.validate(user);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);

    await usersCollection.insertOne({
      name: user.name,
      email: user.email,
      password: hashPassword,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
