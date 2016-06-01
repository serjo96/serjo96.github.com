$(document).on('click', '.pass_select', function(show_pass){
  $('.select_block').toggleClass('visible');
               });

$(document).on('click', '.price_tik_tab', function(){
      $('.price_tik_tab a').addClass('active');
      $('.pop_direc_tab a').removeClass('active');
      $('.popular_direct').removeClass('visible');
      $('.price_ticket').addClass('visible');
});

$(document).on('click', '.pop_direc_tab', function(){
      $('.pop_direc_tab a').addClass('active');
      $('.price_tik_tab a').removeClass('active');
      $('.price_ticket').removeClass('visible');
      $('.popular_direct').addClass('visible');
});


$(function () {
  "use strict";

  var resizeTracker;

  // Counteracts all transforms applied above an element.
  // Apply a translation to the element to have it remain at a local position
  var unscale = function (el) {
    var svg = el.ownerSVGElement.ownerSVGElement;
    var xf = el.scaleIndependentXForm;
    if (!xf) {
      // Keep a single transform matrix in the stack for fighting transformations
      xf = el.scaleIndependentXForm = svg.createSVGTransform();
      // Be sure to apply this transform after existing transforms (translate)
      el.transform.baseVal.appendItem(xf);
    }
    var m = svg.getTransformToElement(el.parentNode);
    m.e = m.f = 0; // Ignore (preserve) any translations done up to this point
    xf.setMatrix(m);
  };

  [].forEach.call($("text, .tick"), unscale);

  $(window).resize(function () {
    if (resizeTracker) clearTimeout(resizeTracker);
    resizeTracker = setTimeout(function () { [].forEach.call($("text, .tick"), unscale); }, 100);
  });
})