$(document).on("focus", ".str_inp input", function () {
    $('.left-side').addClass('foc_blue');
  $(".str_inp input").blur(function () {
    $('.left-side').removeClass('foc_blue');
  })
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


// var addplace = function placeHold() {
//    $('.matrix_a tr').each(function(i,v){//loop each row
//      $(v).find('td').each(function(x,d){//loop each colon in that row
//        $(d).find('input').attr('placeholder','a'+(i+1)+','+(x+1));//change the input placeholder
//    })
//  })
//};
//var addplaceh = function placeHold() {
//    $('.matrix_b tr').each(function(i,v){//loop each row
//      $(v).find('td').each(function(x,d){//loop each colon in that row
//        $(d).find('input').attr('placeholder','b'+(i+1)+','+(x+1));//change the input placeholder
//    })
//  })
//};
//$('.add_str').click(function(){
//  if ($("#check_mtrx_a").prop("checked")){
//    $('.matrix_a tr:first').clone().appendTo('.matrix_a').add(addplace); 
//  }else if($("#check_mtrx_b").prop("checked")) {
//    $('.matrix_b tr:first').clone().appendTo('.matrix_b').add(addplaceh); 
//  }
//});
//
//if ($('.matrix_a tr td').length > 4) {
//  $('.del_str').removeAttr("disabled").click(function(){
//    if ($("#check_mtrx_a").prop("checked")){
//      $('.matrix_a tr:last').remove();  
//    }else if($("#check_mtrx_b").prop("checked")) {
//      $('.matrix_b tr:last').remove();  
//    }
//  });
//}
//
//$('.add_col').click(function(){
//  if ($("#check_mtrx_a").prop("checked")){
//    $('.matrix_a tr td:last').clone().appendTo('.matrix_a tr').add(addplace); 
//  }else if($("#check_mtrx_b").prop("checked")) {
//    $('.matrix_b tr td:last').clone().appendTo('.matrix_b tr').add(addplaceh); 
//  }
//});
//
//if ($('.matrix_a tr').length > 2) {
//  $('.del_col').removeAttr("disabled").click(function(){
//    if ($("#check_mtrx_a").prop("checked")){
//      $('.matrix_a tr td:last-child').remove();  
//    }else if($("#check_mtrx_b").prop("checked")) {
//      $('.matrix_b tr td:last-child').remove();  
//    }
//  });
//} 
//
//
//

$(function() {

  //пользоват.фу-ция
  function placeHold() {
    matrix.find('tr').each(function(i, v) { //loop each row
      $(v).find('td').each(function(x, d) { //loop each colon in that row
        $(d).find('input').attr('placeholder', matrixID.split('_')[1] + (i + 1) + ',' + (x + 1));
      })
    })
  };


  // начальные значения
  var matrixID = $('input[name=mtrx_sel]:checked').val();
  var matrix = $('.' + matrixID);

  $('input[name=mtrx_sel]').on('change', function() {
    matrixID = $(this).val();
    matrix = $('.' + matrixID);
    checkAddStr();
    checkAddCol();
    checkDelStr();
    checkDelCol();
  });


  //обработка кнопок добавить
  $('.add_str').click(function() {
    matrix.find('tr:first').clone().appendTo(matrix);
    placeHold();
    checkAddStr();
    checkDelStr(); 
  });

  $('.add_col').click(function() {
    matrix.find('tr td:last').clone().appendTo(matrix.find('tr'));
    placeHold();
    checkAddCol();
    checkDelCol(); 
  });


  //проверка активности кнопки доб.стр.
  function checkAddStr() {
    if ($("input[value=" + matrixID + "]").prop("checked")) {
      if (matrix.find('tr').length >= 10) {
        $('.add_str').prop('disabled', true);
      } else {
        $('.add_str').prop('disabled', false);
      }
    }
  }
  

  //доб.колон.
  function checkAddCol() {
    if ($("input[value=" + matrixID + "]").prop("checked")) {
      if (matrix.find('tr:first td').length >= 10) {
        $('.add_col').prop('disabled', true);
      } else {
        $('.add_col').prop('disabled', false);
      }
    }
  }
  
  
  function checkDelStr() {
    if ($("input[value=" + matrixID + "]").prop("checked")) {
      if (matrix.find('tr').length <= 2) {
        $('.del_str').prop('disabled', true);
      } else {
        $('.del_str').prop('disabled', false);
      }
    }
  }
  
 function checkDelCol() {
    if ($("input[value=" + matrixID + "]").prop("checked")) {
      if (matrix.find('tr:first td').length <= 2) {
        $('.del_col').prop('disabled', true);
      } else {
        $('.del_col').prop('disabled', false);
      }
    }
  }


  //по аналогии с проверкой пред. кнопок сделаете дальше
   $(document).on('click', '.del_str', function() {
     matrix.find('tr:last').remove(); 
    checkDelStr();
   });
  
  $(document).on('click', '.del_col', function() {
    matrix.find('tr td:last-child').remove(); 
    checkDelCol(); 
   });
    
  
  

});

 
    function readMatrixFromDom(aClassName) {
      var result = [];
      var rows = $('.' + aClassName).find('tr');
      for (var i = 0; i < rows.length; i++) {
        result.push([]);
        var cells = $(rows[i]).find('td > input');
        for (var j = 0; j < cells.length; j++) {
          result[i].push(+$(cells[j]).val());
        }
      }
      return result;
    }

  function MultiplyMatrix(A,B){

    var A = readMatrixFromDom('matrix_a');
    var B = readMatrixFromDom('matrix_b');
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
    { for (var i = 0; i < rowsA; i++)
    { var t = 0;
     for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
     C[i][k] = t;
    }
    }
    return C;
  }