const BACKEND_URL = "https://YOUR_BACKEND.onrender.com/process"; // swap for local dev

chrome.contextMenus.create({
  id: "webmind",
  title: "WebMind",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "webmind") {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: "OPEN_SIDEBAR",
        text: info.selectionText,
      });
    } catch (err) {
      console.error("❌ Failed to send message to tab:", err.message);

      // Fallback: try to inject content script and resend
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content.js"],
        },
        () => {
          chrome.tabs.sendMessage(tab.id, {
            type: "OPEN_SIDEBAR",
            text: info.selectionText,
          });
        }
      );
    }
  }
});
