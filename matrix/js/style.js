
$('.str_inp input').focus(function () {
    $('.left-side').addClass('foc_blue');
  }).blur(function () {
    $('.left-side').removeClass('foc_blue');
  });
  
$(document).on("click",".clear-mtrx", function(){ 
  $(".str_inp input").val(""); 
});

$(document).on("click",".change-mtrx", function(){
 
  $('.matrix_a').appendTo('.matrix_b_cover');
  $(".matrix_b").appendTo(".matrix_a_cover");
});


//cheked radiobutton
 $(document).ready(function(){
    var rad=document.getElementsByName('mtrx_sel');
    for (var i=0;i<rad.length; i++) {
      if (rad[i].checked) {
        alert('Выбран '+i+' radiobutton');
      }
    }

});