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
    $('.matrix_a_cover').appendTo('.matrix_a_wrapper');
    $(".matrix_b_cover").appendTo(".matrix_b_wrapper");
  } else {
    $('.matrix_a_cover').appendTo('.matrix_b_wrapper');
    $(".matrix_b_cover").appendTo(".matrix_a_wrapper");
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
    add_height();
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

  
////////////////////////////обработчики кнопок удалить
   $(document).on('click', '.del_str', function() {
     matrix.find('tr:last').remove(); 
     checkAddStr();
     checkDelStr();
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
      $('body').height(hb+ 170);
    }
  }
  
});



/////////////placeholder from C matrix
function placeHold_mtrx_c() {
  $('.matrix_c tr').each(function(i,v){//loop each row
    $(v).find('td').each(function(x,d){//loop each colon in that row
      $(d).find('input').attr('placeholder',('.matrix_c').split('_')[1] + (i + 1) + ',' + (x + 1))//change the input placeholder
    })
  })
}




 ////////////check sting and col in duo matrix
function check_matrix() {
  var needsRows = $('.matrix_a').find('tr').length;
  var needsCols = $('.matrix_b').find('tr:first td').length;

  if (matA.find('tr:first td').length != matB.find('tr').length) {   return;  }
  
  check_rows(needsRows);
  check_cols(needsCols);
}

function check_rows(needsRows) {
  while ($('.matrix_c').find('tr').length > needsRows) {
    $('.matrix_c').find('tr:last').remove();
  }
  while ($('.matrix_c').find('tr').length < needsRows) {
    $('.matrix_c').append('<tr></tr>');
  }
}

function check_cols(needsCols) {
  var rows = $('.matrix_c').find('tr');
  for (var iRow = 0; iRow < rows.length; iRow++) {
    while ($(rows[iRow]).find('td').length > needsCols) {
      $(rows[iRow]).find('td:last').remove();
    }
    while ($(rows[iRow]).find('td').length < needsCols) {
      $(rows[iRow]).append('<td class ="str_inp"  ><input disabled /></td>');
    }
  }
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




/////////////// обработчик кнопки умножения
$(document).on('click', '.umn' , function () {
  error();
  check_matrix();
  placeHold_mtrx_c();
  var A = readMatrixFromDom('matrix_a');
  var B = readMatrixFromDom('matrix_b');
  var C = MultiplyMatrix(A, B);
  writeMatrixToDom(C, 'matrix_c');
});
