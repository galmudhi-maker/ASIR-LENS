
 // عدسة عسير: اقتراحات إرشادية وليست بيانات مباشرة.
const ASIR_PLACES = [
  {name:"قرية المفتاحة",city:"أبها",type:"ثقافة وفنون",time:"ساعة إلى ساعتين",desc:"مساحة فنية وثقافية وسط أبها. تحقّق من مواعيد الفعاليات قبل الزيارة."},
  {name:"ممشى الضباب",city:"أبها",type:"طبيعة ومشي",time:"ساعة",desc:"خيار للتنزه والاستمتاع بالمشاهد الجبلية عندما تسمح الأجواء."},
  {name:"السودة",city:"أبها",type:"طبيعة وجبال",time:"ساعتان إلى 4 ساعات",desc:"منطقة جبلية معروفة بإطلالاتها وأجوائها المتغيرة."},
  {name:"قصر شدا",city:"أبها",type:"تراث وتاريخ",time:"45–90 دقيقة",desc:"معلم تراثي؛ تحقّق من أوقات الزيارة والإتاحة قبل الذهاب."},
  {name:"سوق الثلاثاء",city:"أبها",type:"تسوق وتراث",time:"ساعة إلى ساعتين",desc:"تعرّف على المنتجات المحلية والأسواق الشعبية، مع التأكد من أيام العمل."},
  {name:"مركز الأمير سلطان الحضاري",city:"خميس مشيط",type:"ثقافة وفعاليات",time:"ساعة إلى ساعتين",desc:"تحقّق من الفعاليات المتاحة في تاريخ زيارتك."},
  {name:"وسط خميس مشيط",city:"خميس مشيط",type:"تسوق ومقاهٍ",time:"ساعة إلى ساعتين",desc:"استكشف خيارات التسوق والمقاهي القريبة حسب تفضيلاتك."},
  {name:"منتزهات تنومة",city:"تنومة",type:"طبيعة وجبال",time:"ساعتان إلى 3 ساعات",desc:"خيارات للتنزه بين المساحات الطبيعية؛ تحقّق من الطقس قبل الانطلاق."},
  {name:"شلالات الدهناء",city:"تنومة",type:"طبيعة",time:"ساعة إلى ساعتين",desc:"تحقّق من الموسم وتدفق المياه وسلامة الوصول قبل الزيارة."},
  {name:"مركز محايل عسير",city:"محايل عسير",type:"تسوق ومقاهٍ",time:"ساعة إلى ساعتين",desc:"استكشف الخدمات والأسواق المحلية في وسط المحافظة."},
  {name:"المواقع الطبيعية حول محايل",city:"محايل عسير",type:"طبيعة",time:"حسب الموقع",desc:"اختر موقعًا موثقًا وتأكد من الطريق والطقس قبل التوجه."},
  {name:"وسط أحد رفيدة",city:"أحد رفيدة",type:"ثقافة وتسوق",time:"ساعة إلى ساعتين",desc:"جولة خفيفة في المحافظة مع اختيار الأماكن المفتوحة وقت الزيارة."},
  {name:"الحدائق العامة",city:"أحد رفيدة",type:"عائلي وترفيه",time:"ساعة إلى ساعتين",desc:"تحقّق من موقع الحديقة والخدمات المتاحة قبل الزيارة."},
  {name:"رجال ألمع",city:"رجال ألمع",type:"تراث وقرى",time:"ساعتان إلى 4 ساعات",desc:"وجهة تراثية معروفة بعمارتها التقليدية؛ راجع أوقات العمل ووسيلة الوصول."},
  {name:"بحيرة سد أبها",city:"أبها",type:"طبيعة واسترخاء",time:"45–90 دقيقة",desc:"مكان لجولة قصيرة إذا كانت المنطقة مفتوحة وآمنة للزيارة."}
];

