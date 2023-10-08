// Copyright (C) Rayan Nakib
// This file is part of website <https://codeberg.org/nakibrayan2/website>.
// 
// website is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// website config is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const colorScheme = localStorage.getItem("colorScheme");
const themeSwitchButton = document.getElementById("theme-switch-button");
const preCss = document.getElementById("pre-css");

let dataTheme = document.querySelector("html").getAttribute("data-theme");

function set_theme(theme) {
  if (theme == "light") {
    document.querySelector("html").setAttribute("data-theme", "light");
    preCss.href = "/css/gruvbox-dark.css";
  } else if(theme == "dark") {
    document.querySelector("html").setAttribute("data-theme", "dark");
    preCss.href = "/css/gruvbox-light.css";
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
