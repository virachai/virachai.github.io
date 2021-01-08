var oldBar = '<div class="alert alert-info centered-horizontally" id="infoBarMain" style="display: none;">' +
'<a href="#" class="close" id="idClose" data-dismiss="alert" aria-label="close" title="close alert messages"><small>(0)</small>&nbsp;&times;</a>' +
'<strong>Info!</strong> <span>This alert box indicates a neutral informative change or action.</span>' +
'</div>';
//document.querySelector("#infoBarMain");
var barShow = false;
$( document ).ready(function() {

	/*const classChildren = x => document.getElementsByClassName('navbar-${x}')[0];

	classChildren('toggler').addEventListener('click', () => {
		classChildren('collapse').classList.toggle('collapse');
	}, false);*/
	var elemToggler = document.querySelector('button.navbar-toggler') !== null;
	if(elemToggler){
		document.querySelector("button.navbar-toggler").addEventListener('click', () => {
			document.querySelector("div.navbar-collapse").classList.toggle('collapse');
			//document.querySelector("button.navbar-toggler").children.classList.toggle('fa-times');
			setTimeout(function(thisElem){
				thisElem.find("span").first().toggleClass('navbar-toggler-icon');
				thisElem.find("span").first().toggleClass('fa fa-times');
			}, 500, $(this));
			window.scroll(0, 1);
			$("#fixFullScr").toggle();
			//$("div#fixFullScr").toggle(() => $("div#root").addClass("modal-open"), () => $("div#root").removeClass("modal-open"));			
			
			var addMod = () => $('div#fixFullScr').is(':visible') ? $("div#root").addClass("modal-open"):$("div#root").removeClass("modal-open");
			addMod();
			setModalOpen();
			if(document.querySelector('div#root') !== null){
				
				//var rootFix = (rootDiv) => rootDiv.style.position = rootDiv.style.position.toString()=='fixed'?'initial':'fixed';
				//rootFix(document.querySelector('div#root'));
				/*$("div#fixFullScr").on("show", function () {
					$("div#root").addClass("modal-open");
				}).on("hidden", function () {
					$("div#root").removeClass("modal-open")
				});

				
				$('#clickme').toggle(
					function(){alert('click 1');},
					function(){alert('click 2');}
				);
				if(!$(this).hasClass("selected")) { 
    				$(this).addClass("selected");
  				}
				*/
			} 
			//$("div#root").css("position", "fixed");
			/*$('div#root').toggle(function () {
				$(this).css("position", "fixed");
			}, function () {
				$(this).css("position", "static");
			});*/
			window.scroll(0, 0);
			//$(this).find("span").toggleClass('fa-times');
		}, false);
	}
	
	
	$(window).on('hashchange', function(e){
		var pathname = window.location.pathname; // Returns path only (/path/example.html)
		var url      = window.location.href;     // Returns full URL (https://example.com/path/example.html)
		var origin   = window.location.origin;   // Returns base URL (https://example.com)
		var hash = url.substring(url.indexOf("#")+1);
		if(url.length > 1){
			onLab(hash);
			//window.history.replaceState({}, '','/dashboard');
			//window.history.pushState("", "", '/?page=home');
			setTimeout(function(){ window.history.replaceState({}, '','#home'); }, 5000);
		}
		//document.title = hash;
	});

var myVar;

window.addEventListener('scroll', function() {

	var elementRoot = document.querySelector('div#root');

	var positionRoot = elementRoot.getBoundingClientRect();
	document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
	//elementRoot.style.top = parseInt(positionRoot.top.toString());
	
	var element = document.querySelector('.container');
	if(element.length < 1) return;

	var elementNav = document.querySelector('.fixed-top');
	if(elementNav.length < 1) return;
	var position = element.getBoundingClientRect();
	var positionNav = elementNav.getBoundingClientRect();
	
	var elementNavTransparent = document.querySelector('.navbar-transparent') !== null;
	var elementNavWhite = document.querySelector('.navbar-white') !== null;
	if(position.top < positionNav.bottom && elementNavTransparent) {
		var copy = new Date();
		//console.log(copy.getTime() + ' position.top < positionNav.bottom && elementNavTransparent');
		elementNav.classList.add("navbar-white");
		elementNav.classList.remove("navbar-transparent");
	}
	else if(position.top >= positionNav.bottom && elementNavWhite)
	{
		var copy = new Date();
		//console.log(copy.getTime() + ' position.top >= positionNav.bottom && elementNavWhite');
		elementNav.classList.add("navbar-transparent");
		elementNav.classList.remove("navbar-white");
	}

	// checking whether fully visible
	if(position.top >= 0 && position.bottom <= window.innerHeight) {
		//console.log('Element is fully visible in screen window.innerHeight ' + window.innerHeight);
	}

	// checking for partial visibility
	if(position.top < window.innerHeight && position.bottom >= 0) {
		//console.log('Element is partially visible in screen');
	}

	var elementArrow = document.querySelector('i.classArrowGif') !== null;
	if(elementArrow){
		document.querySelector('i.classArrowGif').classList.add("classHide");
		document.querySelector('i.classHide').classList.remove("classArrowGif");
	}
});

	//document.querySelector(".alert-info small").textContent = "(" + 5 + ")";
	/*
	var handler = function() {
		alert( "The quick brown fox jumps over the lazy dog." );
	};
	$("#infoBarMain a#idClose").bind( "click", handler );
	$("#infoBarMain a#idClose").unbind( "click", handler );
	
	$("#infoBarMain a#idClose").unbind("click").bind("click", function(){
        alert("this is Overridden click event!");
		e.preventDefault();
		return;
    });
	*/
	$("#infoBarMain a#idClose").click(function() {
       setTimeout(function(){
			$( "body" ).prepend( oldBar );
		 }, 2000);
    });

}); //$( document ).ready

