// To instantiate FastClick on the body, which is the recommended method of use:
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
        console.log('Fastclick loaded.')
    }, false);
}

window.onload = () => {

    // Page Header
    _headerAnimation()

    let domReady = setTimeout(() => {
        if (document.readyState === 'complete') {
            console.log('dom ready')
            clearInterval(domReady)
    }

    }, 500)

    // Window Resizing
    let $onResizeTimer; // wait until after resize has finished or this repeats like a dog in heat
    window.onresize = function() {
        clearTimeout($onResizeTimer);
        $onResizeTimer = setTimeout(function(){
           // Do Something
        }, 300);
    };

}