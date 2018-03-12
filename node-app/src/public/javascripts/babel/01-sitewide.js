// HEADER - Fade in Animation
const _headerAnimation = () =>{
    let tl = new TimelineMax({paused:false}),
        headerTitle = document.querySelector('header h1'),
        subTitle = document.querySelector('.subheading')

    // Initiate Elements On Load
    if (headerTitle && subTitle) {
        tl.staggerFrom([headerTitle, subTitle], 0.5, {
            delay: 0,
            autoAlpha: 0,
            y:"-3px",
            visibility: "visible"
        }, 0.4)
    }
    if (headerTitle && !subTitle) {
        tl.staggerFrom([headerTitle], 0.5, {
            delay: 0,
            autoAlpha: 0,
            y:"-3px",
            visibility: "visible"
        }, 0.4)
    }
}