const fs=require('fs');
const lines=fs.readFileSync('README.md','utf8').split(/\r?\n/);
const start=lines.indexOf('## Experience');
const end=lines.indexOf('## Skills');
const section=lines.slice(start+1,end);
section.forEach(l=>{
  const clean=l.replace(/â€”/g,'—');
  console.log(JSON.stringify(clean));
  const m=clean.match(/^-+\s*\*\*(.+?)\*\*\s*—\s*(.+?)\s*—\s*(.+)$/);
  console.log('match?', !!m, m?.[1]);
});
