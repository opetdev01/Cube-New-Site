const fs = require('fs');
const path = require('path');

// Target directory path
const targetBaseDir = path.join('d:', 'Cube Ws Structure', 'projects - backup');

if (!fs.existsSync(targetBaseDir)) {
  console.error(`Target directory not found: ${targetBaseDir}`);
  process.exit(1);
}

// Helper to truncate text to max words
const truncateBrief = (text, maxWords) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
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

  // Split by the '## Brief' heading
  const splitIndex = content.indexOf('## Brief');
  if (splitIndex === -1) {
    console.warn(`No '## Brief' header found in info.md for project: ${folderName}`);
    return;
  }

  const headerPart = content.substring(0, splitIndex).trim();
  const briefPart = content.substring(splitIndex + '## Brief'.length).trim();

  // Truncate the brief part to 150 words
  const truncatedBrief = truncateBrief(briefPart, 150);

  // Re-assemble content
  const updatedContent = `${headerPart}\n\n## Brief\n${truncatedBrief}\n`;

  // Write updated content back to info.md
  fs.writeFileSync(infoMdPath, updatedContent, 'utf-8');
  console.log(`Truncated brief to max 150 words for project: ${folderName}`);
});

console.log("All project briefs in info.md files have been truncated successfully!");
