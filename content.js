const targetNode = document.querySelector('#app');
let chatContainer = null;

function playNotification(volumeLevel){
  const notificationURL = chrome.runtime.getURL('sounds/notification.mp3');
  const notification = new Audio(notificationURL);
  notification.volume = volumeLevel / 100;
  notification.play();
}

// finds chat container
const observer = new MutationObserver(async function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement && addedNode.hasAttribute('data-chat-entry')) {
                observer.disconnect();
                chatContainer = addedNode.parentElement;
                
                await setupNewMessageObserver(chatContainer);
                return;
            }
          }
        }
      }
    });

// finds new message with user mentioned
function setupNewMessageObserver(container) {
  return new Promise(resolve => {
    const messageObserver = new MutationObserver(function(mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement && addedNode.firstChild.classList.contains('border-primary')) {
              chrome.storage.local.get('volumeLevel', function(data) {
                const volumeLevel = data.volumeLevel || 50; // Default volume level if not set
                playNotification(volumeLevel);
              });
            }
          }
        }
      }
    });

    messageObserver.observe(container, { childList: true, subtree: true });
    resolve();
  });
}

observer.observe(targetNode, { childList: true, subtree: true });

