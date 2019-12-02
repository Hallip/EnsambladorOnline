window.onload = function (){
  sleep(100000)
  $('#loader').fadeOut();
  $('body').removeClass('hidden');
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
