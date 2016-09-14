/* global $ */

console.log('javascript working');

$(document).ready(function () {
  var URL = '';

  $('form').submit(function (ev) {
    ev.preventDefault();
    URL = $('form input').val();
    console.log(URL);

    // post to db
    $.post('/links', {url: URL}, function (response) {
      console.log(response);
      var input = $('<input>').attr({
        'type': 'text',
        'value': response.url,
        'onclick': 'this.select();'
      });
      $('#stage').append(input);
    });
  });
});
