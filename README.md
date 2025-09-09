# WebMind 🧠 – AI Actions for Any Selected Text

**WebMind** is a Chrome Extension that empowers users to effortlessly interact with AI on any website — simply select text, right-click, and perform smart actions like translating, summarizing, generating, or explaining like you’re five.

Whether you're a student, researcher, content creator, or professional — WebMind makes AI just a right-click away.

---

## 🚀 Features

- ✅ **AI-Powered Context Menu**

  - Right-click on any selected text and choose:
    - 🔁 Translate
    - 🧠 Summarize
    - ⚡ Generate content
    - 👶 Explain Like I’m 5

- 📌 **Intelligent Sidebar UI**
  - Beautifully designed sidebar that slides into view with results.
  - Dynamic text input for custom prompts when required.
- 🎯 **Fast & Lightweight**

  - Uses `manifest v3` and service workers.
  - No intrusive overlays or performance issues.

- 🔒 **Privacy-Respecting**
  - No data is stored — actions are performed on-demand and in-memory.

---

## 🖼️ Screenshots

### 📌 Sidebar View (After using an AI action)

![Sidebar View](./screenshots/sidebar-view.png)

---

### 🧠 Popup Menu

![Popup Menu](./screenshots/popup-menu.png)

---

### 🔁 Translate Feature

![Translate Example](./screenshots/feature-translate.png)

---

### 👶 Explain Like I’m 5

![Explain Feature](./screenshots/feature-explain.png)

---

## 🛠️ Tech Stack

- 🟨 **JavaScript**
- ⚙️ **Chrome Extensions (Manifest v3)**
- 🎨 **HTML + CSS**
- 🔌 **OpenAI API (via backend proxy)**
- 🌐 **ContextMenus + Content Scripts + Service Workers**

---

## 🧪 How It Works

1. User selects text on any website.
2. Right-click triggers `chrome.contextMenus` API.
3. The background service worker captures the selection and sends it to:
   - Either a local backend (proxying to OpenAI API)
   - Or directly to the OpenAI endpoint (depending on implementation)
4. The result is rendered in a beautifully styled sidebar (`content.js` + `webmind.css`).

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/vishal1122-ai/WebMind-AI.git
cd WebMind-AI
```

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
