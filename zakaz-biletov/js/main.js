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


var hiden_block = document.getElementById('hov_block');
var offset = $('#hov_trig').offset();
var position = $('#hov_trig').position();

$('#hov_trig').mouseover (function show_sidebar(){
  
  console.log(offset);
  console.log(position);
  hiden_block.style.display="block";
//  $('#hov_block').css({
//    "left": $("#hov_trig").position().left + $("#hov_trig").width(),
//    "top": $("#hov_trig").position().top + 20
//  });
});

$('#hov_trig').mouseout (function hide_sidebar(){
  
  hiden_block.style.display="none";
});
