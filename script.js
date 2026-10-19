document.getElementById("analyze-image")?.addEventListener("click", async () => {
  const input = document.getElementById("image-input");
  const status = document.getElementById("image-status");
  const resultBox = document.getElementById("ai-result");
  const button = document.getElementById("analyze-image");

  if (!input.files || !input.files[0]) {
    status.textContent = "اختاري صورة أولًا.";
    return;
  }

  const file = input.files[0];

  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    status.textContent = "اختاري صورة بصيغة PNG أو JPG أو WEBP.";
    return;
  }

  button.disabled = true;
  resultBox.textContent = "جارٍ تحليل الصورة...";
  
  try {
    const image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const response = await fetch(
      "https://green-mouse-63ee.workers.dev",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          prompt: "حلّل هذه الصورة بالعربية، وحدد المعلم إن أمكن، واذكر ما يمكن التأكد منه دون تخمين."
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "تعذّر تحليل الصورة.");
    }

    resultBox.textContent =
      typeof data.result === "string"
        ? data.result
        : JSON.stringify(data.result);
  } catch (error) {
    resultBox.textContent =
      "تعذّر الاتصال بخدمة الذكاء الاصطناعي. تحققي من إعدادات الخدمة وحاولي مجددًا.";
    console.error(error);
  } finally {
    button.disabled = false;
  }
});

document.getElementById("image-input")?.addEventListener("change", function () {
  const file = this.files?.[0];
  const preview = document.getElementById("image-preview");
  const status = document.getElementById("image-status");

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    status.textContent = "اختاري ملف صورة صحيح.";
    preview.hidden = true;
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    preview.src = reader.result;
    preview.hidden = false;
    status.textContent = "تم تحميل الصورة بنجاح.";
  };

  reader.onerror = function () {
    status.textContent = "تعذّر عرض الصورة. حاولي اختيار صورة أخرى.";
  };

  reader.readAsDataURL(file);
});
