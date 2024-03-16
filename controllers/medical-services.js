const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDatabase()
    .db()
    .collection("community_health_centers")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid service id to find services.");
  }
  const serviceId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection("community_health_centers")
    .find({ _id: serviceId })
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
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
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the service."
      );
  }
};

const updateServices = async (req, res) => {
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
    .collection("community_health_centers")
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

const deleteServices = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid service id to delete a service.");
  }
  const serviceId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("community_health_centers")
    .remove({ _id: serviceId }, true);
  console.log(response);
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the service");
  }
};

module.exports = {
  getAll,
  getSingle,
  createServices,
  updateServices,
  deleteServices,
};
