const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('src');
const matched = [];
files.forEach(f => {
  if (/\.(tsx|ts|js|jsx)$/.test(f)) {
    const content = fs.readFileSync(f, 'utf8');
    if (content.toLowerCase().includes('globally') || content.toLowerCase().includes('map') || content.toLowerCase().includes('marker') || content.toLowerCase().includes('point')) {
      matched.push(f);
    }
  }
});

console.log("Matched files:");
console.log(matched.map(p => p.replace(/\\/g, '/')));
