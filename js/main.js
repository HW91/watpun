/* Language switching (English / Thai), the "demo only" popup, and the photo viewer. */
(function () {
  var KEY = "wp-lang";

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* private mode: just skip saving */ }
  }

  function applyLanguage(lang) {
    var words = window.I18N[lang] || window.I18N.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var text = words[el.getAttribute("data-i18n")];
      if (text !== undefined) { el.textContent = text; }
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var text = words[el.getAttribute("data-i18n-ph")];
      if (text !== undefined) { el.placeholder = text; }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var text = words[el.getAttribute("data-i18n-aria")];
      if (text !== undefined) { el.setAttribute("aria-label", text); }
    });
    document.getElementById("lang").value = lang;
  }

  var start = saved();
  if (start !== "en" && start !== "th") {
    start = (navigator.language || "").toLowerCase().indexOf("th") === 0 ? "th" : "en";
  }
  applyLanguage(start);

  document.getElementById("lang").addEventListener("change", function (e) {
    save(e.target.value);
    applyLanguage(e.target.value);
  });

  /* Any button or form marked data-demo shows the "for demo only" popup. */
  var modal = document.getElementById("demo-modal");
  function showDemo(e) { e.preventDefault(); modal.classList.add("open"); }
  document.querySelectorAll("[data-demo]").forEach(function (el) {
    el.addEventListener(el.tagName === "FORM" ? "submit" : "click", showDemo);
  });
  document.getElementById("demo-close").addEventListener("click", function () { modal.classList.remove("open"); });
  modal.addEventListener("click", function (e) { if (e.target === modal) { modal.classList.remove("open"); } });

  /* Gallery: click a photo to see it larger. */
  var viewer = document.getElementById("viewer");
  if (viewer) {
    document.querySelectorAll(".gallery img").forEach(function (img) {
      img.addEventListener("click", function () {
        viewer.querySelector("img").src = img.src;
        viewer.classList.add("open");
      });
    });
    viewer.addEventListener("click", function () { viewer.classList.remove("open"); });
  }
})();
