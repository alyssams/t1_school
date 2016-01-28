require([
    "jquery"
], function ($) {

    var text;

    function init() {
        console.log(text);
    }

    $(document).ready(function () {
        // DOM is ready
        text = "Hello World!";
        init();

    });
});
