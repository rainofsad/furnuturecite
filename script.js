const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");
const swatches = document.querySelectorAll(".swatch");
const swatchName = document.querySelector(".swatch-name");
const form = document.querySelector(".quote-form");
const formStatus = document.querySelector(".form-status");

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
    swatches.forEach((item) => item.classList.remove("active"));
    swatch.classList.add("active");
    swatchName.textContent = swatch.dataset.name;
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
