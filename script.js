/* ===== SOZLAMALAR: shu yerdan o'zgartiring ===== */
const CONFIG={
  phone:"+998 90 123 45 67",
  address:"Toshkent shahri, Amir Temur ko'chasi, 1-uy",
  year:2016,
  owner:{
    name:"Akmal Karimov",                       // egasining ismi
    role:"Art Print asoschisi va egasi",
    quote:"Men har bir uyga san'at kirib borishini xohlayman. Rasm shunchaki bezak emas, u xonaga ruh beradi.",
    photo:""                                    // surat havolasi, masalan "owner.jpg". Bo'sh bo'lsa harf chiqadi
  }
};
/* Yangi ramka: ro'yxatga bitta qator qo'shing.
   bg = rang yoki gradient, w = ramka qalinligi (px), m = ichki qog'oz rangi,
   mw = ichki qog'oz qalinligi (px), add = qo'shimcha narx (so'm) */
const FRAMES=[
 {id:"none",   name:"Ramkasiz",  bg:"#ffffff", w:0,  m:"#fff",    mw:0,  add:0},
 {id:"black",  name:"Qora",      bg:"#141414", w:12, m:"#fff",    mw:10, add:60000},
 {id:"white",  name:"Oq",        bg:"#f7f5f0", w:12, m:"#fff",    mw:10, add:60000},
 {id:"oak",    name:"Eman",      bg:"linear-gradient(135deg,#d9a566,#a8743c 50%,#d9a566)", w:14, m:"#f6efe2", mw:8,  add:90000},
 {id:"walnut", name:"Yong'oq",   bg:"linear-gradient(135deg,#6b4226,#3e2412 50%,#6b4226)", w:14, m:"#f3ead8", mw:8,  add:100000},
 {id:"gold",   name:"Oltin",     bg:"linear-gradient(135deg,#f7e08a,#c9971c 45%,#f7e08a 70%,#a87a10)", w:14, m:"#fbf7ea", mw:12, add:130000},
 {id:"silver", name:"Kumush",    bg:"linear-gradient(135deg,#f2f2f2,#9aa0a6 50%,#e8e8e8)", w:12, m:"#fff",    mw:10, add:110000},
 {id:"copper", name:"Mis",       bg:"linear-gradient(135deg,#e9a37a,#b3623a 50%,#f0b690)", w:12, m:"#fff",    mw:10, add:110000},
 {id:"blue",   name:"Ko'k",      bg:"linear-gradient(135deg,#3b5bff,#1b2fb0)", w:12, m:"#fff", mw:8,  add:70000},
 {id:"red",    name:"Qizil",     bg:"linear-gradient(135deg,#e8404c,#a8161f)", w:12, m:"#fff", mw:8,  add:70000},
 {id:"pink",   name:"Pushti",    bg:"linear-gradient(135deg,#ff8cc0,#ff4f9a)", w:12, m:"#fff", mw:8,  add:70000},
 {id:"green",  name:"Zumrad",    bg:"linear-gradient(135deg,#1aa591,#0b5d52)", w:12, m:"#fff", mw:8,  add:70000},
 {id:"antique",name:"Antik",     bg:"linear-gradient(135deg,#e5c98a,#8a6a2a 40%,#e5c98a 60%,#6d531e)", w:22, m:"#f7f0dc", mw:14, add:180000},
 {id:"gallery",name:"Galereya",  bg:"#222", w:5,  m:"#fff", mw:26, add:120000}
];
/* ================================================ */

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" so'm";

