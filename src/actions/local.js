function saveLocal(name){
  localStorage.setItem('name', name);
}

function getLocal(){
  return localStorage.getItem('name');
}

function findIn(prop, list){
  for(let x in list) {
    if(prop === list[x].prop){
      return true;
    }
  }
}

export {saveLocal, getLocal, findIn};
