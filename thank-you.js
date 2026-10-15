'use strict';
let confirmation=null;
try{confirmation=JSON.parse(sessionStorage.getItem('norbekov-registration')||'null');}catch{}
const allowedPlans=['Onlayn','Standart','Premium','VIP'];
if(confirmation&&allowedPlans.includes(confirmation.plan)&&Number.isFinite(confirmation.confirmedAt)&&Date.now()-confirmation.confirmedAt<24*60*60*1000&&Date.now()>=confirmation.confirmedAt){
 document.getElementById('thank-you-symbol').textContent='✓';
 document.getElementById('thank-you-eyebrow').textContent='ARIZANGIZ QABUL QILINDI';
 document.getElementById('thank-you-title').innerHTML='Birinchi qadam<br><em>qo‘yildi.</em>';
 document.getElementById('thank-you-description').textContent='Biznes psixologiyasi intensiviga qiziqishingiz uchun rahmat. Menejerimiz tanlagan tarifingiz va ishtirok tafsilotlari bo‘yicha siz bilan bog‘lanadi.';
 document.getElementById('confirmation-plan').hidden=false;
 document.getElementById('confirmation-plan-name').textContent=confirmation.plan;
 if(Number.isFinite(confirmation.amount)&&confirmation.amount>0){document.getElementById('confirmation-price').textContent=String(confirmation.amount).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' so‘m · '+confirmation.period;}
 document.getElementById('thank-you-note').innerHTML='Ariza to‘lov yoki joy band qilinganini anglatmaydi.<br>Savolingiz bo‘lsa: <a href="tel:+998550557677">+998 55 055 76 77</a>';
}
