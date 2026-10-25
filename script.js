// ===== Single source of truth: set the contract address here =====
const CONFIG={CA:"TBA",telegram:"https://t.me/massgasol",x:"https://x.com/massgasol"};
(()=>{
const ca=CONFIG.CA, live=ca&&ca!=="TBA";
const links={buy:`https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=${ca}`,chart:`https://dexscreener.com/solana/${ca}`,telegram:CONFIG.telegram,x:CONFIG.x};
document.querySelectorAll("[data-link]").forEach(a=>a.href=links[a.dataset.link]);
document.querySelectorAll(".ca-value").forEach(e=>e.textContent=ca);
const ifr=document.getElementById("dexEmbed");ifr.src=`https://dexscreener.com/solana/${ca}?embed=1&theme=dark&trades=0&info=0`;
document.getElementById("yr").textContent=new Date().getFullYear();
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
// loader
addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("done"),300));
setTimeout(()=>document.getElementById("loader").classList.add("done"),2500);
// copy
const msg=document.getElementById("liveMsg");
async function copy(t){try{await navigator.clipboard.writeText(t);return true}catch(e){const ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand("copy")}catch(_){}ta.remove();return ok}}
document.querySelectorAll(".copy-ca").forEach(b=>b.addEventListener("click",async()=>{const ok=await copy(ca);const l=b.querySelector(".copy-label")||b.querySelector("span");const old=l?l.textContent:"";if(l)l.textContent=ok?"Copied":"Failed";msg.textContent=ok?"Contract address copied":"Copy failed";setTimeout(()=>{if(l)l.textContent=old},1600)}));
// reveals
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const sib=[...e.target.parentElement.children].filter(c=>c.classList.contains("reveal"));e.target.style.transitionDelay=(Math.max(0,sib.indexOf(e.target))*90)+"ms";e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".reveal,.side-pose").forEach(el=>io.observe(el));
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const to=+e.target.dataset.to,t0=performance.now(),d=reduced?0:1600;const step=n=>{const p=d?Math.min(1,(n-t0)/d):1;e.target.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}));
document.querySelectorAll(".counter").forEach(c=>co.observe(c));
// tilt
if(matchMedia("(hover:hover)").matches&&!reduced)document.querySelectorAll(".tilt").forEach(c=>{c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`perspective(700px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*10}deg)`;c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%")});c.addEventListener("mouseleave",()=>c.style.transform="")});
// ripple
document.querySelectorAll(".btn-primary,.btn-ghost,.btn-mini").forEach(b=>b.addEventListener("click",e=>{const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement("span");sp.className="ripple";sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),600)}));
// stars
const st=document.getElementById("stars");
for(let i=0;i<70;i++){const s=document.createElement("i");s.className="star";s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${2+Math.random()*4}s;animation-delay:${-Math.random()*5}s;opacity:${.4+Math.random()*.6}`;st.appendChild(s)}
if(!reduced)setInterval(()=>{const s=document.createElement("i");s.className="shoot";s.style.left=(40+Math.random()*60)+"%";s.style.top=Math.random()*40+"%";st.appendChild(s);setTimeout(()=>s.remove(),1500)},3500);
// parallax hero pose
const hp=document.getElementById("heroPose");
if(!reduced)addEventListener("scroll",()=>{const y=scrollY;if(y<innerHeight)hp.style.transform=`translateY(${y*.15}px)`},{passive:true});
// fireworks
const cv=document.getElementById("fx"),cx=cv.getContext("2d");let parts=[],running=false;
const fit=()=>{cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};fit();addEventListener("resize",fit);
const cols=["#e0263b","#ffffff","#f5c542","#3b82f6"];
function burst(x,y){if(reduced)return;for(let i=0;i<60;i++){const a=Math.random()*Math.PI*2,v=1.5+Math.random()*4.5;parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c:cols[i%4]})}if(!running){running=true;requestAnimationFrame(loop)}}
function loop(){cx.clearRect(0,0,innerWidth,innerHeight);parts=parts.filter(p=>p.l>0);for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.vx*=.98;p.l-=.015;cx.globalAlpha=Math.max(p.l,0);cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,2.2,0,7);cx.fill()}cx.globalAlpha=1;if(parts.length)requestAnimationFrame(loop);else running=false}
addEventListener("click",e=>{if(!e.target.closest("a,button"))burst(e.clientX,e.clientY)});
setInterval(()=>{if(scrollY<innerHeight*.6&&!document.hidden)burst(innerWidth*(.15+Math.random()*.7),innerHeight*(.12+Math.random()*.3))},4200);
// star cursor trail (mouse only)
if(matchMedia("(pointer:fine)").matches&&!reduced){let last=0;addEventListener("mousemove",e=>{const n=performance.now();if(n-last<40)return;last=n;const t=document.createElement("i");t.className="trail";t.style.left=e.clientX-6+"px";t.style.top=e.clientY-6+"px";document.body.appendChild(t);setTimeout(()=>t.remove(),800)})}
})();
