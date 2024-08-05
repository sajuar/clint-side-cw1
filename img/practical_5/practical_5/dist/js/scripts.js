/*!
    * Start Bootstrap - SB Admin v6.0.2 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

    (function() {
        var pre = document.getElementsByClassName('snippets'),
            pl = pre.length;
        for (var i = 0; i < pl; i++) {
            pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
            var num = pre[i].innerHTML.split(/\n/).length;
            for (var j = 0; j < num; j++) {
                var line_num = pre[i].getElementsByTagName('span')[0];
                line_num.innerHTML += '<span>' + (j + 1) + '</span>';
            }
        }
    })();

    /*Scroll to top when arrow up clicked BEGIN*/
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#back2Top').fadeIn();
        } else {
            $('#back2Top').fadeOut();
        }
    });
    $(document).ready(function() {
        $("#back2Top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

    });
    /*Scroll to top when arrow up clicked END*/

    function toggleTheme(value) { 

        // Obtain the name of stylesheet  
        // as a parameter and set it  
        // using href attribute. 
        var sheets = document.getElementsByTagName('link');   
        var button = document.getElementById('theme_button');
        sheets[0].href = value; 

        if(value.indexOf('light') > -1){
            button.title="Enable Dark Mode";
            button.onclick=function() {toggleTheme('css/styles-dark.css');};

        }

        if(value.indexOf('dark') > -1){
            button.title="Enable Light Mode";
            button.onclick=function() {toggleTheme('css/styles-light.css');};
        }
    } 

    function show(section){
        var divs = document.getElementsByClassName('card-body');

        var i;
        for (i = 0; i < divs.length; i++) {
          divs[i].style.display = "none";
        }

        var div = document.getElementById(section);
        div.style.display = 'block';

        var accordion = getAccordion(section);
        $(accordion).collapse('show');

        var navLinks = document.getElementsByClassName('nav-link');
        var i;
        for (i = 0; i < navLinks.length; i++) {
          if (navLinks[i].classList.contains('active'))
            navLinks[i].classList.remove('active');
        }

        if (document.getElementById(section.concat("_")))
            document.getElementById(section.concat("_")).classList.add('active');

        }

    function getAccordion(section){
        var output;
        switch(section){
            case 'welcome':                 output = '#collapseLayouts_welcome';                            break;
            case 'introduction':            output = '#collapseLayouts_introduction';                       break;

            case 'processes':               output = '#collapseLayouts_processes_and_threads';              break;
            case 'threads':                 output = '#collapseLayouts_processes_and_threads';              break;
            case 'when_to_use_each':        output = '#collapseLayouts_processes_and_threads';              break;
            
            case 'theory':                  output = '#collapseLayouts_multiprocessing_and_threading';      break;
            case 'multiprocessing':         output = '#collapseLayouts_multiprocessing_and_threading';      break;
            case 'threading':               output = '#collapseLayouts_multiprocessing_and_threading';      break;
            case 'assessment_1':            output = '#collapseLayouts_multiprocessing_and_threading';      break;

            case 'challenge_1':            output = '#collapseLayouts_challenge_1';                         break;
            
            default: output = '';
        }
        return output;
    }