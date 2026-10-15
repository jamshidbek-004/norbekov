'use strict';
/* CRM lead webhook (inexbrand) — API kaliti bo'lsa shu yerga qo'ying, bo'lmasa bo'sh qoldiring ('') — shunda header yuborilmaydi */
const LEAD_WEBHOOK_URL='https://framer-integration.inexbrand.uz/api/webhook/lead';
const LEAD_WEBHOOK_KEY='';
const periods = ['30-noyabrgacha', '1–15-dekabr', '16-dekabrdan boshlab'];
const plans = [
  {name:'Onlayn',className:'online',label:'MASOFADAN ISHTIROK',subtitle:'Ustozlar bilan uch kun — sizga qulay joydan.',prices:[1900000,2200000,2500000],months:1,features:['3 kunlik intensivda onlayn ishtirok','Networking uchun yopiq guruh','Sog‘lomlashtirish kursiga 50% chegirma','Intensiv videoyozuvlari — 14 kun']},
  {name:'Standart',className:'standard',label:'JONLI ISHTIROK',subtitle:'Uch kunni o‘zingizga bag‘ishlang.',prices:[3500000,4000000,4500000],months:1,features:['3 kunlik intensivda to‘liq ishtirok','Networking uchun yopiq guruh','1-bosqich kursiga 50% chegirma','Mirzakarim Norbekovning 2 ta kitobi','Esdalik sovg‘alari va tarqatma materiallar','Intensiv videoyozuvlari — 14 kun','Kofe-breyk']},
  {name:'Premium',className:'premium',label:'O‘RGANISHNI DAVOM ETTIRISH UCHUN',subtitle:'Uch kunlik tajriba. O‘rganishga ko‘proq vaqt.',description:'Intensivda jonli qatnashing. Darslarni bir oy davomida qayta ko‘ring, to‘rtta kitob va ikki oylik Premium bot obunasidan foydalaning.',prices:[3900000,4500000,5000000],months:2,featured:true,cta:'Premiumni tanlayman',metrics:[['1 oy','videoyozuvlar'],['4 ta','Norbekov kitobi'],['50%','1-, 2-bosqichga chegirma']],features:['3 kunlik intensivda to‘liq jonli ishtirok','Networking uchun yopiq guruh','Esdalik sovg‘alari va tarqatma materiallar','Kofe-breyk']},
  {name:'VIP',className:'vip',label:'OLDINGI QATORLAR. ENG KENG IMKONIYATLAR.',subtitle:'Ustozlarga yaqinroq. Davom etishga ko‘proq imkoniyat.',description:'Uch kunni VIP sektorning 1–3-qatorlarida o‘tkazing. Darslarga ikki oy davomida qayting; beshta kitob va keyingi kurslar uchun eng keng chegirmalardan foydalaning.',prices:[7900000,8900000,10000000],months:3,featured:true,cta:'VIP formatini tanlayman',metrics:[['1–3','VIP sektor qatorlari'],['2 oy','videoyozuvlar'],['5 ta','Norbekov kitobi']],features:['3 kunlik intensivda to‘liq jonli ishtirok','1-, 2-, 3-bosqich kurslariga 50% chegirma','Mastersclub Uzbekistan: 6 oylik va yillik abonimentlarga 20% chegirma','Networking uchun yopiq guruh','Esdalik sovg‘alari va tarqatma materiallar','Kofe-breyk']}
];
let period=0;
const localDate=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Tashkent'});
if(localDate>='2026-12-16')period=2;
else if(localDate>='2026-12-01')period=1;
const money=value=>value===null?'Aniqlashtiriladi':String(value).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const plansElement=document.getElementById('plans');
function renderPlans(){
  plansElement.innerHTML=[2,3,0,1].map(index=>{
    const plan=plans[index];
    const metrics=plan.metrics?`<div class="plan-metrics">${plan.metrics.map(([value,label])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>`:'';
    const upgrade=plan.className==='premium'?`<div class="plan-upgrade"><span>STANDARTDAN +${money(plan.prices[period]-plans[1].prices[period])} SO‘M</span><p>Ko‘proq kitob, videoyozuvlarga uzoqroq kirish va 2-bosqich kursiga ham 50% chegirma.</p></div>`:plan.className==='vip'?'<div class="plan-upgrade"><span>INTENSIVDAN KEYIN HAM DAVOM ETING</span><p>1-, 2-, 3-bosqich kurslariga 50%. Mastersclub Uzbekistan’ning 6 oylik va yillik abonimentlariga 20% chegirma.</p></div>':'';
    return `<article class="plan ${plan.className} ${plan.featured?'featured':''}"><div class="plan-top"><div><p class="plan-label">${plan.label}</p><h3>${plan.name}</h3></div><span class="plan-symbol" aria-hidden="true">${plan.className==='vip'?'✦':'✳'}</span></div><p class="plan-subtitle">${plan.subtitle}</p>${plan.description?`<p class="plan-description">${plan.description}</p>`:''}<p class="plan-price ${plan.prices[period]===null?'unknown':''}">${money(plan.prices[period])}</p><p class="plan-currency">${plan.prices[period]===null?'Narxni menejerdan bilib oling':'so‘m / '+periods[period]}</p>${upgrade}${metrics}<div class="plan-rule"></div><p class="plan-includes">${plan.featured?'SHUNINGDEK, TARIF TARKIBIDA':'TARIF TARKIBIDA'}</p><ul>${plan.features.map(feature=>`<li>${feature}</li>`).join('')}</ul><div class="gift"><span>✦ SIZ UCHUN SOVG‘A</span>Norbekov Premium botiga <strong>${plan.months} oylik obuna</strong></div><button class="button" data-plan="${index}" aria-label="${plan.name} tarifini tanlash">${plan.cta||plan.name+'ni tanlash'} <span aria-hidden="true">↗</span></button></article>`;
  }).join('');
  document.querySelectorAll('[data-period]').forEach(button=>{const active=Number(button.dataset.period)===period;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  const onlinePrice=plans[0].prices[period];
  document.querySelector('.mobile-cta small').textContent=onlinePrice===null?'Onlayn narxi aniqlashtiriladi':money(onlinePrice)+' so‘mdan · '+periods[period];
}
renderPlans();
document.querySelectorAll('[data-period]').forEach(button=>button.addEventListener('click',()=>{period=Number(button.dataset.period);renderPlans();}));

const comparisonRows=[
 ['3 kunlik intensiv','Onlayn','Oflayn','Oflayn','Oflayn'],['Networking uchun yopiq guruh','Bor','Bor','Bor','Bor'],['Norbekov kurslariga 50% chegirma','Sog‘lomlashtirish kursi','1-bosqich','1-, 2-bosqich','1-, 2-, 3-bosqich'],['Mirzakarim Norbekov kitoblari','—','2 ta','4 ta','5 ta'],['Esdalik sovg‘alari','—','Bor','Bor','Bor'],['Tarqatma materiallar','—','Bor','Bor','Bor'],['Intensiv videoyozuvlari','14 kun','14 kun','1 oy','2 oy'],['Kofe-breyk','—','Bor','Bor','Bor'],['VIP sektor: 1–3-qatorlar','—','—','—','Bor'],['Mastersclub Uzbekistan: 6 oylik va yillik abonimentlarga chegirma','—','—','—','20%'],['Norbekov Premium bot obunasi','1 oy','1 oy','2 oy','3 oy']
];
document.getElementById('comparison-body').innerHTML=comparisonRows.map(row=>`<tr>${row.map((value,index)=>index===0?`<th scope="row">${value}</th>`:`<td>${value}</td>`).join('')}</tr>`).join('');
const compareButton=document.getElementById('compare-button');
compareButton.addEventListener('click',()=>{const comparison=document.getElementById('comparison');comparison.hidden=!comparison.hidden;compareButton.setAttribute('aria-expanded',String(!comparison.hidden));compareButton.innerHTML=comparison.hidden?'Tariflarni batafsil solishtirish <span aria-hidden="true">↓</span>':'Taqqoslashni yopish <span aria-hidden="true">↑</span>';});

const menuButton=document.querySelector('.menu-toggle');
const navigation=document.getElementById('navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Menyuni ochish');navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Menyuni yopish':'Menyuni ochish');});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});

let dialogOpener=null;
function openDialog(dialog,opener){dialogOpener=opener;dialog.showModal();document.body.classList.add('dialog-open');}
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){if(dialog.id==='contact-dialog'&&registrationBusy)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(dialogOpener?.isConnected)dialogOpener.focus();});
});
const registrationDialog=document.getElementById('contact-dialog');
const registrationForm=document.getElementById('registration-form');
const registrationPlan=document.getElementById('registration-plan');
const registrationSubmit=document.getElementById('registration-submit');
const registrationStatus=document.getElementById('registration-status');
let registrationPeriod=period;
let registrationReady=false;
let registrationBusy=false;
let submissionKey=null;
let lastPayload=null;
const planById=id=>plans.find(plan=>plan.className===id);
function updateRegistrationPlan(){
 const plan=planById(registrationPlan.value);
 document.getElementById('selected-plan').textContent=plan.name;
 document.getElementById('contact-price').textContent=money(plan.prices[registrationPeriod])+' so‘m';
 document.getElementById('contact-period').textContent=periods[registrationPeriod]+', 2026';
 registrationDialog.dataset.plan=plan.className;
}
function startRegistration(opener,index=2){
 if(registrationBusy)return;
 registrationPeriod=period;
 registrationPlan.value=plans[index].className;
 updateRegistrationPlan();
 openDialog(registrationDialog,opener);
 registrationReady=true;
 registrationSubmit.disabled=false;
 registrationStatus.textContent='';
 registrationStatus.hidden=true;
 registrationStatus.classList.remove('error');
}
plansElement.addEventListener('click',event=>{
 const button=event.target.closest('[data-plan]');
 if(button)startRegistration(button,Number(button.dataset.plan));
});
document.querySelectorAll('[data-register]').forEach(button=>button.addEventListener('click',()=>{closeMenu();startRegistration(button);}));
registrationPlan.addEventListener('change',updateRegistrationPlan);
function showFieldError(field,message){
 const input=document.getElementById('registration-'+field);
 const error=document.getElementById(field+'-error');
 input.setAttribute('aria-invalid',String(Boolean(message)));
 error.textContent=message;
 error.hidden=!message;
}
['name','phone'].forEach(field=>document.getElementById('registration-'+field).addEventListener('input',()=>showFieldError(field,'')));
const phoneField=document.getElementById('registration-phone');
function formatPhoneMask(raw){
 let d=raw.replace(/\D/g,'');
 if(d.startsWith('998'))d=d.slice(3);
 while(d.startsWith('998')&&d.length>9)d=d.slice(3);
 d=d.slice(0,9);
 let out='+998';
 if(d.length)out+=' '+d.slice(0,2);
 if(d.length>2)out+=' '+d.slice(2,5);
 if(d.length>5)out+=' '+d.slice(5,9);
 return out;
}
phoneField.addEventListener('focus',()=>{if(!phoneField.value)phoneField.value='+998 ';});
phoneField.addEventListener('input',()=>{
 const pos=phoneField.selectionStart;
 const before=phoneField.value;
 const after=formatPhoneMask(before);
 phoneField.value=after;
 if(after.length!==before.length){
  const diff=after.length-before.length;
  const newPos=Math.max(5,(pos||after.length)+diff);
  phoneField.setSelectionRange(newPos,newPos);
 }
});
phoneField.addEventListener('blur',()=>{if(phoneField.value.replace(/\D/g,'')==='998')phoneField.value='';});
registrationForm.addEventListener('submit',async event=>{
 event.preventDefault();
 if(registrationBusy||!registrationReady)return;
 const name=document.getElementById('registration-name').value.trim().replace(/\s+/g,' ');
 let digits=document.getElementById('registration-phone').value.replace(/\D/g,'');
 if(digits.length===9)digits='998'+digits;
 const validName=name.length>=2&&name.length<=80&&!/[\u0000-\u001f\u007f]/.test(name);
 const validPhone=/^998\d{9}$/.test(digits);
 showFieldError('name',validName?'':'Ismingizni to‘liq kiriting (kamida 2 ta belgi).');
 showFieldError('phone',validPhone?'':'Telefon raqamingizni to‘liq kiriting: +998 90 123 4567.');
 if(!validName||!validPhone){document.getElementById('registration-'+(!validName?'name':'phone')).focus();return;}
 const payload={name,phone:'+'+digits,plan:registrationPlan.value,period:registrationPeriod,website:document.getElementById('registration-website').value};
 const fingerprint=JSON.stringify(payload);
 if(fingerprint!==lastPayload){submissionKey=crypto.randomUUID();lastPayload=fingerprint;}
 registrationBusy=true;
 registrationSubmit.disabled=true;
 registrationForm.querySelectorAll('input,select').forEach(input=>input.disabled=true);
 registrationDialog.querySelector('[data-close]').disabled=true;
 registrationStatus.classList.remove('error');
 registrationStatus.textContent='Arizangiz yuborilmoqda…';
 registrationStatus.hidden=false;
 registrationSubmit.textContent='Yuborilmoqda…';
 const plan=planById(payload.plan);
 const price=plan.prices[payload.period];
 try{
  if(!payload.website){
   const leadPayload={name:payload.name,phone:payload.phone,message:`Tarif: ${plan.name} (${periods[payload.period]})`,source:'landing-page',price:price===null?undefined:price};
   const leadHeaders={'Content-Type':'application/json'};
   if(LEAD_WEBHOOK_KEY)leadHeaders['X-API-Key']=LEAD_WEBHOOK_KEY;
   const response=await fetch(LEAD_WEBHOOK_URL,{method:'POST',headers:leadHeaders,body:JSON.stringify(leadPayload),signal:AbortSignal.timeout(15000)});
   if(!response.ok)throw new Error('Arizangiz yuborilganini tasdiqlay olmadik. Iltimos, birozdan so‘ng qayta urinib ko‘ring.');
  }
  const confirmation={plan:plan.name,amount:price,period:periods[payload.period],confirmedAt:Date.now()};
  try{sessionStorage.setItem('norbekov-registration',JSON.stringify(confirmation));}catch{}
  window.location.assign('/rahmat');
 }catch(error){
  registrationStatus.textContent=error.name==='TimeoutError'||error.name==='TypeError'?'Arizangiz yuborilganini tasdiqlay olmadik. Iltimos, birozdan so‘ng qayta urinib ko‘ring yoki markazga qo‘ng‘iroq qiling.':error.message;
  registrationStatus.hidden=false;
  registrationStatus.classList.add('error');
 }finally{
  registrationBusy=false;
  registrationSubmit.disabled=!registrationReady;
  registrationForm.querySelectorAll('input,select').forEach(input=>input.disabled=false);
  registrationDialog.querySelector('[data-close]').disabled=false;
  registrationSubmit.innerHTML='Ariza yuborish <span aria-hidden="true">↗</span>';
 }
});
registrationDialog.addEventListener('cancel',event=>{if(registrationBusy)event.preventDefault();});

