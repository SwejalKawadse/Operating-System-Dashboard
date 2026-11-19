// Resource Allocation Graph: sample deadlock scenario, cycle detection (DFS) and SVG drawing.
const G0={P:['P0','P1'],R:['R1','R2'],hold:{R1:'P0',R2:'P1'},reqs:[['P0','R2'],['P1','R1']]};
function cycle(g){const adj={};[...g.P,...g.R].forEach(n=>adj[n]=[]);for(const r in g.hold)if(g.hold[r])adj[r].push(g.hold[r]);g.reqs.forEach(([p,r])=>adj[p].push(r));
 const col={},st=[];let f=null;const d=u=>{col[u]=1;st.push(u);for(const v of adj[u]){if(f)return;if(col[v]==1){f=[...st.slice(st.indexOf(v)),v];return}if(!col[v])d(v)}st.pop();col[u]=2};
 Object.keys(adj).forEach(n=>{if(!col[n]&&!f)d(n)});return f}
const POS={P0:[90,60],R1:[300,60],P1:[300,190],R2:[90,190]};
function gsvg(g,cy){const ed=[];for(const r in g.hold)if(g.hold[r])ed.push([r,g.hold[r],'h']);g.reqs.forEach(([p,r])=>ed.push([p,r,'q']));
 const ck=new Set();if(cy)for(let i=0;i<cy.length-1;i++)ck.add(cy[i]+'>'+cy[i+1]);
 let s=`<svg viewBox="0 0 400 250" class=g><defs>${[['a1','#2563eb'],['a2','#d97706'],['a3','#dc2626']].map(([i,c])=>`<marker id=${i} viewBox="0 0 10 10" refX=9 refY=5 markerWidth=7 markerHeight=7 orient=auto><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join('')}</defs>`;
 ed.forEach(([a,b,t])=>{const [x1,y1]=POS[a],[x2,y2]=POS[b],dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),k=ck.has(a+'>'+b),c=k?'#dc2626':t=='h'?'#2563eb':'#d97706',id=k?'a3':t=='h'?'a1':'a2';
  s+=`<line x1=${x1+dx/l*26} y1=${y1+dy/l*26} x2=${x2-dx/l*26} y2=${y2-dy/l*26} stroke="${c}" stroke-width=2.5 ${t=='q'?'stroke-dasharray="6 4"':''} marker-end="url(#${id})"/>`});
 g.P.forEach(n=>{const[x,y]=POS[n];s+=`<circle cx=${x} cy=${y} r=22 fill="#dbeafe" stroke="#2563eb" stroke-width=2 /><text x=${x} y=${y+5} text-anchor=middle>${n}</text>`});
 g.R.forEach(n=>{const[x,y]=POS[n];s+=`<rect x=${x-20} y=${y-20} width=40 height=40 fill="#cffafe" stroke="#06b6d4" stroke-width=2 /><text x=${x} y=${y+5} text-anchor=middle>${n}</text>`});
 return s+'</svg>'}
const legend='<small>Circle = process · Square = resource · <span style="color:#2563eb">solid blue R→P = allocation</span> · <span style="color:#d97706">dashed orange P→R = request</span> · <span style="color:#dc2626">red = cycle</span></small>';
const edgeTbl=g=>T(['Edge','Type'],[...Object.entries(g.hold).filter(e=>e[1]).map(([r,p])=>[`${r} → ${p}`,'Allocation (resource held)']),...g.reqs.map(([p,r])=>[`${p} → ${r}`,'Request (waiting)'])]);
