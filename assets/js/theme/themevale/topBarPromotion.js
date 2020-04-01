import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
export default function(context) {

   $('#top-bar-promotion').removeClass('hide').addClass('animated fadeIn');

   $('#top-bar-promotion a.close').click(function() {
      $('#top-bar-promotion').addClass('hide');
   });
}
