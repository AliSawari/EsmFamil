function saveLocal(name){
  localStorage.setItem('name', name);
}

function getLocal(){
  return localStorage.getItem('name');
}

export {saveLocal, getLocal};
