// Function to inject a content script into the active tab


function injectContentScript() {
  console.log('OUTPUT : 111');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('OUTPUT : 222');
    console.log('OUTPUT : 333');
    if (tabs.length > 0) {
      console.log('OUTPUT : 444');
      const activeTabId = tabs[0].id;
      console.log('OUTPUT :555');
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        func: () => {
          let activeTabUrl = window.location.href;
          let sfNewFieldUrl = 'p/setup/field/NewCustomFieldStageManager';
          console.log('OUTPUT : ',activeTabUrl);
          // debugger;
          console.log('OUTPUT : ',sfNewFieldUrl);
          if (activeTabUrl && activeTabUrl.includes(sfNewFieldUrl)) {
            let visibleAll = document.getElementById('d000000000000000');
            if (!visibleAll.checked) {
              visibleAll.click()
            }
            // console.log('visibleAll---   '+visibleAll.checked);
            // console.log('visibleAll--- 111  '+visibleAll.click());
            // console.log('visibleAll---  22 '+visibleAll.checked);
            console.log('next---------11111111: ');
            // document.getElementsByName('goNext').click();
            const button = document.querySelector('[name="goNext"]');
            console.log('next22222222222222222222 ');
            // button.click();
            console.log('next22222222222222222222 ');
          }
      
          /*if (activeTabUrl && activeTabUrl.includes(sfNewFieldUrl)) {
            
            let wizardHeader = document.querySelector('.pbWizardHeader');
            let isButtonAlreadyPresent = document.querySelector('.customButton');
            
            if (wizardHeader && !isButtonAlreadyPresent) {
              // Create a new button element
              const newButton = document.createElement('button');
              
              // Set the button's text content and attributes
              newButton.textContent = 'SpiDEr';
              newButton.className = 'customButton'; // Optional: Add a class for styling
              newButton.onclick = () => {
                event.preventDefault()
                console.log('clicked----11111');
                document.getElementById('d000000000000000').click();
                console.log('clicked----');
                return;
              }
            
              // Append the button to the div
              wizardHeader.appendChild(newButton);
            } else {
              console.error('Element with class "pbWizardHeader" not found.');
            }
          }*/
          console.log("Active tab URL:", window.location.href);
        }
      });
    }
  });
}

// Listener for tab activation
// chrome.tabs.onActivated.addListener(() => {
  
//   injectContentScript();
// });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    console.log("Tab has fully loaded.");
    injectContentScript();
  }
});

// Listener for tab updates (e.g., navigation changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    injectContentScript();
  }
});