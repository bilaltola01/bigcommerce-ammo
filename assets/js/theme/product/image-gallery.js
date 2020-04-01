import $ from 'jquery';
import 'jquery-zoom';
import _ from 'lodash';

export default class ImageGallery {
    constructor($gallery) {
        this.$mainImage = $gallery.find('[data-image-gallery-main]');
        this.$selectableImages = $gallery.find('[data-image-gallery-item]');
        this.$selectOption = $gallery.find('.slick-current [data-image-gallery-main]');
        this.$swipThumbnails = $gallery.find('.productView-for');
        this.currentImage = {};
    }

    init() {
        this.bindEvents();
        this.setImageZoom();
    }

    setMainImage(imgObj) {
        this.currentImage = _.clone(imgObj);
        this.setActiveThumb();
        this.swapMainImage();
    }

    setAlternateImage(imgObj) {
        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImage.find('img').attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }
        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    selectNewImage(e) {
        e.preventDefault();

        const $target = $(e.currentTarget);
        const imgObj = {
            mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
            zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
            $selectedThumb: $target,
        };
        this.setMainImage(imgObj);
    }

    selectNewImage2(e) {
        const $target = $(e.currentTarget).find('.slick-current [data-image-gallery-item]');
        const imgObj = {
            mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
            zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
            $selectedThumb: $(e.currentTarget).find('.slick-current'),
        };
        this.setMainImage(imgObj);
    }

    setActiveThumb() {
        this.$selectableImages.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
    }

    swapMainImage() {
        this.$mainImage.attr({ 'data-zoom-image': this.currentImage.zoomImageUrl, })
            .find('a').attr({href: this.currentImage.mainImageUrl})
            .find('img').attr({src: this.currentImage.mainImageUrl});

        this.$mainImage.find('img.zoomImg').attr({src: this.currentImage.zoomImageUrl});
        this.$mainImage.attr({
            'data-mfp-src': this.currentImage.zoomImageUrl,
        }).find('img').attr({
            src: this.currentImage.mainImageUrl,
        });
    }

    removeImageZoom() {
        this.$mainImage.trigger('zoom.destroy');
    }

    setImageZoom() {
        if ($(window).width() > 1024) {
            this.$mainImage.zoom({ url: this.$selectOption.attr('data-zoom-image'), touch: false });
        }
    }

    bindEvents() {
        this.$selectableImages.on('click', this.selectNewImage.bind(this));
        this.$swipThumbnails.on('afterChange', this.selectNewImage2.bind(this));
    }
}