/* ---- LOGO: abstrakt aylanuvchi daraxt ---- */
const logo=s=>{
  const A=["#5b3df5","#ff5fa2","#14b8a6","#ffc933"],B=["#ffc933","#14b8a6","#ff5fa2","#5b3df5"];
  let L="",I="";
  for(let i=0;i<8;i++){
    L+=`<ellipse cx="32" cy="14" rx="4.6" ry="9.5" fill="${A[i%4]}" transform="rotate(${i*45} 32 25)"/>`;
    I+=`<ellipse cx="32" cy="19" rx="2.6" ry="4.5" fill="${B[i%4]}" transform="rotate(${i*45+22} 32 25)"/>`;
  }
  return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#fff"/><path d="M32 60V34" stroke="#1b1630" stroke-width="4" stroke-linecap="round"/><path d="M22 60H42" stroke="#1b1630" stroke-width="3" stroke-linecap="round"/><g class="spin" style="transform-origin:32px 25px">${L}</g><g class="spin2" style="transform-origin:32px 25px">${I}</g><circle cx="32" cy="25" r="3" fill="#1b1630"/></svg>`;
};
document.querySelectorAll("[data-logo]").forEach(e=>e.innerHTML=logo(+e.dataset.logo));
document.querySelectorAll("[data-phone]").forEach(e=>{e.textContent=CONFIG.phone;e.href="tel:"+CONFIG.phone.replace(/\s/g,"")});
document.querySelectorAll("[data-addr]").forEach(e=>e.textContent=CONFIG.address);
document.querySelectorAll("[data-year]").forEach(e=>e.textContent=CONFIG.year);
$("#oq").textContent="“"+CONFIG.owner.quote+"”";
$("#oname").textContent=CONFIG.owner.name;
$("#orole").textContent=CONFIG.owner.role;
$("#ava").innerHTML=CONFIG.owner.photo?`<img src="${esc(CONFIG.owner.photo)}" alt="${esc(CONFIG.owner.name)}">`:esc(CONFIG.owner.name.charAt(0));

/* ---- Rasmlar kodda chiziladi (har biri o'ziga xos) ---- */
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const PAL=[["#fde2c8","#f4845f","#2b2d42","#f9c74f","#43aa8b"],["#e0f2f1","#00897b","#263238","#ffb300","#ef5350"],["#fff3e0","#e64a19","#1a237e","#ffca28","#26a69a"],["#f3e5f5","#8e24aa","#311b92","#ffd54f","#ff7043"],["#e8f5e9","#2e7d32","#1b2a1f","#fbc02d","#8d6e63"],["#fce4ec","#d81b60","#4a148c","#ffb74d","#4db6ac"],["#e3f2fd","#1e88e5","#0d1b4c","#ffd166","#ef476f"],["#fffde7","#f57f17","#3e2723","#80cbc4","#c62828"],["#eceff1","#455a64","#111827","#ffb703","#fb8500"],["#fbe9e7","#bf360c","#004d40","#ffe082","#7986cb"]];
const bg=c=>`<rect width="300" height="400" fill="${c}"/>`;
const pk=(r,p)=>p[1+(r()*4|0)];
const STY={
circles:(r,p)=>{let s=bg(p[0]);for(let i=0,n=3+(r()*3|0);i<n;i++)s+=`<circle cx="${60+r()*180|0}" cy="${80+r()*240|0}" r="${30+r()*60|0}" fill="${pk(r,p)}" opacity=".88"/>`;return s},
rings:(r,p)=>{let s=bg(p[2]);const cx=100+r()*100|0,cy=150+r()*100|0,c=[0,1,3,4,0,1];for(let i=0;i<6;i++)s+=`<circle cx="${cx}" cy="${cy}" r="${20+i*26}" fill="none" stroke="${p[c[i]]}" stroke-width="${8+r()*10|0}"/>`;return s},
blobs:(r,p)=>{let s=bg(p[0]);for(let i=0;i<5;i++){const x=40+r()*220|0,y=60+r()*280|0;s+=`<ellipse cx="${x}" cy="${y}" rx="${40+r()*60|0}" ry="${25+r()*45|0}" fill="${pk(r,p)}" opacity=".78" transform="rotate(${r()*180|0} ${x} ${y})"/>`}return s},
stripes:(r,p)=>{let s=bg(p[0]),x=0;while(x<300){const w=20+r()*60|0;s+=`<rect x="${x}" width="${w}" height="400" fill="${pk(r,p)}"/>`;x+=w}return s+`<circle cx="150" cy="${150+r()*100|0}" r="44" fill="${p[0]}"/>`},
grid:(r,p)=>{let s="";for(let y=0;y<4;y++)for(let x=0;x<3;x++){s+=`<rect x="${x*100}" y="${y*100}" width="100" height="100" fill="${p[r()*5|0]}"/>`;if(r()>.5)s+=`<circle cx="${x*100+50}" cy="${y*100+50}" r="${20+r()*26|0}" fill="${p[r()*5|0]}"/>`}return s},
tri:(r,p)=>{let s=bg(p[0]);for(let i=0;i<4;i++)s+=`<polygon points="${r()*300|0},${r()*400|0} ${r()*300|0},${r()*400|0} ${r()*300|0},${r()*400|0}" fill="${pk(r,p)}" opacity=".9"/>`;return s},
arches:(r,p)=>bg(p[1])+`<g transform="translate(${r()*40-20|0} 0)"><path d="M40 400V220a110 110 0 0 1 220 0V400Z" fill="${p[3]}"/><path d="M85 400V235a65 65 0 0 1 130 0V400Z" fill="${p[0]}"/><path d="M125 400V245a25 25 0 0 1 50 0V400Z" fill="${p[2]}"/></g>`,
sun:(r,p)=>{const y=230+r()*60|0;return bg(p[0])+`<path d="M60 ${y}a90 90 0 0 1 180 0Z" fill="${p[1]}"/><rect x="40" y="${y+8}" width="220" height="6" fill="${p[2]}"/><rect x="70" y="${y+28}" width="160" height="6" fill="${p[2]}"/><rect x="100" y="${y+48}" width="100" height="6" fill="${p[2]}"/>`},
moon:(r,p)=>bg(p[2])+`<circle cx="${110+r()*80|0}" cy="${110+r()*60|0}" r="60" fill="${p[3]}"/><rect y="300" width="300" height="100" fill="${p[4]}"/><rect y="345" width="300" height="55" fill="${p[1]}"/>`,
waves:(r,p)=>{let s=bg(p[0]);for(let i=0;i<4;i++){const y=170+i*55,a=20+r()*25|0;s+=`<path d="M0 ${y}Q75 ${y-a} 150 ${y}T300 ${y}V400H0Z" fill="${p[1+i%4]}"/>`}return s},
mount:(r,p)=>bg(p[0])+`<circle cx="${50+r()*200|0}" cy="90" r="28" fill="${p[3]}"/><path d="M0 330L${70+r()*60|0} ${150+r()*60|0}L170 300L${210+r()*40|0} ${200+r()*40|0}L300 340V400H0Z" fill="${p[2]}"/><path d="M0 390L${100+r()*60|0} ${260+r()*40|0}L220 380L300 310V400H0Z" fill="${p[4]}"/>`,
leaf:(r,p)=>{let s=bg(p[0])+`<path d="M150 400V80" stroke="${p[2]}" stroke-width="5"/>`;for(let i=0;i<7;i++)for(const d of[-1,1]){const x=150+d*34,y=340-i*40;s+=`<ellipse cx="${x}" cy="${y}" rx="30" ry="12" fill="${p[1+(i+(d>0?1:0))%4]}" transform="rotate(${-d*30} ${x} ${y})"/>`}return s}
};
const artSVG=a=>`<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Rasm">${STY[a.s](rng(a.seed),PAL[a.p])}</svg>`;

