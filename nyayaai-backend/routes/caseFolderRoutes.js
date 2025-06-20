const express = require("express");
const CaseFolder = require("../models/CaseFolder");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const folder = new CaseFolder({ title, description });
  await folder.save();
  res.json(folder);
});

router.get("/", async (req, res) => {
  const folders = await CaseFolder.find();
  res.json(folders);
});

router.get("/:id", async (req, res) => {
  const folder = await CaseFolder.findById(req.params.id);
  res.json(folder);
});

module.exports = router;
