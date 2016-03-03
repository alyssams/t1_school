require([
    "jquery", "wow"
], function ($, wow) {

    var text;

    function init() {
        console.log(text);
    }

    $(document).ready(function () {
        // DOM is ready
        text = "Hello! If you can read this, you've open up the Inspector.";
        init();
    });
    wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // change this if you are not using animate.css
        offset: 0, // default
        mobile: true, // keep it on mobile
        live: true // track if element updates
    })
    wow.init();
});
