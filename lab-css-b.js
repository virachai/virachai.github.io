/*window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
document.querySelector("div#");*/

// get the sticky element
$( document ).ready(function() {

  const headerSticky = document.querySelector("#header-sticky");
  const contentSticky = document.querySelector("#content-sticky");
  const stickyContentTop = 160;//contentSticky?contentSticky.offsetTop:-1; //155 , 119
  const stickyTop = 40;//headerSticky?headerSticky.offsetTop:-1;
  //document.title = contentSticky?contentSticky.offsetTop:-1;
  
  var toggleClassName = ['hideChild'];//['is-hidden', 'is-fixed']; //hideChild
  //document.title = stickyTop;
  window.onscroll = function() {
    elmIsSticky(headerSticky, stickyTop, toggleClassName);
    elmIsSticky(contentSticky, stickyContentTop, ["content-sticky"]);
  };
  // Handler for .ready() called. 
  var varElm = document.querySelector("#header-sticky");
   
  if( ( varElm !== null ) ){
    //document.title = varElm.offsetTop;
    varElm.addEventListener("scroll", function(ev){
      ev.target.scrollTop;//pixels scrolled from element top
      ev.target.scrollHeight;//pixels of the whole element.
    });
  }
  

});

//const stickyElm = document.querySelector('div');
/*const observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1]}
);

observer.observe(stickyElm)*/

var elmIsSticky = (headerSticky, stickyTop, toggleClassName) => {  
  if( !headerSticky || stickyTop < 0 || !(toggleClassName !== null) ) return;  
  //document.title = headerSticky.offsetTop;
  //if(Math.abs(headerSticky.offsetTop*1 - stickyTop*1) < 10) return;  
  var elmHasClass = headerSticky.nextElementSibling.classList.contains(toggleClassName[0]);
  
  headerSticky.offsetTop*1 > stickyTop*1?toggleClassName.forEach( (value) => !elmHasClass?headerSticky.nextElementSibling.classList.add(value):false ):toggleClassName.forEach( (value) => headerSticky.nextElementSibling.classList.remove(value) );
    
}

var elmIsSticky2 = () => {

	var stickyElm = document.querySelector('#header-sticky');
  var sticky = stickyElm.offsetTop;
  // is-hidden is-fixed 38 x2 = 72
  //var stickyElm = document.querySelector('#header-sticky');
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    {threshold: [1]}
  );
  observer.observe(stickyElm);

}

var elmIsStickyContent = (headerSticky, stickyTop, toggleClassName) => {  
  if( !headerSticky || stickyTop < 0 || !(toggleClassName !== null) ) return;
  document.title = headerSticky.offsetTop;
  headerSticky.offsetTop*1 > stickyTop*2 ? toggleClassName.forEach( (value) => headerSticky.nextElementSibling.classList.add(value) ):toggleClassName.forEach( (value) => headerSticky.nextElementSibling.classList.remove(value) );
}