// Runs the SAME TC1-TC6 test functions the dashboard uses, headless in Node.
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = vm.createContext({ console });
['state', 'banker', 'graph', 'pages', 'tests'].forEach(f =>
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', f + '.js'), 'utf8'), ctx, { filename: f + '.js' }));
const results = vm.runInContext('TESTS.map(t=>{const r=t.run();return {id:t.id,title:t.t,pass:r.pass,actual:r.actual}})', ctx);
results.forEach(r => console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.id}  ${r.title}\n      ${r.actual}`));
const failed = results.filter(r => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} tests passed`);
process.exit(failed ? 1 : 0);
