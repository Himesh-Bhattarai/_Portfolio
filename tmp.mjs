import fs from 'fs';
const normalizeDashes = (str)=>str.replace(/Ã¢â‚¬â€?|â€”|—|–/g, "—");
const lines=fs.readFileSync('README.md','utf8').split(/\r?\n/);
const start=lines.indexOf('## Experience');const end=lines.indexOf('## Skills');const section=lines.slice(start+1,end);
console.log(section[0]);
const clean=normalizeDashes(section[0]);
console.log(clean);
console.log([...clean].map(c=>c.charCodeAt(0)));
