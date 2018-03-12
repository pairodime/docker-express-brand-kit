// Responsive Sizes
const client_sm = 768,
      client_md = 992,
      client_lg = 1200,
      client_xl = 1400;

// Check if the Document has a certain Element ID
const _hasId = el_id => {
    if (document.contains(document.getElementById(el_id))) {
        console.log('This Page has ' + el_id + ' ID');
        return true;
    }
};

// Check if the Document Body has a certain Class
const _isPageClass = page_class => {
    if (document.getElementsByTagName("body")[0].className.indexOf(page_class) > -1) {
        //console.log('This Page has ' + page_class + ' Class')
        return true;
    } else {
        return false;
    }
};

// Check if an Element has a certain Class
const _hasClass = (el, name) => {
    if (el.className.indexOf(name) > -1) {
        return true;
    } else {
        return false;
    }
};

// Check if User is on Mobile Device
const _mobileDevice = () => {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        console.log('Yes - Mobile');
        return true;
    }
};

// Scroll Sections
const _scroll_position = () => {

    const scroll_li = document.querySelectorAll('.scroll-target-menu-li'),
          scroll_link = document.querySelectorAll('.scroll-target-menu-li a'),
          init_link = () => {
        for (let i = 0; i < scroll_link.length; i++) {
            (i => {

                let li_top = scroll_link[i].getBoundingClientRect().top,
                    li_bottom = scroll_link[i].getBoundingClientRect().bottom,
                    section = document.querySelector(scroll_link[i].getAttribute('href')),
                    section_top = section.getBoundingClientRect().top,
                    section_bottom = section.getBoundingClientRect().bottom;

                if (li_top > section_top && li_bottom < section_bottom) {
                    scroll_li[i].classList.add('active');
                } else {
                    scroll_li[i].classList.remove('active');
                }
            })(i);
        }
    };

    init_link();

    window.addEventListener('scroll', () => {
        init_link();
    });
};

// Insert Elements in DOM
const _insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

