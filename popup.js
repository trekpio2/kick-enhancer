document.addEventListener('DOMContentLoaded', function() {
    const volumeSlider = document.getElementById('volumeRange');
    const volumeOutput = document.getElementById("volumeOutput");
    
    chrome.storage.local.get('volumeLevel', function(data) {
        volumeOutput.innerText = data.volumeLevel || 50;
        volumeSlider.value = data.volumeLevel || 50;
    });
    
    volumeSlider.addEventListener('input', () => {
        let volumeLevel = volumeSlider.value;
        chrome.storage.local.set({ volumeLevel: volumeLevel }, () => {
            volumeOutput.innerText = volumeLevel;
        });
    })
});