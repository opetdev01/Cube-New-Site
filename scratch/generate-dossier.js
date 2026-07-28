const fs = require('fs');
const path = require('path');

// Read the projects TS file
const tsFilePath = path.join(__dirname, '..', 'src', 'data', 'projects.ts');
const fileContent = fs.readFileSync(tsFilePath, 'utf-8');

// Extract the array contents
const arrayStartIndex = fileContent.indexOf('export const projects: Project[] = [');
if (arrayStartIndex === -1) {
  console.error("Could not find projects array in TS file.");
  process.exit(1);
}

// Find the content after the start index
const arrayContentRaw = fileContent.substring(arrayStartIndex + 'export const projects: Project[] = '.length).trim();

// Parse the array
let projects = [];
try {
  projects = new Function(`return ${arrayContentRaw.replace(/export\s+interface\s+\w+\s*\{[^}]*\}/g, '')}`)();
} catch (e) {
  console.error("Error evaluating projects array:", e);
  process.exit(1);
}

console.log(`Found ${projects.length} projects to process.`);

// Define target directory path
const targetBaseDir = path.join('d:', 'Cube Ws Structure', 'projects-dossier');
const publicDir = path.join(__dirname, '..', 'public');

// Create the base directory if it doesn't exist
if (!fs.existsSync(targetBaseDir)) {
  fs.mkdirSync(targetBaseDir, { recursive: true });
}

// Process each project
projects.forEach((proj) => {
  const projectFolder = path.join(targetBaseDir, proj.slug);
  if (!fs.existsSync(projectFolder)) {
    fs.mkdirSync(projectFolder, { recursive: true });
  }

  // Delete any loose files in the project folder EXCEPT info.md
  const looseFiles = fs.readdirSync(projectFolder);
  looseFiles.forEach((file) => {
    const filePath = path.join(projectFolder, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && file !== 'info.md') {
      fs.unlinkSync(filePath);
    }
  });

  // Create "visuals" subfolder inside the project folder
  const visualsFolder = path.join(projectFolder, 'visuals');
  if (!fs.existsSync(visualsFolder)) {
    fs.mkdirSync(visualsFolder, { recursive: true });
  }

  // 1. info.md content
  const infoMdContent = `# ${proj.title}

* **Client:** ${proj.client || 'N/A'}
* **Location:** ${proj.location || 'N/A'}
* **Year:** ${proj.year || 'N/A'}
* **Sector:** ${proj.sector || 'N/A'}
* **Status:** ${proj.status || 'N/A'}

## Brief
${proj.description || proj.summary || 'No description available.'}
`;

  // Write info.md
  fs.writeFileSync(path.join(projectFolder, 'info.md'), infoMdContent, 'utf-8');

  // Helper function to safely copy a file into the visuals subfolder
  const copyImageFile = (relPath) => {
    if (!relPath) return;
    const decodedRelPath = decodeURIComponent(relPath);
    const srcPath = path.join(publicDir, decodedRelPath);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(visualsFolder, path.basename(decodedRelPath));
      fs.copyFileSync(srcPath, destPath);
    } else {
      console.warn(`Source image not found: ${srcPath}`);
    }
  };

  // 2. Copy Featured Image
  copyImageFile(proj.featuredImage);

  // 3. Copy Gallery Images
  if (proj.gallery && proj.gallery.length > 0) {
    proj.gallery.forEach((img) => {
      copyImageFile(img);
    });
  }

  console.log(`Generated info.md and filled visuals folder for: ${proj.slug}`);
});

console.log("All project dossiers have been updated successfully!");