/* ---- 130+ rasm: avtomatik yaratiladi ---- */
const CATS=[
 ["Abstrakt",["circles","rings","blobs"],["Rangli","Sehrli","Yengil","Chuqur","Yorqin","Maftunkor","Erkin","Mayin"],["raqs","orzu","ohang","sado","nur","tuyg'u","sir","lahza"]],
 ["Geometrik",["stripes","grid","tri"],["Qizil","Ko'k","Sariq","Yashil","Qora","Oq","Pushti","Zangori"],["kvadrat","uchburchak","doira","chiziq","shakl","naqsh","kompozitsiya","panjara"]],
 ["Minimal",["arches","sun","moon"],["Yolg'iz","Yarim","Yumshoq","Tinch","Oddiy","Nozik","Sof","Bo'sh"],["doira","yoy","quyosh","oy","chiziq","nuqta","tepalik","soya"]],
 ["Manzara",["waves","mount"],["Sokin","Oltin","Ko'k","Uzoq","Yorqin","Jimjit","Bahorgi","Kumush"],["tog'","vodiy","dengiz","cho'l","daryo","sahar","shom","qirg'oq"]],
 ["Tabiat",["leaf","leaf","blobs"],["Yashil","Bahorgi","Yovvoyi","Yosh","Kechki","Tongi","Mayin","Sokin"],["barg","gul","daraxt","novda","bog'","meva","urug'","shabnam"]]
];
const PRODUCTS=[];
CATS.forEach(([c,st,ad,no],ci)=>{for(let i=0;i<24;i++){const seed=ci*100+i+1;
  PRODUCTS.push({id:PRODUCTS.length+1,title:ad[i%8]+" "+no[(i+3*(i>>3))%8],cat:c,price:90000+Math.floor(rng(seed*7)()*15)*10000,art:{s:st[i%st.length],p:(i*3+ci)%PAL.length,seed}})}});
