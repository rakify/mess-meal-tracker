const router = require("express").Router();
const Entry = require("../models/Entry");
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

// CREATE A Entry
router.post("/", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.admin_key != req.body.admin_key) {
    return res
      .status(401)
      .json("Key doesn't match. Please reset the key or try again.");
  }
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
    const user = await User.findById(req.user.id);
    if (user.admin_key != req.body.admin_key) {
      return res
        .status(401)
        .json("Invalid key. You are unauthorized to delete an entry.");
    }
    await Entry.findByIdAndDelete(req.params.id);
    res.status(200).json("The entry has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A Entry
router.get("/find/:id", async (req, res) => {
  try {
    Entry.findById(req.params.id);
    res.status(200).json(Entry);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Entries by per user
router.get("/:username/:year/:month", async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const fromDate = new Date(year, month, 1);
    //const daysInMonth = new Date(year, month+1, 0).getDate();
    //console.log(daysInMonth);
    const toDate = new Date(year, month+1, 1);
  
    let entries = await Entry.find({
      user: req.params.username,
      $and: [{ createdAt: { $gt: fromDate } }, { createdAt: { $lt: toDate } }],
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
