import $ from 'jquery';
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import carousel from './common/carousel';
import 'lazysizes';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';

/*=========================================
=            www.themevale.com            =
=========================================*/

import themevaleGlobal from './themevale/themevaleGlobal';
import haloMenu from './themevale/themevale_MegaMenu';
    window.haloMenu = haloMenu; window.$=$;

import themevaleAddToCart from './themevale/themevale_AddToCart';
import topBarPromotion from './themevale/topBarPromotion';
    window.topBarPromotion = topBarPromotion;

export default class Global extends PageManager {
    onReady() {
        // Only load visible elements until the onload event fires,
        // after which preload nearby elements.
        window.lazySizesConfig = window.lazySizesConfig || {};
        window.lazySizesConfig.loadMode = 1;


        cartPreview(this.context.secureBaseUrl, this.context.cartId);
        quickSearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        svgInjector();
        themevaleGlobal(this.context);
        topBarPromotion(this.context);
        themevaleAddToCart();
    }
}
