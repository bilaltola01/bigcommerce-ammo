import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';

export default function(context) {
 
    // Dropdownd Sidebar Category
    function active_dropdown_category(){
        $('#sideAllCategories > .sidebarBlock-heading').on('click', function() {
                $('#sideAllCategories > .navPages').toggleClass('is-open');
                $('#sideAllCategories').toggleClass('is-open');
        });

        $('body').click(function(e){
                if ($(e.target).closest('.menu-category #sideAllCategories').length === 0) {
                    $('.menu-category #sideAllCategories').removeClass('is-open');
                    $('.menu-category #sideAllCategories > .navPages').removeClass('is-open');
                }
        });
    }
    active_dropdown_category();
    //
    function dropdown_menu(){
        $( ".navPages > .navPages-list > li" ).each(function( index ) {
            var temp = $(this).offset();
            if(($(window).width() - temp.left) < 350){
                $(this).addClass('dropdown_left');
            }
        });
    }
    dropdown_menu();
    // Dropdown My Account
    function dropdown_myaccount(){
        $('.navUser-action--account').on('click', event => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            if ($target.hasClass('is-open')) {
                $target.removeClass('is-open');
                $target.next().slideUp();
            } else {
                $target.addClass('is-open');
                $target.next().slideDown();
            }
        });
        $(document).on('click', event => {
            if ($('.navUser-action--account').hasClass('is-open')) {
                if (($(event.target).closest('.navUser-action--account').length === 0) && ($(event.target).closest('#navPages-account-topbar').length === 0)) {
                    $('.navUser-action--account').removeClass('is-open');
                    $('#navPages-account-topbar').slideUp();
                }
            }
        });
    }
    dropdown_myaccount();

    // setting menu on Mobile & tablet
    function menu_mobile() {

        if ($(window).width() > 1024) {
            $('#menu-mobile').css('top', $(".is-sticky").outerHeight());
        } else {
            $('#menu-mobile').css('top', 0);
        }

    }
    menu_mobile();
    

    function toggle_menu() {
        $('#menu-mobile .themevale_close').on('click', function(){
            $('.mobileMenu-toggle').trigger('click');
        });

        $('.bg-mobile').on('click', function(ev) {
            if ($('body').hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }
        });

        $('#currency_dropdown').on('click', function(ev) {
            ev.preventDefault();
            $(this).toggleClass('is-open');
        });
    }
    toggle_menu();
    // setting Account on Mobile & tablet
    function toggle_account() {
        if ($(window).width() <= 1024) {
            $('.account-icon').on('click', function(ev) {
                ev.preventDefault();
                $('body').toggleClass('themevale_open-Account');
            });

            $('#account-mobile .themevale_close').on('click', function(ev) {
                $('body').removeClass('themevale_open-Account');
            });

            $(document).on('click', function(ev) {
                if ($(ev.target).closest('#account-mobile').length === 0 && $(ev.target).closest('.account-icon').length === 0 && $('body').hasClass('themevale_open-Account')) {
                    $('body').removeClass('themevale_open-Account');
                }
            });
        }
    }
    toggle_account();
    // setting footer toggle on Mobile & tablet
	function footer_mobile() {
        if ($(window).width() <= 767) {
            if(!$('.themevale-infoFooter').hasClass('footerMobile')) {
                $('.themevale-infoFooter').addClass('footerMobile');
                $('.footer-dropdownmobile .footer-info-list').css('display', 'none');
            }
        } else {
            $('.themevale-infoFooter').removeClass('footerMobile');
            $('.footer-dropdownmobile').removeClass('open-dropdown');
            $('.footer-dropdownmobile .footer-info-list').css('display', 'block');
        }
    }
    footer_mobile();
    function toggle_footer() {
        $('.footer-dropdownmobile .footer-info-heading').on('click', function() {
            $(this).parent().toggleClass('open-dropdown');
            $(this).parent().find('.footer-info-list').slideToggle();
        });
    }
    toggle_footer();

    
    // Back to top
    function back_to_top() {
        var offset = $(window).height()/2;
        const backToTop = $('#back-to-top');
        const backToTopa = $('#back-to-top a');

        $(window).scroll(function() {
            ($(this).scrollTop() > offset) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible ');
        });

        backToTopa.on('click', function(event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    }
    back_to_top();

    function quickSearchMobile(){
        if ($(window).width() <= 1024) {
            $('.item--quicksearch #quickSearch').insertBefore('#top-bar-promotion');
        } else{
            $('#quickSearch').appendTo('.item--quicksearch');
        }
    }
    quickSearchMobile();

    $(window).resize(function() {
        quickSearchMobile();
    	footer_mobile();
        menu_mobile();
    })

}
