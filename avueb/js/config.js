//Initialisierung Dialoge
var aktdialog;
var table1;
var url;
var config = {
    "default": {
        "showonstart": false,
        "data": {
            "inputfelder": [
                { "name": "lenr", "visible": "true", "dbcolumn": "le", "eingabe": "" },
                { "name": "lotyplb", "visible": "true", "eingabe": "" },
                { "name": "ezolb", "visible": "true", "eingabe": "" },
                { "name": "dispostatuslb", "visible": "true", "eingabe": "" },
                { "name": "kiste", "visible": "true", "eingabe": "" },
                { "name": "mandantlb", "visible": "true", "eingabe": "" },
                { "name": "lagerortlb", "visible": "true", "eingabe": "" },
                { "name": "ezoavisiertlb", "visible": "true", "eingabe": "" },
                { "name": "qsstatuslb", "visible": "true", "eingabe": "" },
                { "name": "container", "visible": "true", "eingabe": "" },
                { "name": "hostlagerlb", "visible": "true", "eingabe": "" },
                { "name": "lagerbereichlb", "visible": "true", "eingabe": "" },
                { "name": "vonz", "visible": "true", "eingabe": "" },
                { "name": "vonx", "visible": "true", "eingabe": "" },
                { "name": "vony", "visible": "true", "eingabe": "" },
                { "name": "bisz", "visible": "true", "eingabe": "" },
                { "name": "bisx", "visible": "true", "eingabe": "" },
                { "name": "bisy", "visible": "true", "eingabe": "" },
                { "name": "transportlb", "visible": "true", "eingabe": "" },
                { "name": "herstellerlb", "visible": "true", "eingabe": "" },
                { "name": "lhmtyplb", "visible": "true", "eingabe": "" },
                { "name": "inventurlb", "visible": "true", "eingabe": "" },
                { "name": "teilenummer", "visible": "true", "eingabe": "" },
                { "name": "letzteinvvonlb", "visible": "true", "eingabe": "" },
                { "name": "letzteinvbislb", "visible": "true", "eingabe": "" },
                { "name": "intsperrelb", "visible": "true", "eingabe": "" }
            ],
            "listboxen": [{
                    "name": "lotyplb",
                    "typ": "appKonst",
                    "table": "V_AC_FLSLAGERORTTYP",
                    "dbcolumn": "FLSLAGERORTTYP"
                },
                {
                    "name": "ezolb",
                    "typ": "appKonst",
                    "table": "V_DLG_BSUEB_ZONEAKTUELL",
                    "dbcolumn": "ZONEAKTUELL"
                },
                {
                    "name": "dispostatuslb",
                    "typ": "Konst",
                    "table": "V_UX_KONSTANTEN",
                    "constkey": "LE.DispoStatus",
                    "dbcolumn": "DISPOSTATUS"
                },
                {
                    "name": "mandantlb",
                    "typ": "appKonst",
                    "table": "V_AC_MANDANT",
                    "dbcolumn": "MANDANT",
                    "dependend": "hostlagerlb"
                },
                {
                    "name": "lagerortlb",
                    "typ": "sqlstm",
                    "table": "SELECT OID as id, NAME FROM V_DLG_BSUEB_LAGERORT WHERE name is not null order by 2",
                    "dbcolumn": "nd_lagerortoid"
                },
                {
                    "name": "hostlagerlb",
                    "typ": "depends",
                    "table": "SELECT wert, anzeige_text, mandantoid FROM V_DLG_BSUEB_HOSTLAGER",
                    "constkey": "mandantoid",
                    "dbcolumn": "HOSTLAGER"
                },
                {
                    "name": "lagerbereichlb",
                    "typ": "appKonst",
                    "table": "V_AC_PVLAGERZONE",
                    "dbcolumn": "ND_LAGERBEREICHOID"
                },
                {
                    "name": "transportlb",
                    "typ": "Konst",
                    "table": "V_UX_KONSTANTEN",
                    "constkey": "GuiBoolean",
                    "dbcolumn": "TRANSPORT"
                },
                {
                    "name": "herstellerlb",
                    "typ": "appKonst",
                    "table": "V_AC_HERSTELLER",
                    "dbcolumn": "HERSTELLER"
                },
                { "name": "lhmtyplb", "typ": "appKonst", "table": "V_AC_LHMTYP", "dbcolumn": "LHMTYP" },
                {
                    "name": "inventurlb",
                    "typ": "Konst",
                    "table": "V_UX_KONSTANTEN",
                    "constkey": "GuiBoolean",
                    "dbcolumn": "INVENTUR"
                },
                {
                    "name": "ezoavisiertlb",
                    "typ": "appKonst",
                    "table": "V_AC_EINLAGERZONE",
                    "dbcolumn": "ZONEAVISIERT"
                },
                {
                    "name": "qsstatuslb",
                    "typ": "Konst",
                    "table": "V_UX_KONSTANTEN",
                    "constkey": "LE.QsStatus",
                    "dbcolumn": "QSSTATUS"
                },
                {
                    "name": "intsperrelb",
                    "typ": "Konst",
                    "table": "V_UX_KONSTANTEN",
                    "constkey": "LE.Sperre",
                    "dbcolumn": "INTERNESPERRE"
                }
            ],
            "table1": {
                "name": "table_avueb",
                "view": "v_dlg_bsueb",
                "servlet": "Auftueb?",
                "anzcolumns": "57",
                "pageLength": 5,
                "columns": [
                    { "name": "AC_MANDANT", "typdata": "AppConst", "visible": "true", summe: "", minWidth: 40 },
                    { "name": "AC_HERSTELLER", "typdata": "AppConst", "visible": "true", summe: "", minWidth: 66 },
                    { "name": "TEILENUMMER", "typdata": "String", "visible": "true", summe: "", minWidth: 67 },
                    { "name": "HERSTELLERTEILENUMMER", "typdata": "String", "visible": "true", summe: "", minWidth: 68 },
                    { "name": "TEILBEZ", "typdata": "String", "visible": "true", summe: "", minWidth: 69 },
                    { "name": "LE", "typdata": "String", "visible": "true", summe: "", minWidth: 70 },
                    { "name": "LAGERORTBEZ", "typdata": "String", "visible": "true", summe: "", minWidth: 71 },
                    { "name": "AC_ZONEAKTUELL", "typdata": "AppConst", "visible": "true", summe: "", minWidth: 72 },
                    { "name": "INVENTUR", "typdata": "String", "visible": "true", summe: "", minWidth: 73 },
                    { "name": "AC_INVENTURGRUND", "typdata": "AppConst", "visible": "true", summe: "", minWidth: 74 },
                    { "name": "BESTANDTOTAL", "typdata": "Numeric", "visible": "true", summe: "J", minWidth: 75 },
                    { "name": "BESTANDFREI", "typdata": "Numeric", "visible": "true", summe: "J", minWidth: 76 },
                    { "name": "BESTANDRESERVIERT", "typdata": "Numeric", "visible": "true", summe: "", minWidth: 77 },
                    { "name": "BESTANDGESPERRT", "typdata": "Numeric", "visible": "true", summe: "", minWidth: 78 },
                    { "name": "TRANSPORT", "typdata": "Boolean", "visible": "true", summe: "", minWidth: 79 },
                    { "name": "INTERNESPERRE", "typdata": "Numeric", "visible": "true", summe: "", minWidth: 80 },
                    { "name": "CK_DISPOSTATUS", "typdata": "ConstKey", "visible": "true", summe: "", minWidth: 81 },
                    { "name": "CK_QSSTATUS", "typdata": "ConstKey", "visible": "true", summe: "", minWidth: 82 },
                    { "name": "AC_HOSTLAGER", "typdata": "AppConst", "visible": "true", summe: "", minWidth: 83 },
                    { "name": "AVISNR", "typdata": "String", "visible": "true", summe: "", minWidth: 84 },
                    { "name": "KISTENNR", "typdata": "String", "visible": "true", summe: "", minWidth: 85 },
                    { "name": "CONTAINERNR", "typdata": "String", "visible": "true", summe: "", minWidth: 86 },
                    { "name": "KISTENDISPO", "typdata": "Boolean", "visible": "true", summe: "", minWidth: 87 },
                    { "name": "INVENTURAVISIERUNG", "typdata": "Boolean", "visible": "true", summe: "", minWidth: 88 },
                    { "name": "VERPACKUNGSMENGE", "typdata": "Numeric", "visible": "true", minWidth: 89 }, //, summe: ""24
                    { "name": "ND_LEOID", "typdata": "String", "visible": "false", summe: "", minWidth: 90 },
                    { "name": "MANDANT", "typdata": "String", "visible": "false", summe: "", minWidth: 91 },
                    { "name": "HERSTELLER", "typdata": "String", "visible": "false", summe: "", minWidth: 92 },
                    { "name": "FLSLAGERORTTYP", "typdata": "String", "visible": "false", summe: "", minWidth: 93 },
                    { "name": "AC_FLSLAGERORTTYP", "typdata": "AppConst", "visible": "false", summe: "", minWidth: 94 },
                    { "name": "ZONEAKTUELL", "typdata": "String", "visible": "false", minWidth: 95 }, //, summe: ""30
                    { "name": "AC_ZONEAKTUELL", "typdata": "AppConst", "visible": "false", summe: "", minWidth: 96 },
                    { "name": "LHMTYP", "typdata": "String", "visible": "false", summe: "", minWidth: 97 },
                    { "name": "AC_LHMTYP", "typdata": "AppConst", "visible": "false", summe: "", minWidth: 98 },
                    { "name": "ZONEAVISIERT", "typdata": "String", "visible": "false", summe: "", minWidth: 99 },
                    { "name": "AC_ZONEAVISIERT", "typdata": "AppConst", "visible": "false", summe: "", minWidth: 100 },
                    { "name": "ND_LAGERBEREICHOID", "typdata": "String", "visible": "false", summe: "", minWidth: 101 },
                    { "name": "ND_LAGERORTOID", "typdata": "String", "visible": "false", summe: "", minWidth: 102 },
                    { "name": "LAGERORTBEZ", "typdata": "String", "visible": "false", summe: "", minWidth: 103 },
                    { "name": "LB", "typdata": "String", "visible": "false", summe: "", minWidth: 104 },
                    { "name": "ZEILE", "typdata": "String", "visible": "false", minWidth: 105 }, //, summe: ""40
                    { "name": "X", "typdata": "String", "visible": "false", summe: "", minWidth: 106 },
                    { "name": "Y", "typdata": "String", "visible": "false", summe: "", minWidth: 107 },
                    { "name": "BESTANDNACHGEFRAGT", "typdata": "Numeric", "visible": "false", summe: "", minWidth: 108 },
                    { "name": "BESTANDGEPLANT", "typdata": "Numeric", "visible": "false", summe: "", minWidth: 109 },
                    { "name": "BESTANDLAUEFT", "typdata": "Numeric", "visible": "false", summe: "", minWidth: 110 },
                    { "name": "EINHEIT", "typdata": "String", "visible": "false", summe: "", minWidth: 111 },
                    { "name": "ISRETOURE", "typdata": "Boolean", "visible": "false", summe: "", minWidth: 112 },
                    { "name": "INVENTURGRUND", "typdata": "String", "visible": "false", summe: "", minWidth: 113 },
                    { "name": "CK_INTERNESPERRE", "typdata": "ConstKey", "visible": "false", summe: "", minWidth: 114 },
                    { "name": "DISPOSTATUS", "typdata": "String", "visible": "false", minWidth: 115 }, //, summe: ""50
                    { "name": "QSSTATUS", "typdata": "Numeric", "visible": "false", summe: "", minWidth: 116 },
                    { "name": "HOSTLAGER", "typdata": "String", "visible": "false", summe: "", minWidth: 117 },
                    { "name": "WEDATUM", "typdata": "Date", "visible": "false", "ColumnFormat": "dd.MM.yyyy", summe: "", minWidth: 118 },
                    { "name": "ERZEUGTDATUM", "typdata": "Date", "visible": "false", "ColumnFormat": "dd.MM.yyyy HH:MI", summe: "", minWidth: 119 },
                    { "name": "EINLAGERDATUM", "typdata": "String", "visible": "false", summe: "", minWidth: 120 },
                    { "name": "INVENTURDATUM", "typdata": "Date", "visible": "false", "ColumnFormat": "dd.MM.yyyy", summe: "", minWidth: 121 }
                ]
            }
        }
    },
    "obj": {
        height: 600,
        sortIndx: 0,
        "colModel": [{
                "title": "Teil",
                "width": 100,
                cls: 'font-weight: bold',
                dataType: "string", //# 0
                "colModel": [
                    { "title": "MD", minWidth: 60, cls: 'font-weight: bold' },
                    { "title": "HC", minWidth: 100 },
                    { "title": "Teilenr.", minWidth: 60 },
                    { "title": "H-Teilenr.", minWidth: 70 },
                    { "title": "Bezeichnung", minWidth: 90 }
                ]
            },
            {
                "title": "LE",
                "width": 100,
                dataType: "string", //# 1
                "colModel": [
                    { "title": "Nr.", minWidth: 60 },
                    { "title": "Lagerort", minWidth: 60 },
                    { "title": "EZO", minWidth: 60 }
                ]
            },
            {
                "title": "Inventur",
                dataIndx: "inv", //# 2
                "colModel": [{
                        "title": "INV",
                        dataIndx: "inv",
                        maxWidth: 30,
                        minWidth: 30,
                        align: "center",
                        resizable: false,
                        menuIcon: false,
                        type: 'checkBoxSelection',
                        editor: false,
                        dataType: 'bool',
                        editable: false,
                        cb: {
                            all: false, //checkbox selection in the header affect current page only.
                            header: false //show checkbox in header. 
                        },
                        sortType: function(rowData1, rowData2, dataIndx) {
                            var val1 = rowData1[dataIndx],
                                val2 = rowData2[dataIndx],
                                c1 = $.trim(val1).length,
                                c2 = $.trim(val2).length;
                            console.log('INV:sortType(): c1: ' + c1 + '; c2: ' + c2);
                            if (c1 > c2) {
                                return 1;
                            } else if (c1 < c2) {
                                return -1;
                            } else {
                                return 0;
                            }
                        },
                        render: function(ui) {
                            var rowData = ui.rowData;
                            if (rowData[8] !== '0') {
                                return "<input type='checkbox' checked disabled/>";
                            } else {
                                return "<input type='checkbox' disabled/>";
                            }
                        }
                    },
                    { "title": "Grund", minWidth: 66 }
                ]
            },
            {
                "title": "Bestände",
                "width": 50,
                dataType: "string", //# 3
                "colModel": [
                    { "title": "total", minWidth: 30 },
                    { "title": "verfüg.", minWidth: 30 },
                    { "title": "reser.", minWidth: 30 },
                    { "title": "gesperrt", minWidth: 30 }
                ]
            },

            //TRANSPORT,INTERNESPERRE,CK_DISPOSTATUS,CK_QSSTATUS,
            //OK;  { "name": "TRANSPORT", "typdata": "Boolean", "visible": "true", summe: "", minWidth: 79 },
            {
                "title": "TR",
                dataIndx: "tr",
                cls: 'red-col',
                "colModel": [{
                    "title": "",
                    dataIndx: "tr",
                    minWidth: 10,
                    align: "center",
                    resizable: false,
                    menuIcon: false,
                    type: 'checkBoxSelection',
                    editor: false,
                    dataType: 'bool',
                    editable: false,
                    cb: {
                        all: false, //checkbox selection in the header affect current page only.
                        header: false //show checkbox in header. 
                    },
                    sortType: function(rowData1, rowData2, dataIndx) {
                        var val1 = rowData1[dataIndx],
                            val2 = rowData2[dataIndx],
                            c1 = $.trim(val1).length,
                            c2 = $.trim(val2).length;
                        console.log('TR: sortType(): c1: ' + c1 + '; c2: ' + c2);
                        if (c1 > c2) {
                            return 1;
                        } else if (c1 < c2) {
                            return -1;
                        } else {
                            return 0;
                        }
                    },
                    render: function(ui) {
                        var rowData = ui.rowData;
                        if (rowData[14] !== '0') {
                            return "<input type='checkbox' checked disabled/>";
                        } else {
                            return "<input type='checkbox' disabled>";
                        }
                    }
                }]
            },

            //{ "name": "INTERNESPERRE", "typdata": "Numeric", "visible": "true", summe: "", minWidth: 80 },
            {
                "title": "SP",
                dataType: "string",
                "cls": 'red', //# 5
                "colModel": [
                    { "title": "", "minWidth": 30, "cls": 'beige' }
                ]
            },

            //OK;  { "name": "CK_DISPOSTATUS", "typdata": "ConstKey", "visible": "true", summe: "", minWidth: 81 },
            {
                "title": "DS",
                dataType: "string", //# 6
                "colModel": [
                    { "title": "", "minWidth": 60 }
                ]
            },

            //{ "name": "CK_QSSTATUS", "typdata": "ConstKey", "visible": "true", summe: "", minWidth: 82 },            
            {
                "title": "QS-Status",
                dataType: "string", //# 7
                "colModel": [
                    { "title": "", "minWidth": 75 }
                ]
            },
            {
                "title": "Hostlager",
                dataType: "string", //# 8
                "colModel": [
                    { "title": "", "minWidth": 100 }
                ]
            },
            {
                "title": "Avis",
                "width": 150,
                dataType: "string", //# 9
                "colModel": [
                    { "title": "Nr.", minWidth: 66 },
                    { "title": "Kiste", minWidth: 66 },
                    { "title": "Container", "minWidth": 65 }
                ]
            },
            {
                "title": "Kistendispo",
                dataIndx: "kd", //# 10
                "colModel": [{
                    "title": "",
                    dataIndx: "kd",
                    minWidth: 80,
                    align: "center",
                    resizable: false,
                    menuIcon: false,
                    type: 'checkBoxSelection',
                    editor: false,
                    dataType: 'bool',
                    editable: false,
                    cb: {
                        all: false, //checkbox selection in the header affect current page only.
                        header: false //show checkbox in header. 
                    },
                    sortType: function(rowData1, rowData2, dataIndx) {
                        var val1 = rowData1[dataIndx],
                            val2 = rowData2[dataIndx],
                            c1 = $.trim(val1).length,
                            c2 = $.trim(val2).length;
                        console.log('Kistendispo: sortType(): c1: ' + c1 + '; c2: ' + c2);
                        if (c1 > c2) {
                            return 1;
                        } else if (c1 < c2) {
                            return -1;
                        } else {
                            return 0;
                        }
                    },
                    render: function(ui) {
                        var rowData = ui.rowData;
                        if (rowData[22] !== '0') {
                            return "<input type='checkbox' checked disabled/>";
                        } else {
                            return "<input type='checkbox' disabled>";
                        }
                    }
                }]
            },
            {
                "title": "Inventur",
                dataIndx: "ina", //# 11
                "colModel": [{
                    "title": "INA",
                    dataIndx: "ina",
                    minWidth: 60,
                    align: "center",
                    resizable: false,
                    menuIcon: false,
                    type: 'checkBoxSelection',
                    editor: false,
                    dataType: 'bool',
                    editable: false,
                    cb: {
                        all: false, //checkbox selection in the header affect current page only.
                        header: false //show checkbox in header. 
                    },
                    sortType: function(rowData1, rowData2, dataIndx) {
                        var val1 = rowData1[dataIndx],
                            val2 = rowData2[dataIndx],
                            c1 = $.trim(val1).length,
                            c2 = $.trim(val2).length;
                        console.log('INA: sortType(): c1: ' + c1 + '; c2: ' + c2);
                        if (c1 > c2) {
                            return 1;
                        } else if (c1 < c2) {
                            return -1;
                        } else {
                            return 0;
                        }
                    },
                    render: function(ui) {
                        var rowData = ui.rowData;
                        if (rowData[23] !== '0') {
                            return "<input type='checkbox' checked disabled/>";
                        } else {
                            return "<input type='checkbox' disabled>";
                        }
                    }
                }]
            },
            {
                "title": "Verp.menge",
                dataType: "string",
                "colModel": [
                        { "title": "", "minWidth": 80 }
                    ] //# 12
            }
        ],
        "scrollModel": { pace: "fast", horizontal: true, autoFit: false, theme: false },
        "dataModel": { "location": "local", "url": url, "sorting": "local" },
        "filterModel": { "on": false, "header": true },
        "selectionModel": { "type": "row", "fireSelectChange": true }
    },
    "variante1": {
        "showonstart": true,
        "data": {
            "inputfelder": [
                { "name": "lenr", "visible": "true" },
                { "name": "lotyplb", "visible": "false" },
                { "name": "ezolb", "visible": "false" },
                { "name": "dispostatuslb", "visible": "false" },
                { "name": "kiste", "visible": "false" },
                { "name": "mandantlb", "visible": "false" },
                { "name": "lagerortlb", "visible": "false" },
                { "name": "ezoavisiertlb", "visible": "false" },
                { "name": "qsstatuslb", "visible": "false" },
                { "name": "container", "visible": "false" },
                { "name": "hostlagerlb", "visible": "false" },
                { "name": "lagerbereichlb", "visible": "false" },
                { "name": "vonz", "visible": "false" },
                { "name": "vonx", "visible": "false" },
                { "name": "vony", "visible": "false" },
                { "name": "bisz", "visible": "false" },
                { "name": "bisx", "visible": "false" },
                { "name": "bisy", "visible": "false" },
                { "name": "transportlb", "visible": "false" },
                { "name": "herstellerlb", "visible": "false" },
                { "name": "lhmtyplb", "visible": "false" },
                { "name": "inventurlb", "visible": "false" },
                { "name": "teilenummer", "visible": "false" },
                { "name": "letzteinvvonlb", "visible": "false" },
                { "name": "letzteinvbislb", "visible": "false" },
                { "name": "intsperrelb", "visible": "false" }
            ]
        }
    }
};