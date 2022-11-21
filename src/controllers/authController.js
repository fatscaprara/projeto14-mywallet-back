import db from "../database/db.js";
import bcrypt from "bcrypt";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const usersCollection = db.collection("users");

export async function signIn() {}

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
