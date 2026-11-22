// =====================================================================
// Kengash murojaatlari — qadam-baqadam prototip (namunaviy ma'lumotlar)
// =====================================================================
const TYPES={ariza:['📄','Ariza','huquq va manfaatlaringizni amalga oshirishda yordam soʻrash'],taklif:['💡','Taklif','Agentlik yoki taʼlim sifati tizimini yaxshilash boʻyicha tavsiya'],shikoyat:['⚠️','Shikoyat','buzilgan huquq yoki manfaatingizni tiklashni talab qilish']};
const CATS=['Taʼlim sifati va akkreditatsiya','Attestatsiya, test va imtihonlar','Agentlik xizmatlari va xodimlari faoliyati','Normativ hujjatlar loyihalari','Korrupsiya xavfi haqida xabar','Boshqa masala'];
const REGIONS=['Toshkent shahri','Toshkent viloyati','Andijon viloyati','Buxoro viloyati','Fargʻona viloyati','Jizzax viloyati','Xorazm viloyati','Namangan viloyati','Navoiy viloyati','Qashqadaryo viloyati','Samarqand viloyati','Sirdaryo viloyati','Surxondaryo viloyati','Qoraqalpogʻiston Resp.'];
const MENU=[['📝 Murojaat yuborish'],['📂 Murojaatlarim','🔎 Anonim xabar holati'],['👤 Profil','ℹ️ Kengash haqida']];
const CANCEL=[['❌ Bekor qilish']];
const STAGE={yangi:'Yangi — Agentlikda',kengash:'Kengashga yuborildi',korib:'Koʻrib chiqilmoqda',xulosa:'Xulosa tasdiqlashda',javob:'Javob tayyorlanmoqda',yakun:'Yakunlangan'};
const TURN={yangi:['Agentlik xodimi','ag'],kengash:['Kengash raisi','kg'],korib:['Kengash aʼzosi','kg'],xulosa:['Kengash raisi','kg'],javob:['Agentlik xodimi','ag']};
const OUT={javob_berildi:'Javob berildi',yonaltirildi:'Yoʻnaltirildi',korilmadi:'Koʻrib chiqilmadi',qayd_etildi:'Qayd etildi'};
const CIT_STAGE={yangi:'Roʻyxatga olindi, Agentlik tekshirmoqda',kengash:'Jamoatchilik kengashiga yuborildi',korib:'Kengashda koʻrib chiqilmoqda',xulosa:'Kengashda koʻrib chiqilmoqda',javob:'Javob tayyorlanmoqda'};
const USERS={registrar:{name:'Rasulova Dilnoza',role:'Agentlik xodimi',inst:'ag'},chair:{name:'Usmonov Bahodir',role:'Kengash raisi',inst:'kg'},m1:{name:'Tursunova Malika',role:'Kengash aʼzosi',inst:'kg'},m2:{name:'Ergashev Sardor',role:'Kengash aʼzosi',inst:'kg'},admin:{name:'Tizim administratori',role:'Administrator',inst:'ag'}};
const ACT={to_council:'Kengashga yuborish',refer:'Boshqa organga yoʻnaltirish',close:'Koʻrib chiqilmaydi deb yopish',return_agency:'Agentlikka qaytarish',assign:'Kengash aʼzosiga biriktirish',conclude:'Xulosa yuborish',approve:'Xulosani tasdiqlash',ret:'Xulosani qaytarish',respond:'Javob yuborish',request_info:'Fuqarodan maʼlumot soʻrash'};
const DEMO={name:'Yusupov Sherzod Anvarovich',phone:'+998 90 123 45 67',region:'Fargʻona viloyati',address:'Fargʻona shahri, Mustaqillik koʻchasi, 12-uy',
 text:'2026-yil oktabr oyida oʻtkazilgan attestatsiya natijalari bir oydan beri eʼlon qilinmadi. Natijalar qachon chiqishini va kechikish sababini aniqlashtirishingizni soʻrayman.',
 anonText:'Imtihon paytida kuzatuvchi baho qoʻyish uchun pul soʻradi. Bu holat bir necha talabaga nisbatan takrorlangan.'};
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const fmtD=ymd=>ymd?ymd.slice(8,10)+'.'+ymd.slice(5,7)+'.'+ymd.slice(0,4):'—';
function addDays(ymd,n){const d=new Date(ymd+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
const TODAY='2026-11-21';

let S=null;          // joriy holat
let MODE='demo';     // 'demo' | 'free'
let SCEN='elec';     // 'elec' | 'anon'
let STEP=0, AUTO=null, ATTACH=false;

function seed(){return [
 {id:41,no:'JK-2026-000041',method:'e',type:'taklif',cat:CATS[0],body:'Akkreditatsiya natijalarini tumanlar kesimida ochiq maʼlumot sifatida eʼlon qilishni taklif qilaman.',cit:{name:'Ergasheva Nilufar Botirovna',phone:'+998 93 555 12 40',region:'Toshkent shahri',address:'Yunusobod tumani, 4-mavze, 17-uy'},stage:'yakun',outcome:'javob_berildi',council:true,assignee:'m2',conclusion:'Taklif maqbul. Kengash Agentlikka maʼlumotlarni ochiq formatda eʼlon qilishni tavsiya etdi.',conclBy:'m2',created:'2026-11-03',due:'2026-12-03',files:[],ev:[['03.11 09:12','Fuqaro','Fuqaro yubordi'],['03.11 09:12','Tizim','Roʻyxatga olindi'],['04.11 10:30','Rasulova D.','Kengashga yuborildi'],['05.11 11:00','Usmonov B.','Aʼzoga biriktirildi: Ergashev S.'],['12.11 16:20','Ergashev S.','Xulosa yuborildi'],['13.11 09:40','Usmonov B.','Xulosa tasdiqlandi'],['13.11 15:05','Rasulova D.','Javob yuborildi']]},
 {id:42,no:'JK-2026-000042',method:'e',type:'ariza',cat:CATS[2],body:'Agentlik saytidagi attestatsiya arizasi shakli ishlamayapti, ikki marta yuborishga urindim.',cit:{name:'Qodirov Javlon Ulugʻbekovich',phone:'+998 97 410 22 18',region:'Samarqand viloyati',address:'Samarqand shahri, Registon koʻchasi, 5-uy'},stage:'korib',council:true,assignee:'m2',created:'2026-11-14',due:'2026-11-29',files:[],ev:[['14.11 14:02','Fuqaro','Fuqaro yubordi'],['14.11 14:02','Tizim','Roʻyxatga olindi'],['15.11 09:15','Rasulova D.','Kengashga yuborildi'],['16.11 10:05','Usmonov B.','Aʼzoga biriktirildi: Ergashev S.']]},
 {id:43,no:'JK-2026-000043',method:'e',type:'shikoyat',cat:CATS[1],body:'Test markazida imtihon vaqti eʼlon qilinganidan 2 soat kech boshlandi, nogironligi bor nomzodlar uchun shart-sharoit yoʻq edi.',cit:{name:'Abdullayeva Mohira Sobirovna',phone:'+998 99 701 33 05',region:'Buxoro viloyati',address:'Buxoro shahri, Navoiy koʻchasi, 21-uy'},stage:'kengash',council:true,created:'2026-11-19',due:'2026-12-04',files:[{n:'bilet.jpg'}],ev:[['19.11 11:40','Fuqaro','Fuqaro yubordi'],['19.11 11:40','Tizim','Roʻyxatga olindi'],['20.11 09:05','Rasulova D.','Kengashga yuborildi']]},
 {id:12,no:'AX-2026-000012',method:'a',type:'taklif',cat:CATS[5],body:'Agentlik Telegram kanalida eʼlonlar rus tilida ham berilsa, koʻproq odam xabardor boʻladi.',cit:null,stage:'yangi',council:false,created:'2026-11-20',due:null,files:[],ev:[['20.11 18:22','Anonim','Fuqaro yubordi'],['20.11 18:22','Tizim','Roʻyxatga olindi']]},
];}
function init(){S={chat:[],rkb:null,bot:{st:'',d:{}},profile:null,subs:seed(),ctr:{JK:43,AX:12},role:'registrar',view:'list',det:null,flash:null,clock:600,code:null,hl:null,pane:'bot',form:null,anonLink:{}};}
function clock(){S.clock+=1;const h=Math.floor(S.clock/60),m=S.clock%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');}
function now(){return '21.11 '+clock();}

// ---------------- Telegram-bot mantiqi (haqiqiy bot bilan bir xil ketma-ketlik) ----------------
function say(html,kb){S.chat.push({f:'b',h:html,kb:kb||null,t:clock()});}
function you(o){S.chat.push(Object.assign({f:'u',t:clock()},o));return S.chat.length-1;}
function markUsed(label){for(let i=S.chat.length-1;i>=0;i--){const m=S.chat[i];if(m.f==='b'&&m.kb&&!m.used){m.used='✅ '+label;return;}}}
function welcome(){say('Assalomu alaykum!\n\nBu — <b>Jamoatchilik kengashi</b>ning rasmiy murojaat boti (Taʼlim sifatini taʼminlash milliy agentligi huzurida).\n\nBu yerda <b>ariza, taklif yoki shikoyat</b> yuborasiz va holatini kuzatasiz. Murojaatni ism-sharifingiz bilan yoki anonim yuborishingiz mumkin.');S.rkb=MENU;S.bot={st:'',d:{}};}
function startAppeal(){S.bot={st:'shakl',d:{}};S.rkb=CANCEL;say('Yangi murojaat. Istalgan vaqtda «Bekor qilish»ni bosishingiz mumkin.');
 say('<b>1/6 · Murojaat shakli</b>\n\n🪪 <b>Ism-sharif bilan</b> — Telegram kontaktingiz va maʼlumotlaringiz bilan. Qonunga muvofiq koʻrib chiqiladi va javob beriladi. Maʼlumotlar bir marta kiritiladi.\n\n🕶 <b>Anonim</b> — shaxsingiz soʻralmaydi va saqlanmaydi. Qonunga koʻra anonim murojaat koʻrib chiqilmaydi va javob berilmaydi; Kengash tahlili uchun qayd etiladi.',[[['🪪 Ism-sharif bilan','m:e'],['🕶 Anonim','m:a']]]);}
function askContact(){S.bot.st='reg_contact';S.bot.d.reg={};S.rkb=[['📱 Kontaktni ulashish'],['❌ Bekor qilish']];
 say('<b>Roʻyxatdan oʻtish · 1/4 · Kontakt</b>\n\nPastdagi «📱 Kontaktni ulashish» tugmasini bosing. Telegram raqamingizni oʻzi yuboradi — qoʻlda yozish shart emas.\n\nKontaktni ulashish orqali F.I.Sh., telefon, hudud va manzilingiz faqat murojaatni koʻrib chiqish va javob berish uchun ishlatilishiga rozilik bildirasiz. Telefon va manzilni faqat Agentlikning masʼul xodimi koʻradi.');}
function askType(){S.bot.st='turi';S.rkb=CANCEL;say('<b>2/6 · Murojaat turi</b>\n\n'+Object.values(TYPES).map(t=>t[0]+' <b>'+t[1]+'</b> — '+t[2]).join('\n'),[Object.entries(TYPES).map(([k,t])=>[t[0]+' '+t[1],'t:'+k])]);}
function askCat(){S.bot.st='mavzu';say('<b>3/6 · Mavzu</b>\nMurojaatingiz qaysi masalaga tegishli?',CATS.map((c,i)=>[[c,'c:'+i]]));}
function showConfirm(){S.bot.st='tekshir';const d=S.bot.d;const t=TYPES[d.type];
 const who=d.method==='a'?'🕶 Anonim (shaxsingiz koʻrsatilmaydi)':'🪪 '+esc(S.profile.name)+', '+esc(S.profile.phone);
 const kb=d.method==='a'?[[['📤 Yuborish va holat haqida xabar olish','cf:sendn']],[['📤 Yuborish (xabarsiz)','cf:sendq']],[['✏️ Matnni oʻzgartirish','cf:edit'],['❌ Bekor qilish','cf:cancel']]]:[[['📤 Yuborish','cf:send']],[['✏️ Matnni oʻzgartirish','cf:edit'],['❌ Bekor qilish','cf:cancel']]];
 say('<b>6/6 · Tekshiring</b>\n\n<b>Shakli:</b> '+who+'\n<b>Turi:</b> '+t[0]+' '+t[1]+'\n<b>Mavzu:</b> '+esc(CATS[d.cat])+'\n<b>Fayllar:</b> '+(d.files.length?d.files.length+' ta':'yoʻq')+'\n\n<b>Matn:</b>\n'+esc(d.body)+'\n\n«Yuborish» tugmasini bosib, maʼlumotlar toʻgʻriligini tasdiqlaysiz.',kb);
 S.bot.d.previewIdx=S.chat.length-1;}
function userText(txt){
 if(txt==='📝 Murojaat yuborish'){you({h:esc(txt)});return startAppeal();}
 if(txt==='❌ Bekor qilish'){you({h:esc(txt)});S.bot={st:'',d:{}};S.rkb=MENU;return say('Bekor qilindi. Kiritilgan maʼlumotlar saqlanmadi.');}
 if(txt==='📂 Murojaatlarim'){you({h:esc(txt)});return myAppeals();}
 if(txt==='👤 Profil'){you({h:esc(txt)});return S.profile?say('<b>Profil</b>\n\nF.I.Sh.: '+esc(S.profile.name)+'\nTelefon: '+esc(S.profile.phone)+'\nHudud: '+esc(S.profile.region)+'\nManzil: '+esc(S.profile.address)):say('Siz hali roʻyxatdan oʻtmagansiz. Roʻyxatdan oʻtish ism-sharif bilan murojaat yuborishda soʻraladi.');}
 if(txt==='ℹ️ Kengash haqida'){you({h:esc(txt)});return say('<b>Jamoatchilik kengashi haqida</b>\n\nKengash fuqarolar, nodavlat tashkilotlar va Agentlik oʻrtasida muloqotni taʼminlaydi va murojaatlarni koʻrib chiqishda ishtirok etadi. Kengash qarorlari tavsiyaviy. Vakolatdan tashqari masalalar vakolatli organga yoʻnaltiriladi va sizga xabar beriladi.');}
 if(txt==='🔎 Anonim xabar holati'){you({h:esc(txt)});S.bot={st:'anon_no',d:{}};S.rkb=CANCEL;return say('Anonim xabar raqamini yuboring (masalan: <code>AX-2026-000001</code>).');}
 const st=S.bot.st;const idx=you({h:esc(txt)});
 if(st==='reg_contact')return say('Iltimos, «📱 Kontaktni ulashish» tugmasini bosing.');
 if(st==='reg_name'){if(txt.trim().split(/\s+/).length<2)return say('F.I.Sh. kamida ikki soʻzdan iborat boʻlsin. Qaytadan yozing.');S.bot.d.reg.name=txt.trim();S.bot.st='reg_region';
  const rows=[];for(let i=0;i<REGIONS.length;i+=2)rows.push(REGIONS.slice(i,i+2).map((r,j)=>[r,'rg:'+(i+j)]));return say('<b>Roʻyxatdan oʻtish · 3/4 · Hudud</b>\nHududingizni tanlang:',rows);}
 if(st==='reg_address'){if(txt.length<5)return say('Manzil juda qisqa. Qaytadan yozing.');const r=S.bot.d.reg;S.profile={name:r.name,phone:r.phone,region:r.region,address:txt};
  say('✅ <b>Roʻyxatdan oʻtdingiz.</b>\n'+esc(r.name)+' · '+esc(r.phone)+' · '+esc(r.region)+'\nKeyingi murojaatlarda bu maʼlumotlar qayta soʻralmaydi.');return askType();}
 if(st==='matn'){if(txt.length<30)return say('Matn juda qisqa ('+txt.length+' belgi). Kamida 30 belgi yozing.');S.bot.d.body=txt;S.bot.d.msgIdx=[...(S.bot.d.msgIdx||[]),idx];
  if(S.bot.d.filesAsked)return showConfirm();S.bot.d.filesAsked=true;S.bot.st='fayl';
  return say('<b>5/6 · Hujjatlar (ixtiyoriy)</b>\nRasm yoki hujjat yuboring: 5 tagacha, har biri 20 MB gacha. Tugatgach yoki fayl boʻlmasa — «Davom etish»ni bosing.'+(S.bot.d.method==='a'?'\n\n🕶 Rasmlarni oddiy rasm sifatida yuboring — shunda joylashuv maʼlumotlari olib tashlanadi.':''),[[['➡️ Davom etish','f:done']]]);}
 if(st==='anon_no'){S.bot.d.no=txt.toUpperCase();S.bot.st='anon_code';return say('Endi 6 belgili tekshirish kodini yuboring.');}
 if(st==='anon_code'){const sub=S.subs.find(x=>x.no===S.bot.d.no);S.bot={st:'',d:{}};S.rkb=MENU;
  if(!sub||!sub.code||sub.code!==txt.toUpperCase())return say('Raqam yoki kod notoʻgʻri.');return say('<code>'+sub.no+'</code>: '+citStatus(sub));}
 if(st==='fayl')return say('Fayl yuboring yoki «Davom etish» tugmasini bosing.');
 if(['shakl','turi','mavzu','tekshir','reg_region'].includes(st))return say('Iltimos, yuqoridagi tugmalardan birini tanlang.');
 S.rkb=MENU;return say('Quyidagi menyudan tanlang.');}
function userContact(){you({contact:true});if(S.bot.st!=='reg_contact')return;S.bot.d.reg.phone=DEMO.phone;S.bot.st='reg_name';S.rkb=CANCEL;
 say('✅ Raqam qabul qilindi: '+DEMO.phone+'\n\n<b>Roʻyxatdan oʻtish · 2/4 · F.I.Sh.</b>\nFamiliya, ism va otangizning ismini toʻliq yozing.\n<i>Masalan: Karimov Aziz Baxtiyorovich</i>');}
function userFile(name,kind){const idx=you({file:name,kind});if(S.bot.st!=='fayl')return say('Avval murojaat matnini yozing.');S.bot.d.files.push({n:name,idx});say('📎 Qabul qilindi ('+S.bot.d.files.length+'/5)',[[['➡️ Davom etish','f:done']]]);}
function cb(data){const [k,v]=data.split(':');const st=S.bot.st;
 if(k==='m'&&st==='shakl'){S.bot.d.method=v;S.bot.d.files=[];markUsed(v==='e'?'Ism-sharif bilan':'Anonim');
  if(v==='a')return askType();if(S.profile){say('Maʼlumotlaringiz: '+esc(S.profile.name)+', '+esc(S.profile.phone)+'.');return askType();}return askContact();}
 if(k==='rg'&&st==='reg_region'){markUsed(REGIONS[+v]);S.bot.d.reg.region=REGIONS[+v];S.bot.st='reg_address';return say('<b>Roʻyxatdan oʻtish · 4/4 · Manzil</b>\nYashash manzilingizni yozing: tuman yoki shahar, koʻcha, uy.\n<i>Qonunga koʻra murojaatda yashash joyi koʻrsatiladi.</i>');}
 if(k==='t'&&st==='turi'){markUsed(TYPES[v][1]);S.bot.d.type=v;return askCat();}
 if(k==='c'&&st==='mavzu'){markUsed(CATS[+v]);S.bot.d.cat=+v;S.bot.st='matn';
  return say('<b>4/6 · Mazmun</b>\nMurojaatingizni bitta xabarda yozing (30–3500 belgi).\nNima boʻldi, qachon, qayerda, qaysi tashkilot va nimani soʻrayapsiz — aniq yozing.'+(S.bot.d.method==='a'?'\n\n🕶 Matnda ismingiz, telefoningiz yoki sizni tanitadigan boshqa maʼlumot yozmang.':'')+(+v===4?'\n\n🔒 Korrupsiyaga oid xabarlar eng yuqori maxfiylik darajasida koʻriladi.':''));}
 if(k==='f'&&st==='fayl'){markUsed('Davom etildi');return showConfirm();}
 if(k==='cf'&&st==='tekshir'){
  if(v==='cancel'){markUsed('Bekor qilindi');S.bot={st:'',d:{}};S.rkb=MENU;return say('Bekor qilindi. Hech narsa yuborilmadi.');}
  if(v==='edit'){markUsed('Matnni oʻzgartirish');S.bot.st='matn';return say('Yangi matnni yuboring. Biriktirilgan fayllar saqlanib qoladi.');}
  markUsed('Yuborildi');return submit(v==='sendn');}
 say('Bu tugma eskirgan. Menyudan qaytadan boshlang.');}
function submit(notify){const d=S.bot.d;const anon=d.method==='a';const pre=anon?'AX':'JK';S.ctr[pre]+=1;const no=pre+'-2026-'+String(S.ctr[pre]).padStart(6,'0');
 const code=anon?'K7P2QX':null;const due=anon?null:addDays(TODAY,d.type==='taklif'?30:15);
 const sub={id:1000+S.ctr[pre],no,method:anon?'a':'e',type:d.type,cat:CATS[d.cat],body:d.body,cit:anon?null:{...S.profile},stage:'yangi',council:false,created:TODAY,due,files:d.files.map(f=>({n:f.n})),code,mine:true,sens:d.cat===4,ev:[[now(),anon?'Anonim':S.profile.name,'Fuqaro yubordi (Telegram-bot)'],[now(),'Tizim','Roʻyxatga olindi: '+no]]};
 S.subs.unshift(sub);if(anon&&notify)S.anonLink[no]=true;
 // Xavfsizlik: matn va tekshirish xabari chatdan o'chiriladi
 for(const i of [...(d.msgIdx||[]),d.previewIdx])if(S.chat[i])S.chat[i].del=true;
 S.bot={st:'',d:{}};S.rkb=MENU;S.newId=sub.id;
 if(anon)say('✅ <b>Anonim xabaringiz qayd etildi</b>\n\nRaqam: <code>'+no+'</code>\nTekshirish kodi: <code>'+code+'</code>\n<i>Kodni saqlab qoʻying — u boshqa koʻrsatilmaydi.</i>\n\nAnonim xabarlar qonunga koʻra murojaat sifatida koʻrib chiqilmaydi va javob berilmaydi; Kengash tahlilida foydalaniladi.'+(notify?'\n\nHolat oʻzgarsa, shu chatga qisqa xabar keladi (mazmunsiz).':'')+'\n\n🔒 Matn Agentlik serverida saqlandi va xavfsizlik uchun chatdan oʻchirildi.');
 else say('✅ <b>Murojaatingiz roʻyxatga olindi</b>\n\nRaqam: <code>'+no+'</code>\nSana: '+fmtD(TODAY)+'\nQonun boʻyicha koʻrib chiqish muddati: '+(d.type==='taklif'?'1 oy':'15 kun')+' ('+fmtD(due)+' gacha).\n\n<b>Keyingi bosqichlar:</b>\n1. Agentlik xodimi tekshiradi va Kengashga yuboradi\n2. Kengash raisi masʼul aʼzoni belgilaydi\n3. Kengash aʼzosi koʻrib chiqadi, rais xulosani tasdiqlaydi\n4. Javob shu botga keladi\n\n🔒 Matn Agentlik serverida saqlandi va xavfsizlik uchun chatdan oʻchirildi.');}
function citStatus(s){if(s.stage==='yakun')return OUT[s.outcome]||'Yakunlandi';return CIT_STAGE[s.stage]||'Koʻrib chiqilmoqda';}
function myAppeals(){if(!S.profile)return say('Sizda ism-sharif bilan yuborilgan murojaat yoʻq.');const mine=S.subs.filter(s=>s.mine&&s.method==='e');
 if(!mine.length)return say('Hali murojaat yubormagansiz.');say('<b>Soʻnggi murojaatlaringiz</b>\n\n'+mine.map(s=>'<code>'+s.no+'</code> · '+TYPES[s.type][1]+' · '+fmtD(s.created)+'\n   '+citStatus(s)).join('\n\n'));}
function notifyCitizen(s,text,anonText){if(!s.mine)return;if(s.method==='e')say(text);else if(S.anonLink[s.no]&&anonText)say('🕶 <code>'+s.no+'</code>: '+anonText);}

// ---------------- Panel mantiqi ----------------
const ME=()=>USERS[S.role];
function visible(s){if(S.role==='registrar')return true;if(S.role==='chair')return s.council;if(S.role==='m1'||S.role==='m2')return s.assignee===S.role||s.conclBy===S.role;return false;}
function actionsFor(s){const A=[],open=s.stage!=='yakun',r=S.role;
 if(r==='registrar'){if(s.stage==='yangi')A.push('to_council','refer','close');if(s.stage==='javob')A.push('respond');if(open&&s.method==='e')A.push('request_info');}
 if(r==='chair'){if(s.stage==='kengash')A.push('assign','return_agency');if(s.stage==='korib')A.push('assign');if(s.stage==='xulosa')A.push('approve','ret');}
 if((r==='m1'||r==='m2')&&s.assignee===r&&s.stage==='korib')A.push('conclude');return A;}
const short=n=>{const p=n.split(' ');return p[0]+' '+p[1][0]+'.';};
function act(id,a,f){const s=S.subs.find(x=>x.id===id);if(!s||!actionsFor(s).includes(a))return;const who=short(ME().name);const reg='<code>'+s.no+'</code>';
 const ev=(t,d)=>s.ev.push([now(),who,t+(d?': '+d:'')]);
 if(a==='to_council'){s.stage='kengash';s.council=true;ev('Kengashga yuborildi');S.flash='Murojaat Kengash raisiga yuborildi. Fuqaroga xabar ketdi.';notifyCitizen(s,'ℹ️ Murojaatingiz '+reg+' Jamoatchilik kengashiga koʻrib chiqish uchun yuborildi.','xabaringiz Kengashga yuborildi.');}
 if(a==='refer'){s.stage='yakun';s.outcome='yonaltirildi';s.refer=f.org+', xat № '+f.no;ev('Boshqa organga yoʻnaltirildi',s.refer);S.flash='Yoʻnaltirildi. Fuqaroga xabar ketdi.';notifyCitizen(s,'Murojaatingiz '+reg+' Kengash vakolatiga kirmagani sababli vakolatli organga yuborildi: <b>'+esc(f.org)+'</b>.','xabaringiz vakolatli organga yuborildi.');}
 if(a==='close'){s.stage='yakun';s.outcome=s.method==='a'?'qayd_etildi':'korilmadi';s.response=f.note;ev(s.method==='a'?'Qayd etildi':'Koʻrib chiqilmadi',f.note);S.flash='Yopildi.';notifyCitizen(s,'Murojaatingiz '+reg+' koʻrib chiqilmadi.\n\nSabab: '+esc(f.note),'xabaringiz tahlil uchun qayd etildi.');}
 if(a==='return_agency'){s.stage='yangi';s.council=false;ev('Agentlikka qaytarildi',f.note);S.flash='Murojaat Agentlik xodimiga qaytarildi.';}
 if(a==='assign'){s.stage='korib';s.assignee=f.member;s.task=f.note;s.idue=f.due;ev('Aʼzoga biriktirildi',USERS[f.member].name+(f.due?', muddat '+fmtD(f.due):''));S.flash=USERS[f.member].name+' ga biriktirildi.';}
 if(a==='conclude'){s.stage='xulosa';s.conclusion=f.note;s.conclBy=S.role;ev('Xulosa yuborildi');S.flash='Xulosa Kengash raisiga tasdiqlash uchun yuborildi.';}
 if(a==='approve'){s.stage='javob';ev('Xulosa tasdiqlandi');S.flash='Xulosa tasdiqlandi. Agentlik xodimi javob yuboradi.';}
 if(a==='ret'){s.stage='korib';ev('Xulosa qaytarildi',f.note);S.flash='Xulosa aʼzoga qaytarildi.';}
 if(a==='respond'){s.stage='yakun';s.outcome=s.method==='a'?'qayd_etildi':'javob_berildi';s.response=f.note;ev(s.method==='a'?'Qayd etildi':'Javob yuborildi');S.flash=s.method==='a'?'Qayd etilib yopildi.':'Javob fuqaroga Telegram orqali yuborildi.';
  notifyCitizen(s,'📨 <b>Murojaatingiz boʻyicha javob</b> ('+reg+')\n\n'+esc(f.note)+'\n\n— Jamoatchilik kengashi','Kengash xabaringizni koʻrib chiqdi va qayd etdi.');}
 if(a==='request_info'){s.waiting=true;ev('Fuqarodan maʼlumot soʻraldi',f.note);S.flash='Savol fuqaroga yuborildi.';notifyCitizen(s,'ℹ️ '+reg+' murojaatingiz boʻyicha qoʻshimcha maʼlumot soʻraldi:\n\n'+esc(f.note)+'\n\nJavobingizni shu chatga yozing.');}
 S.form=null;}
function defaults(a,s){if(a==='refer')return{org:'Korrupsiyaga qarshi kurashish agentligi',no:'01-15/2231',note:''};
 if(a==='assign')return{member:'m1',due:addDays(TODAY,7),note:'Attestatsiya natijalari kechikishi sababini Agentlikdan soʻrab, xulosa tayyorlang.'};
 if(a==='conclude')return{note:'Natijalar 25.11.2026 gacha eʼlon qilinadi. Kengash Agentlikka kechikish sababini rasmiy saytda eʼlon qilishni tavsiya etadi.'};
 if(a==='respond')return{note:s.method==='a'?'':(s.conclusion||'')};
 if(a==='close')return{note:s.method==='a'?'Tahlil uchun qayd etildi':'Takroriy murojaat'};
 if(a==='return_agency')return{note:'Masala Kengash vakolatiga kirmaydi'};if(a==='ret')return{note:'Aniq sanani koʻrsating'};if(a==='request_info')return{note:'Qaysi test markazida topshirganingizni yozing.'};return{note:''};}

// ---------------- Namoyish ssenariylari ----------------
const P=(role,view,det)=>{S.role=role;S.view=view;if(det!==undefined)S.det=det;S.pane='panel';};
const B=()=>{S.pane='bot';};
const ELEC=[
 {w:'cz',who:'Fuqaro',t:'Fuqaro botni ochadi',x:'Fuqaro Telegram’da botni topib, «Boshlash» (/start) ni bosadi. Bot oʻzini tanishtiradi va pastda menyu chiqadi.',run(){B();welcome();}},
 {w:'cz',who:'Fuqaro',t:'«Murojaat yuborish»',x:'Bot avval shaklni soʻraydi: ism-sharif bilan yoki anonim. Farqi shu yerda tushuntiriladi: anonim xabarga qonunga koʻra javob berilmaydi.',run(){B();userText('📝 Murojaat yuborish');}},
 {w:'cz',who:'Fuqaro',t:'«Ism-sharif bilan» tanlandi',x:'Roʻyxat kontaktdan boshlanadi: fuqaro raqamini yozmaydi, Telegram uni oʻzi yuboradi. Bot faqat egasining oʻz kontaktini qabul qiladi. Kontaktni ulashish — maʼlumotlardan foydalanishga rozilik.',run(){B();cb('m:e');}},
 {w:'cz',who:'Fuqaro',t:'Kontakt ulashildi',x:'Raqam qabul qilindi. Endi bot F.I.Sh.ni soʻraydi — har bir maʼlumot alohida, bitta qadamda bittadan.',run(){B();userContact();}},
 {w:'cz',who:'Fuqaro',t:'F.I.Sh. kiritildi',x:'Hudud roʻyxatdan tanlanadi — xato yozish imkoniyati yoʻq.',run(){B();userText(DEMO.name);}},
 {w:'cz',who:'Fuqaro',t:'Hudud tanlandi',x:'Oxirgi maʼlumot — yashash manzili. Murojaatlar toʻgʻrisidagi qonun murojaatda yashash joyi koʻrsatilishini talab qiladi.',run(){B();cb('rg:4');}},
 {w:'cz',who:'Fuqaro',t:'Roʻyxat tugadi',x:'Profil saqlandi; keyingi murojaatlarda qayta soʻralmaydi. Endi murojaatning oʻzi: avval turi.',run(){B();userText(DEMO.address);}},
 {w:'cz',who:'Fuqaro',t:'Turi: Shikoyat',x:'Mavzu roʻyxatdan tanlanadi — bu Agentlik xodimiga murojaatni tez saralashga yordam beradi.',run(){B();cb('t:shikoyat');}},
 {w:'cz',who:'Fuqaro',t:'Mavzu tanlandi',x:'Fuqaro mazmunni bitta xabarda yozadi. Bot uzunlikni tekshiradi (30–3500 belgi).',run(){B();cb('c:1');}},
 {w:'cz',who:'Fuqaro',t:'Matn yozildi',x:'Hujjat yoki rasm ixtiyoriy: 5 tagacha, har biri 20 MB gacha.',run(){B();userText(DEMO.text);}},
 {w:'cz',who:'Fuqaro',t:'Hujjat biriktirildi',x:'Fuqaro yana fayl qoʻshishi yoki «Davom etish»ni bosishi mumkin.',run(){B();userFile('natija_sorovi.pdf','pdf');}},
 {w:'cz',who:'Fuqaro',t:'Tekshirish',x:'Yuborishdan oldin hammasi bitta xabarda koʻrsatiladi: shakl, turi, mavzu, fayllar va matn. Matnni oʻzgartirish yoki bekor qilish mumkin.',run(){B();cb('f:done');}},
 {w:'cz',who:'Fuqaro',t:'Yuborildi: raqam va muddat',x:'Murojaat Agentlik serverida saqlanadi va raqam oladi. Xavfsizlik uchun matn chatdan oʻchiriladi: telefon begona qoʻlga tushsa ham murojaat oʻqilmaydi.',run(){B();cb('cf:send');}},
 {w:'ag',who:'Agentlik xodimi',t:'Murojaat panelda paydo boʻldi',x:'Agentlik xodimi panelga kiradi. Yangi murojaat roʻyxat boshida turibdi. Xodim barcha murojaatlarni va fuqaroning toʻliq maʼlumotlarini koʻradi.',run(){P('registrar','list');S.hl=S.newId;}},
 {w:'ag',who:'Agentlik xodimi',t:'Kartochka ochildi',x:'Kartochkada matn, fayl, fuqaro maʼlumotlari va vaqt chizigʻi bor. Xodimda uchta yoʻl: Kengashga yuborish, boshqa organga yoʻnaltirish yoki yopish.',run(){P('registrar','detail',S.newId);}},
 {w:'ag',who:'Agentlik xodimi',t:'«Kengashga yuborish»',x:'Masala Kengash vakolatida. Murojaat Kengash raisiga oʻtadi, fuqaroga avtomatik xabar boradi (chapdagi telefon).',run(){P('registrar','detail',S.newId);act(S.newId,'to_council',{});S.pane='both';}},
 {w:'kg',who:'Kengash raisi',t:'Rais murojaatni koʻradi',x:'Rais faqat Kengashga yuborilgan murojaatlarni koʻradi. Fuqaroning ismi koʻrinadi, telefon va manzil esa yashirin — ular faqat Agentlik xodimiga kerak.',run(){P('chair','detail',S.newId);}},
 {w:'kg',who:'Kengash raisi',t:'Aʼzoga biriktirildi',x:'Rais masʼul aʼzoni, ichki muddatni va topshiriqni belgilaydi. Murojaat aʼzoning roʻyxatiga tushadi.',run(){P('chair','detail',S.newId);act(S.newId,'assign',defaults('assign'));}},
 {w:'kg',who:'Kengash aʼzosi',t:'Aʼzo xulosa yozadi',x:'Aʼzo faqat oʻziga biriktirilgan murojaatlarni koʻradi. U koʻrib chiqib xulosa yozadi; murojaatni oʻzi yopa olmaydi.',run(){P('m1','detail',S.newId);act(S.newId,'conclude',defaults('conclude'));}},
 {w:'kg',who:'Kengash raisi',t:'Rais xulosani tasdiqladi',x:'Rais xulosani tasdiqlaydi yoki sabab bilan qaytaradi. Xulosa muallifi uni oʻzi tasdiqlay olmaydi.',run(){P('chair','detail',S.newId);act(S.newId,'approve',{});}},
 {w:'ag',who:'Agentlik xodimi',t:'Javob yuborildi',x:'Agentlik xodimi tasdiqlangan xulosa asosida javobni yuboradi. Javob shu zahoti fuqaroning Telegram’iga keladi.',run(){P('registrar','detail',S.newId);act(S.newId,'respond',defaults('respond',S.subs.find(x=>x.id===S.newId)));S.pane='both';}},
 {w:'cz',who:'Fuqaro',t:'Fuqaro holatni tekshiradi',x:'«Murojaatlarim»da holat — «Javob berildi». Butun yoʻl vaqt chizigʻida yozilgan: kim, qachon, nima qildi.',run(){B();userText('📂 Murojaatlarim');}},
];
const ANON=[
 {w:'cz',who:'Fuqaro',t:'Fuqaro botni ochadi',x:'Anonim xabar ham shu botdan yuboriladi.',run(){B();welcome();}},
 {w:'cz',who:'Fuqaro',t:'«Murojaat yuborish»',x:'Bot shaklni soʻraydi va anonim xabar qonunga koʻra koʻrib chiqilmasligini oldindan aytadi.',run(){B();userText('📝 Murojaat yuborish');}},
 {w:'cz',who:'Fuqaro',t:'«Anonim» tanlandi',x:'Kontakt ham, ism ham soʻralmaydi. Telegram hisobi murojaatga bogʻlanmaydi.',run(){B();cb('m:a');}},
 {w:'cz',who:'Fuqaro',t:'Turi: Shikoyat',x:'Keyingi qadamlar ism-sharif bilan yuborilgan murojaat bilan bir xil.',run(){B();cb('t:shikoyat');}},
 {w:'cz',who:'Fuqaro',t:'Mavzu: korrupsiya xavfi',x:'Bot ikki ogohlantirish beradi: matnda oʻzingizni tanitadigan maʼlumot yozmang; korrupsiya haqidagi xabar eng yuqori maxfiylikda koʻriladi.',run(){B();cb('c:4');}},
 {w:'cz',who:'Fuqaro',t:'Matn yozildi',x:'Fayl ixtiyoriy. Rasmni oddiy rasm sifatida yuborish tavsiya etiladi — joylashuv maʼlumotlari olib tashlanadi.',run(){B();userText(DEMO.anonText);}},
 {w:'cz',who:'Fuqaro',t:'Tekshirish',x:'Anonim xabarda ikki variant bor: holat haqida qisqa xabar olish yoki umuman xabar olmaslik.',run(){B();cb('f:done');}},
 {w:'cz',who:'Fuqaro',t:'Yuborildi: raqam va kod',x:'Fuqaro AX- raqami va 6 belgili kod oladi. Kod bilan holatni keyin tekshiradi. Matn chatdan oʻchiriladi.',run(){B();cb('cf:sendn');}},
 {w:'ag',who:'Agentlik xodimi',t:'Anonim xabar panelda',x:'Roʻyxatda «Anonim» belgisi va 🔒 maxfiylik belgisi bor. Shaxsga oid hech qanday maʼlumot saqlanmagan.',run(){P('registrar','list');S.hl=S.newId;}},
 {w:'ag',who:'Agentlik xodimi',t:'Kartochka ochildi',x:'Fuqaro bloki boʻsh — bu anonim xabar. Anonim xabarga javob berilmaydi, shuning uchun «maʼlumot soʻrash» tugmasi yoʻq.',run(){P('registrar','detail',S.newId);}},
 {w:'ag',who:'Agentlik xodimi',t:'Vakolatli organga yoʻnaltirildi',x:'Korrupsiya masalasi Kengash vakolatiga kirmaydi. Xodim uni vakolatli organga yoʻnaltiradi va xat raqamini yozadi.',run(){P('registrar','detail',S.newId);act(S.newId,'refer',defaults('refer'));S.pane='both';}},
 {w:'cz',who:'Fuqaro',t:'Fuqaroga mazmunsiz xabar',x:'Fuqaro faqat raqam va holatni oladi — xabar mazmuni chatga qaytarilmaydi.',run(){B();}},
 {w:'cz',who:'Fuqaro',t:'Raqam va kod bilan tekshirish',x:'«Anonim xabar holati» orqali raqam va kodni kiritib, holatni istalgan vaqtda bilish mumkin.',run(){B();userText('🔎 Anonim xabar holati');userText(S.subs.find(x=>x.id===S.newId).no);userText('K7P2QX');}},
];
const steps=()=>SCEN==='elec'?ELEC:ANON;
function goTo(n){const L=steps();n=Math.max(0,Math.min(n,L.length-1));init();for(let i=0;i<=n;i++){S.flash=null;L[i].run();}STEP=n;render();}

// ---------------- Chizish ----------------
const app=document.getElementById('app');
function render(){const L=steps(),st=L[STEP];
 let h='<div class="top"><h1>Kengash murojaatlari — prototip</h1><span class="demo">DEMO · namunaviy maʼlumotlar</span>'+
  '<span class="lbl">Ssenariy:</span><div class="seg">'+[['elec','Ism-sharif bilan'],['anon','Anonim xabar']].map(([k,l])=>'<button data-a="scen" data-v="'+k+'" class="'+(SCEN===k?'on':'')+'">'+l+'</button>').join('')+'</div>'+
  '<span class="lbl">Rejim:</span><div class="seg">'+[['demo','Qadam-baqadam'],['free','Erkin sinash']].map(([k,l])=>'<button data-a="mode" data-v="'+k+'" class="'+(MODE===k?'on':'')+'">'+l+'</button>').join('')+'</div>'+
  '<span class="sp"></span><button class="tbtn" data-a="restart">↺ Qaytadan</button></div>';
 if(MODE==='demo'){h+='<div class="guide"><div class="num">Qadam<b>'+(STEP+1)+' / '+L.length+'</b></div><div><div class="ttl"><span class="who '+st.w+'">'+st.who+'</span>'+esc(st.t)+'</div><div class="txt">'+esc(st.x)+'</div></div>'+
  '<div class="ctl"><button class="btn" data-a="prev"'+(STEP===0?' disabled':'')+'>◀ Orqaga</button><button class="btn" data-a="auto">'+(AUTO?'⏸ Toʻxtatish':'▶ Avtomatik')+'</button><button class="btn pri" data-a="next"'+(STEP===L.length-1?' disabled':'')+'>Keyingi ▶</button></div>'+
  '<div class="dots">'+L.map((_,i)=>'<i data-a="dot" data-v="'+i+'" class="'+(i<STEP?'done':i===STEP?'cur':'')+'" title="'+esc(L[i].t)+'"></i>').join('')+'</div></div>';}
 else h+='<div class="free">Erkin sinash: botda tugmalarni bosing va matn yozing, panelda rolni almashtirib amallarni bajaring. Hammasi namunaviy, hech narsa saqlanmaydi.</div>';
 h+='<div class="stage"><div><div class="plabel">FUQARO · TELEGRAM-BOT'+(MODE==='demo'&&(S.pane==='bot'||S.pane==='both')?' <span class="now">hozir</span>':'')+'</div><div class="pane '+(MODE==='demo'&&(S.pane==='bot'||S.pane==='both')?'active':'')+'">'+phone()+'</div></div>'+
  '<div><div class="plabel">XODIM · ICHKI PANEL (Agentlik serveri)'+(MODE==='demo'&&(S.pane==='panel'||S.pane==='both')?' <span class="now">hozir</span>':'')+'</div><div class="pane '+(MODE==='demo'&&(S.pane==='panel'||S.pane==='both')?'active':'')+'">'+panel()+'</div></div></div>';
 app.innerHTML=h;const c=document.getElementById('chat');if(c)c.scrollTop=c.scrollHeight;}

function phone(){const dis=MODE==='demo'?' dis':'';let h='<div class="phone"><div class="screen"><div class="tghead"><div class="av">JK</div><div><b>Jamoatchilik kengashi</b><span>bot</span></div></div><div class="chat" id="chat">';
 if(!S.chat.length)h+='<div class="msg note">Bot hali ochilmagan</div>';
 S.chat.forEach((m,i)=>{
  if(m.del){h+='<div class="msg '+(m.f==='u'?'u ':'')+'del">🗑 Xabar chatdan oʻchirildi — Agentlik serverida saqlangan</div>';return;}
  let body=m.contact?'<div class="contact"><div class="av">'+esc((S.profile||{name:'Y S'}).name.split(' ').map(x=>x[0]).slice(0,2).join(''))+'</div><div><b>Kontakt</b><br>'+DEMO.phone+'</div></div>':m.file?'<div class="file"><div class="ic">'+(m.kind==='pdf'?'PDF':'🖼')+'</div><div>'+esc(m.file)+'<br><span class="muted">240 KB</span></div></div>':m.h.replace(/\n/g,'<br>');
  h+='<div class="msg '+(m.f==='u'?'u':'')+'">'+body+'<div class="tm">'+m.t+'</div></div>';
  if(m.kb){if(m.used)h+='<div class="ikb"><div class="r"><button class="used" disabled>'+esc(m.used)+'</button></div></div>';
   else h+='<div class="ikb'+dis+'">'+m.kb.map(r=>'<div class="r">'+r.map(([l,d])=>'<button data-a="cb" data-v="'+d+'">'+esc(l)+'</button>').join('')+'</div>').join('')+'</div>';}
 });
 h+='</div>';
 if(S.rkb)h+='<div class="rkb'+dis+'">'+S.rkb.map(r=>'<div class="r">'+r.map(l=>'<button data-a="rk" data-v="'+esc(l)+'">'+esc(l)+'</button>').join('')+'</div>').join('')+'</div>';
 h+='<div class="inbar'+dis+'"><button class="ib" data-a="attach" title="Fayl biriktirish">📎</button><input id="tin" placeholder="'+(S.chat.length?'Xabar yozing…':'/start')+'"><button class="ib send" data-a="send">➤</button></div>';
 if(ATTACH&&MODE==='free')h+='<div class="attach"><button data-a="file" data-v="pdf">📄 Namuna PDF hujjat</button><button data-a="file" data-v="img">🖼 Namuna rasm</button></div>';
 return h+'</div></div>';}

function chipStage(s){if(s.stage==='yakun')return '<span class="chip ok">'+(OUT[s.outcome]||'Yakunlangan')+'</span>';const t=TURN[s.stage];return '<span class="chip">'+STAGE[s.stage]+'</span> <span class="chip '+t[1]+'">Navbat: '+t[0]+'</span>';}
function panel(){const u=ME();let h='<div class="browser"><div class="bbar"><span class="d"></span><span class="d"></span><span class="d"></span><span class="url">🔒 panel.agentlik.uz — faqat ichki tarmoq yoki VPN orqali</span></div>'+
 '<div class="phead"><span class="brand">Murojaatlar paneli</span><span class="chip '+u.inst+'">'+(u.inst==='ag'?'Agentlik':'Kengash')+'</span><span class="sp"></span>';
 if(MODE==='free')h+='<label class="muted">Kim sifatida: <select data-a="role">'+Object.entries(USERS).map(([k,v])=>'<option value="'+k+'"'+(S.role===k?' selected':'')+'>'+v.name+' — '+v.role+'</option>').join('')+'</select></label>';
 else h+='<span><b>'+u.name+'</b> · '+u.role+'</span>';
 h+='</div><div class="pbody">';
 if(S.flash)h+='<div class="flash">✓ '+esc(S.flash)+'</div>';
 if(S.role==='admin'){const c=k=>S.subs.filter(s=>k(s)).length;
  h+='<div class="note">Administrator texnik rol: foydalanuvchilarni boshqaradi va audit jurnalini koʻradi. Murojaat mazmunini koʻrmaydi.</div><div class="kpis">'+kpi('Jami',S.subs.length)+kpi('Yangi',c(s=>s.stage==='yangi'))+kpi('Kengashda',c(s=>['kengash','korib','xulosa'].includes(s.stage)))+kpi('Yakunlangan',c(s=>s.stage==='yakun'))+'</div>'+
  '<table><tr><th>Foydalanuvchi</th><th>Rol</th><th>Holat</th></tr>'+Object.entries(USERS).filter(([k])=>k!=='admin').map(([k,v])=>'<tr><td>'+v.name+'</td><td>'+v.role+'</td><td><span class="chip ok">Faol</span></td></tr>').join('')+'</table>';return h+'</div></div>';}
 if(S.view==='detail'&&S.det){const s=S.subs.find(x=>x.id===S.det);if(s&&visible(s))return h+detail(s)+'</div></div>';}
 const list=S.subs.filter(visible);const c=k=>list.filter(k).length;
 h+='<div class="kpis">'+kpi('Yangi (Agentlikda)',c(s=>s.stage==='yangi'))+kpi('Kengashda',c(s=>['kengash','korib','xulosa'].includes(s.stage)))+kpi('Javob tayyorlanmoqda',c(s=>s.stage==='javob'))+kpi('Yakunlangan',c(s=>s.stage==='yakun'))+'</div>';
 if(S.role==='m1'||S.role==='m2')h+='<div class="note">Kengash aʼzosi faqat oʻziga biriktirilgan murojaatlarni koʻradi.</div>';
 if(S.role==='chair')h+='<div class="note">Kengash raisi Agentlik Kengashga yuborgan murojaatlarni koʻradi.</div>';
 h+=list.length?'<table><tr><th>Raqam</th><th>Turi</th><th>Mazmun</th><th>Holat</th><th>Muddat</th></tr>'+list.map(s=>'<tr class="row'+(S.hl===s.id?' hl':'')+'" data-a="open" data-v="'+s.id+'"><td class="mono">'+s.no+(s.sens?' 🔒':'')+'</td><td>'+TYPES[s.type][1]+'<br>'+(s.method==='a'?'<span class="chip anon">Anonim</span>':'<span class="muted">Ism-sharif bilan</span>')+'</td><td><div>'+esc(s.cat)+'</div><div class="snip">'+esc(s.body.slice(0,80))+'…</div>'+(s.cit?'<div class="muted">'+esc(s.cit.name)+' · '+esc(s.cit.region)+'</div>':'')+'</td><td>'+chipStage(s)+'</td><td>'+(s.due&&s.stage!=='yakun'?fmtD(s.due):'—')+'</td></tr>').join('')+'</table>':'<div class="note">Hozircha murojaat yoʻq.</div>';
 return h+'</div></div>';}
const kpi=(l,v)=>'<div class="kpi"><div class="v">'+v+'</div><div class="l">'+l+'</div></div>';
function detail(s){const order=['yangi','kengash','korib','xulosa','javob','yakun'],names=['Qabul','Kengash','Koʻrib chiqish','Xulosa','Javob','Yakun'],cur=order.indexOf(s.stage);
 const ag=S.role==='registrar';
 let cit='<div class="card cz"><h3>Fuqaro</h3>';
 if(!s.cit)cit+='<p class="muted">🕶 Anonim xabar. Shaxsga oid maʼlumot yoʻq.</p>';
 else cit+='<dl class="kv"><dt>F.I.Sh.</dt><dd>'+esc(s.cit.name)+'</dd><dt>Hudud</dt><dd>'+esc(s.cit.region)+'</dd><dt>Telefon</dt><dd>'+(ag?esc(s.cit.phone):'<span class="muted">faqat Agentlik xodimiga</span>')+'</dd><dt>Manzil</dt><dd>'+(ag?esc(s.cit.address):'<span class="muted">faqat Agentlik xodimiga</span>')+'</dd></dl>';
 cit+='</div>';
 const A=actionsFor(s);let acts='<div class="card"><h3>Amallar</h3>';
 if(!A.length)acts+='<p class="muted">Hozir sizdan amal talab qilinmaydi.</p>';
 else acts+='<div class="acts">'+A.map(a=>{const open=S.form&&S.form.a===a;const lab=(a==='respond'&&s.method==='a')?'Qayd etib yopish':ACT[a];
  return '<div><button class="btn'+(['to_council','assign','conclude','approve','respond'].includes(a)?' pri':'')+'" data-a="form" data-v="'+a+'" style="width:100%">'+lab+'</button>'+(open?form(a,s):'')+'</div>';}).join('')+'</div>';
 acts+='</div>';
 const kg='<div class="card kg"><h3>Kengash ishi</h3><dl class="kv"><dt>Ijrochi</dt><dd>'+(s.assignee?USERS[s.assignee].name+(s.idue?' · muddat '+fmtD(s.idue):''):'—')+'</dd><dt>Topshiriq</dt><dd>'+esc(s.task||'—')+'</dd><dt>Xulosa</dt><dd>'+(s.conclusion?'<div class="body">'+esc(s.conclusion)+'</div>':'—')+'</dd></dl></div>';
 const tl='<div class="card"><h3>Vaqt chizigʻi</h3><ul class="tl">'+s.ev.map(e=>'<li><div class="t">'+e[0]+' · '+esc(e[1])+'</div>'+esc(e[2])+'</li>').join('')+'</ul></div>';
 return '<a class="back" data-a="back">← Roʻyxatga qaytish</a><div class="head"><div><h2 class="mono">'+s.no+(s.sens?' 🔒':'')+'</h2><span class="chip dark">'+TYPES[s.type][1]+'</span> '+(s.method==='a'?'<span class="chip anon">Anonim</span>':'<span class="chip">Ism-sharif bilan</span>')+' <span class="chip">'+esc(s.cat)+'</span></div><div>'+chipStage(s)+(s.due&&s.stage!=='yakun'?' <span class="chip warn">Muddat: '+fmtD(s.due)+'</span>':'')+'</div></div>'+
  stepsHtml(s,names,cur)+
  '<div class="grid2"><div><div class="card cz"><h3>Murojaat matni</h3><div class="body">'+esc(s.body)+'</div>'+(s.files.length?'<p>'+s.files.map(f=>'📎 '+esc(f.n)).join('<br>')+'</p>':'')+'</div>'+kg+tl+'</div><div>'+acts+cit+'</div></div>';}
function stepsHtml(s,names,cur){const short=s.stage==='yakun'&&!s.conclusion;return '<div class="steps">'+names.map((n,i)=>{let c=i<cur||s.stage==='yakun'?'done':i===cur?'cur':'';if(short&&i>0&&i<names.length-1)c='';return '<span class="'+c+'">'+n+'</span>';}).join('')+'</div>';}
function form(a,s){const d=defaults(a,s);let f='<form class="actf" data-a="submit" data-v="'+a+'">';
 if(a==='refer')f+='<label class="fld"><span>Vakolatli organ</span><input name="org" value="'+esc(d.org)+'"></label><label class="fld"><span>Xat raqami</span><input name="no" value="'+esc(d.no)+'"></label>';
 else if(a==='assign')f+='<label class="fld"><span>Kengash aʼzosi</span><select name="member"><option value="m1">Tursunova Malika</option><option value="m2">Ergashev Sardor</option></select></label><label class="fld"><span>Ichki muddat</span><input type="date" name="due" value="'+d.due+'"></label><label class="fld"><span>Topshiriq</span><textarea name="note">'+esc(d.note)+'</textarea></label>';
 else if(a!=='to_council'&&a!=='approve')f+='<label class="fld"><span>'+({conclude:'Xulosa',respond:'Javob matni',close:'Sabab',return_agency:'Sabab',ret:'Sabab',request_info:'Fuqaroga savol'}[a]||'Izoh')+'</span><textarea name="note">'+esc(d.note)+'</textarea></label>';
 return f+'<button class="btn pri sm">Tasdiqlash</button></form>';}

// ---------------- Hodisalar ----------------
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,v=t.dataset.v;
 if(a==='scen'){SCEN=v;stopAuto();MODE==='demo'?goTo(0):(init(),render());return;}
 if(a==='mode'){MODE=v;stopAuto();if(v==='demo')goTo(STEP);else render();return;}
 if(a==='restart'){stopAuto();MODE==='demo'?goTo(0):(init(),render());return;}
 if(a==='next')return goTo(STEP+1);
 if(a==='prev')return goTo(STEP-1);
 if(a==='dot')return goTo(+v);
 if(a==='auto'){if(AUTO){stopAuto();render();}else{AUTO=setInterval(()=>{if(STEP>=steps().length-1){stopAuto();render();}else goTo(STEP+1);},3800);render();}return;}
 if(MODE!=='free')return;
 if(a==='cb'){cb(v);S.pane='bot';render();}
 if(a==='rk'){if(v==='📱 Kontaktni ulashish')userContact();else userText(v);render();}
 if(a==='send'){const i=document.getElementById('tin');const val=i.value.trim();if(!val)return;if(val==='/start'){you({h:'/start'});welcome();}else userText(val);render();}
 if(a==='attach'){ATTACH=!ATTACH;render();}
 if(a==='file'){ATTACH=false;userFile(v==='pdf'?'hujjat.pdf':'rasm.jpg',v);render();}
 if(a==='open'){S.view='detail';S.det=+v;S.form=null;S.flash=null;render();}
 if(a==='back'){S.view='list';S.form=null;S.flash=null;render();}
 if(a==='form'){S.form=S.form&&S.form.a===v?null:{a:v};const s=S.subs.find(x=>x.id===S.det);if(v==='to_council'||v==='approve'){act(s.id,v,{});}render();}
});
document.addEventListener('submit',e=>{const f=e.target;if(f.dataset.a!=='submit')return;e.preventDefault();const data=Object.fromEntries(new FormData(f));act(S.det,f.dataset.v,data);render();});
document.addEventListener('change',e=>{if(e.target.dataset.a==='role'){S.role=e.target.value;S.view='list';S.form=null;S.flash=null;render();}});
document.addEventListener('keydown',e=>{if(e.target.id==='tin'&&e.key==='Enter'){document.querySelector('[data-a=send]').click();}
 if(MODE==='demo'&&e.target.tagName!=='INPUT'){if(e.key==='ArrowRight')goTo(STEP+1);if(e.key==='ArrowLeft')goTo(STEP-1);}});
function stopAuto(){if(AUTO){clearInterval(AUTO);AUTO=null;}}
goTo(0);
