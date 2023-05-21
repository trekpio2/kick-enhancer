const targetNode = document.body;
let chatContainer = null;

const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const addedNode of mutation.addedNodes) {
            if (addedNode instanceof HTMLElement && addedNode.hasAttribute('data-chat-entry')) {
                // Perform actions for the desired <div> element
                observer.disconnect();
                chatContainer = addedNode.parentElement;
            
            const newObserver = new MutationObserver(function(newMutationsList) {
                for (const newMutation of newMutationsList) {
                  if (newMutation.type === 'childList') {
                    for (const addedMessage of newMutation.addedNodes) {
                        if (addedMessage instanceof HTMLElement && addedMessage.firstChild.classList.contains('border-primary')) {
                            chrome.runtime.sendMessage({ action: 'playAudio'});
                        }
                    }
                  }
                }
              });
    
              // Start observing the new target node for changes
              newObserver.observe(chatContainer, { childList: true, subtree: true });
              return;
            }
          }
        }
      }
    });
    

// Start observing the target node for changes
observer.observe(targetNode, { childList: true, subtree: true });

