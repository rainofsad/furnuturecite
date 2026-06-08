const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");
const swatches = document.querySelectorAll(".swatch");
const materials = document.querySelector(".materials");
const materialTitle = document.querySelector("#materials-title");
const materialText = document.querySelector(".material-copy p:last-child");
const swatchName = document.querySelector(".swatch-name");
const form = document.querySelector(".quote-form");
const formStatus = document.querySelector(".form-status");
const topLinks = document.querySelectorAll('a[href="#top"]');

const materialThemes = {
  blue: {
    title: "Синий VectorPlus с теплой мебельной основой.",
    text: "Фирменный синий хорошо сочетается с матовыми фасадами, древесными текстурами, стеклом и металлическими деталями. Такой вариант выглядит ярко, уверенно и остается связанным с айдентикой VectorPlus.",
    background:
      "linear-gradient(135deg, rgba(0, 27, 117, 0.94), rgba(0, 71, 200, 0.88)), linear-gradient(90deg, var(--graphite), var(--blue))",
    textColor: "#ffffff",
    mutedColor: "rgba(255, 255, 255, 0.78)",
  },
  wood: {
    title: "Теплый орех для спокойной мебели.",
    text: "Древесный тон делает секцию мягче и уютнее: его можно сочетать со светлыми столешницами, черной фурнитурой и нейтральными фасадами. Такой выбор хорошо подходит для кухонь, шкафов и прихожих.",
    background:
      "linear-gradient(135deg, rgba(83, 45, 18, 0.92), rgba(177, 112, 53, 0.88)), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0 12px, transparent 12px 28px)",
    textColor: "#fff8ef",
    mutedColor: "rgba(255, 248, 239, 0.78)",
  },
  graphite: {
    title: "Матовый графит для строгого интерьера.",
    text: "Графитовый фон подчеркивает чистую геометрию, контрастные линии и современную фурнитуру. Он хорошо смотрится с деревом, светлым камнем и точечной подсветкой.",
    background:
      "linear-gradient(135deg, rgba(10, 13, 18, 0.97), rgba(47, 54, 64, 0.92)), linear-gradient(90deg, #11151b, #3b424c)",
    textColor: "#ffffff",
    mutedColor: "rgba(255, 255, 255, 0.74)",
  },
  stone: {
    title: "Светлый камень для чистого и легкого образа.",
    text: "Светлая палитра визуально расширяет пространство и делает мебель аккуратной. Ее удобно сочетать с синими акцентами VectorPlus, натуральным деревом и тонкими металлическими деталями.",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(230, 224, 214, 0.86)), linear-gradient(90deg, #f7f3ed, var(--stone))",
    textColor: "#111827",
    mutedColor: "rgba(17, 24, 39, 0.72)",
  },
};

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");

    products.forEach((product) => {
      const shouldShow = value === "all" || product.dataset.kind === value;
      product.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const themeKey = [...swatch.classList].find((className) => materialThemes[className]);
    const theme = materialThemes[themeKey];

    swatches.forEach((item) => item.classList.remove("active"));
    swatch.classList.add("active");
    swatchName.textContent = swatch.dataset.name;

    if (!theme) return;

    materials.style.background = theme.background;
    materials.style.color = theme.textColor;
    materials.style.setProperty("--material-muted", theme.mutedColor);
    materialTitle.textContent = theme.title;
    materialText.textContent = theme.text;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name")?.trim() || "Не указано";
  const project = formData.get("project") || "Не указано";
  const phone = formData.get("phone")?.trim() || "Не указано";
  const message = [
    "Здравствуйте, VectorPlus!",
    "Хочу рассчитать мебель на заказ.",
    `Имя: ${name}`,
    `Проект: ${project}`,
    `Телефон: ${phone}`,
  ].join("\n");

  formStatus.textContent = "Открываем WhatsApp с подготовленной заявкой.";
  window.open(`https://wa.me/77771000276?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
