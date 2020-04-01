import $ from 'jquery';
import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';

export default function () {
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchDiv = $('#quickSearch');
    const $searchQuery = $('#search_query');
    const stencilDropDownExtendables = {
        hide: () => {
            $searchQuery.trigger('blur');
        },
        show: (event) => {
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $quickSearchDiv);

    stencilDropDownExtendables.onBodyClick = (e, $container) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], #search_query, .themevale_background').length === 0) {
            stencilDropDown.hide($container);
            $quickSearchResults.empty();
            $('body').removeClass('themevale_quickSearch');
        }

        $('.themevale_background').on('click', function(e) {
            if ($('body').hasClass('themevale_quickSearch')) {
                stencilDropDown.hide($container);
                $quickSearchResults.empty();
                $('body').removeClass('themevale_quickSearch');
            }
        });
    };

    // stagger searching for 200ms after last input
    const doSearch = _.debounce((searchQuery) => {
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResults.html(response);
        });
    }, 200);

    utils.hooks.on('search-quick', (event) => {
        const searchQuery = $(event.currentTarget).val();
        const category = $(event.currentTarget).parents('form').find('select[name="category"]').val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }
        doSearch(searchQuery, category);
    });

    // Catch the submission of the quick-search
    $quickSearchDiv.on('submit', event => {
        const searchQuery = $(event.currentTarget).find('input').val();

        if (searchQuery.length === 0) {
            return event.preventDefault();
        }

        return true;
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    function searchForm_focus() {
        $('#search_query').on('focus', function(){
            $('body').addClass('themevale_quickSearch');
        });
    }
    searchForm_focus();

    function searchForm_mobile() {
        if ($(window).width() <= 1024) {
            if ($('.item--quicksearch #quickSearch').length) {
                $('#quickSearch').appendTo('.themevale_searchMobile');
            }
        } else {
            if (!$('.item--quicksearch #quickSearch').length) {
                $('.themevale_searchMobile #quickSearch').appendTo('.item--quicksearch');
                $('#quickSearch').css('top', 0);
            }
        }
    }
    searchForm_mobile();

    $(document).ready(function(){
        var category = getUrlParameter('category');
        $('#search_category').val(category).trigger("change");
        $('select[name="category"]').val(category).trigger("change");       
    });
    
    $(window).resize(function() {
        searchForm_mobile();
    });
}
