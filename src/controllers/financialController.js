import db from "../database/db.js";
import transactionSchema from "../schemas/transactionSchema.js";

export async function getTransactions(req, res) {
  const { user } = res.locals;

  try {
    const transactions = await db
      .collection("transactions")
      .find({ _id: user._id })
      .toArray();

    if (!transactions) {
      return res.sendStatus(422);
    }

    res.status(200).send(transactions);
  } catch (err) {
    console.log(err);
  }
}

export async function postTransaction(req, res) {
  const body = req.body;

  const { error } = transactionSchema.validate(body);

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  await db.collection("transactions").insertOne(body);
  res.sendStatus(201);
}
