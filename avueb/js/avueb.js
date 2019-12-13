$(document).ready(function() {
    dialogname = "avueb";
    UTIL.logger(dialogname + ": ready(): Start");

    $('.myitem').click(function() {
        UTIL.logger(dialogname + "; Click: text: " +
            $(this).last().text());
    });

    $(window).resize(function() {
        if ($(window).width() > 768) {
            $("ul").removeAttr('style');
        }
    });

    /*
    //SmartMenus jQuery init
    init = function () {
      UTIL.logger(dialogname + ": init()");
      $('#main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8
      });
    };
    init();
    */

    var table; // AJAX Tabelle
    var key;
    var ctrl;
    UTIL.logger(
        dialogname + ": ready(): localStorage.length: " + localStorage.length
    );
    var browser = localStorage.getItem("browser");

    //Navigator aktiv ??
    var starttime = localStorage.getItem("starttime");
    if (starttime === null) {
        alert("Dialogsystem nicht aktiv !!  Bitte anmelden ");
        var url = "http://" + globalconfig.feserver + "/MainWRW/webrw/webrw.html";
        var newWin = window.open(url, "_self");
    }

    //Navigator
    navinit();

    //Navigator click event
    $("#navigator").bind("tree.click", function(event) {
        naviclick(event);
    });

    $("#navigator").hide();
    $("#navmini").val(">");

    customize = function customize(param) {
        UTIL.logger(dialogname + ": customize(): param: " + param);

        if (param === "param") {
            $("#custom").dialog('open');
        } else if (param === "custfelder") {
            //Eingabefelder
            let jsonstring = localStorage.getItem(dialogname + ".eingabe");
            let eingabefelder = JSON.parse(jsonstring);
            let _display = "";
            if (eingabefelder) {
                for (var i = 0; i < eingabefelder.length; i++) {
                    let name = eingabefelder[i].name;
                    let visible = eingabefelder[i].visible;
                    let eingabe = eingabefelder[i].eingabe;
                    if (visible === "false") {
                        //Selkrit remove
                        _display = "none";
                    } else {
                        //Selkrit insert
                        _display = "";
                    }
                    $("#" + name + "lbl").css("display", _display);
                    $("#" + name).css("display", _display);
                    //Setze Eingaben
                    if (eingabe) {
                        $("#" + name).val(eingabe);
                    }
                }
            }

            //Ausgabefelder
            jsonstring = localStorage.getItem(dialogname + ".ausgabe");
            UTIL.logger(dialogname + ": customize(): ausgabestring: " + jsonstring);
            let ausgabefelder = JSON.parse(jsonstring);
            _display = "";
            if (ausgabefelder) {
                for (var j = 0; j < ausgabefelder.length; j++) {
                    let name = ausgabefelder[j].name;
                    let visible = ausgabefelder[j].visible;
                    let minWidth = ausgabefelder[j].minWidth;
                    if (visible === "false") {
                        //Selkrit remove
                        _display = "none";
                    } else {
                        //Selkrit insert
                        _display = "";
                    }

                    if (config.default.data["table1"].columns[j].name === name) {
                        name = name.toLowerCase();
                        config.default.data["table1"].columns[j].visible = visible;
                        if (visible === "true") {
                            //AC_HERSTELLER
                            if (name.includes("_")) {
                                name = name.substr(3);
                            }

                            UTIL.logger(
                                dialogname +
                                ": customize(): j: " +
                                j +
                                "; ausgabe: feld.name: " +
                                name +
                                ": visible: " +
                                visible +
                                "; minWidth: " +
                                minWidth
                            );

                            //config.default.data["table1"].columns[j].minWidth
                            $("#" + name + "width").val(minWidth);

                            config.default.data["table1"].columns[j].minWidth = minWidth;
                            /*
                            if (name.toLowerCase() === "mandant") {
                              $("#" + "mandantwidth").val(
                                config.default.data["table1"].columns[i].minWidth
                              );
                            } else if (name.toLowerCase() === "hersteller") {
                              $("#" + "herstellerwidth").val(
                                config.default.data["table1"].columns[i].minWidth
                              );
                            } else if (name.toLowerCase() === "teilenummer") {
                              $("#" + "teilenummerwidth").val(
                                config.default.data["table1"].columns[i].minWidth
                              );
                            } else if (name.toLowerCase() === "herstellerteilenummer") {
                              //HERSTELLERTEILENUMMER
                              $("#" + "herstellerteilenummerwidth").val(
                                config.default.data["table1"].columns[i].minWidth
                              );
                            }
                            */
                        }
                    }
                }
            }
        }
    };
    customize("custfelder");

    //Key event: F-tasten abfangen
    $(document).bind("keydown", function(e) {
        key = e.which;
        ctrl = e.ctrlKey;
        //console.log('keydown: key: ' + key + "; ctrl: " + ctrl);
        //e.preventDefault();

        if (key === 17) {
            //Ctrl;
            console.log("ctrl blocked");
            return false;
        }

        if (key === 17 && ctrl) {
            //Ctrl;  ctrl+F4
            console.log("ctrl blocked");
            return false;
        }

        if (key === 38 && table) {
            //Key up
            var selindex = table.rows(".selected").indexes()[0];
            //UTIL.logger(dialogname + ': selindex: ' + selindex);
            var pagelength = config.default.data["table1"].pageLength;
            var newindex = (selindex % pagelength) - 1;
            //UTIL.logger(dialogname + ': newindex: ' + newindex + '; pagelength: ' + pagelength);
            if (newindex < 0) {
                newindex = pagelength - 1;
            }
            table.row(":eq(" + newindex + ")", { page: "current" }).select();
            return false;
        }

        if (key === 40) {
            //Key down
            var selindex = table.rows(".selected").indexes()[0];
            //UTIL.logger(dialogname + ': selindex: ' + selindex);
            var pagelength = config.default.data["table1"].pageLength;
            var newindex = (selindex % pagelength) + 1;
            //UTIL.logger(dialogname + ': newindex: ' + newindex + '; pagelength: ' + pagelength);
            if (newindex > pagelength - 1) {
                newindex = 0;
            }

            table.row(":eq(" + newindex + ")", { page: "current" }).select();
            return false;
        }

        if (key === 115 && ctrl) {
            //ctrl+F4
            console.log("ctrl+F4 blocked");
            return false;
        }

        if (key === 115) {
            //F4
            console.log("F4 blocked");
            return false;
        }

        if (key === 116 && !ctrl) {
            //F5
            console.log("F5 blocked");
            return false;
        }

        if (key === 116 && ctrl) {
            //ctrl+F5
            console.log("F5/Ctrl+F5 blocked");
            return false;
        }

        if (key === 82 && ctrl) {
            //ctrl+r
            console.log("ctrl+r blocked");
            return false;
        }

        if (key === 9 && e.ctrl) {
            //ctrl+TAB
            console.log("ctrl+TAB blocked");
            return false;
        }

        //    if (key === 123) { //F12
        //      console.log('F5/Ctrl+F5 116 blocked');
        //      return false;
        //    }
    });

    //Window click event
    $(window).on("click", function(e) {
        //e.preventDefault();
        if (e.target.id === "navmini") {
            //Navigator minify
            let val = e.target.value;
            UTIL.logger(dialogname + ": window.click(): Button value: " + val);
            if (val === "<") {
                $("#navigator").hide();
                $("#navmini").val(">");
            } else if (val === ">") {
                $("#navigator").show();
                $("#navmini").val("<");
            } else {
                alert("Navigatoreintrag falsch");
            }
        }

        var status = localStorage.getItem(dialogname);
        if (status === null) {
            //Dialog noch nicht in localstorage eingetragen: eintragen.
            localStorage.setItem(dialogname, "focus");
            UTIL.logger(
                dialogname +
                ": onclick() Dialog: " +
                dialogname +
                " im localStorage eingetragen"
            );
        }
    });


    //Window close Event
    $(window).on("beforeunload", function() {
        localStorage.setItem(dialogname, "closed");
        //Size speichern
        localStorage.setItem(dialogname + ".width", $(window).width());
        localStorage.setItem(dialogname + ".height", $(window).height());
        //Dialogeintrag löschen
        localStorage.removeItem(dialogname);

        //return "Wollen Sie tatsächlich den Dialog schließen?";
        return true;
    });

    //Eventlistener: Eintrag in localstorage
    function onStorageEvent(storageEvent) {
        /* StorageEvent {
            key; name of the property set, changed etc.; oldValue; old value of property before change
            newValue; new value of property after change;  url; url of page that made the change
            storageArea; localStorage or sessionStorage,
            }     
            */
        var key = storageEvent.key;
        var newvalue = storageEvent.newValue;
        var oldvalue = storageEvent.oldValue;
        var url = storageEvent.url;
        var eintrag = localStorage.getItem(key);
        UTIL.logger(
            dialogname +
            ": onStorageEvent(): eintrag für key: " +
            key +
            "; oldvalue: " +
            oldvalue +
            "; newvalue: " +
            newvalue +
            "; eintrag: " +
            eintrag
        );
        //eintrag für key: bsueb; oldvalue: *; newvalue: closed; eintrag: closed

        /* webrw.html closed
         * bsueb: onStorageEvent(): eintrag für key: bsueb; oldvalue: focus; newvalue: null;
         * eintrag: null
         */
        closed = false;
        if (dialogname === key) {
            if (newvalue === "closed") {
                //localStorage Eintrag wurde im Dialog auf closed gesetzt
                closed = true;
                localStorage.removeItem(key);
                window.close();
                UTIL.logger(
                    dialogname +
                    ": onStorageEvent(): Dialog: " +
                    key +
                    " gelöscht und closed"
                );
            } else if (newvalue === "folge") {
                //Folgedialog starten
                aktdialog = key;
                UTIL.logger(dialogname + ": onStorageEvent(): folgedialog: " + key);
                var left = 100 + Math.floor(Math.random() * 100 + 1) * 5;
                var top = 100 + Math.floor(Math.random() * 100 + 1) * 5;
                //var winProps = 'height=300,width=400,resizable=no,'
                //  + 'status=no,toolbar=no,location=no,menubar=no,' + 'titlebar=no,scrollbars=no,' + 'left=' + left + ',top=' + top;
                var _width = localStorage.getItem(aktdialog + ".width");
                _width = _width - _width / 120;
                var _height = localStorage.getItem(aktdialog + ".height");
                _height = _height - _height / 120;
                UTIL.logger(
                    dialogname +
                    ": onStorageEvent(): aktdialog: " +
                    aktdialog +
                    ";_width: " +
                    _width +
                    "; _height: " +
                    _height
                );
                if (_width && _height) {
                    var winProps =
                        "height=" +
                        _height +
                        ",width=" +
                        _width +
                        "left=" +
                        left +
                        ",top=" +
                        top;
                } else {
                    var winProps = "height=500,width=600,left=" + left + ",top=" + top;
                }

                var newWin = window.open(
                    "../" + aktdialog + "/" + aktdialog + ".html",
                    "_blank"
                );
                UTIL.logger(
                    dialogname + ": onStorageEvent: dialog: " + newWin.name + " gestartet"
                );
                localStorage.setItem(aktdialog, "focus");
                UTIL.logger(
                    dialogname +
                    ": onStorageEvent: aktdialog: " +
                    aktdialog +
                    " auf focus gesetzt"
                );
            }
        }
    }

    window.addEventListener("storage", onStorageEvent, false);
    //Customisationdialog

    $("#custom").dialog({
        title: "Customize",
        autoOpen: false,
        width: 600,
        height: 420,
        modal: true,
        closeText: ""
    });

    //Init. Listbox
    function initLb(lbname) {
        if ($("#" + lbname).val() === null) {
            //"listboxen": [{"name": "lotyplb", "typ": "appKonst", "table": "V_AC_FLSLAGERORTTYP"} oder SELECT Stmt.
            var url = globalconfig.bckendurl + "Listbox?typ=";
            for (let i = 0; i < config.default.data.listboxen.length; i++) {
                if (config.default.data.listboxen[i].name === lbname) {
                    //"table": "SELECT wert, anzeige_text FROM v_dlg_bsueb_hostlager WHERE wert is not null order by 2"
                    url +=
                        config.default.data.listboxen[i].typ +
                        "&table=" +
                        config.default.data.listboxen[i].table;
                    if (config.default.data.listboxen[i].constkey) {
                        url += "&constkey=" + config.default.data.listboxen[i].constkey;
                    }
                    UTIL.logger(
                        dialogname + ": XXX initLb(): lbname: " + lbname + "; url: " + url
                    );

                    // Using the core $.ajax() method
                    $.ajax({
                            url: url,
                            type: "GET",
                            dataType: "json"
                        })
                        .done(function(data) {
                            //data: [{"id":"0","name":"0"},{"id":"1","name":"1"}]
                            $("#" + lbname).append(
                                $("<option></option>")
                                .val("0")
                                .html("Alle")
                            );
                            $.each(data, function(index, value) {
                                //UTIL.logger(dialogname + ': initLbs(): id: ' + value.id + '; name: ' + value.name);
                                $("#" + lbname).append(
                                    $("<option></option>")
                                    .val(value.id)
                                    .html(value.name)
                                );
                            });

                            $("#" + lbname).show();
                        })
                        .fail(function(xhr, status, errorThrown) {
                            alert("Sorry, there was a problem!");
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                        })
                        .always(function(xhr, status) {
                            // Request complete
                        });
                }
            }
        }
    }

    //Listbox changed
    changelb = function changelb(lbname, value) {
        /* {"name": "hostlagerlb", "typ": "depends", 
         * "table": "SELECT wert, anzeige_text FROM v_dlg_bsueb_hostlager where mandantoid = '",
         "constkey": "MAN-efa", "dbcolumn": "HOSTLAGER"},      
         */
        for (let i = 0; i < config.default.data.listboxen.length; i++) {
            if (config.default.data.listboxen[i].name === lbname) {
                dependend = config.default.data.listboxen[i].dependend;
                //UTIL.logger(dialogname + ': changelb(): lbname: ' + lbname + '; value: ' + value);
                //Dependend Listbox
                var url = globalconfig.bckendurl + "Listbox?typ=";
                for (let j = 0; j < config.default.data.listboxen.length; j++) {
                    if (config.default.data.listboxen[j].name === dependend) {
                        //UTIL.logger(dialogname + ': changelb(): dependend lbname: ' + dependend);
                        //url: Listbox?typ=depends&table=SELECT wert, anzeige_text FROM v_dlg_bsueb_hostlager
                        //&constkey=mandantoid&constkeyval=0
                        if (value != 0) {
                            url +=
                                config.default.data.listboxen[j].typ +
                                "&table=" +
                                config.default.data.listboxen[j].table +
                                "&constkey=" +
                                config.default.data.listboxen[j].constkey +
                                "&constkeyval='" +
                                value +
                                "'";
                        } else {
                            url +=
                                config.default.data.listboxen[j].typ +
                                "&table=" +
                                config.default.data.listboxen[j].table;
                        }
                        UTIL.logger(dialogname + ": changelb(): url: " + url);
                        $.getJSON(url, function(data) {
                            //UTIL.logger(dialogname + ': initLbs(): data.name: ' + data[0].name);
                            $("#" + dependend)
                                .empty()
                                .append(
                                    $("<option></option>")
                                    .val("0")
                                    .html("Alle")
                                );
                            $.each(data, function(index, value) {
                                $("#" + dependend).append(
                                    $("<option></option>")
                                    .val(value.id)
                                    .html(value.name)
                                );
                            });
                        });
                        break;
                    }
                }
                break;
            }
        }
    };
    //Listboxen init.
    function initLbs() {
        $("#eingabediv1 select").each(function(lb) {
            var lbname = $(this).attr("id");
            //UTIL.logger(dialogname + ": initLbs(): lb: " + lb + "; lbname: " + lbname);
            if (lbname !== undefined) {
                initLb(lbname);
            }
        });
    }
    initLbs();

    //Click auf Tabellenrow (aufgerufen: .on('click', 'tr')
    rowclickaction = function rowClickAction(action, doubleclick, rowdata) {
        UTIL.logger(
            dialogname +
            ": rowClickAction(): action: " +
            action +
            "/" +
            (doubleclick === true ? "doubleclick" : "singleclick") +
            "; LE-Nr.: " +
            rowdata[5]
        );
        //Doppelclick: Detaildialog starten
        if (action === "select" && doubleclick) {
            //UTIL.logger(dialogname + ': rowclickaction(): Doubleclick auf Zeile');
        } else if (action === "select" && !doubleclick) {
            //UTIL.logger(dialogname + ': rowclickaction(): Singleclick auf Zeile');
            //Toolbarbuttons enablen
            $("#detail").attr("disabled", false);
            $("#detail").css("background-color", "white");
            //Detaildaten aus Tabelle übernehmen
            $("#lenrdet").val(rowdata[5]);
            $("#lhmtypdet").val(rowdata[33]);
            $("#mandantdet").val(rowdata[0]);
            $("#herstellerdet").val(rowdata[1]);
            $("#teilenrdet").val(rowdata[2]);
            $("#hteilenrdet").val(rowdata[3]);
            $("#bezeichnungdet").val(rowdata[4]);
            $("#lotypdet").val(rowdata[29]);
            $("#lagerortdet").val(rowdata[38]);
            $("#zoneaktuelldet").val(rowdata[31]);
            //UTIL.logger(dialogname + ": transportdet: rowdata[34]: " + rowdata[34]);
            //UTIL.logger(dialogname + ": transportdet: rowdata[35]: " + rowdata[35]);
            $("#zoneavisiertdet").val(rowdata[35]);
            //Bestände
            $("#total").val(rowdata[10]);
            $("#verfuegbar").val(rowdata[11]);
            $("#reserviert").val(rowdata[12]);
            $("#gesperrt").val(rowdata[13]);
            $("#nachgefragt").val(rowdata[43]);
            $("#geplant").val(rowdata[44]);
            $("#laeuft").val(rowdata[45]);
            $("#einheit").val(rowdata[46]);
            //Status
            //typ=Konst&table=V_UX_KONSTANTEN&constkey=LE.QsStatus
            $("#dispostatusdet").val(rowdata[16]);
            $("#qsstatusdet").val(rowdata[17]);
            $("#intsperredet").val(rowdata[15]);
            //UTIL.logger(dialogname + ": transportdet: rowdata[14]: " + rowdata[14]);
            //UTIL.logger(dialogname + ": inventurdet: rowdata[8]: " + rowdata[8]);
            //UTIL.logger(dialogname + ": retouredet: rowdata[46]: " + rowdata[46]);
            $("#transportdet").prop("checked", rowdata[14] === 1 ? true : false);
            $("#inventurdet").prop("checked", rowdata[8] === 1 ? true : false);
            $("#retouredet").prop("checked", rowdata[46] === 1 ? true : false);
            //Datum
            $("#fifodatumdet").val(UTIL.datum2String(rowdata[53])); //"ColumnFormat": "dd.MM.yyyy"
            $("#bildungdatumdet").val(rowdata[54]); //"ColumnFormat": "dd.MM.yyyy HH:MI"
            $("#inventurdatumdet").val(UTIL.datum2String(rowdata[56])); //"ColumnFormat": "dd.MM.yyyy"
        }
    };

    //Tabelle anzeigen
    showtable = function showtable(tabelle) {
        var lastclicktime = 0;
        var doubleclick = false;
        var delay = 200;
        UTIL.logger(
            dialogname +
            ": showtable(tabelle): " +
            tabelle +
            "; anzcolumns: " +
            config.default.data[tabelle].anzcolumns
        );
        //SQL SELECT zusammenbauen
        var sqlstm = "SELECT ";
        for (let i = 0; i < config.default.data[tabelle].anzcolumns; i++) {
            sqlstm += config.default.data[tabelle].columns[i].name + ",";
        }
        sqlstm =
            sqlstm.substring(0, sqlstm.length - 1) +
            " FROM " +
            config.default.data[tabelle].view;
        //UTIL.logger(dialogname + ': sqlstm ohne WHERE: ' + sqlstm);
        //WHERE-Klausel zusammenbauen
        klausel = " WHERE ";
        //Klausel für <input> (Eingabefelder)
        $("#eingabediv1 input").each(function(lb) {
            let feldname = $(this).attr("id");
            if (feldname !== undefined) {
                var value = $(this).val();
                if (value !== "0") {
                    for (let i = 0; i < config.default.data.inputfelder.length; i++) {
                        if (config.default.data.inputfelder[i].name === feldname) {
                            var field = config.default.data.inputfelder[i].dbcolumn;
                            if (
                                value === null ||
                                value === "0" ||
                                value === 0 ||
                                value === ""
                            ) {} else {
                                klausel += field + "='" + value + "' AND ";
                                //Eingabe speichern
                                config.default.data.inputfelder[i].eingabe = value;
                                //UTIL.logger(dialogname + ': showtable(): eingaben: '
                                //+ config.default.data.inputfelder[i].eingabe + '; visible: '
                                //+ config.default.data.inputfelder[i].visible);
                            }
                            break;
                        }
                    }
                }
            }
        });
        //Sel.kriteingaben in localStorage speichern
        localStorage.setItem(
            dialogname + ".eingabe",
            JSON.stringify(config.default.data.inputfelder)
        );
        //Klausel für <select> (Listboxen)
        $("#eingabediv1 select").each(function(lb) {
            var lbname = $(this).attr("id");
            if (lbname !== undefined) {
                var value = $(this).val();
                if (value !== "0") {
                    for (let i = 0; i < config.default.data.listboxen.length; i++) {
                        if (config.default.data.listboxen[i].name === lbname) {
                            var field = config.default.data.listboxen[i].dbcolumn;
                            if (
                                value === null ||
                                value === "0" ||
                                value === 0 ||
                                value === ""
                            ) {} else {
                                if (config.default.data.listboxen[i].displed != "none") {
                                    klausel += field + "='" + value + "' AND ";
                                }
                            }
                            break;
                        }
                    }
                }
            }
        });
        //UTIL.logger(dialogname + ': showtable(): klausel liszboxen: ' + klausel);
        if (klausel !== " WHERE ") {
            sqlstm += klausel;
            sqlstm = sqlstm.substr(0, sqlstm.length - 5);
        }

        ///Auftueb?sqlstm=SELECT%20AC_MANDANT,AC_HERSTELLER ...FROM%20v_dlg_bsueb%20WHERE%20MANDANT=%27MAN-int%27
        var url = globalconfig.bckendurl;

        url += config.default.data[tabelle].servlet + "sqlstm=" + sqlstm;
        var table1 = config.default.data[tabelle].name;
        //Spalte 1 LE  visible/hidden
        var ind = 0;
        for (let indx = 0; indx < config.obj.colModel.length; indx++) {
            for (
                var indx1 = 0; indx1 < config.obj.colModel[indx].colModel.length; indx1++
            ) {
                config.obj.colModel[indx].colModel[indx1].hidden =
                    config.default.data.table1.columns[ind].visible === "true" ?
                    false :
                    true;

                if (!config.obj.colModel[indx].colModel[indx1].hidden) {
                    config.obj.colModel[indx].colModel[indx1].minWidth =
                        config.default.data["table1"].columns[ind].minWidth;
                    UTIL.logger(
                        dialogname +
                        ": showtable(tabelle): indx: " +
                        indx +
                        "; indx1: " +
                        indx1 +
                        "; ind: " +
                        ind +
                        "; config.default.data[table1].columns[ind].name/minWidth:" +
                        config.default.data["table1"].columns[ind].name +
                        "/" +
                        config.default.data["table1"].columns[ind].minWidth +
                        "; config.obj.colModel[indx].colModel[indx1].title/minWidth:" +
                        config.obj.colModel[indx].colModel[indx1].title +
                        "/" +
                        config.obj.colModel[indx].colModel[indx1].minWidth
                    );
                }
                ind = ind + 1;
            }
        }

        config.obj.selectChange = function(evt, ui) {
            var rows = ui.rows;
            if (rows && rows.length) {
                for (var i = 0; i < rows.length; i++) {
                    UTIL.logger(
                        dialogname +
                        "; selectChange(): rows[" +
                        i +
                        "].rowData[5]: " +
                        rows[i].rowData[5]
                    );
                }
            }
        };

        //data = [["INTERN", "ASTON MARTIN", "adsf", "adsf", "asd", "7005100", ...],
        //  ["INTERN", "ASTON MARTIN", "adsf", "adsf", "asd", "7005099", ...
        UTIL.logger(dialogname + "; showtable(): url: " + url);
        $.getJSON(url, function(data) {
            config.obj.dataModel.data = data.data;
            //Summenzeile unten anhängen
            config.obj.render = function(evt, ui) {
                $summary = $("<div class='pq-grid-summary'></div>").prependTo(
                    $(".pq-grid-bottom")
                );
            };
            config.obj.refresh = function(evt, ui) {
                var summenzeile = calculateSummary(ui);
                var _data = [summenzeile]; //JSON (array of objects)
                var obj = { data: _data, $cont: $summary };
                $(this).pqGrid("createTable", obj);
            };

            $("#ausgabediv1").pqGrid(config.obj);
            $("#ausgabediv1").pqGrid("refreshDataAndView");
        });

        closed = true;
    };

    //Summenzeile berechnen
    function calculateSummary(ui) {
        var _summenzeile = Array(ui.dataModel.data[0].length).fill(0);
        for (var i = 0; i < ui.dataModel.data.length; i++) {
            for (var j = 0; j < ui.dataModel.data[i].length; j++) {
                if (config.default.data.table1.columns[j].summe === "J") {
                    _summenzeile[j] += parseInt(ui.dataModel.data[i][j], 10);
                } else {
                    _summenzeile[j] = null;
                }
            }
        }
        //Spalten: Checkboxen
        if (
            _summenzeile[8] === "0" ||
            _summenzeile[8] === 0 ||
            _summenzeile[8] === null
        ) {
            _summenzeile[8] = "0";
        } else {
            _summenzeile[8] = "1";
        }
        if (_summenzeile[14] === 0 || _summenzeile[14] === null) {
            _summenzeile[14] = "0";
        } else {
            _summenzeile[14] = "1";
        }
        if (_summenzeile[22] === 0 || _summenzeile[22] === null) {
            _summenzeile[22] = "0";
        } else {
            _summenzeile[22] = "1";
        }
        if (_summenzeile[23] === 0 || _summenzeile[23] === null) {
            _summenzeile[23] = "0";
        } else {
            _summenzeile[23] = "1";
        }

        _summenzeile[0] = '<label style="font-weight: bold;">Summe</b>';
        return _summenzeile;
    }

    //Folgedialog starten
    detail = function detail(aktdialog) {
        //Eintrag localStorage
        var eingetragen = localStorage.getItem(aktdialog) ? true : false;
        UTIL.logger(
            dialogname +
            ": detail(): dialog: " +
            aktdialog +
            " eingetragen: " +
            eingetragen
        );
        if (eingetragen) {
            localStorage.removeItem(aktdialog);
        }
        localStorage.setItem(aktdialog, "folge");
    };
    //tabelle aktualisieren
    aktualisieren = function aktualisieren() {
        showtable("table1");
    };

    //Customising speichern
    speicherncust = function speicherncust(tabelle) {
        UTIL.logger(dialogname + ": speicherncust(): tabelle: " + tabelle);

        let _display = "none";
        //Eingabefelder
        $(".custinput").each(function(index, value) {
            let _id = value.id;
            if (_id.indexOf("cust") >= 0) {
                _id = _id.substring(0, _id.indexOf("cust"));
            }
            //UTIL.logger(dialogname + ": speicherncust(): Eingabe: chekbox id: " + _id + ": chekbox value: " + value.checked);
            if (!value.checked) {
                //Selkrit remove
                _display = "none";
                config.default.data["inputfelder"][index].visible = "false";
            } else {
                //Selkrit insert
                _display = "";
                config.default.data["inputfelder"][index].visible = "true";
            }
            $("#" + _id + "lbl").css("display", _display);
            $("#" + _id).css("display", _display);
        });

        //In localStorage speichern
        localStorage.setItem(
            dialogname + ".eingabe",
            JSON.stringify(config.default.data.inputfelder)
        );
        _display = "none";

        //Ausgabefelder Checkboxen
        var ind = 0;
        $(".custausgabe").each(function(index, value) {
            let _id = value.id;
            if (!value.checked) {
                //Tabellenspalte ausblenden
                _display = "false";
            } else {
                //Selkrit insert
                _display = "true";
            }
            config.default.data.table1.columns[index].visible = _display;

            UTIL.logger(
                dialogname +
                ": speicherncust(): " +
                " id: " +
                _id +
                "; visible: " +
                _display
            );
        });

        //Ausgabefelder minWidth
        $(".custausgabew").each(function(index, value) {
            let _id = value.id;
            config.default.data.table1.columns[index].minWidth = $(this).val();

            UTIL.logger(
                dialogname +
                ": speicherncust(): " +
                " id: " +
                _id +
                "; minWidth: " +
                $(this).val()
            );
        });

        //In localStorage speichern
        localStorage.setItem(
            dialogname + ".ausgabe",
            JSON.stringify(config.default.data[tabelle].columns)
        );
        $("#custom").css("display", "none");
        $("#custom").dialog("close");
    };

    resetcust = function resetcust(block, param) {
        UTIL.logger(
            dialogname + ": resetcust(): block: " + block + "; param: " + param
        );
        if (block === "eingabe") {
            //Alle Checkboxen checked
            $(".custinput").each(function(index, value) {
                let _id = value.id;
                if (_id.indexOf("cust") >= 0) {
                    if (param === "reset") {
                        $("#" + _id).prop("checked", true);
                    } else if (param === "clear") {
                        $("#" + _id).prop("checked", false);
                    }
                }
            });
        } else if (block === "ausgabe") {
            //Alle Checkboxen checked
            $(".custausgabe").each(function(index, value) {
                let _id = value.id;
                //UTIL.logger(dialogname + ': resetausg(): _id: ' + _id);
                //if (_id.indexOf("cust") >= 0) {
                if (param === "reset") {
                    $("#" + _id).prop("checked", true);
                    $("#" + _id + "width").val(50);
                } else if (param === "clear") {
                    $("#" + _id).prop("checked", false);
                }
                //}
            });
        }
    };
}); // end ready