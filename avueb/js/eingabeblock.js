inputfelder = function () {
  $('#testen').append(
    '<label id="lenrlbl" class="custlabel">LE-Nr ' +
    '<input id="' + config.default.data.inputfelder[0].name + '" type="text"'
    + ' style="max-width: 95 px;"> </label>')
  $('#testen').append(
    '<label id="lotyplblbl" class="custlabel">LO-Typ ' +
    '<select id="' + config.default.data.inputfelder[1].name + '" type="text"'
    + ' style="width: 100px;"></select></label >')

/*
        <label id="ezolblbl" class="custlabel">EZO
              <select id="ezolb" style="width: 100px;"> </select>
            </label>
            */
}
inputfelder()
