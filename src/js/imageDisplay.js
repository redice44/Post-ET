import $ from 'jquery';
import slick from 'slick-carousel';

$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  // asNavFor: '.slider-nav',
  autoplay: true,
  autoplaySpeed: 2000
  // dots: true,
  // adaptiveHeight: true
});
