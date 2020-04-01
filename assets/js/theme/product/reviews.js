import $ from 'jquery';
import nod from '../common/nod';
import { CollapsibleEvents } from '../common/collapsible';
import forms from '../common/models/forms';

export default class {
    constructor($reviewForm) {
        this.validator = nod({
            submit: $reviewForm.find('input[type="submit"]'),
        });

        this.$reviewsContent = $('.productView-description');
        this.$collapsible = $('[data-collapsible]', this.$reviewsContent);

        this.$reviewsContent2 = $('.vertical-tabs #tab-reviews');

        this.initLinkBind();
        this.injectPaginationLink();
        this.collapseReviews();
    }

    /**
     * On initial page load, the user clicks on "(12 Reviews)" link
     * The browser jumps to the review page and should expand the reviews section
     */
    initLinkBind() {
        $(".themevale_reviewLink > a" ).click(function( event ) {
          event.preventDefault();
        });
        // Template Default Layout
        $('.themevale_reviewLink').click(() => {
            if (($(window).width() >= 1025)) {
                $('html, body').animate({
                    scrollTop: this.$reviewsContent.offset().top - $('.header .themevale_middleHeader').height(),
                }, 700);
            } else {
                $('.productView-description #tab-reviews .toggleLink').addClass('is-open');
                $('.productView-description #tab-reviews .toggle-content').addClass('is-open');
                $('html, body').animate({
                    scrollTop: this.$reviewsContent.offset().top - $('.header .themevale_middleHeader').height(),
                }, 700);
            }
            
            var i = 2;
            $( ".tab" ).each(function( index ) {
             
              if( $( this ).text().search("Product Reviews") != -1){
                i = index + 1;
              }
            });

            if (!$('.productView-description .tabs li:nth-child('+i+')').hasClass('is-active')) {
                $('.productView-description .tabs li:nth-child('+i+') a').trigger('click');
                $('.productView-description #tab-reviews .toggle-content').addClass('is-open');
                $('.productView-description #tab-reviews .toggleLink').addClass('is-open');
                $('.productView-description #tab-description .toggle-content').removeClass('is-open');
                $('.productView-description #tab-description .toggleLink ').removeClass('is-open');

            }
        });
        // Template Vertical Layout
        $('.themevale_reviewLink_vertical').click(() => {
           
            $('html, body').animate({
                scrollTop: this.$reviewsContent2.offset().top - $('.header .themevale_middleHeader').height(),
            }, 700);
            $('.vertical-tabs #tab-reviews .toggle-content').addClass('is-open');
            $('.vertical-tabs #tab-reviews .toggleLink').addClass('is-open');
            // var i = 2;
            // $( ".tab" ).each(function( index ) {
             
            // if( $( this ).text().search("Product Reviews") != -1){
            //     i = index + 1;
            //   }
            // });

            // if (!$('.vertical-tabs .tabs li:nth-child('+i+')').hasClass('is-active')) {
            //     $('.vertical-tabs .tabs li:nth-child('+i+') a').trigger('click');
            //     $('.vertical-tabs #tab-faq .toggle-content').addClass('is-open');
            //     $('.productView-description #tab-faq .toggleLink').addClass('is-open');
            //     $('.productView-description #tab-description .toggle-content').removeClass('is-open');
            //     $('.productView-description #tab-description .toggleLink ').removeClass('is-open');

            // }

            // $('.navPage-childList-item').each(function(index){
            //     console.log( index + ": " + $( this ).text() );
            // });
        });

    }

    collapseReviews() {
        // We're in paginating state, do not collapse
        if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
            $('html, body').animate({
                scrollTop: this.$reviewsContent.offset().top - 56,
            }, 700);
            if (!$('.productView-description .tabs li:nth-child(2)').hasClass('is-active')) {
                $('.productView-description .tabs li:nth-child(2) a').trigger('click');
                $('.productView-description #tab-reviews .toggle-content').addClass('is-open');
            }
        }

        // force collapse on page load
        //this.$collapsible.trigger(CollapsibleEvents.click);
    }

    /**
     * Inject ID into the pagination link
     */
    injectPaginationLink() {
        const $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
        const $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);

        if ($nextLink.length) {
            $nextLink.attr('href', `${$nextLink.attr('href')} #product-reviews`);
        }

        if ($prevLink.length) {
            $prevLink.attr('href', `${$prevLink.attr('href')} #product-reviews`);
        }
    }

    registerValidation(context) {
        this.context = context;
        this.validator.add([{
            selector: '[name="revrating"]',
            validate: 'presence',
            errorMessage: this.context.reviewRating,
        }, {
            selector: '[name="revtitle"]',
            validate: 'min-length:2',
            errorMessage: this.context.reviewSubject,
        }, {
            selector: '[name="revtext"]',
            validate: 'min-length:2',
            errorMessage: this.context.reviewComment,
        }, {
            selector: '[name="email"]',
            validate: (cb, val) => {
                const result = forms.email(val);
                cb(result);
            },
            errorMessage: this.context.reviewEmail,
        }]);

        return this.validator;
    }

    validate() {
        return this.validator.performCheck();
    }
}
