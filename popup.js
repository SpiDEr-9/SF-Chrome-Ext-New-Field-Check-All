document.getElementById('selectText').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('here popup--->1')
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: selectTextFromDiv
        });
        console.log('here popup--->2')
    });
});

function selectTextFromDiv() {
    console.log('selectTextFromDiv --->1')
    const div = document.querySelector('.VU-ZEz');
    console.log('selectTextFromDiv --->21111'+div)
    console.log('selectTextFromDiv --->31111'+JSON.stringify(div))
    if (div) {
        console.log('selectTextFromDiv --->211115454'+div.innerText)
        console.log('selectTextFromDiv --->211113232'+div.innerHTML)
        console.log('selectTextFromDiv --->21111'+div.textContent)
        // const range = document.createRange();
        // range.selectNodeContents(div);
        // const selection = window.getSelection();
        // selection.removeAllRanges();
        // selection.addRange(range);
        alert('Text selected from the div with id "bhushan".');
    } else {
        alert('Div with id "bhushan" not found.');
    }
}
