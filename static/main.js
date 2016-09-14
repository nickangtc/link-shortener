/* global $ */

console.log('javascript working');

$(document).ready(function () {
  var URL = '';

  $('form').submit(function (ev) {
    ev.preventDefault();
    URL = $('form input').val();
    console.log(URL);

    // post to db
    $.post('/links', {url: URL}, function (data) {
      var shortUrl = 'localhost:3000' + data; // hashified in server
      console.log('main.js shortUrl:', shortUrl);

      // create elements, modify contents
      var input = $('<input>').val(shortUrl);
      input.attr({
        'type': 'text',
        'onclick': 'this.select();'
      });
      input.attr('onclick', 'this.select();');

      // append elements and url to page
      $('#stage').append(input);
    });
  });
});
