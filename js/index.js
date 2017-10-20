$(function(){
  $('#choose-section').on('change', function(){

    //change to banner
    $('.dynamic-header')
      .addClass('dynamic-header--banner')
      .removeClass('dynamic-header--cover');
    $('.dynamic-header__logo-img')
      .addClass('dynamic-header--banner__logo-img')
      .removeClass('dynamic-header--cover__logo-img');
    $('.footer').css('margin', '0 0 4.8rem');

    //inject loading
    $('.main').append('<img class="main__loading-img" src="images/ajax-loader.gif">');
  


  });
  
})





