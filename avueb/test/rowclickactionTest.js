const UTIL = require('./../../../jslibwrw/util');
var dialogname = 'AVUEB'

// Click auf Tabellenrow (aufgerufen: .on('click', 'tr')
rowclickaction = function rowClickAction(action, doubleclick, rowdata) {
  UTIL.logger(dialogname + ': rowClickAction(): action: ' + action + '/' +
    (doubleclick === true ? 'doubleclick' : 'singleclick') + '; LE-Nr.: ' + rowdata[5])
  // Doppelclick: Detaildialog starten
  if (action === 'select' && doubleclick) {
    alert('Doubleclick: Folgedialog aufrufen')
  }
  else if (action === 'select' && !doubleclick) {
    // Toolbarbuttons enablen
    $('#detail').attr('disabled', false)
    $('#detail').css('background-color', 'white')
    // Detaildaten aus Tabelle übernehmen
    $('#lenrdet').val(rowdata[5])
    $('#lhmtypdet').val(rowdata[33])
    $('#mandantdet').val(rowdata[0])
    $('#herstellerdet').val(rowdata[1])
    $('#teilenrdet').val(rowdata[2])
    $('#hteilenrdet').val(rowdata[3])
    $('#bezeichnungdet').val(rowdata[4])
    $('#lotypdet').val(rowdata[29])
    $('#lagerortdet').val(rowdata[38])
    $('#zoneaktuelldet').val(rowdata[31])
    $('#zoneavisiertdet').val(rowdata[35])
    // Bestände
    $('#total').val(rowdata[10])
    $('#verfuegbar').val(rowdata[11])
    $('#reserviert').val(rowdata[12])
    $('#gesperrt').val(rowdata[13])
    $('#nachgefragt').val(rowdata[43])
    $('#geplant').val(rowdata[44])
    $('#laeuft').val(rowdata[45])
    $('#einheit').val(rowdata[46])
    // Status
    // typ=Konst&table=V_UX_KONSTANTEN&constkey=LE.QsStatus
    $('#dispostatusdet').val(rowdata[16])
    $('#qsstatusdet').val(rowdata[17])
    $('#intsperredet').val(rowdata[15])
    // UTIL.logger(dialogname + ": transportdet: rowdata[14]: " + rowdata[14])
    // UTIL.logger(dialogname + ": inventurdet: rowdata[8]: " + rowdata[8])
    // UTIL.logger(dialogname + ": retouredet: rowdata[46]: " + rowdata[46])
    $('#transportdet').prop('checked', rowdata[14] === 1 ? true : false)
    $('#inventurdet').prop('checked', rowdata[8] === 1 ? true : false)
    $('#retouredet').prop('checked', rowdata[46] === 1 ? true : false)
    // Datum
    $('#fifodatumdet').val(UTIL.datum2String(rowdata[53])); // "ColumnFormat": "dd.MM.yyyy"
    $('#bildungdatumdet').val(rowdata[54]); // "ColumnFormat": "dd.MM.yyyy HH:MI"
    $('#inventurdatumdet').val(UTIL.datum2String(rowdata[56])); // "ColumnFormat": "dd.MM.yyyy"
  }
}

rowclickaction();