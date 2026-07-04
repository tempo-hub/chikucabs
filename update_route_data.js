const fs = require('fs');

const routeDataPath = 'd:/ChikuCabs/chikucabs/src/data/routeData.json';
const routeData = require(routeDataPath); 

const tsContent = fs.readFileSync('d:/ChikuCabs/chikucabs/src/data/cityCabRoutes.ts', 'utf8');
const dduMatch = tsContent.match(/"ddu-railway-station": \[\s*([\s\S]*?)\s*\],\s*\};/);
if (!dduMatch) {
  console.error("ddu-railway-station block not found!");
  process.exit(1);
}

const routesStr = dduMatch[1];
const destinations = [];
const regex = /to:\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(routesStr)) !== null) {
  destinations.push(match[1]);
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const newRoutes = [];
for (const dest of destinations) {
  const toSlug = slugify(dest);
  newRoutes.push({ url: `/ramnagar/ramnagar-to-${toSlug}-cab-fare` });
  newRoutes.push({ url: `/bhu/bhu-to-${toSlug}-cab-fare` });
}

const updatedData = routeData.concat(newRoutes);
fs.writeFileSync(routeDataPath, JSON.stringify(updatedData, null, 2), 'utf8');
console.log('Successfully added ' + newRoutes.length + ' routes to routeData.json');
