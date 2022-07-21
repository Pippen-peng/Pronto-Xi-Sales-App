/* Sidebar */
$('#sidebarCollapse').on('click', function() {
  $('#sidebar').toggleClass('active');
});

/* Get content max height */
var navHeight = $('.navbar').height();
var subnavbarHeight = $('.subnavbar').height();
//var bottomAddRecordHeight = $('.bottom-add-record').height();
var bottomAddRecordHeight = 120;
var windowHeight = $(window).height();
var maxcontentinnerHeight = windowHeight - bottomAddRecordHeight - subnavbarHeight - navHeight;
$('.content-inner').css('max-height', maxcontentinnerHeight);
$(window).resize(function() {
  var navHeight = $('.navbar').height();
  var subnavbarHeight = $('.subnavbar').height();
  //var bottomAddRecordHeight = $('.bottom-add-record').height();
  var bottomAddRecordHeight = 120;
  var windowHeight = $(window).height();
  var maxcontentinnerHeight = windowHeight - bottomAddRecordHeight - subnavbarHeight - navHeight;
  $('.content-inner').css('max-height', maxcontentinnerHeight);
});