/* internetdan olingan suratlar (picsum.photos so'z bo'yicha rasm beradi) */
const net=(seed,w=400,h=600)=>`https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
[["Sokin lahza","quiet"],["Ochiq osmon","openair"],["Oltin soat","golden"],["Mayin fokus","soft"],["Olisda","faraway"],["Yangi kun","newday"],["Tong shabadasi","dawn"],["Shahar nuri","citylight"],["Yashil vodiy","valley"],["Kech sohil","shore"],["Qor cho'qqisi","peak"],["Bahor yomg'iri","rain"]]
.forEach(([t,k],i)=>PRODUCTS.push({id:PRODUCTS.length+1,title:t,cat:"Foto",price:140000+i*5000,url:net(k),art:{s:"mount",p:i%10,seed:900+i}}));
const FEAT=[0,24,48,72,96,120].map(i=>PRODUCTS[i]);

const SIZES={S:{label:"Kichik 20×30 sm",m:1,w:120},M:{label:"O'rta 40×60 sm",m:1.6,w:170},L:{label:"Katta 60×90 sm",m:2.4,w:225}};
const price=(base,s)=>Math.round(base*SIZES[s].m/1000)*1000;
const sizeOpts=()=>Object.entries(SIZES).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join("");
const frameOf=id=>FRAMES.find(f=>f.id===id)||FRAMES[0];
const frameName=f=>f.id==="none"?"ramkasiz":f.name+" ramka";
const frameHTML=(inner,f)=>`<div class="fr" style="padding:${f.w}px;background:${f.bg}"><div class="mat" style="padding:${f.mw}px;background:${f.m}">${inner}</div></div>`;
const frameBtns=sel=>FRAMES.map(f=>`<button class="sw" data-frame="${f.id}" style="background:${f.bg}" title="${f.name}${f.add?" (+"+money(f.add)+")":""}" aria-label="${f.name}" aria-pressed="${f.id===sel}"></button>`).join("");
const pic=p=>p.url?`<img src="${p.url}" data-fb="${p.id}" alt="${esc(p.title)}" loading="lazy">`:artSVG(p.art);
let cart=[],cat="Hammasi",q="",sortBy="def",shown=24,frame="none",custom=null;

/* bosh sahifadagi 3 ta ramkali rasm */
$("#heroWall").innerHTML=[["w1","arches",1,"gold"],["w2","circles",6,"black"],["w3","leaf",4,"walnut"]].map(([c,s,p,f],i)=>`<div class="wf ${c}">${frameHTML(artSVG({s,p,seed:i+11}),frameOf(f))}</div>`).join("");

/* internetdan rasm yuklanmasa, chizilgan rasm chiqadi */
document.addEventListener("error",e=>{
  const i=e.target;
  if(i.tagName==="IMG"&&i.dataset.fb){const p=PRODUCTS.find(x=>x.id==i.dataset.fb),d=document.createElement("div");d.innerHTML=artSVG(p.art);i.replaceWith(d.firstChild)}
},true);

/* kartochkalar */
const card=p=>`<article class="card"><button class="pic" data-open="${p.id}" aria-label="${esc(p.title)}"><div class="frame">${pic(p)}</div></button><h3>${p.title}</h3><div class="meta">${p.cat}, ${money(p.price)} dan</div><button class="btn" data-open="${p.id}">Ko'rish</button></article>`;
$("#grid").innerHTML=FEAT.map(card).join("");

/* ---- Fikrlar tizimi ---- */
const SEED=[
 {pid:0,name:"Dilnoza, Toshkent",stars:5,text:"Rasm juda chiroyli chiqdi, ramka esa kutganimdan ham yaxshi. Mehmonxonamga ajoyib mos tushdi.",date:""},
 {pid:0,name:"Jasur, Samarqand",stars:5,text:"O'z suratimni yuklab, katta hajmda buyurtma berdim. Ranglar aynan ekrandagidek.",date:""},
 {pid:0,name:"Madina, Buxoro",stars:4,text:"Do'stimga sovg'a qildim, juda xursand bo'ldi. Yetkazish ham tez bo'ldi.",date:""}];
