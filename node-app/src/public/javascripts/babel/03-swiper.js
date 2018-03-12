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
        prevButton: '.swiper-button-prev',

    });

    if(callback){
        callback();
    }

    if(hasOverlay){
        //make sure images always fit screen
        const swiperOverlay = document.querySelectorAll('.swiper-overlay'),
            scaleswiperOverlay = () => {
                for (let i = 0; i < swiperOverlay.length; i++) {
                    const large     = swiperOverlay[i].getAttribute('data-swiperLarge'),
                          small     = swiperOverlay[i].getAttribute('data-swiperSmall');

                    if(window.innerWidth > 768){
                        swiperOverlay[i].style.backgroundImage = 'url(' + large + ')';
                    }else{
                        swiperOverlay[i].style.backgroundImage = 'url(' + small + ')';
                    }
                let swiperResize; 
                window.addEventListener('resize', () => {
                        clearTimeout(swiperResize);
                    let swiperResize = setTimeout(() =>{
                        if(window.innerWidth > 768){
                            swiperOverlay[i].style.backgroundImage = 'url(' + large + ')';
                        }else{
                            swiperOverlay[i].style.backgroundImage = 'url(' + small + ')';
                        }
                    }, 3000);
                });
                }
            }

        scaleswiperOverlay();
    }
    
}