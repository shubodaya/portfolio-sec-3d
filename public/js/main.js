 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });


// Subtle binary rain background for Resume section only
function createBinaryRainForResume() {
  const container = document.querySelector('.binary-bg-container');
  const canvas = document.getElementById('binary-resume-canvas');
  if (!container || !canvas) {
    return;
  }
  if (canvas.dataset.binaryRain === '1') {
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  canvas.dataset.binaryRain = '1';

  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;

  const baseFont = 22;
  const columnWidth = 28;
  const columns = Math.floor(canvas.width / columnWidth);
  const drops = Array(columns).fill(0);
  const speeds = Array(columns)
    .fill(0)
    .map(() => 0.25 + Math.random() * 0.7);
  const sizes = Array(columns)
    .fill(0)
    .map(() => baseFont * (0.65 + Math.random() * 1.25));
  const glowColor = '0, 165, 255';

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let i = 0; i < drops.length; i++) {
      const size = sizes[i];
      const x = i * columnWidth + columnWidth * 0.5;
      const y = drops[i] * size;
      const text = Math.random() > 0.55 ? '0' : '1';

      ctx.font = `${size}px monospace`;
      ctx.fillStyle = `rgba(${glowColor}, 0.75)`;
      ctx.fillText(text, x, y);

      const trailY = y - size * 1.6;
      if (trailY > 0 && Math.random() > 0.35) {
        ctx.fillStyle = `rgba(${glowColor}, 0.2)`;
        ctx.fillText(Math.random() > 0.55 ? '0' : '1', x, trailY);
      }

      drops[i] += speeds[i];

      if (y > canvas.height + size * 2) {
        drops[i] = Math.random() * -20;
        speeds[i] = 0.25 + Math.random() * 0.7;
        sizes[i] = baseFont * (0.65 + Math.random() * 1.25);
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  });
}

function initBinaryRain() {
  createBinaryRainForResume();
}

document.addEventListener('DOMContentLoaded', initBinaryRain);



(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		$('.ftco-animate').waypoint(function(direction) {
			// Always trigger the animation when the element comes into view
			if (!$(this.element).hasClass('ftco-animated')) {
				$(this.element).addClass('item-animate');
				setTimeout(function() {
					$('body .ftco-animate.item-animate').each(function(k) {
						var el = $(this);
						setTimeout(function() {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});
				}, 100);
			} else {
				// Reset the animation classes if the element goes out of view
				$(this.element).removeClass('fadeIn ftco-animated fadeInLeft fadeInRight fadeInUp');
				$(this.element).addClass('ftco-animate'); // Reset to original state for re-triggering
			}
	
		}, { offset: '95%' });
	};
	contentWayPoint();

  window.initPortfolioWaypoints = function() {
    counter();
    contentWayPoint();
  };

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





})(jQuery);


