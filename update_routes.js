const fs = require('fs');
const path = 'd:/ChikuCabs/chikucabs/src/data/cityCabRoutes.ts';
let content = fs.readFileSync(path, 'utf8');

const match = content.match(/"ddu-railway-station": \[([\s\S]*?)  \],\n\};/);
if (match) {
    const arrayContent = match[1];
    const insertion = `"ramnagar": [` + arrayContent + `  ],\n  "bhu": [` + arrayContent + `  ],\n};`;
    content = content.replace(/  \],\n\};/, `  ],\n  ` + insertion);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Success');
} else {
    console.log('Match not found');
}
