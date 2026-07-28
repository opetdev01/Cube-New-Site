const fs = require('fs');
const path = require('path');

// Target directory path
const targetBaseDir = path.join('d:', 'Cube Ws Structure', 'projects - backup');

if (!fs.existsSync(targetBaseDir)) {
  console.error(`Target directory not found: ${targetBaseDir}`);
  process.exit(1);
}

// Read all project folders
const projectFolders = fs.readdirSync(targetBaseDir);

projectFolders.forEach((folderName) => {
  const projectPath = path.join(targetBaseDir, folderName);
  const stat = fs.statSync(projectPath);
  if (!stat.isDirectory()) return;

  const visualsPath = path.join(projectPath, 'visuals');
  if (!fs.existsSync(visualsPath)) {
    console.log(`No visuals folder in: ${folderName}`);
    return;
  }

  // Get all files inside the visuals folder
  const files = fs.readdirSync(visualsPath).filter((file) => {
    const filePath = path.join(visualsPath, file);
    return fs.statSync(filePath).isFile();
  });

  if (files.length === 0) return;

  // Sort files alphabetically to ensure consistent, deterministic ordering
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  // Step 1: Rename all files to a temporary name to avoid in-place naming conflicts
  const tempFiles = files.map((file, idx) => {
    const ext = path.extname(file);
    const tempName = `temp_${idx + 1}_${Date.now()}${ext}`;
    const srcPath = path.join(visualsPath, file);
    const destPath = path.join(visualsPath, tempName);
    fs.renameSync(srcPath, destPath);
    return { tempName, ext };
  });

  // Step 2: Rename from temporary names to final sequential names (1.ext, 2.ext, 3.ext...)
  tempFiles.forEach((item, idx) => {
    const finalName = `${idx + 1}${item.ext}`;
    const srcPath = path.join(visualsPath, item.tempName);
    const destPath = path.join(visualsPath, finalName);
    fs.renameSync(srcPath, destPath);
  });

  console.log(`Renamed visuals sequentially (1, 2, 3...) for project: ${folderName}`);
});

console.log("All project visuals have been renamed successfully!");
