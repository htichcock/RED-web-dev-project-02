$(function(){
  $('select').selectric();
   var touchScreen = 0;
  $('body').on('touchstart', function(){
    $('.main__caption').removeClass('main__caption--dynamic')
    touchScreen = 1;
  })
  $('#choose-section').on('change', function(){

    //change to banner
    $('.dynamic-header')
      .addClass('dynamic-header--banner')
      .removeClass('dynamic-header--cover');
    $('.dynamic-header__logo-img')
      .addClass('dynamic-header--banner__logo-img')
      .removeClass('dynamic-header--cover__logo-img');
    $('.footer').css('margin', '4.8rem 0 4.8rem');

    //empty main, inject loading gif
    $('.main').empty().append('<img class="main__loading-img" src="images/ajax-loader.gif">');
  
    //fetch content--remove loading-gif--inject stories
    $.getJSON('http://api.nytimes.com/svc/topstories/v2/' + $('#choose-section').val() +'.json?api-key=b038a37bb5974147b7e6bf0e97916430', function(){
      //same as .done() function so left empty
    }).done(function(data){

      //check to make sure last image over 400px exists
      var results = data.results.filter(function(result){
        if (result.multimedia.length){
          if (result.multimedia[result.multimedia.length - 1].height >= 400){
            return true;
          }
        }
      });
      // remove loading gif
      $('.main__loading-img').remove();

      $.each(results , function( i , val ){
        var count = (i+1);
        var article = 'main__article--' + (i+1);
        var caption = val.abstract;
        var nytUrl = val.short_url;
        var imageUrl = val.multimedia[val.multimedia.length - 1].url;
        $('.main').append('<a href="' + nytUrl + '"><article class="main__article main__article--loading ' + article + '"><p class="main__caption">' + caption + '</p></article>');

        
        $('.' + article).css('background-image' , 'url(images/ajax-loader.gif)');
        
        //to wait for bg image to load before applying style
        var img = new Image();
        img.onload = function(){
          $('.' + article).removeClass('main__article--loading').css('background-image' , 'url(' + imageUrl + ')');
          //hide caption if not touch screen
          if (!touchScreen) {
            $('.main__caption').addClass('main__caption--dynamic');
          }
        };
        img.src = imageUrl;

        //break .each loop after 12 iterations
        if (count === 12) {
        return false;
        }
      });
    }).fail(function(){
      //empty .main inject error message
      $('.main').empty().append('<p> Request failed. Please try again </p>');
    });
    //did not include always to remove loading gif as it was just as easy to apply .empty() to the chain in .done and .fail
  });
});





