

document.querySelector("div.container .form").addEventListener("submit", function(e){
  var test = confirm('do you really wanna delete this item ?');
  if(test === true){
    e.submit();
    console.log(e);
  }else{
    e.preventDefault();
    console.log(e);
  }
});
