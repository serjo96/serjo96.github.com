///////////////////////////focus funtion
$(document).on("focus", ".str_inp input", function () {
    $('.left-side').addClass('foc_blue');
  $('.left-side').removeClass('error')
  $(".str_inp input").blur(function () {
    $('.left-side').removeClass('foc_blue');
  })
});

////////////////////////////clear matrix
  
$(document).on("click",".clear-mtrx", function (){ 
  $(".str_inp input").val(""); 
});

////////////////////////////change matrix

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





////////////////////////////add functions

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
//    add_height();
  });

  $('.add_col').click(function() {
    matrix.find('tr td:last').clone().appendTo(matrix.find('tr'));
    placeHold();
    checkAddCol();
    checkDelCol(); 
  });

//function checkDelcolC(){
//  if ($('.matrix_a').find('tr td:last-child').remove()){
//    $('.matrix_c').find('tr td:last').remove();
//  }
//}
//function checkAddcolC(){
//  if ($('.matrix_a').find('tr td:last').clone()){
//    $('.matrix_c').find('tr td:last').clone().appendTo('.matrix_c');
//  }
//}
  
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
  
  
  
////////////dell string and col  
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

  
   $(document).on('click', '.del_str', function() {
     matrix.find('tr:last').remove(); 
     checkAddStr();
     checkDelStr();
//     remove_height();
   });
  

  $(document).on('click', '.del_col', function() {
    matrix.find('tr td:last-child').remove();
    checkAddCol();
    checkDelCol();
   });
    

  ////////////////////////////fixes height left-block
  function add_height(){
  var hb = $('.main_cover').height();  
  var lh = $('body').height();
    if(hb >= lh){
      $('body').height(hb+ 150);
    }
  }

//  function remove_height(){
//    var hb = $('.main_cover').height(); 
//    var lh = $('body').height();
//    if (hb < lh){
//      $('body').height(100+ '%');
//    }
//  } 
 
  
});

 ////////////check sting and col in duo matrix
function check_matrix () {
  var needRows = $('.matrix_a').find('tr').length;
  var needCols = $('.matrix_b').find('tr:first td').length;

  var hasRows = $('.matrix_c').find('tr').length;
  var hasCols = $('.matrix_c').find('tr:first td').length;
//  var c_cols = $('.matrix_c').find('tr td:last').clone().appendTo('.matrix_c tr');

  var message = "Info:\n";

  if (needRows > hasRows)
    message += "\n- add " + (needRows - hasRows) + " row[s]";
  else if (needRows < hasRows)
    message += "\n- remove " + (hasRows - needRows) + " row[s]";
  else
    message += "\n- rows match";

  message += "\n";

  if (needCols > hasCols)
    message += "\n- add " + (needCols - hasCols) + " column[s]" ;
  else if (needCols < hasCols)
    message += "\n- remove " + (hasCols - needCols) + " column[s]";
  else
    message += "\n- columns match";
//  
//  function(){
//      if(needRows > hasCols){
//        $('.matrix_c').find('tr td:last').clone
//      }
//  }
  
  console.log(message);

}





/////////////error check
var matA = $('.matrix_a');

var matB = $('.matrix_b');

function error(){
  if(matA.find('tr:first td').length != matB.find('tr').length){
    $('.left-side').addClass('error');
  }
  else{
    $('.left-side').removeClass('error');
  }
}


/////////////take val in input
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

//////////push in C matrix value
function writeMatrixToDom(aMatrix, aClassName) {
  var rows = $('.' + aClassName).find('tr');
  var rowCount = Math.min(rows.length, aMatrix.length);
  for (var i = 0; i < rowCount; i++) {
    var cells = $(rows[i]).find('td > input');
    var cellCount = Math.min(cells.length, aMatrix[i].length);
    for (var j = 0; j < cellCount; j++) {
      $(cells[j]).val(aMatrix[i][j]);
    }
  }
}

////////////multiply
function MultiplyMatrix(A, B) {
  var rowsA = A.length, colsA = A[0].length,
      rowsB = B.length, colsB = B[0].length,
      C = [];
  if (colsA != rowsB) 
    return C;
  for (var i = 0; i < rowsA; i++) 
    C[i] = [];
  for (var k = 0; k < colsB; k++) {
    for (var i = 0; i < rowsA; i++) {
      var t = 0;
      for (var j = 0; j < rowsB; j++) 
        t += A[i][j] * B[j][k];
      C[i][k] = t;
    }
  }
  console.log(C);
  return C;
}

$(document).on('click', '.umn' , function () {
  check_matrix();
  var A = readMatrixFromDom('matrix_a');
  var B = readMatrixFromDom('matrix_b');
  error();
  var C = MultiplyMatrix(A, B);
  // проверка размерности таблицы в matrix_c на соответствие размерности C - добавить
  writeMatrixToDom(C, 'matrix_c');
});
