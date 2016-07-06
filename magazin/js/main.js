$(document).ready(function() {

  $("#form").submit(function() {
    alert('Спасибо за заказ');
    $(".basket-personal__field input, textarea").val('');
  });

});

$(document).on('click', '#js-more_items', function(){
  $("#js-load-catalogue").load("bloks.html");
});