const fs = require('fs');
const path = require('path');

// Target directory path
const targetBaseDir = path.join('d:', 'Cube Ws Structure', 'projects - backup');

if (!fs.existsSync(targetBaseDir)) {
  console.error(`Target directory not found: ${targetBaseDir}`);
  process.exit(1);
}

// Helper to sanitize Windows folder names
const sanitizeFolderName = (name) => {
  return name.replace(/[\\\/:\*\?"<>\|]/g, '-').trim();
};

// Read all project folders
const projectFolders = fs.readdirSync(targetBaseDir);

projectFolders.forEach((folderName) => {
  const projectPath = path.join(targetBaseDir, folderName);
  const stat = fs.statSync(projectPath);
  if (!stat.isDirectory()) return;

  const infoMdPath = path.join(projectPath, 'info.md');
  if (!fs.existsSync(infoMdPath)) {
    console.log(`No info.md in: ${folderName}`);
    return;
  }

  // Read current info.md content
  const content = fs.readFileSync(infoMdPath, 'utf-8');
  const lines = content.split('\n');

  // Find the first line that starts with '#'
  const titleLine = lines.find((line) => line.trim().startsWith('#'));
  if (!titleLine) {
    console.warn(`No title header found in info.md for: ${folderName}`);
    return;
  }

  // Extract the project title
  const rawTitle = titleLine.replace(/^#\s*/, '').trim();
  if (!rawTitle) {
    console.warn(`Empty title header found in info.md for: ${folderName}`);
    return;
  }

  const sanitizedTitle = sanitizeFolderName(rawTitle);
  if (sanitizedTitle === folderName) {
    console.log(`Folder name already matches title: ${folderName}`);
    return;
  }

  const newProjectPath = path.join(targetBaseDir, sanitizedTitle);

  // Check for folder name collisions
  if (fs.existsSync(newProjectPath)) {
    console.warn(`Collision detected: ${newProjectPath} already exists. Skipping rename of ${folderName}`);
    return;
  }

  // Perform the rename
  try {
    fs.renameSync(projectPath, newProjectPath);
    console.log(`Renamed folder: "${folderName}" -> "${sanitizedTitle}"`);
  } catch (err) {
    console.error(`Error renaming folder "${folderName}" to "${sanitizedTitle}":`, err);
  }
});

console.log("All project folders have been successfully renamed to match their titles!");
