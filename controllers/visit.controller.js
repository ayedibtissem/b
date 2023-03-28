const VisitModal =require ("../models/Visit");
const mongoose =require("mongoose");

exports.createVisit = async (req, res) => {
  const visit = req.body;
  const newVisit = new VisitModal({
    ...visit,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newVisit.save();
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(404).json({ message: "Something wrong" });
  }
};

exports.getVisits= async (req, res) => {
  try {
    const visits = await VisitModal.find();
    res.status(200).json(visits);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};
exports. getVisit = async (req, res) => {
  const { id } = req.params;
  try {
    const  Visit= await VisitModal.findById(id);
    res.status(200).json(Visit);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};
exports. getVisitByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userVisits = await VisitModal.find({ creator: id });
  res.status(200).json(userVisits);
};
exports. deleteVisit = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No visit exist with id: ${id}` });
    }
    await VisitModal.findByIdAndRemove(id);
    res.json({ message: "vist deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};
exports.updateVisit = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No visit exist with id: ${id}` });
    }

    const updatedVisit = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await VisitModal.findByIdAndUpdate(id, updatedVisit, { new: true });
    res.json(updatedVisit);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};