function projectTileMovement() {
    const projectTiles = document.querySelectorAll('.project-tile');

    projectTiles.forEach(tile => {
        if (tile.dataset.motionBound === '1') {
            return;
        }
        tile.dataset.motionBound = '1';
        tile.addEventListener('mousemove', (e) => {
            const tileRect = tile.getBoundingClientRect();
            const xPos = e.clientX - tileRect.left;
            const yPos = e.clientY - tileRect.top;
            const moveX = (xPos / tileRect.width - 0.5) * 20;
            const moveY = (yPos / tileRect.height - 0.5) * 20;

            tile.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        tile.addEventListener('mouseleave', () => {
            tile.style.transform = 'translate(0, 0)';
        });
    });
}

$(document).ready(function() {
    projectTileMovement();
});


function initStars() {
    const containers = document.querySelectorAll('.starry-background');
    containers.forEach((container) => {
        createStars(container);
    });
}

document.addEventListener('DOMContentLoaded', initStars);

function createStars(containerOrSelector) {
    const starryBackground = typeof containerOrSelector === 'string'
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;
    if (!starryBackground) {
        return;
    }
    if (starryBackground.dataset.starsReady === '1') {
        return;
    }
    starryBackground.dataset.starsReady = '1';
    const numberOfStars = 260;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize the position of the star within the container
        const xPos = Math.random() * starryBackground.clientWidth;
        const yPos = Math.random() * starryBackground.clientHeight;

        // Randomize the size of the star
        const starSize = Math.random() * 2.2 + 0.6;
        const depth = Math.random();

        // Apply styles
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;
        star.style.left = `${xPos}px`;
        star.style.top = `${yPos}px`;

        // Randomize the animation delay for twinkling
    const twinkleSpeed = 2 + Math.random() * 4;
    const driftSpeed = 8 + Math.random() * 14;
        star.style.opacity = `${0.25 + Math.random() * 0.65}`;
        star.style.transform = `scale(${0.6 + depth * 0.8})`;
        star.style.animation = `twinkle ${twinkleSpeed}s infinite ease-in-out, move ${driftSpeed}s infinite alternate`;

        // Append the star to the background
        starryBackground.appendChild(star);
    }
}


function initHeroImageObserver() {
  const target = document.getElementById('bg-img-col');
  if (!target) {
    return;
  }
  if (target.dataset.bgObserved === '1') {
    return;
  }
  target.dataset.bgObserved = '1';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add('visible');
      } else {
        target.classList.remove('visible');
      }
    });
  });

  observer.observe(target);
}

document.addEventListener('DOMContentLoaded', initHeroImageObserver);

function createShootingStar() {
    const starContainer = document.querySelector('.starry-background');
    if (!starContainer) return;

    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');

    // Random starting position near top-left
    const bounds = starContainer.getBoundingClientRect();
    const startX = Math.random() * bounds.width * 0.4;
    const startY = Math.random() * bounds.height * 0.4;
    const travel = 200 + Math.random() * 260;
    const angle = -35 - Math.random() * 20;
    const rad = (angle * Math.PI) / 180;
    const travelX = Math.cos(rad) * travel;
    const travelY = Math.sin(rad) * travel;

    shootingStar.style.left = `${startX}px`;
    shootingStar.style.top = `${startY}px`;
    shootingStar.style.width = `${travel}px`;
    shootingStar.style.setProperty('--shoot-rotate', `${angle}deg`);
    shootingStar.style.setProperty('--shoot-x', `${travelX}px`);
    shootingStar.style.setProperty('--shoot-y', `${travelY}px`);

    starContainer.appendChild(shootingStar);

    // Remove star after animation
    shootingStar.addEventListener('animationend', () => {
        shootingStar.remove();
    });
}

let shootingTimer = null;

function startShootingStars() {
    if (shootingTimer) {
        return;
    }
    const schedule = () => {
        createShootingStar();
        const next = 2500 + Math.random() * 3000;
        shootingTimer = setTimeout(schedule, next);
    };
    schedule();
}

function stopShootingStars() {
    if (!shootingTimer) {
        return;
    }
    clearTimeout(shootingTimer);
    shootingTimer = null;
}

    const shootingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startShootingStars();
            } else {
                stopShootingStars();
            }
        });
    });

const starContainer = document.querySelector('.starry-background[data-shooting="true"]');
if (starContainer) {
    shootingObserver.observe(starContainer);
}



document.addEventListener('DOMContentLoaded', () => {
    const gamingModelContainer = document.getElementById('gaming-model-container');
    const hint = document.getElementById('gaming-interaction-hint');

    if (gamingModelContainer && hint) {
        const hideHint = () => {
            hint.style.display = 'none';
        };
        gamingModelContainer.addEventListener('click', hideHint);
        gamingModelContainer.addEventListener('pointerdown', hideHint);
        gamingModelContainer.addEventListener('touchstart', hideHint, { passive: true });
    }
});

function initRouteEffects() {
  initBinaryRain();
  initStars();
  initHeroImageObserver();
  projectTileMovement();
  if (window.initPortfolioWaypoints) {
    window.initPortfolioWaypoints();
  }
}

window.addEventListener('portfolio:route', initRouteEffects);
