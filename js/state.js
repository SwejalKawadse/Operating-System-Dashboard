// Application state, sample dataset (default data), localStorage persistence and small UI helpers.
const DEF={P:['P0','P1','P2','P3','P4'],R:['A','B','C'],alloc:[[0,1,0],[2,0,0],[3,0,2],[2,1,1],[0,0,2]],max:[[7,5,3],[3,2,2],[9,0,2],[2,2,2],[4,3,3]],avail:[3,3,2]};
const clone=o=>JSON.parse(JSON.stringify(o)),$=s=>document.querySelector(s);
let S;try{S=JSON.parse(localStorage.getItem('dl'))}catch(e){}if(!S||!S.P)S=clone(DEF);
const save=()=>{try{localStorage.setItem('dl',JSON.stringify(S))}catch(e){}};
let LOG=[],RES={},LASTREQ=null,REC=0,ORD={P0:['R1','R2'],P1:['R2','R1']},ENF=false,PREV=null;
const log=m=>{LOG.unshift(new Date().toLocaleTimeString()+' – '+m);LOG=LOG.slice(0,8)};
const V=a=>'('+a.join(', ')+')',B=(c,t)=>`<span class="b ${c}">${t}</span>`,iv=v=>v==null||v!==v?'':v;
const T=(h,rows)=>`<div class=tw><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const M=(s,m,l)=>T([l||'',...s.R],m.map((r,i)=>[`<b>${s.P[i]}</b>`,...r]));
