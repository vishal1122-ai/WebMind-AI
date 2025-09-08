let sidebar = null;
let currentText = "";
let currentAction = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "OPEN_SIDEBAR") {
    currentText = msg.text;
    showSidebar(msg.text);
  }
});

function showSidebar(text) {
  if (sidebar) sidebar.remove();

  sidebar = document.createElement("div");
  sidebar.id = "webmind-sidebar";
  sidebar.innerHTML = `
    <link rel="stylesheet" href="${chrome.runtime.getURL("webmind.css")}">
    <div class="webmind-container">
      <h2>🧠 WebMind AI</h2>
      <p class="selected-text">"${text}"</p>

      <div class="button-group">
        <button class="action-btn" data-action="summarize">Summarize</button>
        <button class="action-btn" data-action="explain">Explain Like I'm 5</button>
        <button class="action-btn" data-action="translate">Translate</button>
        <button class="action-btn" data-action="generate">Generate Response</button>
        <button class="action-btn" data-action="custom">Custom Prompt</button>
      </div>

      <div class="custom-input-container hidden" id="custom-input-section">
        <textarea id="custom-input" placeholder="Enter your prompt (max 200 chars)"></textarea>
        <button id="send-custom">Send</button>
      </div>

      <div class="result-box" id="webmind-result">✨ Select an action to get started.</div>
      <button class="close-btn" id="webmind-close">✖ Close</button>
    </div>
  `;

  Object.assign(sidebar.style, {
    position: "fixed",
    right: "0",
    top: "0",
    width: "400px",
    height: "100vh",
    zIndex: "9999",
    background: "#fefefe",
    boxShadow: "-2px 0 12px rgba(0,0,0,0.3)",
    animation: "slideIn 0.3s ease forwards",
  });

  document.body.appendChild(sidebar);

  const resultEl = document.getElementById("webmind-result");
  const customSection = document.getElementById("custom-input-section");
  const inputEl = document.getElementById("custom-input");
  const sendBtn = document.getElementById("send-custom");

  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentAction = btn.dataset.action;

      if (["translate", "generate", "custom"].includes(currentAction)) {
        customSection.classList.remove("hidden");

        if (currentAction === "translate") {
          inputEl.placeholder = "Enter language (e.g., French)";
          inputEl.maxLength = 20;
        } else if (currentAction === "generate") {
          inputEl.placeholder = "Add context or tone (max 200 chars)";
          inputEl.maxLength = 200;
        } else {
          inputEl.placeholder =
            "Enter your full prompt (e.g., 'Summarize into 1 line')";
          inputEl.maxLength = 200;
        }

        inputEl.value = "";
        resultEl.innerText = "Waiting for your input...";
      } else {
        customSection.classList.add("hidden");
        inputEl.value = "";
        resultEl.innerText = "⏳ Loading...";
        callAIAction(currentAction, currentText);
      }
    });
  });

  sendBtn.onclick = () => {
    const userPrompt = inputEl.value.trim();
    if (!userPrompt) {
      resultEl.innerText = "⚠️ Please enter a valid input.";
      return;
    }

    resultEl.innerText = "⏳ Processing...";

    // All inputs via textarea are treated as custom prompts
    callAIAction("custom", currentText, userPrompt);
  };

  document.getElementById("webmind-close").addEventListener("click", () => {
    sidebar.remove();
    sidebar = null;
  });
}

function callAIAction(action, text, userPrompt = null) {
  fetch("http://localhost:4000/process", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action,
      text,
      language: "en",
      ...(userPrompt && { user_prompt: userPrompt }),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const result = data.result || "[No response from AI]";
      document.getElementById("webmind-result").innerText = result;
    })
    .catch((err) => {
      console.error("WebMind error:", err);
      document.getElementById("webmind-result").innerText =
        "⚠️ Failed to fetch response.";
    });
}

// ESC to close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar) {
    sidebar.remove();
    sidebar = null;
  }
});
