const folders = [];

exports.createFolder = (req, res) => {
  const { folderName } = req.body;
  const newFolder = { id: Date.now().toString(), folderName, documents: [] };
  folders.push(newFolder);
  res.status(201).json(newFolder);
};

exports.getAllFolders = (req, res) => {
  res.json(folders);
};

exports.getFolderById = (req, res) => {
  const folder = folders.find(f => f.id === req.params.id);
  if (folder) res.json(folder);
  else res.status(404).json({ error: "Folder not found" });
};
