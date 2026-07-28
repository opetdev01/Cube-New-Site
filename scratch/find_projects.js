const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/projects.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Find the array content between `export const projects: Project[] = [` and the last `];`
const startIndex = fileContent.indexOf('export const projects: Project[] = [');
if (startIndex === -1) {
  console.log("Could not find start of projects array");
  process.exit(1);
}

const arrayStart = fileContent.indexOf('[', startIndex);
const jsonTxt = fileContent.substring(arrayStart);

// We can require or evaluate by stripping export and typescript parts.
// Let's do a simple regex scan instead since it's robust and fast!
const projects = [];
const regex = /\{\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)",[\s\S]*?"featuredImage":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(fileContent)) !== null) {
  projects.push({
    slug: match[1],
    title: match[2],
    featuredImage: match[3]
  });
}

const keywords = ['kemet', 'red hills', 'skiv', 'mada'];
const filtered = projects.filter(p => keywords.some(k => p.title.toLowerCase().includes(k) || p.slug.toLowerCase().includes(k)));

console.log("Filtered Projects:", JSON.stringify(filtered, null, 2));
console.log("Total projects parsed:", projects.length);
