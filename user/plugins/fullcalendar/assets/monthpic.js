/*  new approach for update month picture upon next - prev - home click
  evaluate Text in Month div fc-left: this is the Month name in current locale
  build pic name from that.
  pic files must be named like months in current locale !
*/

function slugify (str) {
  if (str===undefined || str=='' || str==null)  return '';
  var map = {
      '-' : ' ',
      '-' : '_',
      'a' : 'á|à|ã|â|À|Á|Ã|Â',
      'e' : 'é|è|ê|É|È|Ê',
      'i' : 'í|ì|î|Í|Ì|Î',
      'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      'c' : 'ç|Ç',
      'n' : 'ñ|Ñ'
  };
  
  for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
  };

  return str;
};

$(document).ready(function() {
  setTimeout(function() { // ohne Timeout wird activemonth nicht belegt !
    var debug = true;

    //  var activemonth = $('div.fc-left h2').text(); // fc 3.x
    var activemonth = $('div.fc-center h2').text(); // fc 4.3
    if (debug) {
      console.log('activemonth:', activemonth);
    }

    var ext = '.png';
    var monthname = slugify(activemonth.split(" ")[1]);
    var year = activemonth.split(" ")[0].substr(0,4);

    if(debug) console.log("year",year);

    if (monthname.length > 0)  {
      var path = document.location.pathname;
      var monthpic = path + '/' + monthname + ext;

      if (debug) console.log('monthpic:', monthpic);

      $.ajax({
          type: "HEAD",
          async: true,
          url: window.location + '/' + monthname + ext
      }).done(function() {
          if (debug) console.log("monthpic found");

          if (document.getElementById('actMonth') != null) document.getElementById('actMonth').innerHTML = "<img src=" + monthpic + ">";

          $('div.fc-center h2').after("<div><img id='actMonthImg' src=" + monthpic + "></div>");
          $('div.fc-center h2').after("<div class='year'><img src=" + path + '/' + year[0] + ".png><img src=" + path + '/' + year[1] + ".png><img src=" + path + '/' + year[2] + ".png><img src=" + path + '/' + year[3] + ".png></div>");
      }).fail(function() {
          if (debug) console.log(window.location + '/' + monthname + ext + ' not found');
      })
      $(".fc-button").click(function() { // fc-button ist für vor UND zurück !
        //  activemonth = $('div.fc-left h2').text(); // fc 3.x
        activemonth = $('div.fc-center h2').text(); // fc 4.3
        year = activemonth.split(" ")[0].substr(0,4);

        if (debug) console.log('button clicked, month:', activemonth);

        monthname = slugify(activemonth.split(" ")[1]);

        $.ajax({
            type: "HEAD",
            async: true,
            url: window.location + '/' + monthname + ext
        }).done(function() {
            if (debug) console.log("new monthpic found",monthpic);

            monthpic = path + '/' + monthname + ext;

            if (document.getElementById('actMonth') != null) document.getElementById('actMonth').innerHTML = "<img src=" + monthpic + ">";

            $('.year').remove();
            $('div.fc-center h2').after("<div class='year'><img src=" + path + '/' + year[0] + ".png><img src=" + path + '/' + year[1] + ".png><img src=" + path + '/' + year[2] + ".png><img src=" + path + '/' + year[3] + ".png></div>");
            $('#actMonthImg').attr("src", monthpic);
        }).fail(function() {
            if (debug) console.log(window.location + '/' + monthname + ext + ' not found');
        })
      });
    }
  }, 10);
})