let reviews=(()=>{try{return JSON.parse(localStorage.getItem("ap_rv"))||SEED}catch(e){return SEED}})();
const saveRv=()=>{try{localStorage.setItem("ap_rv",JSON.stringify(reviews))}catch(e){}};
const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
function renderReviews(el){
  const pid=+el.dataset.pid,list=reviews.filter(r=>r.pid===pid),n=list.length,avg=n?list.reduce((a,r)=>a+r.stars,0)/n:0,st=+el.dataset.star||5;
  el.innerHTML=`<div class="rvhead"><h3>${pid?"Bu rasm haqida fikrlar":"Mijozlar fikri"}</h3><div class="avg"><b>${n?avg.toFixed(1):"–"}</b><span class="stars">${stars(Math.round(avg))}</span><small>${n} ta fikr</small></div></div>
  <div class="rvlist">${list.slice(-6).reverse().map(r=>`<div class="rvi"><div class="stars">${stars(r.stars)}</div><p>“${esc(r.text)}”</p><strong>${esc(r.name)}</strong>${r.date?` <small>${r.date}</small>`:""}</div>`).join("")||`<div class="empty">Hali fikr yo'q. Birinchi bo'ling!</div>`}</div>
  <div class="rvform"><h4>Fikr qoldiring</h4>
    <div class="starpick" role="group" aria-label="Baho">${[1,2,3,4,5].map(i=>`<button type="button" data-star="${i}" class="${i<=st?"on":""}" aria-label="${i} yulduz">★</button>`).join("")}</div>
    <input type="text" class="rvname" placeholder="Ismingiz" maxlength="30" aria-label="Ismingiz">
    <input type="text" class="rvtext" placeholder="Fikringiz" maxlength="200" aria-label="Fikringiz">
    <button class="btn" data-rvsend>Yuborish</button><div class="err"></div></div>`;
}
renderReviews($("#reviews .rv"));

/* ---- Bitta rasm oynasi ---- */
function openDetail(id,from){
  const p=PRODUCTS.find(x=>x.id===id);let s="S",f=FRAMES[0];
  openModal(`<div class="detail"><div id="dprev"></div><div>
    <h2 id="mtitle">${p.title}</h2><div class="meta">${p.cat}</div>
    <label for="dsize">Hajmi</label><select id="dsize">${sizeOpts()}</select>
    <label>Ramka: <span id="dfname"></span></label><div class="swatches" id="dframes"></div>
    <div class="total" id="dprice" style="color:var(--ink);margin:16px 0"></div>
    <button class="btn" id="dadd">Savatga qo'shish</button>
    ${from?'<button class="btn alt" id="back">Barcha takliflarga qaytish</button>':""}
  </div></div><div class="rv" data-pid="${p.id}"></div>`,true);
  const upd=()=>{
    $("#dprev").innerHTML=frameHTML(pic(p),f);
    $("#dprice").textContent=money(price(p.price,s)+f.add);
    $("#dfname").textContent=f.name;
    $("#dframes").innerHTML=frameBtns(f.id);
  };
  upd();renderReviews($(".mbox .rv"));
  $("#dsize").onchange=e=>{s=e.target.value;upd()};
  $("#dframes").onclick=e=>{const b=e.target.closest("[data-frame]");if(!b)return;f=frameOf(b.dataset.frame);upd()};
  $("#dadd").onclick=()=>{
    closeModal();
    addToCart({key:p.id+"-"+s+"-"+f.id,title:p.title,sub:SIZES[s].label+", "+frameName(f),price:price(p.price,s)+f.add,qty:1,thumb:pic(p)});
  };
  if(from)$("#back").onclick=openAll;
}