const photos=[
 {src:'assets/IMG_2350_1.webp',alt:'Avvalgi intensiv ishtirokchilari'},
 {src:'assets/IMG_3657.webp',alt:'Shohruh Norbekov ishtirokchilar bilan'},
 {src:'assets/IMAGE_2026-02-25_09_.webp',alt:'Mirzakarim Norbekov avvalgi uch kunlik intensivda'}
];
let photoIndex=0;
function showPhoto(index){photoIndex=(index+photos.length)%photos.length;const photo=photos[photoIndex];const image=document.getElementById('lightbox-image');image.src=photo.src;image.alt=photo.alt;document.getElementById('gallery-caption').textContent=`${photoIndex+1} / ${photos.length} — ${photo.alt}`;}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{showPhoto(Number(button.dataset.gallery));openDialog(document.getElementById('lightbox'),button);}));
document.getElementById('gallery-prev').addEventListener('click',()=>showPhoto(photoIndex-1));
document.getElementById('gallery-next').addEventListener('click',()=>showPhoto(photoIndex+1));
document.getElementById('lightbox').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(photoIndex-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(photoIndex+1);}});

const countEls=document.querySelectorAll('.methodology-stats .count');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateCount(el){
 const target=Number(el.parentElement.dataset.count||0);
 if(reduceMotion){el.textContent=target;return;}
 const duration=1400;
 const start=performance.now();
 function tick(now){
  const progress=Math.min((now-start)/duration,1);
  const eased=1-Math.pow(1-progress,3);
  el.textContent=Math.round(target*eased);
  if(progress<1)requestAnimationFrame(tick);
  else el.textContent=target;
 }
 requestAnimationFrame(tick);
}
if(countEls.length){
 const statsObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){
    animateCount(entry.target);
    statsObserver.unobserve(entry.target);
   }
  });
 },{threshold:0.5});
 countEls.forEach(el=>statsObserver.observe(el));
}

