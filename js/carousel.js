/* Sunday market photo carousel: arrows, dots, swipe, and a Play button that
   changes the picture every few seconds. Add more <img class="slide"> tags in
   index.html and they join the carousel automatically. */
(function () {
  var box = document.getElementById("market-carousel");
  if (!box) { return; }
  var slides = box.querySelectorAll(".slide");
  var dotsBox = box.querySelector(".dots");
  var playBtn = box.querySelector(".car-play");
  var icon = box.querySelector(".car-icon");
  var label = box.querySelector(".car-label");
  var SECONDS = 3.5;
  var current = 0;
  var timer = null;

  var dots = Array.prototype.map.call(slides, function (s, i) {
    var d = document.createElement("button");
    d.type = "button";
    d.setAttribute("aria-label", String(i + 1));
    d.addEventListener("click", function () { show(i); restart(); });
    dotsBox.appendChild(d);
    return d;
  });

  function show(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle("active", i === current); });
    dots.forEach(function (d, i) { d.classList.toggle("active", i === current); });
  }

  function words() {
    return window.I18N[document.documentElement.lang] || window.I18N.en;
  }
  function setLabel(key) {
    label.setAttribute("data-i18n", key);
    label.textContent = words()[key];
  }
  function restart() {
    if (timer) { stop(); start(); }
  }
  function start() {
    timer = setInterval(function () { show(current + 1); }, SECONDS * 1000);
    icon.innerHTML = "&#10074;&#10074;";
    setLabel("car.pause");
  }
  function stop() {
    clearInterval(timer);
    timer = null;
    icon.innerHTML = "&#9654;";
    setLabel("car.play");
  }

  playBtn.addEventListener("click", function () { if (timer) { stop(); } else { start(); } });
  box.querySelector(".prev").addEventListener("click", function () { show(current - 1); restart(); });
  box.querySelector(".next").addEventListener("click", function () { show(current + 1); restart(); });

  var touchX = null;
  box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchX === null) { return; }
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { show(current + (dx < 0 ? 1 : -1)); restart(); }
    touchX = null;
  });

  show(0);
})();
