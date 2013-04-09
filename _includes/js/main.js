(function ($) {
  $.fn.changeElementType = function (newType) {
    var attrs = {};
    $.each(this[0].attributes, function (idx, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
    });
    this.replaceWith(function () {
      return $("<" + newType + "/>", attrs).append($(this).contents());
    });
  };
})(jQuery);
$(function () {
  $('.maruku_toc').changeElementType('nav');
  $('nav').removeAttr('class');
  $('nav ul li ul').remove();
  $('nav ul').addClass('nav');
  $('nav').insertAfter($('header'));
  $('body').scrollspy();
});