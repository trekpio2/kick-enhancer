chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'playAudio') {
        chrome.storage.local.get('volumeLevel', function(data) {
        let volumeLevel = data.volumeLevel || 50;
        
        playNotification(volumeLevel);
        });
    }
  });

function playNotification(volumeLevel){
    const notification = new Audio('sounds/notification.mp3');
    
    notification.volume = volumeLevel / 100;
    notification.play();
}