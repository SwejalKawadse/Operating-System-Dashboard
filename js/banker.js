// Banker's algorithm: Need matrix, Safety Algorithm, Resource-Request Algorithm, configuration validation.
const need=s=>s.max.map((r,i)=>r.map((v,j)=>v-s.alloc[i][j])),le=(a,b)=>a.every((v,i)=>v<=b[i]),add=(a,b)=>a.map((v,i)=>v+b[i]);
function validate(s){const e=[],bad=v=>!Number.isInteger(v)||v<0;
 s.avail.forEach((v,j)=>bad(v)&&e.push(`Available[${s.R[j]}] = ${iv(v)} is invalid (must be a non-negative whole number).`));
 s.P.forEach((p,i)=>s.R.forEach((r,j)=>{const a=s.alloc[i][j],x=s.max[i][j];
  if(bad(a))e.push(`Allocation[${p}][${r}] = ${iv(a)} is invalid.`);if(bad(x))e.push(`Maximum[${p}][${r}] = ${iv(x)} is invalid.`);
  if(!bad(a)&&!bad(x)&&a>x)e.push(`Allocation[${p}][${r}] = ${a} exceeds Maximum = ${x}; Need would be negative, so Allocation cannot exceed Maximum.`)}));return e}
function safety(alloc,nd,avail){let w=[...avail],fin=alloc.map(_=>false),seq=[],steps=[],st=0;
 for(;;){let k=-1;for(let t=0;t<alloc.length;t++){const i=(st+t)%alloc.length;if(!fin[i]&&le(nd[i],w)){k=i;break}}if(k<0)break;st=k+1;
  fin[k]=true;const wb=[...w];w=add(w,alloc[k]);seq.push(k);steps.push({p:k,need:nd[k],wb,work:[...w]})}
 return{safe:fin.every(Boolean),seq,steps,work0:[...avail],stuck:fin.map((f,i)=>f?-1:i).filter(i=>i>=0)}}
function workTbl(s,r){return T(['Step','Process','Need','Work before','Need ≤ Work','Work after (+Allocation)'],[['0','–','–',V(r.work0),'–','<b>Initial Work = Available</b>'],...r.steps.map((t,k)=>[k+1,`<b>${s.P[t.p]}</b>`,V(t.need),V(t.wb),B('g','YES'),V(t.work)])])}
const stateBadge=r=>r.safe?B('g','SAFE'):B('r','UNSAFE');
function req(s,pid,rq){const i=s.P.indexOf(pid),st=[];
 if(i<0)return{status:'INVALID',msg:`Invalid Process ID "${pid}". Valid IDs: ${s.P.join(', ')}.`,steps:[]};
 if(rq.length!==s.R.length||rq.some(v=>!Number.isInteger(v)))return{status:'INVALID',msg:'Request values must be whole numbers.',steps:[]};
 if(rq.some(v=>v<0))return{status:'INVALID',msg:`Negative request ${V(rq)} rejected. Requests must be ≥ 0.`,steps:[]};
 const nd=need(s)[i];st.push(`Step 1 – Request ${V(rq)} vs Need of ${pid} ${V(nd)}`);
 if(!le(rq,nd))return{status:'INVALID',msg:`Request exceeds the remaining Need of ${pid} ${V(nd)}; the process is exceeding its declared maximum claim.`,steps:st};
 st.push(`Request ≤ Need ✔. Step 2 – Request vs Available ${V(s.avail)}`);
 if(!le(rq,s.avail))return{status:'WAITING',msg:`Request is within Need but exceeds Available ${V(s.avail)}. ${pid} must wait; allocation is unchanged.`,steps:st};
 st.push('Request ≤ Available ✔. Step 3 – Temporarily allocate: Available −= Request, Allocation += Request, Need −= Request');
 const a=clone(s.alloc),av=s.avail.map((v,j)=>v-rq[j]);a[i]=add(a[i],rq);const r=safety(a,s.max.map((x,p)=>x.map((v,j)=>v-a[p][j])),av);
 st.push(`Step 4 – Safety Algorithm on temporary state (Available ${V(av)}): ${r.safe?'safe sequence '+r.seq.map(k=>s.P[k]).join(' → '):'no safe sequence'}`);
 if(r.safe)return{status:'GRANTED',msg:`Request is valid, available, and the new state is SAFE. Safe sequence: ${r.seq.map(k=>s.P[k]).join(' → ')}.`,steps:st,r,nA:a,nV:av};
 return{status:'DENIED',msg:`Request is within Need and Available but would leave the system UNSAFE (stuck: ${r.stuck.map(k=>s.P[k]).join(', ')}). The temporary allocation is discarded; original Allocation and Available are restored.`,steps:st,r}}