function el(id) {
  return document.getElementById(id);
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[^\u0600-\u06FFa-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expandQuery(query) {
  const q = normalize(query);
  const words = q.split(" ").filter(Boolean);
  const aliases = {
    "طبيعه": ["طبيعه", "جبال", "شلالات", "منتزهات", "بحيره", "ممشي", "السوده"],
    "طبيعي": ["طبيعه", "جبال", "شلالات", "منتزهات"],
    "جبال": ["جبال", "طبيعه", "السوده", "تنومه"],
    "مشي": ["ممشي", "مشي", "طبيعه"],
    "تراث": ["تراث", "تاريخ", "قصر", "قريه", "رجال الم"],
    "تاريخ": ["تراث", "تاريخ", "قصر", "رجال الم"],
    "قديم": ["تراث", "تاريخ", "قصر"],
    "فن": ["ثقافه", "فنون", "المفتاحه"],
    "ثقافه": ["ثقافه", "فنون", "فعاليات", "المفتاحه"],
    "تسوق": ["تسوق", "سوق", "مقاهي"],
    "قهوه": ["مقاهي", "تسوق"],
    "كافيه": ["مقاهي", "تسوق"],
    "عائلي": ["عائلي", "حدائق", "ترفيه"],
    "اطفال": ["عائلي", "حدائق", "ترفيه"],
    "ابها": ["ابها"],
    "خميس": ["خميس مشيط"],
    "تنومه": ["تنومه"],
    "محايل": ["محايل عسير"],
    "رفيده": ["احد رفيده"],
    "رجال": ["رجال الم"]
  };

  const expanded = new Set(words);
  words.forEach(word => {
    (aliases[word] || []).forEach(alias => expanded.add(alias));
  });

  return [...expanded];
}

function placeText(place) {
  return normalize(
    place.name + " " + place.city + " " +
    place.type + " " + place.desc
  );
}

function showPlaces(list, target = "results") {
  const root = el(target);
  if (!root) return;

  if (!list.length) {
    root.innerHTML =
      '<div class="notice">ما لقينا اقتراحات مناسبة. جرّبي اسم محافظة مثل أبها، أو نشاطًا مثل طبيعة أو تراث أو تسوق.</div>';
    return;
  }

  root.innerHTML =
    '<div class="result-grid">' +
    list.map(p => `
      <article class="place-card">
        <span class="tag">${escapeHTML(p.type)}</span>
        <h3>${escapeHTML(p.name)}</h3>
        <p><strong>${escapeHTML(p.city)}</strong> · المدة المقترحة: ${escapeHTML(p.time)}</p>
        <p style="margin-top:8px">${escapeHTML(p.desc)}</p>
      </article>
    `).join("") +
    '</div>';
}

document.addEventListener("DOMContentLoaded", () => {
  const discoverForm = el("discover-form");

  if (discoverForm) {
    discoverForm.addEventListener("submit", event => {
      event.preventDefault();

      const city = el("city").value;
const type = el("place-type").value;
const visitTime = el("visit-time").value;

const list = ASIR_PLACES.filter(place => {
  const cityMatch = city === "الكل" || place.city === city;
  const typeMatch = type === "الكل" ||
    normalize(place.type).includes(normalize(type));

  const visitMatch =
    visitTime === "أي وقت" ||
    (visitTime === "صباح" && /طبيعة|جبال|ممشى|بحيرة/.test(place.type + place.name)) ||
    (visitTime === "عصر" && /تراث|ثقافة|تسوق|طبيعة/.test(place.type)) ||
    (visitTime === "مساء" && /تسوق|مقاهٍ|ثقافة|فعاليات/.test(place.type));

  return cityMatch && typeMatch && visitMatch;
});

      showPlaces(list);

      const results = el("results");
      if (results) {
        results.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  const queryForm = el("guide-form");

  if (queryForm) {
    queryForm.addEventListener("submit", event => {
      event.preventDefault();

      const query = el("guide-query").value.trim();
      const answer = el("guide-answer");

      if (!query) {
        answer.textContent = "اكتبي اسم مكان أو محافظة أو نوع تجربة.";
        showPlaces([], "guide-results");
        return;
      }

      const terms = expandQuery(query);

      const ranked = ASIR_PLACES.map(place => {
        const text = placeText(place);
        let score = 0;

        terms.forEach(term => {
          const normalizedTerm = normalize(term);
          if (!normalizedTerm) return;

          if (normalize(place.name).includes(normalizedTerm)) score += 4;
          else if (normalize(place.city).includes(normalizedTerm)) score += 3;
          else if (normalize(place.type).includes(normalizedTerm)) score += 3;
          else if (text.includes(normalizedTerm)) score += 1;
        });

        return { place, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.place);

      answer.textContent = ranked.length
        ? `هذه اقتراحات أولية قد تناسب بحثك عن "${query}". تحقّقي من تفاصيل المكان قبل الزيارة.`
        : `ما وجدنا تطابقًا واضحًا مع "${query}". جرّبي: أبها، طبيعة، جبال، تراث، تسوق أو عائلي.`;

      showPlaces(ranked, "guide-results");
    });
  }

  const imageInput = el("image-input");

  if (imageInput) {
    imageInput.addEventListener("change", () => {
      const file = imageInput.files && imageInput.files[0];
      if (!file) return;

      const status = el("image-status");
      if (!file.type.startsWith("image/")) {
        status.textContent = "فضلاً اختاري ملف صورة.";
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        el("image-preview").src = reader.result;
        el("image-preview").hidden = false;
        status.textContent =
          "تم تحميل الصورة. التعرّف التلقائي على المعالم يحتاج خدمة ذكاء اصطناعي خارجية.";
      };

      reader.readAsDataURL(file);
    });
  }

  const planner = el("planner-form");

  if (planner) {
    planner.addEventListener("submit", event => {
      event.preventDefault();

      const city = el("planner-city").value;
      const count = el("people").value;
      const pace = el("pace").value;

      const picks = ASIR_PLACES.filter(place => place.city === city).slice(0, 4);
      const list = picks.length ? picks :
        ASIR_PLACES.filter(place =>
          ["أبها", "تنومة", "خميس مشيط"].includes(place.city)
        ).slice(0, 4);

      const tbody = el("plan-body");

      tbody.innerHTML = list.map((place, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHTML(place.name)}</td>
          <td>${pace === "هادئ" ? "60–90 دقيقة" :
                pace === "مكثف" ? "30–60 دقيقة" : escapeHTML(place.time)}</td>
          <td>${index === 0 ? "نقطة البداية" : "يُحسب حسب الطريق والازدحام"}</td>
          <td>${escapeHTML(count)} أشخاص</td>
          <td>${escapeHTML(place.type)}</td>
        </tr>
      `).join("");

      el("plan-result").hidden = false;
    });
  }

  const timeForm = el("time-form");

  if (timeForm) {
    timeForm.addEventListener("submit", event => {
      event.preventDefault();

      const place = el("time-place").value;
      const period = el("time-period").value;
      const view = el("time-view").value;

      el("time-message").textContent =
        `اخترتِ ${place}، ${period}، ومقارنة ${view}. لإظهار مقارنة حقيقية نحتاج صورًا قديمة موثقة وصورًا حديثة للمكان نفسه؛ لا توجد صور أرشيفية مربوطة حاليًا.`;
    });
  }
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}
