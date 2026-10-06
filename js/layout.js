/* Builds the top bar, menu, footer and demo popup that every page shares.
   To add or rename a menu item, change the PAGES list below. */
(function () {
  var PAGES = [
    ["index.html", "nav.home"],
    ["about.html", "nav.about"],
    ["events.html", "nav.events"],
    ["gallery.html", "nav.gallery"],
    ["teaching.html", "nav.teaching"],
    ["shop.html", "nav.shop"],
    ["project.html", "nav.project"],
    ["contact.html", "nav.contact"]
  ];
  var current = location.pathname.split("/").pop() || "index.html";
  var FB = "https://www.facebook.com/share/19FDA9H487/";
  var MAP = "https://www.google.com/maps/search/?api=1&query=4490+Aurora+Rd+Melbourne+FL+32934";

  var links = PAGES.map(function (p) {
    var cls = p[0] === current ? ' class="active"' : "";
    return '<a href="' + p[0] + '"' + cls + ' data-i18n="' + p[1] + '"></a>';
  }).join("");

  document.getElementById("site-header").innerHTML =
    '<div class="topbar"><div class="container">' +
      '<div class="tb-left"><a href="' + MAP + '" target="_blank" rel="noopener" data-i18n="tb.addr"></a>' +
      '<span class="tb-hours" data-i18n="tb.hours"></span></div>' +
      '<div class="tb-right"><a href="tel:+13212551465">321-255-1465</a>' +
      '<a href="' + FB + '" target="_blank" rel="noopener">Facebook</a>' +
      '<select id="lang" class="lang-select" aria-label="Language">' +
      '<option value="en">English</option><option value="th">ไทย</option></select></div>' +
    '</div></div>' +
    '<header class="site-header"><div class="container">' +
      '<a class="brand" href="index.html"><img src="images/logo.svg" alt="">' +
      '<span><span data-i18n="brand.name"></span><small data-i18n="brand.tag"></small></span></a>' +
      '<button class="menu-btn" id="menu-btn" aria-label="Menu">&#9776;</button>' +
      '<nav class="nav" id="nav">' + links +
      '<a class="btn" href="donate.html" data-i18n="nav.donate"></a></nav>' +
    '</div></header>';

  document.getElementById("site-footer").innerHTML =
    '<footer class="site-footer"><div class="container"><div class="foot-grid">' +
      '<div><h3 data-i18n="brand.name"></h3><p data-i18n="foot.about"></p></div>' +
      '<div><h3 data-i18n="foot.visit"></h3><ul><li data-i18n="tb.addr"></li>' +
      '<li><a href="tel:+13212551465">321-255-1465</a></li>' +
      '<li data-i18n="foot.hours1"></li><li data-i18n="foot.hours2"></li></ul></div>' +
      '<div><h3 data-i18n="foot.links"></h3><ul>' +
      '<li><a href="events.html" data-i18n="nav.events"></a></li>' +
      '<li><a href="donate.html" data-i18n="nav.donate"></a></li>' +
      '<li><a href="contact.html" data-i18n="nav.contact"></a></li>' +
      '<li><a href="' + FB + '" target="_blank" rel="noopener">Facebook</a></li></ul></div>' +
    '</div><p class="foot-note" data-i18n="foot.note"></p></div></footer>' +
    '<div class="modal" id="demo-modal"><div class="modal-box">' +
      '<h3 data-i18n="demo.title"></h3><p data-i18n="demo.body"></p>' +
      '<button class="btn" id="demo-close" data-i18n="demo.close"></button></div></div>';

  document.getElementById("menu-btn").addEventListener("click", function () {
    document.getElementById("nav").classList.toggle("open");
  });
})();