/* Mobil pastki (doimiy) "Ro'yxatdan o'tish" paneli — hero bo'limida ko'rinmaydi, undan chiqgandan keyin paydo bo'ladi */
const heroSection=document.querySelector('.hero');
const mobileCta=document.querySelector('.mobile-cta');
if(heroSection&&mobileCta&&'IntersectionObserver' in window){
 const heroObserver=new IntersectionObserver(([entry])=>{
  mobileCta.classList.toggle('visible',!entry.isIntersecting);
 },{threshold:0});
 heroObserver.observe(heroSection);
}

/* Saytning hero'dan pastki qismidagi matn va bloklarga silliq scroll-animatsiya */
if(!reduceMotion&&'IntersectionObserver' in window){
 const revealSelector=[
  '.methodology-heading','.methodology-stats>li',
  '.section-heading','.section-lead',
  '.audience-grid article','.intro-note',
  '.program-takeaways>div','.program-visual','.day','.program-next',
  '.mentor',
  '.gallery-item','.gallery-footnote','.venue',
  '.price-period','.plan','.pricing-note',
  '.faq-list details',
  '.closing-inner>h2','.closing-inner>p','.closing-inner>.button','.closing-meta',
  '.footer-top>p','.footer-top>a'
 ].join(',');
 const revealEls=Array.from(document.querySelectorAll(revealSelector));
 const groupCounters=new Map();
 revealEls.forEach(el=>{
  el.classList.add('reveal');
  const parent=el.parentElement;
  const n=groupCounters.get(parent)||0;
  groupCounters.set(parent,n+1);
  el.style.transitionDelay=Math.min(n,5)*70+'ms';
 });
 const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
   }
  });
 },{threshold:0.12,rootMargin:'0px 0px -60px 0px'});
 revealEls.forEach(el=>revealObserver.observe(el));
}
