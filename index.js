window.addEventListener('scroll', function() {
	
	var element = document.querySelector('.container');
	if(element.length < 1) return;

	var elementNav = document.querySelector('.fixed-top');
	if(elementNav.length < 1) return;
	var position = element.getBoundingClientRect();
	var positionNav = elementNav.getBoundingClientRect();
	
	if(position.top < positionNav.bottom) {
		//console.log('position.top < positionNav.bottom + 10');
		elementNav.classList.add("navbar-white");
		elementNav.classList.remove("navbar-transparent");
	}
	else
	{
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
});