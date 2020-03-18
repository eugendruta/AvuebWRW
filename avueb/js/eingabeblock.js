inputfelder = function () {
  for (i = 0; i < config.default.data.inputfelder.length; i++) {
    if (config.default.data.inputfelder[i].name.endsWith('lb')) {
      $('#eingabediv1').append(
        '<label id="' + config.default.data.inputfelder[i].lblid + '"'
        + ' class="' + config.default.data.inputfelder[i].class + '">'
        + config.default.data.inputfelder[i].lbltext
        + '<select id="' + config.default.data.inputfelder[i].name + '"'
        + ' type="' + config.default.data.inputfelder[i].type + '"'
        + ' style="' + config.default.data.inputfelder[i].style + '"'
        + '> </label>')
    } else {
      $('#eingabediv1').append(
        '<label id="' + config.default.data.inputfelder[i].lblid + '"'
        + ' class="' + config.default.data.inputfelder[i].class + '">'
        + config.default.data.inputfelder[i].lbltext
        + '<input id="' + config.default.data.inputfelder[i].name + '"'
        + ' type="' + config.default.data.inputfelder[i].type + '"'
        + ' style="' + config.default.data.inputfelder[i].style + '"'
        + '> </label>')
    }
  }

  // Buttons
  $('#eingabediv1').append(
    '<br>'
  )

  /*
  <input id="anzeigen1" value="Anzeigen" type="submit" class="butn" style="max-width: 90px; float: left;" onclick="showtable( 'table1')">
  <input id="reset1" value="Reset" type="submit" class="butn" style="width: 90px;">
  */

  for (i = 0; i < config.default.data.buttons.length; i++) {
    console.log('insert: ' + '<input id="'
      + config.default.data.buttons[i].btnid + '"'
      + ' value="' + config.default.data.buttons[i].value + '"'
      + ' type="' + config.default.data.buttons[i].type + '"'
      + ' class="' + config.default.data.buttons[i].class + '"'
      + ' style="' + config.default.data.buttons[i].style + '"'
      + ' onclick="' + config.default.data.buttons[i].onclick + '"'
      + '>')
    $('#eingabediv1').append(
      '<input id="' + config.default.data.buttons[i].btnid + '"'
      + ' value="' + config.default.data.buttons[i].value + '"'
      + ' type="' + config.default.data.buttons[i].type + '"'
      + ' class="' + config.default.data.buttons[i].class + '"'
      + ' style="' + config.default.data.buttons[i].style + '"'
      + ' onclick="' + config.default.data.buttons[i].onclick + '"'      
      + '>')
  }
}
