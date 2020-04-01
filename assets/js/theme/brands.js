import PageManager from './page-manager';
import { hooks } from '@bigcommerce/stencil-utils';
import $ from 'jquery';
import AZBrands from './themevale/themevale_AZbrands';

export default class Brands extends PageManager {
	onReady() {
		// Brands list A to Z
        if (this.context.themeSettings.themevale_brandlayout === 'aztable') {
            const azbrands = new AZBrands();
            azbrands.loaded(this.context.themeSettings.brandpage_brands_per_page);
        }
	}
}
