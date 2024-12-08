console.log('here'); 
const sfNewField ='p/setup/field/NewCustomFieldStageManager'

chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        y = tab.url;
        alert("you are here: sf admin "+y);
    });
});
