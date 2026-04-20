// -- Email obfuscation: assembled at runtime, hidden from scrapers --
;(function () {
  var u = "michelle-m-lefebvre"
  var d = "outlook" + "." + "com"
  var e = u + "@" + d
  var wrap = document.getElementById("email-link-wrap")
  if (wrap) {
    var a = document.createElement("a")
    a.href = "mai" + "lto:" + e
    a.className = "email-link"
    a.textContent = e
    wrap.appendChild(a)
  }
})()

// -- Theme toggle --
var root = document.documentElement
var themeBtn = document.getElementById("theme-toggle")

function applyTheme(theme) {
  root.setAttribute("data-theme", theme)
  try {
    localStorage.setItem("theme", theme)
  } catch (e) {}
  if (themeBtn) {
    themeBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    )
  }
}

// On load: saved pref > system pref > light
;(function () {
  var saved
  try {
    saved = localStorage.getItem("theme")
  } catch (e) {}
  var systemDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  applyTheme(saved || (systemDark ? "dark" : "light"))
})()

if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    var current = root.getAttribute("data-theme")
    applyTheme(current === "dark" ? "light" : "dark")
  })
}

// -- Nav toggle --
var navToggle = document.querySelector(".nav-toggle")
var navMenu = document.querySelector(".nav-links")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    var expanded = navToggle.getAttribute("aria-expanded") === "true"
    navToggle.setAttribute("aria-expanded", String(!expanded))
    navMenu.classList.toggle("is-open", !expanded)
  })
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.setAttribute("aria-expanded", "false")
      navMenu.classList.remove("is-open")
    })
  })
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
      navToggle.setAttribute("aria-expanded", "false")
      navMenu.classList.remove("is-open")
      navToggle.focus()
    }
  })
}
