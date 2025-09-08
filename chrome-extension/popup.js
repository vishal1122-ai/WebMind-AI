const BACKEND_URL = "https://YOUR_BACKEND.onrender.com/process";

const $ = (sel) => document.querySelector(sel);

const urlParams = new URLSearchParams(window.location.search);
const selectedText = urlParams.get("text");
$("#inputText").value = selectedText || "";

// Theme toggle
const toggleBtn = $("#themeToggle");
toggleBtn.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "" : "dark");
});

$("#runBtn").addEventListener("click", async () => {
  const text = $("#inputText").value.trim();
  const action = $("#actionSelect").value;
  if (!text) return;

  $("#spinner").hidden = false;
  $("#output").textContent = "";
  $("#copyBtn").hidden = true;

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, text, language: "en" }),
    });
    const data = await res.json();
    $("#output").textContent = data.result;
    $("#copyBtn").hidden = false;
  } catch (err) {
    $("#output").textContent = "Error: " + err.message;
  } finally {
    $("#spinner").hidden = true;
  }
});

$("#copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText($("#output").textContent);
});
