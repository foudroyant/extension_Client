const url = window.location.href.split("/");
url_id = url[url.length - 1]

//GET ELEMENTS DOM
const element = document.querySelectorAll(".text-headline-1.text-on-surface")
const prix = Number.parseInt(document.getElementById("radix-:Rat9jaled6:").value)

const mensualite =Number.parseInt(element[0].textContent.split("€")[0].trim().replace(/\s/g, ''))
const renta_brute_auto = mensualite*12*100/prix


console.log(`La renta brute automatique : ${renta_brute_auto}`)

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
  console.log(message)
  if(message.ask==="renta_brute"){
    sendResponse({
      mensualite,
      renta_brute_auto,
      prix,
      url_id
    })
  }
  return true;
})







/*chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tabId = tabs[0].id;
    
    // Attendre que la page soit complètement chargée
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
      if (changeInfo.status === 'complete') {
        // Envoyer un message au script de contenu
        chrome.tabs.sendMessage(tabId, { data: "Message du popup vers le contenu" })
          .then(function(response) {
            // Traiter la réponse du script de contenu ici
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    });
    
    // Charger la page active
    chrome.tabs.update(tabId, { active: true });
  });
  */

  /*
  // Écouter les messages provenant du popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.otp.length>0){
    document.getElementById("mcode").value=request.otp
    sendResponse({ response: document.title });
    return true;
    }
  });

  */