/* ---- "Ko'proq takliflar" oynasi ---- */
function openAll(){
  openModal(`<h2 id="mtitle">Ko'proq takliflar</h2>
  <div class="bar"><input type="text" id="q" placeholder="Rasm qidirish..." aria-label="Qidirish" value="${esc(q)}">
  <select id="so" aria-label="Saralash"><option value="def">Tavsiya etilgan</option><option value="asc">Narx: arzondan qimmatga</option><option value="desc">Narx: qimmatdan arzonga</option><option value="az">Nomi: A–Z</option></select></div>
  <div class="chips" id="chips" role="group" aria-label="Kategoriya"></div>
  <div class="grid" id="allgrid"></div><div class="cnt" id="cnt"></div>
  <button class="btn more" id="showMore">Ko'proq ko'rsatish</button>`,true);
  $("#so").value=sortBy;
  $("#q").oninput=e=>{q=e.target.value;shown=24;renderAll()};
  $("#so").onchange=e=>{sortBy=e.target.value;shown=24;renderAll()};
  $("#showMore").onclick=()=>{shown+=24;renderAll()};
  renderAll();
}
function renderAll(){
  const cats=["Hammasi",...new Set(PRODUCTS.map(p=>p.cat))];
  $("#chips").innerHTML=cats.map(c=>`<button class="chip" data-cat="${c}" aria-pressed="${c===cat}">${c}</button>`).join("");
  const t=q.trim().toLowerCase();
  const l=PRODUCTS.filter(p=>(cat==="Hammasi"||p.cat===cat)&&p.title.toLowerCase().includes(t));
  if(sortBy==="asc")l.sort((a,b)=>a.price-b.price);
  else if(sortBy==="desc")l.sort((a,b)=>b.price-a.price);
  else if(sortBy==="az")l.sort((a,b)=>a.title.localeCompare(b.title));
  else l.sort((a,b)=>(a.id*37%131)-(b.id*37%131));
  $("#allgrid").innerHTML=l.slice(0,shown).map(card).join("")||`<div class="empty">Hech narsa topilmadi.</div>`;
  $("#cnt").textContent=Math.min(shown,l.length)+" / "+l.length+" rasm";
  $("#showMore").style.display=shown<l.length?"":"none";
}
$("#moreBtn").onclick=openAll;

/* ---- umumiy bosishlar ---- */
const today=()=>{const d=new Date();return d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()};
document.addEventListener("click",e=>{
  const o=e.target.closest("[data-open]");
  if(o){openDetail(+o.dataset.open,o.closest("#modal")?"all":"");return}
  const c=e.target.closest("[data-cat]");
  if(c){cat=c.dataset.cat;shown=24;renderAll();return}
  const n=e.target.closest("[data-net]");
  if(n){closeModal();setCustom(n.dataset.net);return}
  const st=e.target.closest("[data-star]");
  if(st){const el=st.closest(".rv");el.dataset.star=st.dataset.star;el.querySelectorAll("[data-star]").forEach(b=>b.classList.toggle("on",+b.dataset.star<=+st.dataset.star));return}
  if(e.target.closest("[data-rvsend]")){
    const el=e.target.closest(".rv"),name=el.querySelector(".rvname").value.trim(),text=el.querySelector(".rvtext").value.trim();
    if(!name||text.length<3){el.querySelector(".err").textContent="Ismingiz va fikringizni yozing.";return}
    reviews.push({pid:+el.dataset.pid,name,stars:+el.dataset.star||5,text,date:today()});
    saveRv();renderReviews(el);toast("Fikringiz uchun rahmat!");return;
  }
  if(e.target.closest(".mx"))closeModal();
});

/* ---- savat ---- */
function addToCart(item){
  const ex=cart.find(c=>c.key===item.key);
  if(ex)ex.qty++;else cart.push(item);
  renderCart();toast(item.title+" savatga qo'shildi");
}
const total=()=>cart.reduce((a,c)=>a+c.qty*c.price,0);
function renderCart(){
  const n=cart.reduce((a,c)=>a+c.qty,0);
  $("#count").textContent=n;$("#sum").textContent=money(total());
  $("#checkout").disabled=!n;$("#clear").style.display=n?"":"none";
  $("#items").innerHTML=n?cart.map((c,i)=>`<div class="item"><div class="th">${c.thumb}</div>
    <div><strong>${esc(c.title)}</strong><div class="meta" style="margin:0">${esc(c.sub)}</div>
    <div class="qty"><button data-dec="${i}" aria-label="Kamaytirish">−</button><span>${c.qty}</span><button data-inc="${i}" aria-label="Ko'paytirish">+</button><button class="rm" data-rm="${i}">O'chirish</button></div></div>
    <strong>${money(c.price*c.qty)}</strong></div>`).join(""):`<div class="empty">Savatingiz bo'sh.<br>Boshlash uchun rasm qo'shing.</div>`;
}
$("#items").addEventListener("click",e=>{
  const t=e.target;
  if(t.dataset.inc!==undefined)cart[t.dataset.inc].qty++;
  else if(t.dataset.dec!==undefined){const c=cart[t.dataset.dec];c.qty--;if(c.qty<1)cart.splice(t.dataset.dec,1)}
  else if(t.dataset.rm!==undefined)cart.splice(t.dataset.rm,1);
  else return;
  renderCart();
});
$("#clear").onclick=()=>{cart=[];renderCart()};
function drawer(on){$("#drawer").classList.toggle("on",on);$("#overlay").classList.toggle("on",on);$("#drawer").setAttribute("aria-hidden",!on)}
$("#openCart").onclick=()=>drawer(true);
$("#closeCart").onclick=()=>drawer(false);
$("#overlay").onclick=()=>{drawer(false);closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){drawer(false);closeModal()}});

