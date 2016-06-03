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


$('#hov_trig').mouseover (function show_sidebar()
{
  console.log('see me')
  document.getElementById('hov_block').style.display="block";
});

$('#hov_trig').mouseout (function hide_sidebar()
{
  console.log("dont see me")
  document.getElementById('hov_block').style.display="none";
});
