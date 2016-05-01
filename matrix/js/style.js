
$('.str_inp input').focus(function () {
    $('.left-side').addClass('foc_blue');
  }).blur(function () {
    $('.left-side').removeClass('foc_blue');
  });
  
$(document).on("click",".clear-mtrx", function(){ 
  $(".str_inp input").val(""); 
});

$(document).on("click",".change-mtrx", function(){
  if ($(this).hasClass('flipped')) {
    $('.matrix_a').appendTo('.matrix_a_cover');
    $(".matrix_b").appendTo(".matrix_b_cover");
  } else {
    $('.matrix_a').appendTo('.matrix_b_cover');
    $(".matrix_b").appendTo(".matrix_a_cover");
  }
  $(this).toggleClass('flipped');
});

//cheked radiobutton
// $(".add_str").click(function(){
//    var rad=document.getElementsByName('mtrx_sel');
//    for (var i=0;i<rad.length; i++) {
//      if (rad[i].checked) {
//        alert('Выбран '+i+' radiobutton');
//      }
//    }
//
//});
$('.add_str').click(function(){
  if ($("#check_mtrx_a").prop("checked")){
    $('.matrix_a tr:first').clone().appendTo('.matrix_a'); 
  }else if($("#check_mtrx_b").prop("checked")) {
    $('.matrix_b tr:first').clone().appendTo('.matrix_b'); 
  }
});

if ($('#matrix_a tr').length > 2) {
  $('.del_str').removeAttr("disabled").click(function(){
    if ($("#check_mtrx_a").prop("checked")){
      $('.matrix_a tr:last').remove();  
    }else if($("#check_mtrx_b").prop("checked")) {
      $('.matrix_b tr:last').remove();  
    }
  });
}

$('.add_col').click(function(){
  if ($("#check_mtrx_a").prop("checked")){
    $('.matrix_a tr td').clone().appendTo('.matrix_a tr'); 
  }else if($("#check_mtrx_b").prop("checked")) {
    $('.matrix_b tr td').clone().appendTo('.matrix_b tr'); 
  }
});

if ($('#matrix_a tr').length > 2) {
  $('.del_col').removeAttr("disabled").click(function(){
    if ($("#check_mtrx_a").prop("checked")){
      $('.matrix_a tr td:last').remove();  
    }else if($("#check_mtrx_b").prop("checked")) {
      $('.matrix_b tr td:last').remove();  
    }
  });
} 