/* ---- oynalar ---- */
function openModal(html,wide){
  $("#mbox").className="mbox"+(wide?" wide":"");
  $("#mbox").innerHTML='<button class="x mx" aria-label="Oynani yopish">&times;</button>'+html;
  $("#modal").classList.add("on");$("#overlay").classList.add("on");
}
function closeModal(){$("#modal").classList.remove("on");if(!$("#drawer").classList.contains("on"))$("#overlay").classList.remove("on")}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});

/* ---- buyurtma berish (demo to'lov) ---- */
const digits=s=>s.replace(/\D/g,"");
$("#checkout").onclick=()=>{
  openModal(`<h2 id="mtitle">Buyurtmani rasmiylashtirish</h2>
  <p class="meta">Jami: <strong>${money(total())}</strong></p>
  <label for="fn">Ism va familiya</label><input type="text" id="fn" autocomplete="off">
  <label for="fp">Telefon raqami</label><input type="tel" id="fp" value="+998 " autocomplete="off">
  <label for="fa">Yetkazish manzili</label><input type="text" id="fa" autocomplete="off">
  <div class="pay"><h3>To'lov kartasi</h3>
    <p class="meta">Demo rejim: ma'lumotlar hech qayerga yuborilmaydi va saqlanmaydi. Haqiqiy karta raqamini kiritmang.</p>
    <label for="cn">Karta raqami</label><input type="text" id="cn" inputmode="numeric" placeholder="0000 0000 0000 0000" autocomplete="off">
    <div class="two"><div><label for="ce">Amal qilish muddati</label><input type="text" id="ce" inputmode="numeric" placeholder="OO/YY" autocomplete="off"></div>
    <div><label for="cc">CVC</label><input type="text" id="cc" inputmode="numeric" placeholder="123" autocomplete="off"></div></div>
  </div>
  <div class="err" id="ferr"></div>
  <div class="row"><button class="btn" id="place" style="flex:1">To'lash va buyurtma berish</button><button class="btn alt" id="cancel" style="margin:0">Bekor qilish</button></div>`);
  $("#cn").oninput=e=>{e.target.value=digits(e.target.value).slice(0,16).replace(/(.{4})/g,"$1 ").trim()};
  $("#ce").oninput=e=>{let d=digits(e.target.value).slice(0,4);e.target.value=d.length>2?d.slice(0,2)+"/"+d.slice(2):d};
  $("#cc").oninput=e=>{e.target.value=digits(e.target.value).slice(0,3)};
  $("#cancel").onclick=closeModal;
  $("#place").onclick=()=>{
    const n=$("#fn").value.trim(),ph=digits($("#fp").value),a=$("#fa").value.trim();
    const cn=digits($("#cn").value),ce=$("#ce").value,cc=$("#cc").value,mm=+ce.slice(0,2);
    let er="";
    if(!n)er="Ism va familiyangizni kiriting.";
    else if(ph.length<12)er="Telefon raqamini to'liq kiriting, masalan +998 90 123 45 67.";
    else if(!a)er="Yetkazish manzilini kiriting.";
    else if(cn.length!==16)er="Karta raqami 16 ta raqamdan iborat bo'lishi kerak.";
    else if(!/^\d\d\/\d\d$/.test(ce)||mm<1||mm>12)er="Amal qilish muddatini OO/YY ko'rinishida kiriting.";
    else if(cc.length!==3)er="CVC 3 ta raqamdan iborat bo'lishi kerak.";
    if(er){$("#ferr").textContent=er;return}
    const no="AP-"+Math.floor(10000+Math.random()*90000);
    cart=[];renderCart();drawer(false);
    openModal(`<h2 id="mtitle">Rahmat, ${esc(n)}!</h2><p>Buyurtma <strong>${no}</strong> qabul qilindi. Karta: **** ${cn.slice(-4)}.</p><p>Tez orada ${esc($("#fp").value)} raqamiga qo'ng'iroq qilamiz. Savollar bo'lsa: ${CONFIG.phone}</p><button class="btn" id="done">Xaridni davom ettirish</button>`);
    $("#done").onclick=closeModal;
  };
  $("#fn").focus();
};

