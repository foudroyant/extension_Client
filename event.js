const renta_brute_auto= document.getElementById("renta_brute_auto")
const mensualite = document.getElementById("mensualite")
const taxe = document.getElementById("taxe")
const renta_nette_auto = document.getElementById("renta_nette_auto")
const projet = document.getElementById("projet")

const rentable_btn = document.getElementById("rentable");
const non_rentable_btn = document.getElementById("non_rentable")



let data_page={
  mensualite :0,
  renta_brute_auto : 0,
  prix : 1,
  url_id :""
}

chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
  console.log("envoie...")
  chrome.tabs.sendMessage(tabs[0].id, {ask:"renta_brute"}, (response=>{
    console.log(response)
    data_page = response
    renta_brute_auto.textContent=response.renta_brute_auto.toFixed(2) + "% Brute";
    mensualite.textContent="Loyer :" +response.mensualite + "€"

    if(localStorage.getItem(response.url_id+"rentable")!=undefined){
      rentable_btn.classList.remove("white")
      rentable_btn.classList.add(localStorage.getItem(response.url_id+"rentable"))
    }
    if(localStorage.getItem(response.url_id+"non_rentable")!=undefined){
      non_rentable_btn.classList.remove("white")
      non_rentable_btn.classList.add(localStorage.getItem(response.url_id+"non_rentable"))
    }
  }))
})

const nb = document.querySelectorAll(".nb")
const crea = document.querySelectorAll(".crea")
const reno = document.querySelectorAll(".reno")
const rafr = document.querySelectorAll(".rafr")
const neuf = document.querySelectorAll(".neuf")

const data_travaux = {
  crea : [0,0,0,0],
  reno : [0,0,0,0],
  rafr : [0,0,0,0],
  neuf : [0,0,0,0]
}

let somme =0

function sommeTotale(){
  somme=0
  for (const data in data_travaux) {
    somme =somme + data_travaux[data].reduce((total, valeur) => total + valeur*1000, 0);
  }
  const renta_nette = (data_page.mensualite*12 - Number.parseInt(taxe.value)) / (data_page.prix*1.8 +somme)
  const projet_somme = data_page.prix*1.8 + somme
  renta_nette_auto.textContent = renta_nette.toFixed(5) + "% Nette";
  projet.textContent ="Projet à " + projet_somme + "€"
}

const lesBoucles = (elements, data_)=>{
  //LES BOUCLES
  elements.forEach((element, index) => {
    element.addEventListener('click', () => {
      const clickedIndex = Array.from(elements).indexOf(element);
      elements[clickedIndex].classList.toggle('red');
      elements[clickedIndex].classList.toggle('white-text');
      const num_bien = Number.parseInt(nb[clickedIndex].value)
      if(num_bien==NaN){
        num_bien = 0
        nb[clickedIndex].value = 0
      }
      if (element.classList.contains("red")) {
        data_[clickedIndex] = Number(elements[clickedIndex].textContent) * num_bien
        sommeTotale()
      } else {
        data_[clickedIndex] = 0
      }
      //console.log('Index cliqué :', clickedIndex+" .... "+ Number(elements[clickedIndex].textContent) + "..."+num_bien);
    });
  });
}

lesBoucles(crea, data_travaux.crea)
lesBoucles(reno, data_travaux.reno)
lesBoucles(rafr, data_travaux.rafr)
lesBoucles(neuf, data_travaux.neuf)

/*
rentable_btn.forEach((element, index)=>{
  element.addEventListener('click', () => {
    const clickedIndex = Array.from(rentable_btn).indexOf(element);
    rentable_btn[clickedIndex].classList.toggle('amber');
  });
})
*/

rentable_btn.addEventListener("click", ()=>{
  rentable_btn.classList.toggle("amber")
  if(rentable_btn.classList.contains("white")){
    rentable_btn.classList.remove("white")
    window.localStorage.setItem(data_page.url_id+"rentable", "amber")
  }else {
    rentable_btn.classList.add("white")
    localStorage.removeItem(data_page.url_id+"rentable")
  }
})

non_rentable_btn.addEventListener("click", ()=>{
  non_rentable_btn.classList.toggle("amber")
  if(non_rentable_btn.classList.contains("white")){
    non_rentable_btn.classList.remove("white")
    window.localStorage.setItem(data_page.url_id+"non_rentable", "amber")
  }else {
    non_rentable_btn.classList.add("white")
    localStorage.removeItem(data_page.url_id+"non_rentable")
  }
})

