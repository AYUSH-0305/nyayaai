const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const path = require("path");

const extractText = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text;
  } else if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf-8");
  } else {
    throw new Error("Unsupported file format.");
  }
};

module.exports = extractText;
