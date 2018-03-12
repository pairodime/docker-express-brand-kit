// PARALLAX INTRO WITH CALL TO ACTION
const _parallax_intro_c2a = (duration = '100%') => {
    let introWindow = document.querySelector('.intro-parallax-c2a__bkg')

    if(!_mobileDevice()) {
        if(introWindow) {
            let onEnterReference = introWindow.nextSibling,
                callToAction = document.querySelector('.intro-parallax-c2a__content'),
                downArrow = document.querySelector('.continue-down')

            callToAction.style.visibility = 'visible'

            // TWEEN - Down Arrow
            let downArrow_tl = new TimelineMax({
                repeat: -1, // Repeat
                yoyo: true
            })

            downArrow_tl.to(downArrow, 1, {y:10})

            // TWEEN - Stagger Fade In Content
            TweenMax.staggerFrom(callToAction.children, 2, {
                delay: 0.5,
                autoAlpha: 0,
                y:"-3px",
                ease:Elastic.easeOut,
                force3D:true
            }, 0.4)


            // MASTER Timelines + ScollMagic
            let c2a_tl = new TimelineMax(),
                controller = new ScrollMagic.Controller()

            // SCENES = Parallax Background
            new ScrollMagic.Scene({
                triggerElement: onEnterReference,
                triggerHook: 'onEnter',
                duration: '100%'
            })
                .setTween(TweenMax.fromTo(introWindow, 1, {autoAlpha: '1', backgroundPosition: 'center top', ease:Power0.easeNone}, {autoAlpha: '0', backgroundPosition: 'center bottom', ease:Power0.easeNone}))
                //.addIndicators({name: "Parallax"})
                .addTo(controller)

            // SCENES = Call To Actions Content
            new ScrollMagic.Scene({
                triggerElement: onEnterReference,
                triggerHook: 'onEnter',
                duration: '40%',
                offset: 200
            })
                .setTween(TweenMax.to(callToAction, 1, {autoAlpha: '0', y: '120%', ease:Power0.easeNone}))
                //.addIndicators({name: "Parallax"})
                .addTo(controller)
        }
    }
}