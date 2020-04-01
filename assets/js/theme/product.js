/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();
        
        this.sidebar_mobile();
        this.category_sidebar();
        this.carouselLeftSidebar();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
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
            autoplay: true,
            autoplaySpeed: 2000,
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
