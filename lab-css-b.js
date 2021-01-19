var carouselSlide = () => {
  //alert('111')
  // 443 + 16 swiper-wrapper
  //let mySlide = document.getElementById("id-swiper-wrapper");
  //if( !(mySlide !== null )) return;
  let numSlide = $("#id-swiper-wrapper div.wiper-slide");
  //document.title = numSlide.length;
  //mySlide.querySelectorAll("div.wiper-slide");
  if( !(numSlide !== null )) return;
  let widthBar = numSlide.length * (numSlide[0].clientWidth*1 + 16.33) - 16;
  //swiper-scrollbar-drag
  //document.title = widthBar;
  let myScrollbar = $("div.swiper-scrollbar-drag");
  if( !(myScrollbar!== null )) return;
  myScrollbar.animate({ width: widthBar }, 'slow');
}

// get the sticky element
$( document ).ready(function() {

  const headerSticky = document.querySelector("#header-sticky");
  const contentSticky = document.querySelector("#content-sticky");
  const stickyContentTop = 160;//contentSticky?contentSticky.offsetTop:-1; //155 , 119
  const stickyTop = 40;//headerSticky?headerSticky.offsetTop:-1;
  //document.title = contentSticky?contentSticky.offsetTop:-1;
  
  var toggleClassName = ['hideChild'];//['is-hidden', 'is-fixed']; //hideChild
  //document.title = stickyTop;

  setTimeout(function(){ carouselSlide(); }, 100);
  
  $( "#move-horizontal div.swiper-scrollbar" ).mouseover( function() {
    $( this ).on("scroll", scroll2slide );
  }).mouseout(function() {
    $( this ).off("scroll", scroll2slide );
  });

  dragElement( document.getElementById("move-horizontal") );
  //dragElement(document.getElementById("id-swiper-wrapper"));
  //id-swiper-wrapper

  window.onscroll = function() {
    elmIsSticky(headerSticky, stickyTop, toggleClassName);
    elmIsSticky(contentSticky, stickyContentTop, ["content-sticky"]);
  };
    var fnButtonSlide = (btType) => {
    $( btType ).click(function() { buttonSlide( btType ); });
  }

  fnButtonSlide('.swiper-button-prev');
  fnButtonSlide('.swiper-button-next');
  
  // Handler for .ready() called. 
  /*var varElm = document.querySelector("#header-sticky");
   
  if( ( varElm !== null ) ){
    //document.title = varElm.offsetTop;
    varElm.addEventListener("scroll", function(ev){
      ev.target.scrollTop;//pixels scrolled from element top
      ev.target.scrollHeight;//pixels of the whole element.
    });
  }*/
  

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

/*window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
document.querySelector("div#");

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}*/

$(function() {
  return;
  var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
  slideCount = $('.slide').length;
  
  $('html').on('mousedown touchstart', slideStart);
  $('html').on('mouseup touchend', slideEnd);
  $('html').on('mousemove touchmove', slide);
  
  /**
  / Triggers when slide event started
  */
  function slideStart(event) {
    // If it is mobile device redefine event to first touch point
    if (event.originalEvent.touches)
      event = event.originalEvent.touches[0];
    // If sliding not started yet store current touch position to calculate distance in future.
    if (sliding == 0) {
      sliding = 1; // Status 1 = slide started.
      startClientX = event.clientX;
    }
  }
  
  /** Occurs when image is being slid.
  */
  function slide(event) {
    event.preventDefault();
    if (event.originalEvent.touches)
      event = event.originalEvent.touches[0];
    // Distance of slide.
    var deltaSlide = event.clientX - startClientX;
    // If sliding started first time and there was a distance.
    if (sliding == 1 && deltaSlide != 0) {
      sliding = 2; // Set status to 'actually moving'
      startPixelOffset = pixelOffset; // Store current offset
    }
    
    //  When user move image
    if (sliding == 2) {
      // Means that user slide 1 pixel for every 1 pixel of mouse movement.
      var touchPixelRatio = 1;
      // Check for user doesn't slide out of boundaries
      if ((currentSlide == 0 && event.clientX > startClientX) ||
         (currentSlide == slideCount - 1 && event.clientX < startClientX))
        // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
        touchPixelRatio = 3;
      // Calculate move distance.
      pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
      // Apply moving and remove animation class
      $('#slides').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
    }
  }
  
  /** When user release pointer finish slide moving.
  */
  function slideEnd(event) {
    if (sliding == 2){
      // Reset sliding.
      sliding = 0;
      // Calculate which slide need to be in view.
      currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide -1;
      // Make sure that unexisting slides weren't selected.
      currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
      // Since in this example slide is full viewport width offset can be calculated according to it.
      pixelOffset = currentSlide * -$('body').width();
      // Remove style from DOM (look below)
      $('#temp').remove();
      // Add a translate rule dynamically and asign id to it
      $('<style id="temp">#slides.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
      // Add animate class to slider and reset transform prop of this class.
      $('#slides').addClass('animate').css('transform', '');
    }
  }
  
});


function dragElement(elmnt) {
  //console.log("function dragElement");
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, posLeftOld = 0;
  if (0) {
    // if present, the header is where you move the DIV from:
    //document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    document.getElementById("id-swiper-wrapper").onmousedown = dragMouseDown;
    //console.log("elmnt.id!");
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    //console.log("elmnt.onmousedown!");
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:    
    //$( "#move-horizontal div.swiper-scrollbar" ).off("scroll", scroll2slide );
    posLeftOld = $( "#move-horizontal div.swiper-wrapper" ).position().left;
    pos3 = e.clientX;
    //console.log( "pos3 " + pos3 );
    //console.log( "scrollLeft " + $( "#move-horizontal div.swiper-scrollbar" ).scrollLeft() );
    //pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = e.clientX - pos3;       
    let div2scroll = posLeftOld*1 + pos1*1;
    elmnt.children[0].style.transform = "translateX("+ div2scroll +"px)";
    slide2scroll(div2scroll);
  }

  function closeDragElement() {
    
    document.onmouseup = null;
    document.onmousemove = null;

    var pvElm = $( "#move-horizontal div.swiper-wrapper" );
    var sliderLeft = pvElm.position().left;
    var loopMax = $( "#move-horizontal div.swiper-wrapper" ).width();
    var pvLoopMax = loopMax;
    //let barWidth = $( "#move-horizontal div.swiper-scrollbar" ).width();
    let sliderWidth = $( "#move-horizontal div.swiper-wrapper" ).width();    
    let barWidthDiv = $( "#move-horizontal div.swiper-scrollbar-drag" ).width();
    let maxLeft = sliderWidth - barWidthDiv;
    //console.log( "translateX " + pos1 );
    //posLeftOld = sliderLeft*1 + pos1*1;
    var posLeftOldCalc = sliderLeft;
    //console.log( "maxLeft " + maxLeft );
    //console.log( "sliderLeft " + sliderLeft );
    //console.log( "posLeftOld " + posLeftOld ); 
    pvElm.css('transition-duration', '800ms');

    while (posLeftOldCalc*1 > 0 && pvLoopMax) {
      posLeftOldCalc = posLeftOldCalc*1 - 1;
      pvElm.css({        
        'transform' : 'translateX(-'+ posLeftOldCalc +'px)'
      });      
      pvLoopMax -= 1;
    }
    
    posLeftOldCalc = sliderLeft;
    pvLoopMax = loopMax;
    //console.log( "pvLoopMax " + pvLoopMax ); 
    while (posLeftOldCalc*1 < maxLeft*1 && pvLoopMax) {
      posLeftOldCalc = posLeftOldCalc*1 + 1;
      pvElm.css({        
        'transform' : 'translateX('+ posLeftOldCalc +'px)'
      });
      pvLoopMax -= 1;
    }    
    //$( "#move-horizontal div.swiper-scrollbar" ).on("scroll", scroll2slide );
    setTimeout(function(){ pvElm.css('transition-duration', '0ms'); }, 100);
    //console.log( "posLeftOldCalc " + posLeftOldCalc ); 
    //console.log( "pvLoopMax " + pvLoopMax ); 
  }
}

var slide2scroll = (movePos) => {
  //let movePos = $( "#move-horizontal div.swiper-scrollbar-drag" ).position().left;
  let sliderWidth = $( "#move-horizontal div.swiper-wrapper" ).width();    
  let barWidth = $( "#move-horizontal div.swiper-scrollbar" ).width();
  let barWidthDiv = $( "#move-horizontal div.swiper-scrollbar-drag" ).width();
  let maxLeft = sliderWidth - barWidthDiv; // 1263 
  let moveRadio = Math.abs( barWidthDiv - barWidth ) / maxLeft; // (1263/1854) => (1854/1263) 
  $( "#move-horizontal div.swiper-scrollbar" ).scrollLeft( moveRadio*movePos );
  //document.title = movePos*moveRadio;
  //document.getElementById("move-horizontal").children[0].style.transform = "translateX("+ -1*moveRadio*movePos +"px)";
}

var scroll2slide = () => {
  let movePos = $( "#move-horizontal div.swiper-scrollbar-drag" ).position().left;
  let sliderWidth = $( "#move-horizontal div.swiper-wrapper" ).width();    
  let barWidth = $( "#move-horizontal div.swiper-scrollbar" ).width();
  let barWidthDiv = $( "#move-horizontal div.swiper-scrollbar-drag" ).width();
  let maxLeft = sliderWidth - barWidthDiv;
  let moveRadio = maxLeft / Math.abs( barWidthDiv - barWidth );
  //document.title = movePos*moveRadio;
  document.getElementById("move-horizontal").children[0].style.transform = "translateX("+ -1*moveRadio*movePos +"px)";
}

var buttonSlide = (buttonArrow) => {  
  //console.log( "buttonArrow " + buttonArrow ); 
  //alert(buttonArrow);
  //return;
  let movePos = $( "#move-horizontal div.swiper-wrapper" ).position().left;
  let sliderWidth = $( "#move-horizontal div.swiper-wrapper" ).width();    
  
  let barWidthDiv = $( "#move-horizontal div.swiper-scrollbar-drag" ).width();
  let maxLeft = sliderWidth - barWidthDiv;
  
  let barWidth = $( "#move-horizontal div.swiper-scrollbar" ).width();
  let slideMoving = Math.abs( barWidthDiv - barWidth )
  //let moveRadio = maxLeft / slideMoving;
  //console.log( "movePos " + movePos ); 
  //console.log( "slideMoving " + slideMoving ); 
  let numWiper = $( "#move-horizontal div.swiper-wrapper .wiper-slide").length;
  let stepMoveSize = barWidthDiv / numWiper;
  let stepAuto = Math.floor( (sliderWidth / barWidthDiv) * numWiper ) * stepMoveSize;
  stepAuto = Math.ceil( (sliderWidth - stepAuto) / 2 );
  //console.log( "stepAuto " + stepAuto ); 
  
  //stepMoveSize -= stepAuto;
  //console.log( "stepMoveSize " + stepMoveSize );
  let movePrev = (movePos*1 + 1*stepMoveSize);
  let moveNext = (movePos*1 - 1*stepMoveSize);
  //console.log( "Item " + -1*Math.floor(moveNext/stepMoveSize)*stepAuto ); 
  //console.log( "Item " + Math.floor(moveNext/stepMoveSize) ); 
  moveNext = 1*stepMoveSize * Math.floor(moveNext/stepMoveSize) + stepAuto;
  movePrev = 1*stepMoveSize * Math.floor(movePrev/stepMoveSize) + stepAuto;

  movePos = buttonArrow=='.swiper-button-prev'? movePrev:movePos;
  movePos = buttonArrow=='.swiper-button-next'? moveNext:movePos;
  
  movePos = movePos > 0 ? 0:movePos;
  movePos = movePos < maxLeft ? maxLeft:movePos;
  //console.log( "movePos " + Math.ceil(sliderWidth/11) ); 
  document.getElementById("move-horizontal").children[0].style.transform = "translateX("+ movePos +"px)";

  let moveRadio = slideMoving / maxLeft; // (1263/1854) => (1854/1263) 
 // movePos = $( "#move-horizontal div.swiper-wrapper" ).position().left;
  $( "#move-horizontal div.swiper-scrollbar" ).scrollLeft( moveRadio*movePos );

  /*var pvElm = $( "#move-horizontal div.swiper-wrapper" );
  var posLeftOldCalc = movePos;
  var loopMax = $( "#move-horizontal div.swiper-wrapper" ).width();
  var pvLoopMax = loopMax;
  pvElm.css('transition-duration', '800ms');

    while (posLeftOldCalc*1 > 0 && pvLoopMax) {
      posLeftOldCalc = posLeftOldCalc*1 - 1;
      pvElm.css({        
        'transform' : 'translateX(-'+ posLeftOldCalc +'px)'
      });      
      pvLoopMax -= 1;
    }
    
    posLeftOldCalc = movePos;
    pvLoopMax = loopMax;
    //console.log( "pvLoopMax " + pvLoopMax ); 
    while (posLeftOldCalc*1 < maxLeft*1 && pvLoopMax) {
      posLeftOldCalc = posLeftOldCalc*1 + 1;
      pvElm.css({        
        'transform' : 'translateX('+ posLeftOldCalc +'px)'
      });
      pvLoopMax -= 1;
    }        
    setTimeout(function(){ pvElm.css('transition-duration', '0ms'); }, 100);*/
  
  //let moveRadio = slideMoving / maxLeft; // (1263/1854) => (1854/1263) 
  //movePos = $( "#move-horizontal div.swiper-wrapper" ).position().left;
  //$( "#move-horizontal div.swiper-scrollbar" ).scrollLeft( moveRadio*movePos );
}