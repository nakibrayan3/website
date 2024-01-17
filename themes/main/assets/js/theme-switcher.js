const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const colorScheme = localStorage.getItem("colorScheme");
const themeSwitchButton = document.getElementById("theme-switch-button");
const preCss = document.getElementById("pre-css");

let dataTheme = document.querySelector("html").getAttribute("data-theme");

function set_theme(theme) {
  if (theme == "light") {
    document.querySelector("html").setAttribute("data-theme", "light");
    preCss.href = "/css/catppuccin-latte.css";
  } else if(theme == "dark") {
    document.querySelector("html").setAttribute("data-theme", "dark");
    preCss.href = "/css/catppuccin-frappe.css";
  }
}

themeSwitchButton.addEventListener("click", function() {
  if (localStorage.getItem("colorScheme") == "dark") {
    localStorage.setItem("colorScheme", "light");
    set_theme("light");
  } else {
    localStorage.setItem("colorScheme", "dark");
    set_theme("dark");
  }
});

if(colorScheme == "light") {
  set_theme("light");
} else if(colorScheme == "dark") {
  set_theme("dark");
} else {
  if (prefersColorScheme == "light") {
    set_theme("light");
  } else if (prefersColorScheme == "dark") {
    set_theme("dark");
  }

  set_theme();
}
