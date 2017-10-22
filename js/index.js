$(function(){
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
    $.getJSON('http://api.nytimes.com/svc/topstories/v2/' + $('#choose-section').val() +'.json?api-key=b038a37bb5974147b7e6bf0e97916430', function(data){
      console.log(data);
      //check to make sure image over 400px exists
      var results = data.results.filter(function(result){
        for (var i =0; i < result.multimedia.length; i++) {
          if (result.multimedia[i].height >= 400) {
            return true;
          }
        }
      });
      $('.main__loading-img').remove();
      $.each(results , function( i , val ){
        var count = (i+1);
        var article = 'main__article--' + (i+1);
        var caption = val.abstract;
        var url = val.multimedia[val.multimedia.length - 1].url;
        $('.main').append('<article class="main__article ' + article + '"><img class= "main__article-loading" alt="loading" src="images/ajax-loader.gif"></article>');
        console.log(url);
        var img = new Image();
        img.onload = function(){
          $('.' + article).empty().append('<h2 class="main__caption">' + caption + '</h2>').css('background-image' , 'url(' + url + ')');
        };
        img.src = url;
        if (count === 12) {
        return false;
        }
      });
    });

  });
  
});





