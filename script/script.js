$(function () {

  //ハンバーガーメニューボタン
  $('.burgerButton').on('click', function () {
    $('.burgerButton').toggleClass('close');
    $('.navWrapper').toggleClass('slide-in');
  });

  $('.navWrapper a').on('click', function () {
    $('.navWrapper').removeClass('slide-in');
    $('.burgerButton').toggleClass('close');
  });

});
