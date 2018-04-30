function saveLocal(name){
  localStorage.setItem('name', name);
}

function getLocal(){
  return localStorage.getItem('name');
}

function isThere(arr, target, item){
  var a;
  for(let x in arr){
    if(arr[x][target] === item){
      a = true;
      return a;
    } else {
      a = false;
    }
  }
  return a;
}

export {saveLocal, getLocal, isThere};