// Get the position of an element relative to the document
const _offset = el => {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

// Warn User to Rotate Device
const _orientationForce = () => {
    const orientationOverlay = document.getElementById('orientationOverlay');

    // We only care about mobile orientation
    if (_mobileDevice()) {
        // Force Portrait Mode
        let mediaLandscape = window.matchMedia("(orientation:landscape)");
        console.log("Device held " + (mediaLandscape.matches ? "horizontally" : "vertically"));
        if (mediaLandscape.matches) {
            console.log("Lanscape Mode.");
            document.getElementById('orientationOverlay').style.cssText = 'visibility: visible;';
        }

        let overlayOrienation = function (mediaLandscape) {
            if (mediaLandscape.matches) {
                console.log("Lanscape Mode.");
                document.getElementById('orientationOverlay').style.cssText = 'visibility: visible;';
            } else {
                console.log("Portrait Mode");
                document.getElementById('orientationOverlay').style.cssText = 'visibility: hidden;';
            }
        };
        mediaLandscape.addListener(overlayOrienation);
    }
};

// Tabs
const _tabs = () => {
    // Listen for click events
    document.addEventListener('click', function (event) {
        let tabLinks = document.querySelectorAll('.tab-toggle');

        //console.log(event)

        // Only take action if the clicked link was a tab toggle with a valid anchor link
        if (!event.target.classList.contains('tab-toggle') || !event.target.hash) return;

        // Get the anchored content
        let content = document.querySelector(event.target.hash);
        if (!content) return;

        // Remove all Previous Active Tabs
        for (let i = 0; i < tabLinks.length; i++) {
            (function (i) {
                //console.log(tabLinks[i])
                tabLinks[i].classList.remove('active');
            })(i);
        }
        // Activate Tab
        event.target.classList.add('active');

        // Tab Pane -> Store the ID as a data attribute and remove it
        content.setAttribute('data-id', content.id);
        content.id = '';

        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active');
    }, false);
    // Listen for hashchange events
    window.addEventListener('hashchange', function (event) {

        // Get the anchored content
        let content = document.querySelector('[data-id="' + window.location.hash.substring(1) + '"]'),
            tabPanes = document.querySelectorAll('.tab-pane');

        if (!content) return;

        // Restore the ID
        content.id = content.getAttribute('data-id');

        // Open the content, close other tabs, whatever
        for (let i = 0; i < tabPanes.length; i++) {
            (function (i) {
                console.log(tabPanes[i]);
                tabPanes[i].classList.remove('active');
            })(i);
        }
        content.classList.add('active');
        console.log('Made Active');

        // Try to bring the content into focus
        content.focus();

        // If it didn't work, give the content a tabindex of -1 and try again
        if (document.activeElement.id !== content.id) {
            content.setAttribute('tabindex', '-1');
            content.focus();
        }

        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active');
    }, false);
    // Get the content
    if (window.location.hash.length > 0) {
        let content = document.querySelector(window.location.hash),
            activeTab = document.querySelector("a[href='" + window.location.hash + "']");

        console.log(activeTab);

        if (activeTab) {
            activeTab.classList.add('active');
        }
        // If the content is a tab, open it
        if (content && content.classList.contains('tab-pane')) {
            content.classList.add('active');
            // close other tabs or do whatever else here
        }
        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active');
    }

    // Add the .tabs-loaded class to the <html> element
    document.documentElement.classList.add('tabs-loaded');
};

// MODAL OVERLAY
const _modalOverlay = hiddenElement => {
    let body = document.querySelector('body'),
        modalOverlayContainer = document.createElement('div'),
        modalContentWrapper = document.createElement('div'),
        modalContent = document.getElementById(hiddenElement),
        closer = document.createElement('div');

    // MODAL CONTAINER
    modalOverlayContainer.id = 'modalOverlay';

    // CONTENT
    modalContentWrapper.id = 'modalContent';
    modalContentWrapper.classList.add('modal');
    modalContentWrapper.innerHTML = modalContent.innerHTML;

    // CLOSER
    closer.classList.add('closer-button', 'modal');
    closer.innerHTML = '<span>Close</span><i class="fa fa-close"></i>';
    closer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 100;';

    // Add to DOM
    body.appendChild(modalOverlayContainer);
    body.appendChild(modalContentWrapper);
    body.appendChild(closer);

    // Active States
    modalOverlayContainer.classList.add('open');
    body.classList.add('modalBlur');
    window.scrollTo(0, 0);

    // Removal Process
    closer.addEventListener('click', event => {
        console.log('Clicked Closer');
        body.removeChild(modalContentWrapper);
        body.removeChild(closer);
        body.removeChild(modalOverlayContainer);
        body.classList.remove('modalBlur');
    });
};

//
const _modalButtons = () => {
    let modalButtons = document.querySelectorAll('.modal-button');

    if (modalButtons) {
        //console.log(modalButtons)

        for (let i = 0; i < modalButtons.length; i++) {
            modalButtons[i].onclick = function () {
                //
                let modalRef = modalButtons[i].getAttribute('data-modal');
                //console.log(modalRef)
                _modalOverlay(modalRef);
            };
        }
    }
};
// HEADER - Fade in Animation
const _headerAnimation = () => {
    let tl = new TimelineMax({ paused: false }),
        headerTitle = document.querySelector('header h1'),
        subTitle = document.querySelector('.subheading');

    // Initiate Elements On Load
    if (headerTitle && subTitle) {
        tl.staggerFrom([headerTitle, subTitle], 0.5, {
            delay: 0,
            autoAlpha: 0,
            y: "-3px",
            visibility: "visible"
        }, 0.4);
    }
    if (headerTitle && !subTitle) {
        tl.staggerFrom([headerTitle], 0.5, {
            delay: 0,
            autoAlpha: 0,
            y: "-3px",
            visibility: "visible"
        }, 0.4);
    }
};
// PARALLAX INTRO WITH CALL TO ACTION
const _parallax_intro_c2a = (duration = '100%') => {
    let introWindow = document.querySelector('.intro-parallax-c2a__bkg');

    if (!_mobileDevice()) {
        if (introWindow) {
            let onEnterReference = introWindow.nextSibling,
                callToAction = document.querySelector('.intro-parallax-c2a__content'),
                downArrow = document.querySelector('.continue-down');

            callToAction.style.visibility = 'visible';

            // TWEEN - Down Arrow
            let downArrow_tl = new TimelineMax({
                repeat: -1, // Repeat
                yoyo: true
            });

            downArrow_tl.to(downArrow, 1, { y: 10 });

            // TWEEN - Stagger Fade In Content
            TweenMax.staggerFrom(callToAction.children, 2, {
                delay: 0.5,
                autoAlpha: 0,
                y: "-3px",
                ease: Elastic.easeOut,
                force3D: true
            }, 0.4);

            // MASTER Timelines + ScollMagic
            let c2a_tl = new TimelineMax(),
                controller = new ScrollMagic.Controller();

            // SCENES = Parallax Background
            new ScrollMagic.Scene({
                triggerElement: onEnterReference,
                triggerHook: 'onEnter',
                duration: '100%'
            }).setTween(TweenMax.fromTo(introWindow, 1, { autoAlpha: '1', backgroundPosition: 'center top', ease: Power0.easeNone }, { autoAlpha: '0', backgroundPosition: 'center bottom', ease: Power0.easeNone }))
            //.addIndicators({name: "Parallax"})
            .addTo(controller);

            // SCENES = Call To Actions Content
            new ScrollMagic.Scene({
                triggerElement: onEnterReference,
                triggerHook: 'onEnter',
                duration: '40%',
                offset: 200
            }).setTween(TweenMax.to(callToAction, 1, { autoAlpha: '0', y: '120%', ease: Power0.easeNone }))
            //.addIndicators({name: "Parallax"})
            .addTo(controller);
        }
    }
};
//Swiper
let swiper;
const globalSwiper = (container, direction, loop, overlay, callback) => {
    let hasOverlay = overlay;

    swiper = new Swiper(container, {
        // Optional parameters
        direction: direction,
        loop: loop,
        //autoplay: 5000,
        paginationClickable: true,

        // If we need pagination
        pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'

    });

    if (callback) {
        callback();
    }

    if (hasOverlay) {
        //make sure images always fit screen
        const swiperOverlay = document.querySelectorAll('.swiper-overlay'),
              scaleswiperOverlay = () => {
            for (let i = 0; i < swiperOverlay.length; i++) {
                const large = swiperOverlay[i].getAttribute('data-swiperLarge'),
                      small = swiperOverlay[i].getAttribute('data-swiperSmall');

                if (window.innerWidth > 768) {
                    swiperOverlay[i].style.backgroundImage = 'url(' + large + ')';
                } else {
                    swiperOverlay[i].style.backgroundImage = 'url(' + small + ')';
                }
                let swiperResize;
                window.addEventListener('resize', () => {
                    clearTimeout(swiperResize);
                    let swiperResize = setTimeout(() => {
                        if (window.innerWidth > 768) {
                            swiperOverlay[i].style.backgroundImage = 'url(' + large + ')';
                        } else {
                            swiperOverlay[i].style.backgroundImage = 'url(' + small + ')';
                        }
                    }, 3000);
                });
            }
        };

        scaleswiperOverlay();
    }
};
// To instantiate FastClick on the body, which is the recommended method of use:
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
        console.log('Fastclick loaded.');
    }, false);
}

window.onload = () => {

    // Page Header
    _headerAnimation();

    let domReady = setTimeout(() => {
        if (document.readyState === 'complete') {
            console.log('dom ready');
            clearInterval(domReady);
        }
    }, 500);

    // Window Resizing
    let $onResizeTimer; // wait until after resize has finished or this repeats like a dog in heat
    window.onresize = function () {
        clearTimeout($onResizeTimer);
        $onResizeTimer = setTimeout(function () {
            // Do Something
        }, 300);
    };
};