/* ---- mening rasmim ---- */
$("#csize").innerHTML=sizeOpts();
const CBASE=160000;
const cprice=()=>price(CBASE,$("#csize").value)+frameOf(frame).add;
function renderPrev(){
  const f=frameOf(frame),s=$("#csize").value;
  $("#prev").style.width=SIZES[s].w+"px";
  $("#prev").innerHTML=frameHTML(custom?`<img src="${custom}" alt="Rasmingiz">`:"<span>Rasmingiz shu yerda ko'rinadi</span>",f);
  $("#swatches").innerHTML=frameBtns(frame)+`<div class="fname">${f.name}${f.add?" (+"+money(f.add)+")":""}</div>`;
  $("#ctotal").textContent=money(cprice());
  $("#addCustom").disabled=!custom;
}
function setCustom(src){
  const img=new Image();
  img.onload=()=>{custom=src;$("#fileErr").textContent="";renderPrev()};
  img.onerror=()=>{$("#fileErr").textContent="Rasmni yuklab bo'lmadi. Havolani yoki internetni tekshiring."};
  img.src=src;
}
function takeFile(f){
  $("#fileErr").textContent="";
  if(!f)return;
  if(!f.type.startsWith("image/")){$("#fileErr").textContent="Rasm faylini tanlang (JPG, PNG, WEBP).";return}
  if(f.size>10*1024*1024){$("#fileErr").textContent="Fayl juda katta. Eng ko'pi bilan 10 MB.";return}
  const r=new FileReader();
  r.onload=()=>setCustom(r.result);
  r.onerror=()=>{$("#fileErr").textContent="Faylni o'qib bo'lmadi. Boshqa fayl tanlang."};
  r.readAsDataURL(f);
}
$("#file").addEventListener("change",e=>takeFile(e.target.files[0]));
const dz=$("#drop");
["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("over")}));
["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("over")}));
dz.addEventListener("drop",e=>takeFile(e.dataTransfer.files[0]));
$("#csize").addEventListener("change",renderPrev);
$("#swatches").addEventListener("click",e=>{
  const b=e.target.closest("[data-frame]");if(!b)return;
  frame=b.dataset.frame;renderPrev();
});
$("#addCustom").onclick=()=>{
  if(!custom)return;
  const t=$("#ctitle").value.trim()||"Mening rasmim",s=$("#csize").value,f=frameOf(frame);
  addToCart({key:"custom-"+Date.now(),title:t,sub:SIZES[s].label+", "+frameName(f),price:cprice(),qty:1,thumb:`<img src="${custom}" alt="">`});
};

/* ---- internetdan tanlash ---- */
function showNet(k){
  $("#netgrid").innerHTML=[1,2,3,4,5,6].map(i=>`<button class="netpic" data-net="${net(k+i,600,900)}" aria-label="${i}-rasmni tanlash"><img src="${net(k+i,200,300)}" alt=""></button>`).join("");
}
$("#netBtn").onclick=()=>{
  openModal(`<h2 id="mtitle">Internetdan rasm tanlang</h2>
  <p class="meta">Istalgan so'zni yozing, yangi suratlar chiqadi. Yoqqanini bosing.</p>
  <div class="row"><input type="text" id="kw" placeholder="masalan: dengiz" aria-label="So'z"><button class="btn" id="kwgo">Ko'rsatish</button></div>
  <div class="netgrid" id="netgrid"></div>
  <label for="url">Yoki rasm havolasini qo'ying</label>
  <div class="row"><input type="text" id="url" placeholder="https://..."><button class="btn" id="urlgo">Ishlatish</button></div>
  <div class="err" id="neterr"></div>`,true);
  showNet("art");
  $("#kwgo").onclick=()=>showNet($("#kw").value.trim()||"art");
  $("#urlgo").onclick=()=>{
    const u=$("#url").value.trim();
    if(!/^https?:\/\//i.test(u)){$("#neterr").textContent="Havola http:// yoki https:// bilan boshlanishi kerak.";return}
    closeModal();setCustom(u);
  };
};

renderCart();renderPrev();
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),1800)}