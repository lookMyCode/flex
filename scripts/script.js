var body = document.documentElement;
var nav = document.querySelector('nav');
var minMenuButton = document.getElementById('min_menu_button');
var openedMinMenu = document.getElementById('opened_min_menu');
var minMenuFlag = false;
var up = document.getElementById('up');
var elems = document.getElementsByClassName('animation_elements');
var amountElems = elems.length - 1;
var slider = document.getElementById('slider');
var sliderCounter = 0;
var slide1Text = document.getElementById('slide1_text');
var slide2Text = document.getElementById('slide2_text');
var slide1Img = document.getElementById('slide1_img');
var slide2Img = document.getElementById('slide2_img');
var sliderButtons = document.getElementsByClassName('slider_buttons');



// To open or to close Min Menu

minMenuButton.addEventListener('click', toOpenMinMenu);
body.addEventListener('click', toCloseMinMenu);

function toOpenMinMenu(event) {
    
    if(minMenuFlag == false) {
        event.stopPropagation();
        
        openedMinMenu.style.display = 'flex';
        openedMinMenu.style.position = 'absolute';
        openedMinMenu.style.top = (minMenuButton.offsetTop + minMenuButton.clientHeight) + 'px';
        openedMinMenu.style.left = minMenuButton.offsetLeft + 'px';
        openedMinMenu.style.width = minMenuButton.offsetWidth + 'px';

        minMenuButton.removeEventListener('click', toOpenMinMenu);
        
        window.minMenuFlag = true;
    }
    
}

function toCloseMinMenu() {
    
    if(minMenuFlag == true) {
        openedMinMenu.style.display = 'none';
        
        window.minMenuFlag = false;
        
        minMenuButton.addEventListener('click', toOpenMinMenu);
    }
    
}



// Fix the Nav

window.addEventListener('scroll', fixNav); 

function fixNav() {
    
    var scrolled = window.pageYOffset || body.scrollTop;
    var bodyWidth = body.clientWidth;
  
    if(bodyWidth <= 767 && scrolled > 400) {
        nav.style.position = 'fixed';
        nav.style.backgroundColor = '#fff';
        nav.style.top = 0;
        nav.style.left = 0;
        nav.style.transition = 'all 0.5s';
    } else {
        nav.style.position = 'static';
    }
    
}



// To Up

window.addEventListener('scroll', toUp); 

function toUp() {
  
    var scrolled = window.pageYOffset || body.scrollTop;
    var bodyWidth = body.clientWidth;
  
    if(bodyWidth > 1023 && scrolled > 400) {
        up.querySelector('div').style.transform = 'translate(0, 0)';
    } else {
        up.querySelector('div').style.transform = 'translate(3500px, 0)';
    }
    
}



//Scrolling Animation

window.addEventListener('scroll', scrollAnimation);

function scrollAnimation() {
    
    var scrolled = window.pageYOffset || body.scrollTop;
    var bodyHeight = body.clientHeight;
    
    for( var i = elems.length - 1; i >= 0; i-- ) {
        if( (+scrolled + +bodyHeight) >= +elems[i].offsetTop ) {
            elems[i].style.transform = 'translate(0, 0)';
            elems[i].style.opacity = 1;
        }
    }
    
}



//Slider Height

slider.style.height = 0.35 * slider.clientWidth + 'px';

window.addEventListener('resize', toCalculateHeight);

function toCalculateHeight(){
    
    slider.style.height = 0.35 * slider.clientWidth + 'px';
    
}



//Slider

window.setInterval(slideTimer, 1000);




function slideTimer() {
    
    if(sliderCounter >= 1) {
        slide1Img.style.opacity = 1;
        slide1Img.style.transform = 'translate(0, 0)';
    }
    if(sliderCounter >= 2) {
        slide1Text.style.opacity = 1;
    }
    if(sliderCounter >= 10) {
        slide1Img.style.opacity = 0;
        slide1Img.style.transform = 'translate(2000px, 0)';
        slide1Text.style.opacity = 0;
    }
    if(sliderCounter >= 11) {
        slide2Img.style.opacity = 1;
        slide2Img.style.transform = 'translate(0, 0)';
    }
    if(sliderCounter >= 12) {
        slide2Text.style.opacity = 1;
    }
    if(sliderCounter >= 20) {
        slide2Img.style.opacity = 0;
        slide2Img.style.transform = 'translate(2000px, 0)';
        slide2Text.style.opacity = 0;
        
        window.sliderCounter = 0;
    }
    
    window.sliderCounter++;
    
}



//Slider Buttons

for( var i = sliderButtons.length - 1; i >= 0; i-- ) {
    sliderButtons[i].addEventListener('click', toChangeSlide);
}

function toChangeSlide() {
    if( (window.sliderCounter == 0 || window.sliderCounter >= 11) && window.sliderCounter <= 20 ) {
        window.sliderCounter = 20;
    } else if( window.sliderCounter >= 1 && window.sliderCounter <= 10 ) {
        window.sliderCounter = 10;
    }
}



// copied from: https://ardeya.ru/plavnaya-prokrutka-k-yakoryu-javascript-bez-jquery/

//The start

var linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.5;
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        var w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top, 
            start = null;
        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  
            }
        }
    }, false);
}

//The end






























