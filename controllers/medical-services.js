const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("community_health_centers")
    .find();
  result.toArray().then((community_health_centers) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(community_health_centers);
  });
};

const getSingle = async (req, res) => {
  const serviceId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("community_health_centers")
    .find({ _id: serviceId });
  result.toArray().then((community_health_centers) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(community_health_centers[0]);
  });
};

const createServices = async (req, res) => {
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
    .collection("community_health_centers")
    .insertOne(service);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the service."
      );
  }
};

module.exports = { getAll, getSingle, createServices };