function onLab(hash){
	var elem = document.querySelector("#infoBarMain") !== null;
	if(elem){
		getAnchorText(hash);
		//document.querySelector('#infoBarMain').style.display = 'block';
	}else{
		//lab001
		$( "body" ).prepend( oldBar );
		setTimeout(function(){
			getAnchorText(hash);
			//document.querySelector('#infoBarMain').style.display = 'block';
		 }, 500);
	}
	//myVar = setInterval(function(){ alertFunc("First param", "Second param"); }, 2000);
	if(!barShow)
	{
		var seconds = new Date().getTime() / 1000;
		var num = 5;
		var countTime = parseInt(seconds) + parseInt(num);
		document.querySelector(".alert-info small").textContent = "(" + num + ")";
		barShow = true;
		myVar = setInterval( function(){ closeAlertBar(countTime); }, 1000);
	}
	switch(hash) {
		case 'lab001':
			var elementArrow = document.querySelector('i.classHide') !== null;
			if(elementArrow){
				setTimeout(function(){
					document.querySelector('i.classHide').classList.add("classArrowGif");
					document.querySelector('i.classArrowGif').classList.remove("classHide");
				 }, 100);
				 setTimeout(function(){
					var elementArrow = document.querySelector('i.classArrowGif') !== null;
					if(elementArrow){
						document.querySelector('i.classArrowGif').classList.add("classHide");
						document.querySelector('i.classHide').classList.remove("classArrowGif");
					}
				 }, 12000);
			}
		break;
		case 'lab002':
		// code block
		break;
		default:
		// code block
	}

}

function closeAlertBar(count){
	if(!barShow) return;
	var elem = document.querySelector("#infoBarMain") !== null;
	if(!elem) return;
	//document.querySelector(".alert-info small").textContent = "(" + count + ")";
	var timeNow = new Date().getTime() / 1000;
	var alertBar = timeNow >= count ? false : document.querySelector(".alert-info small").textContent = "(" + Math.ceil(count - timeNow) + ")";
	if(!alertBar)
	{
		document.querySelector("#infoBarMain a").click();
		barShow = false;
		clearInterval(myVar);
	}
}

function getAnchorText(hash){
	var anchorText = $('a[href="#'+ hash +'"]') !== null;
	if(anchorText) anchorText = $('a[href="#'+ hash +'"]').first().text();

	var anchorTitle = $('a[href="#'+ hash +'"]:not([title=""])') !== null;
	if(anchorTitle) anchorTitle = $('a[href="#'+ hash +'"]').first().attr("title");
	var infoBarMain = document.querySelector("#infoBarMain span") !== null;
	
	if(infoBarMain && anchorText.toString().length > 0 && anchorTitle){
		anchorTitle = anchorTitle?" - " + anchorTitle : "";
		document.querySelector("#infoBarMain span").textContent = anchorText.toString() + anchorTitle;
		document.title = document.querySelector("#infoBarMain span").textContent;
		document.querySelector('#infoBarMain').style.display = 'block';
	}
}

function setModalOpen(){
	if($('div#fixFullScr').is(':visible'))
	{
		// When the modal is shown, we want a fixed body
		document.body.style.position = 'fixed';
		// document.body.style.top = `-${window.scrollY}px`;
		const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
		document.body.style.top = `-${scrollY}`;
		
		//document.title = `-${window.scrollY}px`;
		//$("div#root").addClass("modal-open");
	}
	else
	{
		/*$("div#root").removeClass("modal-open")
		$("#button").click(function() {
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#root").offset().top
			}, 2000);
		});*/
		// When the modal is hidden, we want to remain at the top of the scroll position
		const scrollY = document.body.style.top;
		document.body.style.position = '';
		document.body.style.top = '';
		//setTimeout(function(){window.scrollTo(0, Math.abs( parseInt(scrollY || '0') ));}, 100);
		setTimeout(function(){ window.scrollTo({
			top: Math.abs( parseInt(scrollY || '0') ),
			left: 0,
			behavior: 'smooth'
		  });
		}, 10);
		/*setTimeout(function(scrollY){ 
			$([document.documentElement, document.body]).animate({
				scrollTop: Math.abs( parseInt(scrollY || '0') )
			}, 2000);
		}, 10, scrollY);scrollY
		/*window.scrollTo({
			top: Math.abs( parseInt(scrollY || '0') ),
			left: 0,
			behavior: 'smooth'
		  });*/
		//document.title = Math.abs(parseInt(scrollY || '0') );
	}
}

const showDialog = () => {
	document.getElementById('dialog').classList.add('show')
	const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
	const body = document.body;
	body.style.position = 'fixed';
	body.style.top = `-${scrollY}`;
  };
  const closeDialog = () => {
	const body = document.body;
	const scrollY = body.style.top;
	body.style.position = '';
	body.style.top = '';
	window.scrollTo(0, parseInt(scrollY || '0') * -1);
	document.getElementById('dialog').classList.remove('show');
  }
  /*window.addEventListener('scroll', () => {
	document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  });*/