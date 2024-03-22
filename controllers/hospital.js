const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllHospital = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getHospital = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createHospital = async (req, res) => {
  const service = {
    name: req.body.name,
    street: req.body.street,
    number: req.body.number,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .insertOne(service);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the service."
      );
  }
};

const updateHospital = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid serive id to update a service.");
  }
  const serviceId = new ObjectId(req.params.id);
  const service = {
    name: req.body.name,
    street: req.body.street,
    number: req.body.number,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .replaceOne({ _id: serviceId }, service);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the service."
      );
  }
};

const deleteHospital = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .deleteOne({ _id: userId });
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the user.");
  }
};

module.exports = { getAllHospital, getHospital, createHospital, updateHospital, deleteHospital };
