// Function to inject a content script into the active tab

function injectContentScript() {
  console.log("OUTPUT : 111");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("OUTPUT : 222");
    console.log("OUTPUT : 333");
    if (tabs.length > 0) {
      console.log("OUTPUT : 444");
      const activeTabId = tabs[0].id;
      console.log("OUTPUT :555");
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        func: () => {
          let activeTabUrl = window.location.href;
          let sfNewFieldUrl = "p/setup/field/NewCustomFieldStageManager";
          if (activeTabUrl && activeTabUrl.includes(sfNewFieldUrl)) {
            let currentPage = document.querySelector(".ptRightTitle").innerText;
            let wizardHeader = document.querySelector(".pbWizardHeader");
            const timerSpan = document.createElement("span");
            timerSpan.className = "timer_next";

            if (currentPage == "Step 3 of 4") {
              let visibleAll = document.getElementById("d000000000000000");
              
              if (!visibleAll.checked) {
                visibleAll.click();
              }
              const button = document.querySelector('[name="goNext"]');
              let wizardHeader = document.querySelector(".pbWizardHeader");
              const timerSpan = document.createElement("span");
              timerSpan.className = "timer_next";

              let count = 3;

              var timerInterval = setInterval(() => {
                if (count <= 0) {
                  clearInterval(timerInterval); // Stop the timer when it reaches 0
                  timerSpan.innerHTML = "redirecting to next page....!";
                  button.click();
                  return;
                }
                timerSpan.innerHTML = `redirecting to next page in ${count} seconds`;
                count -= 1; // Decrement the countdown by 1 second
                wizardHeader.appendChild(timerSpan);
              }, 1000);
            } else if(currentPage == "Step 4 of 4") {
              let layoutSelectAll = document.getElementById("selectAll");
              if (!layoutSelectAll.checked) {
                layoutSelectAll.click();
              }
              const timerSpan = document.createElement("span");
              timerSpan.className = "timer_next";

              let count = 3;

              var timerInterval = setInterval(() => {
                if (count <= 0) {
                  clearInterval(timerInterval); // Stop the timer when it reaches 0
                  timerSpan.innerHTML = "redirecting to next page....!";
                  document.querySelector('[name="save"]').click();
                  return;
                }
                timerSpan.innerHTML = `redirecting to next page in ${count} seconds`;
                count -= 1; // Decrement the countdown by 1 second
                wizardHeader.appendChild(timerSpan);
              }, 1000);

            }
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
        },
      });
    }
  });
}

// Listener for tab activation
// chrome.tabs.onActivated.addListener(() => {

//   injectContentScript();
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
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
