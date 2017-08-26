/*N.B. The gallery basically uses the src of each image as a unique id, so pls don't repeat a file*/

var winWidth = $(window).width();
var winHeight = $(window).height();
var curImg;

$(document).ready(function() {
  var gallery = $('.gallery');
  var img = $('.gallery-img');
  var lightbox = $('.lightbox');
  var container = $('.gallery-container');
  var cross = $('.cross');
  var leftArrow = $('.left');
  var rightArrow = $('.right');

  img.click(function() {
    blowUp(this);
    curImg = $(this);
  });

  cross.click(function() {
    container.hide();
  });

  rightArrow.click(function() {
    if ($(curImg).attr('src') !== $(gallery).find(">:last-child").find(">:first-child").attr('src')) {
      curImg = $(curImg).parent().next().find(">:first-child");
    }
    blowUp(curImg);
  });

  leftArrow.click(function() {
    if ($(curImg).attr('src') !== $(gallery).find(">:nth-child(2)").find(">:first-child").attr('src')) {
      curImg = $(curImg).parent().prev().find(">:first-child");
    }
    blowUp(curImg);
  });

  var blowUp = function(element) {
    if ($(element).attr('src') === $(gallery).find(">:nth-child(2)").find(">:first-child").attr('src')) {
      leftArrow.css('color', '#999999');
    } else {
      leftArrow.css('color', '#ffffff');
    }

    if ($(element).attr('src') === $(gallery).find(">:last-child").find(">:first-child").attr('src')) {
      rightArrow.css('color', '#848484');
    } else {
      rightArrow.css('color', '#ffffff');
    }

    $(lightbox).attr('src', String($(element).attr("src")));
    container.css('display', 'table');
  }
});
