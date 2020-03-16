inputfelder = function () {
  /*
{
 'name': 'lenr', 'visible': 'true', 'dbcolumn': 'le', 'eingabe': '',
 'lblid': 'lenrlbl', 'class': 'custlabel', 'lbltext': 'LE-Nr', 'type': 'text',
 'style': 'max-width: 95 px;'
}  
  */
  $('#testen').append(
    '<label id="' + config.default.data.inputfelder[0].lblid + '"'
    + ' class="' + config.default.data.inputfelder[0].class + '">'
    + config.default.data.inputfelder[0].lbltext
    + '<input id="' + config.default.data.inputfelder[0].name + '"'
    + ' type="' + config.default.data.inputfelder[0].type + '"'
    + ' style="' + config.default.data.inputfelder[0].style + '"'
    + '> </label>');
  $('#testen').append(
    '<label id="lotyplblbl" class="custlabel">LO-Typ '
    + '<select id="' + config.default.data.inputfelder[1].name
    + '" type="text"' + ' style="width: 100px;"></select></label >');
  $('#testen').append(
    '<label id="ezolblbl" class="custlabel">EZO '
    + '<select id="' + config.default.data.inputfelder[2].name
    + '" type="text"' + ' style="width: 100px;"></select></label >');
}
inputfelder()
