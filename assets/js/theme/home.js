import $ from 'jquery';
import PageManager from './page-manager';
import utils from '@bigcommerce/stencil-utils';
import Countdown from './themevale/themevale_countdown';

export default class Home extends PageManager {
    onReady() {
        
       

        this.sidebar_mobile();
        this.category_sidebar();
        this.carouselLeftSidebar();
         
        //Countdown time product detail
        var product_id = $('[data-product-id]').val();
        Countdown(product_id);


    }

   

    category_sidebar() {
        if ($('.all-categories-list').length > 0) {
            $('.all-categories-list .icon-dropdown').on('click', function() {
                var $this = $(this).parent();
                $this.siblings().removeClass('is-clicked');
                $this.toggleClass('is-clicked');
                $this.siblings().find("> .dropdown-category-list").slideUp( "slow" );
                $this.find("> .dropdown-category-list").slideToggle( "slow" );
           });
        }
    }

    sidebar_mobile() {
        if ($('.page-sidebar').length > 0) {
            $('.page-sidebar').clone().appendTo($("#sidebar-mobile .themevale_MobileContent"));

            $('.themevale_sidebar-mobile').on('click', function(e) {
                $('body').addClass('themevale_open-Sidebar');
            });

            $('#sidebar-mobile .themevale_close').on('click', function(ev) {
                $('body').removeClass('themevale_open-Sidebar');
            });

            $('.bg-mobile').on('click', function(ev) {
                if ($('body').hasClass('themevale_open-Sidebar')) {
                    $('body').removeClass('themevale_open-Sidebar');
                }
            });
        }
    }

    carouselLeftSidebar() {
        $('.sidebarBlock .productCarousel').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            // autoplay: true,
            // autoplaySpeed: 2000,
            mobileFirst: true,
            nextArrow: '<svg class="slick-next slick-arrow"><use xlink:href="#slick-arrow-next1"></use></svg>',
            prevArrow: '<svg class="slick-prev slick-arrow"><use xlink:href="#slick-arrow-prev1"></use></svg>',
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: true
                    }
                }
            ]
        });
    }

   


}
