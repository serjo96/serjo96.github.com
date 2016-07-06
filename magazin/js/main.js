$(document).ready(function() {

  $("#form").submit(function() {
    alert('Спасибо за заказ');
    $(".basket-personal__field input, textarea").val('');
  });

});