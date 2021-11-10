const router = require("express").Router();
const Entry = require("../models/Entry");
const { verifyToken } = require("./verifyToken");

// CREATE A Entry
router.post("/", verifyToken, async (req, res) => {
  const newEntry = new Entry(req.body);
  try {
    savedEntry = await newEntry.save();
    res.status(200).json(savedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A Entry
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A Entry
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const Entry = await Entry.findByIdAndDelete(req.params.id);
    res.status(200).json("the Entry has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A Entry
router.get("/find/:id", async (req, res) => {
  try {
    const Entry = await Entry.findById(req.params.id);
    res.status(200).json(Entry);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Entries by per user
router.get("/:username", async (req, res) => {
  try {
    let entries = await Entry.find({ user: req.params.username });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
