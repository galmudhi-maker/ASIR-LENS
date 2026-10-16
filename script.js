// عدسة عسير: بيانات إرشادية أولية وليست تغذية مباشرة من مزود خرائط أو أخبار.
const ASIR_PLACES = [
  {name:"قرية المفتاحة",city:"أبها",type:"ثقافة وفنون",time:"ساعة إلى ساعتين",desc:"مساحة فنية وثقافية وسط أبها. تحقّق من مواعيد الفعاليات قبل الزيارة."},
  {name:"ممشى الضباب",city:"أبها",type:"طبيعة ومشي",time:"ساعة",desc:"خيار للتنزه والاستمتاع بالمشاهد الجبلية عندما تسمح الأجواء."},
  {name:"السودة",city:"أبها",type:"طبيعة وجبال",time:"ساعتان إلى 4 ساعات",desc:"منطقة جبلية معروفة بإطلالاتها وأجوائها المتغيرة."},
  {name:"قصر شدا",city:"أبها",type:"تراث وتاريخ",time:"45–90 دقيقة",desc:"معلم تراثي؛ تحقّق من أوقات الزيارة والإتاحة قبل الذهاب."},
  {name:"سوق الثلاثاء",city:"أبها",type:"تسوق وتراث",time:"ساعة إلى ساعتين",desc:"فكرة للتعرف على المنتجات المحلية والأسواق الشعبية، مع التأكد من أيام العمل."},
  {name:"مركز الأمير سلطان الحضاري",city:"خميس مشيط",type:"ثقافة وفعاليات",time:"ساعة إلى ساعتين",desc:"تحقّق من الفعاليات المتاحة في تاريخ زيارتك."},
  {name:"وسط خميس مشيط",city:"خميس مشيط",type:"تسوق ومقاهٍ",time:"ساعة إلى ساعتين",desc:"يمكن استكشاف خيارات التسوق والمقاهي القريبة حسب تفضيلاتك."},
  {name:"منتزهات تنومة",city:"تنومة",type:"طبيعة وجبال",time:"ساعتان إلى 3 ساعات",desc:"خيارات للتنزه بين المساحات الطبيعية؛ حالة الطقس مهمة قبل الانطلاق."},
  {name:"شلالات الدهناء",city:"تنومة",type:"طبيعة",time:"ساعة إلى ساعتين",desc:"تحقّق من الموسم وتدفق المياه وسلامة الوصول قبل الزيارة."},
  {name:"مركز محايل عسير",city:"محايل عسير",type:"تسوق ومقاهٍ",time:"ساعة إلى ساعتين",desc:"ابدأ باستكشاف الخدمات والأسواق المحلية في وسط المحافظة."},
  {name:"المواقع الطبيعية حول محايل",city:"محايل عسير",type:"طبيعة",time:"حسب الموقع",desc:"اختَر موقعًا موثقًا وتأكد من الطريق والطقس قبل التوجه."},
  {name:"وسط أحد رفيدة",city:"أحد رفيدة",type:"ثقافة وتسوق",time:"ساعة إلى ساعتين",desc:"فكرة لجولة خفيفة في المحافظة مع اختيار الأماكن المفتوحة وقت الزيارة."},
  {name:"الحدائق العامة",city:"أحد رفيدة",type:"عائلي وترفيه",time:"ساعة إلى ساعتين",desc:"تحقّق من موقع الحديقة والخدمات المتاحة قبل الزيارة."},
  {name:"رجال ألمع",city:"رجال ألمع",type:"تراث وقرى",time:"ساعتان إلى 4 ساعات",desc:"وجهة تراثية معروفة بعمارتها التقليدية؛ راجع أوقات العمل ووسيلة الوصول."},
  {name:"بحيرة سد أبها",city:"أبها",type:"طبيعة واسترخاء",time:"45–90 دقيقة",desc:"مكان مناسب لجولة قصيرة إذا كانت المنطقة مفتوحة وآمنة للزيارة."}
];
function el(id){return document.getElementById(id)}
function showPlaces(list,target="results"){
 const root=el(target); if(!root)return;
 if(!list.length){root.innerHTML='<div class="notice">ما لقينا اقتراحات مطابقة. جرّب تغيير المحافظة أو نوع المكان.</div>';return}
 root.innerHTML='<div class="result-grid">'+list.map(p=>`<article class="place-card"><span class="tag">${p.type}</span><h3>${p.name}</h3><p><strong>${p.city}</strong> · المدة المقترحة: ${p.time}</p><p style="margin-top:8px">${p.desc}</p></article>`).join('')+'</div>';
}
document.addEventListener("DOMContentLoaded",()=>{
 const discoverForm=el("discover-form");
 if(discoverForm)discoverForm.addEventListener("submit",e=>{
  e.preventDefault();const city=el("city").value,type=el("place-type").value;
  const list=ASIR_PLACES.filter(p=>(city==="الكل"||p.city===city)&&(type==="الكل"||p.type.includes(type)));
  showPlaces(list);el("results").scrollIntoView({behavior:"smooth",block:"start"});
 });
 const queryForm=el("guide-form");
 if(queryForm)queryForm.addEventListener("submit",e=>{
  e.preventDefault();const q=el("guide-query").value.trim();
  const list=ASIR_PLACES.filter(p=>(p.name+" "+p.city+" "+p.type+" "+p.desc).includes(q));
  el("guide-answer").innerHTML=q?`<p>هذه اقتراحات أولية مرتبطة ببحثك عن <strong>${escapeHTML(q)}</strong>. البيانات داخل الموقع إرشادية وليست نتائج مباشرة أو توصية مؤكدة:</p>`:"<p>اكتب اسم محافظة أو نشاطًا مثل: أبها، طبيعة، تراث.</p>";
  showPlaces(list,"guide-results");
 });
 const imageInput=el("image-input");
 if(imageInput)imageInput.addEventListener("change",()=>{
  const f=imageInput.files&&imageInput.files[0];if(!f)return;
  if(!f.type.startsWith("image/")){el("image-status").textContent="فضلاً اختَر ملف صورة.";return}
  const reader=new FileReader();reader.onload=()=>{el("image-preview").src=reader.result;el("image-preview").hidden=false;el("image-status").textContent="تم تحميل الصورة في هذه الصفحة. التعرّف التلقائي على المعالم غير مفعّل بعد ويحتاج خدمة ذكاء اصطناعي."};reader.readAsDataURL(f);
 });
 const planner=el("planner-form");
 if(planner)planner.addEventListener("submit",e=>{
  e.preventDefault();const city=el("planner-city").value,count=el("people").value,pace=el("pace").value;
  const picks=ASIR_PLACES.filter(p=>p.city===city).slice(0,4);
  const list=picks.length?picks:ASIR_PLACES.filter(p=>["أبها","تنومة","خميس مشيط"].includes(p.city)).slice(0,4);
  const tbody=el("plan-body");
  tbody.innerHTML=list.map((p,i)=>`<tr><td>${i+1}</td><td>${p.name}</td><td>${pace==="هادئ"?"60–90 دقيقة":pace==="مكثف"?"30–60 دقيقة":p.time}</td><td>${i===0?"نقطة البداية":"يُحسب حسب الطريق والازدحام"}</td><td>${count} أشخاص</td><td>${p.type}</td></tr>`).join("");
  el("plan-result").hidden=false;
 });
 const timeForm=el("time-form");
 if(timeForm)timeForm.addEventListener("submit",e=>{e.preventDefault();el("time-message").textContent="تم تسجيل اختيارك داخل النموذج. لإظهار صور تاريخية فعلية نحتاج إلى مصدر صور مؤرّخ وموثوق؛ هذه النسخة لا تنشئ صورة قديمة ولا تدّعي أنها صورة أرشيفية."});
});
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
