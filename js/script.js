$.cookie.json = true;
var Chart, CChart, itsfirstTime = true, _interval, _interval2;
var DwBar,UpBar, iTrendline = 0;
var ci_chart_historic, cs_t6_data;
var cs_addEndDate = 0, addEndDate = 0, startDate, endDate;
var currentData;
var currentDataSet;
var cs_oldPanels;
var isT6D;
var fmtlocale = 'en';
var loadNews = 0;
var getPointCount = 0;
var currecntCur = "EUR";
var _ema = {};
var _nbBarsSeen = {};
var PlusSdiBuffer = [],
    MinusSdiBuffer = [],
    PlusDiBuffer = [],
    MinusDiBuffer = [],
    TempBuffer  = [],
    ADXBuffer = [];
var previousClose,
    trueRangeValues = [],
    averageTrueRange;
var cs_chart = {
  limit: 4000,
	config: {
        type: 'stock',
        responsive: {
          enabled: true
        },
        height: "630",
        colors: ["#ffffff", "#4300f4", "#FF0040", "#008639", "#009EC3", "#8D0081", "#FF7D16", "#999999", "#ffdc17", "#676735"],
        panels: [{
             title: "close",
             drawingIconsEnabled: true,
             recalculateToPercents: "never",
             trendLineColor: '#f90707',
             trendLineColorHover: 'blue',
             stockGraphs: [{
                id: "g1",
                type: 'line',
                valueField: "close",
                comparable: true,
                hidden: true,
                compareField: "close",
              },
              {
                type: 'line',
                lineColor: '#ffc107',
                useDataSetColors: false,
                precision: 5,
                showBalloon: false,
                lineAlpha: 1,
                dashLength: 5,
                lineThickness: 1,
                AvgField: 'line',
                valueField: 'line',
              },
              {
                type: 'line',
                bullet: "round",
                bulletColor: "#b4b5ad",
                bulletSize: 5,
                lineColor: '#008000',
                lineAlpha: 0,
                precision: 5,
                showBalloon: false,
                lineThickness: 1,
                useDataSetColors: false,
                hidden: false,
                valueField: 'UP2',
              },
              {
                type: 'line',
                bullet: "round",
                bulletColor: "#b4b5ad",
                bulletSize: 5,
                lineColor: '#ff0057',
                lineAlpha: 0,
                precision: 5,
                showBalloon: false,
                lineThickness: 1,
                useDataSetColors: false,
                precision: 5,
                hidden: false,
                valueField: 'DW2',
              }],
             valueAxes: [{
               labelFunction: function(value) {
                 return parseInt(value*10).toFixed(0);
               }
             }],
        }],
        dataSets: [],
        categoryAxesSettings: {
             groupToPeriods: ["mm"],
             minPeriod: "hh",
             maxSeries: 5000,
             gridColor: "#aaa",
             dashLength: 5,
        },
        chartCursorSettings: {
            pan: false, 
           categoryBalloonDateFormats: [{
             period: 'fff',
             format: 'JJ:NN:SS'
           }, {
             period: 'ss',
             format: 'JJ:NN:SS'
           }, {
             period: 'mm',
             format: 'YYYY-MM-DD JJ:NN'
           }, {
             period: 'hh',
             format: 'YYYY-MM-DD JJ:NN'
           }, {
             period: 'DD',
             format: 'YYYY-MM-DD JJ:NN'
           }, {
             period: 'WW',
             format: 'YYYY-MM-DD JJ:NN'
           }, {
             period: 'MM',
             format: 'YYYY MMM'
           }, {
             period: 'YYYY',
             format: 'YYYY'
           }]
         }, 
        valueAxesSettings: {
          gridColor: "#aaa",
          dashLength: 5,
          position: "right",
          inside: false,
          precision: 4,
          offset: 0,
          autoMargins: true,
        }, 
        panelsSettings: {
           usePrefixes: true,
           panEventsEnabled: true,
           marginRight: 55,
           plotAreaFillColors: "#000",
           plotAreaFillAlphas: 1,
        },
        chartScrollbarSettings: {
          graph: "g1",
          graphType: "line",
          usePeriod: "mm",
          backgroundColor: "#444",
          graphFillColor: "#000000",
          graphFillAlpha: 0.6,
          gridColor: "#888",
          gridAlpha: 1,
          selectedBackgroundColor: "#aaa",
          selectedGraphFillColor: "#555",
          selectedGraphFillAlpha: 1,
          height: 30
        },
        listeners: [{
          event: "rendered",
          method: function(e) {
            $('.mycheckbox .item').each(function(i) {
              $(this).find('.check-box').css({
                backgroundColor: cs_chart.config.colors[i]
              });
            });
          }
        }, {
          event: "dataUpdated",
          method: function(e) {
            cs_chart.stopLoading();
          }
        }]
	},
  resetGTMS6: function (dataSet) {
    for (var i = 0; i < dataSet.dataProvider.length; i++) {
        dataSet.dataProvider[i]['UP2'] = null;
        dataSet.dataProvider[i]['line'] = null;
        dataSet.dataProvider[i]['DW2'] = null;
     }
  },
  GTMS6to: function (dataSet) {
    for (var i = 0; i < dataSet.dataProvider.length; i++) {
        if (CChart.dataSets[0].dataProvider[i]['UP2']) {
          CChart.dataSets[0].dataProvider[i]['UP2'] = dataSet.dataProvider[i].close;
          CChart.dataSets[0].dataProvider[i]['line'] = dataSet.dataProvider[i].close;
        }
     }
  },
  getPoint: function (count, date) {
    for (var x = count; x < cs_t6_data.length; x++) {
      if (date.getTime() == cs_t6_data[x].date) {
         return x;
         break;
      }
    }
    return false;
  },
  move: function (t, old_index, new_index) {
    if (new_index >= t.length) {
        var k = new_index - t.length;
        while ((k--) + 1) {
            t.push(undefined);
        }
    }
    t.splice(new_index, 0, t.splice(old_index, 1)[0]);
    return t;
  },
  GTMS6: function (avgField, dataSet, data, s, i) {

    if (!s.edit) {
      dataSet.fieldMappings.push({
        fromField: 'UP2',
        toField: 'UP2'
      });
      dataSet.fieldMappings.push({
        fromField: 'DW2',
        toField: 'DW2'
      });
      dataSet.fieldMappings.push({
        fromField: 'line',
        toField: 'line'
      });
    }

    for (var i = 0; i < data.length; i++) {
         if (i < dataSet.dataProvider.length) {
             point = this.getPoint(getPointCount, data[i].date);
             if (point){
                dataSet.dataProvider[i]['UP2'] = data[i].close;
                dataSet.dataProvider[i]['line'] = data[i].close;
                getPointCount = point;
             }
         }
     }
 
    CChart.validateNow();
    CChart.validateData();

  },
  addGTMS6: function (edit) {
    if ($('.mycheckbox .item.active').length > 1) return;
    cs_chart.Loading();
    ds = $('.mycheckbox .item.active').index();
    sym = $('#Custom-Indicators .sambols').val().split('-');
    val = $('.mycheckbox .item.active .check-box').data('value');
    if (val !== sym[0] && val !== sym[1]) {
        ds = this.changeSymbol();
    }
    isT6D = 1;
    getPointCount = 0;
    cs_chart.GTMS6(ds, CChart.dataSets[0], CChart.dataSets[ds].dataProvider, {maperiods: 5, atrperiods: 14, edit: edit}, ds);
  },
  changeSymbol: function (doit) {
     this.resetGTMS6(CChart.dataSets[0]);
     sym = $('#Custom-Indicators .sambols').val().split('-');
     $('.mycheckbox .item').removeClass('active');
     e = $('.mycheckbox .item .check-box[data-value="'+sym[0]+'"]').parent('.item');
     e.addClass('active');
     id = e.index();

     for (var i = 1; i < cs_chart.config.panels[0].stockGraphs.length; i++) {
       cs_chart.config.panels[0].stockGraphs[i].hidden = false; 
     }
     for (var i = 0; i < cs_chart.config.dataSets.length; i++) {
       cs_chart.config.dataSets[i].compared = false;
     }

     cs_chart.config.dataSets[id].compared = true;
     CChart.panels[0].recalculateToPercents = "never";
     
     CChart.validateNow();   
     CChart.validateData();

     return id;
  },
  stopLoading: function () {

     $('#Current-strngth .loading').hide();
  },
  Loading: function () {
     $('#Current-strngth .loading').show();
  },
  getResult: function (result) {
     toReturn = {};
     result = result.replace(new RegExp(/\n/g), '');
     _sambols = result.match(/var ohlc_([A-Z]+)/gi);
     for (i in _sambols){
       _eval = result.match(new RegExp(_sambols[i]+' = \\[(.*?)\\]', 'g'));
       toReturn[_sambols[i].replace('var ohlc_', '')] = eval('['+_eval[0].replace(new RegExp(_sambols[i]+' = \\[(.*?)\\]', 'g'), '$1')+']');
     }
     return toReturn;
  },
  addSpace: function (dataSet, timeFrame, addDate) {
     _ddDate = new Date();
     if (timeFrame == 60) {
       _ddDate.setHours(_ddDate.getHours()+5);
     }else if(timeFrame == 300){
       _ddDate.setDate(_ddDate.getDate()+1);
     }else if(timeFrame == 900){
       _ddDate.setDate(_ddDate.getDate()+2);
     }else if(timeFrame == 1800){
       _ddDate.setDate(_ddDate.getDate()+3);
     }else if(timeFrame == 3600){
       _ddDate.setDate(_ddDate.getDate()+5);
     }else if(timeFrame == 14400){
       _ddDate.setDate(_ddDate.getDate()+20);
     }else if(timeFrame == 86400){
       _ddDate.setMonth(_ddDate.getMonth()+2);
     }else{
       _ddDate.setMonth(_ddDate.getMonth()+10);
     }
     if (dataSet.dataProvider) {
      dataSet.dataProvider.push({
         date: _ddDate,
      });
     }
     if(addDate) cs_addEndDate = _ddDate.getTime();
  },
	start: function (element, symbols, limit, timeFrame, first, refresh) {
    if (!first) {
      clearTimeout(_interval2);
    }
		var url_get = "https://www.mataf.io/api/graphes/v6/multiquotes/" + symbols + "/" + limit + "/" + timeFrame;
        _self2 = this;
        if(!refresh) {
          $('#'+element).empty();
          this.Loading();
        }
        $.get(url_get, function(result) {

              if (first) {
                cs_oldPanels = cs_chart.config.panels;
              }
          
              datafeeds = _self2.getResult(result);
              
              if(refresh){
                   for (var i = 0; i < CChart.dataSets.length; i++) {
                    _compared = $('.mycheckbox .item:eq('+i+')').hasClass('active');
                     CChart.dataSets[i].dataProvider = datafeeds[CChart.dataSets[i].title];
                     _self2.addSpace(CChart.dataSets[i], timeFrame);
                   }
                   CChart.validateData();
              }else{

                 cs_chart.config.dataSets = [];
                 ksymbols = symbols.split('|');
                 x = 0;
                 for(i in ksymbols){
                   _compared = false;
                   if (!first) {
                     _compared = $('.mycheckbox .item:eq('+i+')').hasClass('active');
                   }else{
                     if (i == 1) {
                       _compared = true;
                     }
                   }
                   dataSet = {
                      title: ksymbols[i],
                      compared: _compared,
                      dataProvider: datafeeds[ksymbols[i]],
                      categoryField: 'date',
                      fieldMappings: [  
                          {fromField: 'open',  toField: 'open'}, 
                          {fromField: 'high',  toField: 'high'}, 
                          {fromField: 'low',   toField: 'low'}, 
                          {fromField: 'close', toField: 'close'},
                      ],
                   };
                   _self2.addSpace(dataSet, timeFrame, 1);
                   cs_chart.config.dataSets.push(dataSet);
                   x++;
                 }

                 if (first) {
                    $('#Current-strngth .limit').val(limit); 
                 }   

                 cs_dTime = $('#Current-strngth .timeframe .btn.active').data('time');    

                 if (cs_dTime !==  cs_chart.config.categoryAxesSettings.minPeriod) {
                   cs_chart.config.categoryAxesSettings.minPeriod = cs_dTime;
                   cs_chart.config.chartScrollbarSettings.usePeriod = cs_dTime;
                 }   

                 CChart = AmCharts.makeChart(element, cs_chart.config);
                 CChart.validateData();

                 if (isT6D) {
                  getPointCount = 0;
                  cs_chart.resetGTMS6(CChart.dataSets[0]);
                  cs_chart.addGTMS6(0);
                  CChart.validateData();
                 }
 
                 var cs_startDate = new Date();
                 var cs_endDate = new Date();
                 if (cs_addEndDate) {
                   cs_endDate.setTime(cs_endDate.getTime()+cs_addEndDate);
                 }
                
                 if (timeFrame == 60) {
                   cs_startDate.setHours(cs_startDate.getHours()-20);
                   CChart.zoom(cs_startDate, cs_endDate);
                 }else if(timeFrame == 300){
                   cs_startDate.setDate(cs_startDate.getDate()-7);
                   CChart.zoom(cs_startDate, cs_endDate); 
                 }else if(timeFrame == 900){
                   cs_startDate.setDate(cs_startDate.getDate()-9);
                   CChart.zoom(cs_startDate, cs_endDate); 
                 }else if(timeFrame == 1800){
                   cs_startDate.setDate(cs_startDate.getDate()-20);
                   CChart.zoom(cs_startDate, cs_endDate); 
                 }else if(timeFrame == 3600){
                   cs_startDate.setMonth(cs_startDate.getMonth()-1);
                     setTimeout(function () {
                        CChart.zoom(cs_startDate, cs_endDate); 
                     },(first ? 500 : 0));
                 }else if(timeFrame == 14400){
                   cs_startDate.setMonth(cs_startDate.getMonth()-4);
                   CChart.zoom(cs_startDate, cs_endDate); 
                 }else if(timeFrame == 86400){
                   cs_startDate.setMonth(cs_startDate.getMonth()-12);
                   CChart.zoom(cs_startDate, cs_endDate); 
                 }else{
                   cs_startDate.setMonth(cs_startDate.getMonth()-24);
                   CChart.zoom(cs_startDate, cs_endDate); 
                 }
              }

          _interval2 = setTimeout(function () {
            _self2.start(element, symbols, limit, timeFrame, false, true);
          }, 60000);
        }, "html");
	} 
};
 
var ci_chart = {
  symbols: 'EUR-USD',
  limit: 4000,
  timeframe: 3600,
  config: {
      type: "stock",
      theme: "light",
      responsive: {
        enabled: true
      },
      addClassNames: true,
      categoryField: "time",
      categoryAxesSettings: {
        equalSpacing: false,
        groupToPeriods: ["mm", "5mm", "15mm", "30mm", "1hh", "4hh", "DD", "WW"],
        minPeriod: "hh",
        gridColor: "#aaa",
        dashLength: 5,
        maxSeries: 5000,
        markPeriodChange: false,
        parseDates: false
      },
      dataSets: [{
        color: '#24ef0e',
        fieldMappings: [],
        dataProvider: null,
        stockEvents: [],
        addClassNames: true,
        categoryField: "time",
      }],
      dataDateFormat: "YYYY-MM-DD JJ:NN:SS",
      balloon: {
          maxWidth: 400,
          disableMouseEvents: false,
          fixedPosition: true,
      },
      stockEventsSettings: {
        type: "pin",
      },
      panels: [{
        cName: 'graph',
        showCategoryAxis: true,
        drawingIconsEnabled: true,
        trendLineColor: '#f90707',
        trendLineColorHover: 'blue',
        percentHeight: 63, 
        stockGraphs: [],
        categoryAxis: {
          gridAlpha: 0.2,
          axisAlpha: 1,
        },
        valueAxes: [{
          id: "a1",
          title: "", 
          position: "right",
          inside: false,
          gridAlpha: 0.2,
          axisAlpha: 1,
          guides: []
        }],
        stockLegend: {
          rollOverColor: 'red',
          valueTextRegular: " "
        },
        listeners: [{
          event: "rendered",
          method: function(event) {
             ci_chart.addOptions();
             ci_chart.addFlags();
          }
        },{
          event: "drawn",
          method: function () {
            ci_chart.addFlags();
          }
        },{
          event: "changed",
          method: function () {
            ci_chart.addFlags();
          }
        },{
          event: "dataUpdated",
          method: function () {
            ci_chart.addFlags();
          }
        },{
          event: "zoomed",
          method: function(event) {
             ci_chart.addFlags();
          }
        }],
       trendLines: [],
      }],
      panelsSettings: {
        panEventsEnabled: false,
        marginRight: 55,
        plotAreaFillColors: "#000",
        plotAreaFillAlphas: 1,
      },
      valueAxesSettings: {
        inside: false,
        precision: 4,
        autoMargins: true,
        gridColor: "#aaa",
        dashLength: 5,
      },
      chartScrollbarSettings: {
        graph: "base", 
        graphType: "line",
        backgroundColor: "#444",
        graphFillColor: "#000000",
        graphFillAlpha: 0.6,
        gridColor: "#888",
        gridAlpha: 1,
        selectedBackgroundColor: "#aaa",
        selectedGraphFillColor: "#555",
        selectedGraphFillAlpha: 1,
        usePeriod: "mm",
        updateOnReleaseOnly: true,
        enabled: true,
        oppositeAxis: false, 
        autoGridCount: true,
        height: 30
      },
      chartCursorSettings: {
        pan: false, 
        valueBalloonsEnabled: true,
        cursorColor: "red",
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        categoryBalloonDateFormats: [{
          period: 'fff',
          format: 'JJ:NN:SS'
        }, {
          period: 'ss',
          format: 'JJ:NN:SS'
        }, {
          period: 'mm',
          format: 'YYYY-MM-DD JJ:NN'
        }, {
          period: 'hh',
          format: 'YYYY-MM-DD JJ:NN'
        }, {
          period: 'DD',
          format: 'YYYY-MM-DD'
        }, {
          period: 'WW',
          format: 'YYYY-MM-DD'
        }, {
          period: 'MM',
          format: 'YYYY MMM'
        }, {
          period: 'YYYY',
          format: 'YYYY'
        }]
      }, 
      export: {
        enabled: false  
      },
      listeners: [{
        event: "dataUpdated",
        method: function (e) {
          ci_chart.stopLoading();
          ci_chart.addFlags();
        }
      },{
        event: "rendered",
        method: function(e) {
           ci_chart.stopLoading();
           ci_chart.addOptions();
           ci_chart.addResize();
           // if (!$('#custom-indicators-chart .amcharts-panels-div .amChartsPanel:first #custom-values').length) { 
           //    html = '<ul id="custom-values">';
           //    html += '<li class="Open">';
           //    html += '<span class="name">O</span>';
           //    html += '<span class="value">0.0000</span>';
           //    html += '</li>';
           //    html += '<li class="High">';
           //    html += '<span class="name">H</span>';
           //    html += '<span class="value">0.0000</span>';
           //    html += '</li>';
           //    html += '<li class="Low">';
           //    html += '<span class="name">L</span>';
           //    html += '<span class="value">0.0000</span>';
           //    html += '</li>';
           //    html += '<li class="Close">';
           //    html += '<span class="name">C</span>';
           //    html += '<span class="value">0.0000</span>';
           //    html += '</li>';
           //    html += '</ul>';
           //    $('#custom-indicators-chart .amcharts-panels-div .amChartsPanel:first').prepend(html);
           // }
        }
      }]
  },
  stopLoading: function () {

     $('.loading').hide();
  },
  Loading: function () {
     $('.loading').show();
  },
  maxIndicatorPeriod: Math.max(50, 12),
  newsNotExist: function (s) {
     for (var i = 0; i < s.length; i++) {
       if (s[i].cName == "news") {
           return false;
           break;
       }
     }
     return true;
  },
  topCandleStick: function (dataSet, panel, text, first) {
      dataSet.fieldMappings.push({
        fromField: "close",
        toField: "close",
      });
      dataSet.fieldMappings.push({
        fromField: "open",
        toField: "open"
      });
      dataSet.fieldMappings.push({
        fromField: "high",
        toField: "high"
      });
      dataSet.fieldMappings.push({
        fromField: "low",
        toField: "low"
      });
      dataSet.fieldMappings.push({
        fromField: "news",
        toField: "news"
      });
      panel.stockGraphs.push({
        id: "base",
        title: text,
        type: "candlestick",
        balloonFunction: function(graphDataItem, graph) {
          // if(graphDataItem.values.open) $('#custom-values .Open .value').html(graphDataItem.values.open.toFixed(ci_chart.config.valueAxesSettings.precision));
          // if(graphDataItem.values.high) $('#custom-values .High .value').html(graphDataItem.values.high.toFixed(ci_chart.config.valueAxesSettings.precision));
          // if(graphDataItem.values.low) $('#custom-values .Low .value').html(graphDataItem.values.low.toFixed(ci_chart.config.valueAxesSettings.precision));
          // if(graphDataItem.values.close) $('#custom-values .Close .value').html(graphDataItem.values.close.toFixed(ci_chart.config.valueAxesSettings.precision));
        },
        closeField: "close",
        highField: "high",
        lineAlpha: 1,
        lowField: "low",
        fillAlphas: 1,
        lineColor: "#ffffff",
        negativeLineColor: "#f81f1f",
        negativeFillColors: "#f81f1f",
        openField: "open",
        valueField: "close",
        valueAxis: "a1",
        legendValueText: "[[close]]",
        proCandlesticks: true
      }); 
  },
  reduceFloatVal: function (value) {
     value = parseFloat(value);
     var absValue = Math.abs(value);
     if (absValue > 1) {
       value = Math.round(value * 100) / 100;
       return value;
     }
     if (absValue >= 0.00001000) {
       return parseFloat(value.toPrecision(4));
     }
     if (absValue >= 0.00000100) {
       return parseFloat(value.toPrecision(3));
     }
     if (absValue >= 0.00000010) {
       return parseFloat(value.toPrecision(2));
     }
     return parseFloat(value.toPrecision(1));
  },
  polyfillChartData: function (chartData, interval, indexForStats, dateFormat) {
      var chartStats = { close: 0, high: 0, low: 0, open: 0, volumefrom: 0, volumeto: 0 };
      var arrayToReturn = [];
      var prevClose;
      var allData = chartData['Data'];
      var timestampToStop;
      var currentTimestamp = chartData.TimeFrom;
      if (!chartData.hasOwnProperty('Data')) {
        return {
          data: arrayToReturn,
          stats: chartStats
        };
      }
      if (allData.length > 0) {
        timestampToStop = allData[0]['time'];
      } else {
        timestampToStop = chartData.TimeTo;
      }
      if (!chartData.FirstValueInArray) {
        if (chartData.hasOwnProperty("FirstValue")) {
          prevClose = this.reduceFloatVal(chartData.FirstValue['close']);
        } else {
          if (allData.length > 0) {
            prevClose = this.reduceFloatVal(allData[0]['close']);
          } else {
            prevClose = 0;
          }
        }
        var initalValue = {};
        initalValue['time'] = chartData.TimeFrom * 1000;
        initalValue['close'] = prevClose;
        initalValue['high'] = prevClose;
        initalValue['low'] = prevClose;
        initalValue['open'] = prevClose;
        initalValue['volumefrom'] = 0;
        initalValue['volumeto'] = 0;
        if (dateFormat) {
          initalValue['formatedDate'] = $filter('date')(new Date(initalValue['time']), dateFormat);
        }
        arrayToReturn.push(initalValue);
        prevClose = initalValue['close'];
        currentTimestamp = currentTimestamp + interval;
        while (currentTimestamp < timestampToStop) {
          var newValue = {};
          newValue['time'] = currentTimestamp * 1000;
          newValue['close'] = prevClose;
          newValue['high'] = prevClose;
          newValue['low'] = prevClose;
          newValue['open'] = prevClose;
          newValue['volumefrom'] = 0;
          newValue['volumeto'] = 0;
          if (dateFormat) {
            newValue['formatedDate'] = $filter('date')(new Date(newValue['time']), dateFormat);
          }
          arrayToReturn.push(newValue);
          currentTimestamp = currentTimestamp + interval;
        }
      }
      if (allData.length == 0) {
        chartStats['high'] = arrayToReturn[0]['high'];
        chartStats['tsHigh'] = arrayToReturn[0]['time'];
        chartStats['low'] = arrayToReturn[0]['low'];
        chartStats['tsLow'] = arrayToReturn[0]['time'];
        chartStats['close'] = arrayToReturn[0]['close'];
        chartStats['open'] = arrayToReturn[0]['open'];
        chartStats['volumefrom'] = arrayToReturn[0]['volumefrom'];
        chartStats['volumeto'] = arrayToReturn[0]['volumeto'];
        return {
          data: arrayToReturn,
          stats: chartStats
        };
      }
      var newValue = {};
      currentTimestamp = allData[0]['time'];
      newValue['time'] = currentTimestamp * 1000;
      newValue['close'] = this.reduceFloatVal(allData[0]['close']);
      newValue['high'] = this.reduceFloatVal(allData[0]['high']);
      newValue['low'] = this.reduceFloatVal(allData[0]['low']);
      newValue['open'] = this.reduceFloatVal(allData[0]['open']);
      newValue['volumefrom'] = this.reduceFloatVal(allData[0]['volumefrom']);
      newValue['volumeto'] = this.reduceFloatVal(allData[0]['volumeto']);
      if (arrayToReturn.length >= indexForStats) {
        chartStats['high'] = allData[0]['high'];
        chartStats['tsHigh'] = allData[0]['time'];
        chartStats['low'] = allData[0]['low'];
        chartStats['tsLow'] = allData[0]['time'];
        chartStats['open'] = allData[0]['open'];
        chartStats['volumefrom'] = allData[0]['volumefrom'];
        chartStats['volumeto'] = allData[0]['volumeto'];
      }
      if (dateFormat) {
        newValue['formatedDate'] = $filter('date')(new Date(newValue['time']), dateFormat);
      }
      arrayToReturn.push(newValue);
      prevClose = newValue['close'];
      currentTimestamp = currentTimestamp + interval;
      for (var i = 1; i < allData.length; i++) {
        timestampToStop = allData[i]['time'];
        while (currentTimestamp < timestampToStop) {
          var newValue = {};
          newValue['time'] = currentTimestamp * 1000;
          newValue['close'] = prevClose;
          newValue['high'] = prevClose;
          newValue['low'] = prevClose;
          newValue['open'] = prevClose;
          newValue['volumefrom'] = 0;
          newValue['volumeto'] = 0;
          if (dateFormat) {
            newValue['formatedDate'] = $filter('date')(new Date(newValue['time']), dateFormat);
          }
          arrayToReturn.push(newValue);
          currentTimestamp = currentTimestamp + interval;
        }
        var newValue = {};
        newValue['time'] = currentTimestamp * 1000;
        newValue['close'] = this.reduceFloatVal(allData[i]['close']);
        newValue['high'] = this.reduceFloatVal(allData[i]['high']);
        newValue['low'] = this.reduceFloatVal(allData[i]['low']);
        newValue['open'] = this.reduceFloatVal(allData[i]['open']);
        newValue['volumefrom'] = this.reduceFloatVal(allData[i]['volumefrom']);
        newValue['volumeto'] = this.reduceFloatVal(allData[i]['volumeto']);
        if (dateFormat) {
          newValue['formatedDate'] = $filter('date')(new Date(newValue['time']), dateFormat);
        }
        arrayToReturn.push(newValue);
        prevClose = newValue['close'];
        if (arrayToReturn.length > indexForStats && chartStats['open'] > 0) {
          chartStats['close'] = allData[i]['close'];
          if (allData[i]['high'] >= chartStats['high']) {
            chartStats['tsHigh'] = allData[i]['time'];
            chartStats['high'] = allData[i]['high'];
          }
          if (allData[i]['low'] <= chartStats['low']) {
            chartStats['tsLow'] = allData[i]['time'];
            chartStats['low'] = allData[i]['low'];
          }
          chartStats['volumefrom'] += allData[i]['volumefrom'];
          chartStats['volumeto'] += allData[i]['volumeto'];
        } else if (arrayToReturn.length == indexForStats || chartStats['open'] == 0) {
          chartStats['close'] = allData[i]['close'];
          chartStats['open'] = allData[i]['open'];
          chartStats['high'] = allData[i]['high'];
          chartStats['tsHigh'] = allData[i]['time'];
          chartStats['low'] = allData[i]['low'];
          chartStats['tsLow'] = allData[i]['time'];
          chartStats['volumefrom'] = allData[i]['volumefrom'];
          chartStats['volumeto'] = allData[i]['volumeto'];
        }
        currentTimestamp = currentTimestamp + interval;
      };
      timestampToStop = chartData.TimeTo;
      while (currentTimestamp <= timestampToStop) {
        var newValue = {};
        newValue['time'] = currentTimestamp * 1000;
        newValue['close'] = prevClose;
        newValue['high'] = prevClose;
        newValue['low'] = prevClose;
        newValue['open'] = prevClose;
        newValue['volumefrom'] = 0;
        newValue['volumeto'] = 0;
        if (dateFormat) {
          newValue['formatedDate'] = $filter('date')(new Date(newValue['time']), dateFormat);
        }
        arrayToReturn.push(newValue);
        currentTimestamp = currentTimestamp + interval;
      }
      return {
        data: arrayToReturn,
        stats: chartStats
      };
  },
  polyfillChartData2: function (result, interval) {
      if (!result) return false;
      var arrayToReturn = [];
      if (typeof result["candles"] !== "undefined") {
        var chartData = result["candles"];
        for (var i = 0; i < chartData.length; i++) {
           newValue = {
            time: chartData[i][0],
            open: chartData[i][1],
            high: chartData[i][2],
            low: chartData[i][3],
            close: chartData[i][4],
            news: chartData[i][4],
           };
           arrayToReturn.push(newValue);
        } 
      }

      return {
        data: arrayToReturn
      };
  },
  addExponentialMovingAverageDataPoints: function (dataSetProvider, dataSetForIndicators, period, field, avgField) {
      var sum = 0;
      var totalPoints = 0;
      var emaMultiplier = 2 / (period + 1);
      var firstEMA = 0;
      if (period > dataSetForIndicators.length) {
        if (dataSetForIndicators.length == 0) {
          sum = dataSetProvider[0][field];
          totalPoints = 1;
        } else {
          for (var i = 0; i < dataSetForIndicators.length; i++) {
            if(dataSetProvider[i][field]) sum += dataSetProvider[i][field];
          }
          totalPoints = dataSetForIndicators.length;
        }
      } else {
        for (var i = dataSetForIndicators.length - period; i < dataSetForIndicators.length; i++) {
          if(dataSetProvider[i][field]) sum += dataSetProvider[i][field];
        }
        totalPoints = period;
      }
      firstEMA = this.reduceFloatVal(sum / totalPoints);
      dataSetProvider[0][avgField] = firstEMA;
      for (var i = 1; i < dataSetProvider.length; i++) {
        if(dataSetProvider[i][field]) dataSetProvider[i][avgField] = (dataSetProvider[i][field] - dataSetProvider[i - 1][avgField]) * emaMultiplier + dataSetProvider[i - 1][avgField];
      }
  },
  MACDsettings: {
    fatsLength: 12,
    slowLength: 26,
    signal: 9,
    source: 'close',
  },
  MAsettings: {
    name: 'MA (9, close)',
    cName: 'MA',
    length: 9,
    source: 'close',
  },
  SAsettings: {
    name: 'SA (89, close)',
    cName: 'SA',
    length: 89,
    source: 'close',
  },
  FAsettings: {
    name: 'FA (80, close)',
    length: 80,
    cName: 'FA',
    source: 'close',
    Offset: 0,
    phase: 0,
    BarCount: 40,
    NumOfBars: 10000,
  },
  TMAsettings: {
    name: 'Trendy Pivots',
    length: 41,
    source: 'close',
    timeframes: [
      {name: "M5", period: 300, active: true, color: '#4300f4'},
      {name: "M15", period: 900, active: false, color: '#FF0040'},
      {name: "M30", period: 3600, active: false, color: '#008639'},
      {name: "H1", period: 3600, active: true, color: '#009EC3'},
      {name: "H4", period: 14400, active: false, color: '#8D0081'},
      {name: "D1", period: 86400, active: false, color: '#FF7D16'},
      {name: "W1", period: 86400, active: false, color: '#999999'},
    ]
  },
  currency: {
    'EUR/USD': 1,
    'USD/JPY': 3,
    'GBP/USD': 2,
    'USD/CHF': 4,
    'USD/CAD': 7,
    'EUR/JPY': 9,
    'AUD/USD': 5,
    'NZD/USD': 8,
    'EUR/GBP': 6,
    'EUR/CHF': 10,
    'CAD/CHF': 14,
    'AUD/JPY': 49,
    'GBP/JPY': 11,
    'CHF/JPY': 13,
    'EUR/CAD': 16,
    'EUR/NOK': 37,
    'USD/SEK': 41,
    'AUD/CAD': 47,
    'CAD/JPY': 51,
    'NZD/JPY': 58,
    'AUD/NZD': 50,
    'GBP/AUD': 53,
    'USD/NOK': 59,
    'EUR/AUD': 15,
    'GBP/CHF': 12,
    'EUR/NZD': 52,
    'AUD/CHF': 48,
    'GBP/NZD': 55,
    'USD/SGD': 42,
    'USD/HKD': 155,
    'USD/DKK': 43,
    'GBP/CAD': 54,
  },
  NewsSettings: {
    from: '',
    to: '',
    max: 4,
    high: true,
    medium: true,
    low: true,
    USD: true,
    EUR: true,
    JPY: true,
    GBP: true,
    CAD: true,
    AUD: true,
    ALL: true,
  },
  T6Settings: {
    alert: true,
  },
  SP: {
    alert: true,
    maperiods: 5, 
    atrperiods: 14,
    SColor: '#008000',
    RColor: '#ff0000',
    STickness: 3,
    RTickness: 3,
    SAlpha: 1,    
    RAlpha: 1,
    hidden: false,
  },
  TDP: {
    period_1: 7,
    period_2: 21,
    period_3: 60,
  },
  TDots: [
     {
      type: 'H',
      color: '#ff0000',
     },
     {
      type: 'H',
      color: '#ff0000',
     },
     {
      type: 'H',
      color: '#ff0000',
     },
     {
      type: 'L',
      color: '#008000',
     },
     {
      type: 'L',
      color: '#008000',
     },
     {
      type: 'L',
      color: '#008000',
     }
  ],
  MACDCalcul: function (dataSet, dataSetForIndicators, settings) {
    var EMAField1 = "EMA" + settings.fatsLength;
    var EMAField2 = "EMA" + settings.slowLength;
    var MACDLineField = settings.type + "Line";
    var MACDSignalLineField = settings.type + "SignalLine";
    var MACDHistogramField = settings.type + "Histogram";
  
    dataSetForIndicatorsLocal = dataSetForIndicators.slice(0, dataSetForIndicators.length - settings.signal);
    dataSetProviderLocal = dataSetForIndicators.slice(dataSetForIndicators.length - settings.signal).concat(dataSet.dataProvider);
    this.addExponentialMovingAverageDataPoints(dataSetProviderLocal, dataSetForIndicatorsLocal, settings.fatsLength, settings.source, EMAField1);
    this.addExponentialMovingAverageDataPoints(dataSetProviderLocal, dataSetForIndicatorsLocal, settings.slowLength, settings.source, EMAField2);
    for (var i = 0; i < dataSetProviderLocal.length; i++) {
      if(dataSetProviderLocal[i][settings.source]) dataSetProviderLocal[i][MACDLineField] = this.reduceFloatVal(dataSetProviderLocal[i][EMAField1] - dataSetProviderLocal[i][EMAField2]);
    };
    var dataSetForIndicatorsLocal = dataSetProviderLocal.slice(0, settings.signal);
    dataSetProviderLocal = dataSetProviderLocal.slice(settings.signal);
    this.addExponentialMovingAverageDataPoints(dataSetProviderLocal, dataSetForIndicatorsLocal, settings.signal, MACDLineField, MACDSignalLineField);
    for (var i = 0; i < dataSetProviderLocal.length; i++) {
      if(dataSetProviderLocal[i][settings.source]) dataSetProviderLocal[i][MACDHistogramField] = this.reduceFloatVal(dataSetProviderLocal[i][MACDLineField] - dataSetProviderLocal[i][MACDSignalLineField]);
    };
    // if (settings.edit) {
      dataSet.dataProvider = dataSetProviderLocal;
    // }
  },
  addMACD: function (dataSet, panels, dataSetForIndicators, _sts, old) {
      var settings = {
        fullName: 'MACD ('+_sts.fatsLength+',  '+_sts.slowLength+', '+_sts.signal+', '+_sts.source+')',
        type: 'MACD-'+panels.length,
      }; 
      var EMAField1 = "EMA" + _sts.fatsLength;
      var EMAField2 = "EMA" + _sts.slowLength;
      var MACDLineField = settings.type + "Line";
      var MACDSignalLineField = settings.type + "SignalLine";
      var MACDHistogramField = settings.type + "Histogram";
      
      // _sts = ci_chart.MACDsettings;
      // _sts.type = 'MACD-'+ci_chart.config.panels.length; 
      // _sts.edit = true; 

      dataSet.fieldMappings.push({
        fromField: MACDLineField,
        toField: MACDLineField
      });
      dataSet.fieldMappings.push({
        fromField: MACDSignalLineField,
        toField: MACDSignalLineField
      });
      dataSet.fieldMappings.push({
        fromField: MACDHistogramField,
        toField: MACDHistogramField
      });

      ci_chart.MACDCalcul(dataSet, currentData.data.slice(0, this.maxIndicatorPeriod), _sts);
      if(old){
        bpanel = old; 
      }else{
      bpanel = new AmCharts.StockPanel();
      bpanel.title = settings.fullName;
      bpanel.id = 'MACD-'+panels.length;
      bpanel.cName = 'MACD';
      bpanel.fatsLength = _sts.fatsLength;
      bpanel.slowLength = _sts.slowLength;
      bpanel.signal = _sts.signal;
      bpanel.source = _sts.source;
      bpanel.showCategoryAxis = false;
      bpanel.categoryAxis.gridAlpha = 0.2;
      bpanel.categoryAxis.axisAlpha = 1;
      bpanel.valueAxes = [{
          gridAlpha: 0.2,
          axisAlpha: 1,
          position: "right"
        }];
      bpanel.percentHeight = 37;
      bpanel.stockGraphs = [];
      bpanel.stockLegend = { markerType: "none" };
      var graphMACDLine = {
        valueField: MACDLineField,
        useDataSetColors: false,
        responsive: { enabled: true },
        balloonText: "MACD: <b>[[value]]</b>",
        lineThickness: 1,
        precision: 5,
        lineColor: "#0094ff",
        title: "MACD",
        legendColor: "red"
      };
      var graphMACDSignalLine = {
        valueField: MACDSignalLineField,
        useDataSetColors: false,
        responsive: { enabled: true },
        balloonText: "Signal: <b>[[value]]</b>",
        lineThickness: 1,
        precision: 5,
        lineColor: "#ff6a00",
        title: "Signal"
      };
      var graphMACDHistogram = {
        valueField: MACDHistogramField,
        useDataSetColors: false,
        responsive: { enabled: true },
        balloonText: "Histogram: <b>[[value]]</b>",
        type: "column",
        columnWidth: 0,
        lineColor: "#ff006e",
        precision: 5,
        title: "Histogram"
      };
 
      bpanel.stockGraphs.push(graphMACDLine);
      bpanel.stockGraphs.push(graphMACDSignalLine);
      bpanel.stockGraphs.push(graphMACDHistogram);
     }

      panels.push(bpanel);
      return bpanel;
  },
  addTMA: function (dataSet, panels, dataSetForIndicators) {
      
      _this = this;
      var _TMAcurrentData;
      bpanel = new AmCharts.StockPanel();
      bpanel.title = _this.TMAsettings.name;
      bpanel.id = 'TMA';
      bpanel.cName = 'TMA';
      bpanel.showCategoryAxis = false;
      bpanel.categoryAxis.gridAlpha = 0.2;
      bpanel.categoryAxis.axisAlpha = 1;
      bpanel.valueAxes = [{
          gridAlpha: 0.2,
          axisAlpha: 1,
          position: "right"
        }];
      bpanel.percentHeight = 37;
      bpanel.stockGraphs = [];
      bpanel.stockLegend = { markerType: "none" };
      var theGraph;
      var lastTime = 0;
      _limit = dataSetForIndicators.length; 
      $.ajax({async: false, url: 'ajax/get.php?pair_id='+_this.currency[$('.sambols').val().replace('-', '/')]+'&candle_count='+_limit+'&pair_interval=60&chart_type=candlestick', success: function(result) {
              
              _TMAcurrentDataSet = _this.polyfillChartData2(result, _d.period);
              
              for (var __i = 0; __i < _this.TMAsettings.timeframes.length; __i++) {
                    _d = _this.TMAsettings.timeframes[__i];
                    if (_d.active) {
                       theGraph = {
                         type: "line",
                         valueField: 'TMA'+_d.name,
                         useDataSetColors: false,
                         showBalloon: false,
                         lineThickness: 2,
                         precision: 5,
                         lineColor: _d.color,
                         title: _d.name,
                         legendColor: "red"
                       }; 
                       bpanel.stockGraphs.push(theGraph);
                       dataSet.fieldMappings.push({
                         fromField: 'TMA'+_d.name,
                         toField: 'TMA'+_d.name
                       });
                       for (var i = 0; i < dataSetForIndicators.length; i++) {
                         var _sum = 0;
                          if (dataSetForIndicators[i].time) {
                            if (i >= _this.TMAsettings.length) {
                              for (var j = i - (_this.TMAsettings.length - 1); j <= i; j++) {
                                  _sum += _TMAcurrentDataSet.data[j][_this.TMAsettings.source];
                              }
                              dataSetForIndicators[i]['TMA'+_d.name] = _sum / _this.TMAsettings.length;
                            } else {
                              for (var j = 0; j <= i; j++) {
                                 _sum += _TMAcurrentDataSet.data[j][_this.TMAsettings.source];
                              }
                              dataSetForIndicators[i]['TMA'+_d.name] = _sum / (i + 1);
                            }
                          }
                       }
                    }
              }
         }, dataType: "json"});
     
      panels.push(bpanel);
  },
  doVal: function (data, dataDate){
      _f = [];
      dataDate = dataDate.getFullYear()+dataDate.getMonth()+dataDate.getDay()+dataDate.getHours();
      for (o in data){
         _date = new Date(data[o].time);
         _date = _date.getFullYear()+_date.getMonth()+_date.getDay()+_date.getHours();
         if (_date == dataDate) {
            _f.push(data[o]);
         }
      } 
  },
  MACalcul: function (dataSet, dataSetForIndicators, avgField, setting, edit, TMA) {
      // if (!edit) {
      //    dataSet.fieldMappings.push({
      //      fromField: avgField,
      //      toField: avgField
      //    });
      // }
      var newdataSetForIndicators = dataSetForIndicators;
      for (var i = 0; i < dataSetForIndicators.length; i++) {
        var sum = 0;
        if (i >= setting.length) {
          for (var j = i - (setting.length - 1); j <= i; j++) {
            if(dataSetForIndicators[j][setting.source]) sum += dataSetForIndicators[j][setting.source];
          }
          if(dataSetForIndicators[i][setting.source]) newdataSetForIndicators[i][avgField] = sum / setting.length;
        } else {
          for (var j = 0; j <= i; j++) {
            if(dataSetForIndicators[j][setting.source]) sum += dataSetForIndicators[j][setting.source];
          }
          if(dataSetForIndicators[i][setting.source]) newdataSetForIndicators[i][avgField] = sum / (i + 1);
        }
      }
      if (edit) {
         if(!TMA) {
          dataSet.dataProvider = newdataSetForIndicators;
         } else {
          return newdataSetForIndicators;
         }
      }
  },
  FACalcul: function (dataSet, dataSetForIndicators, avgField, setting, edit) {
      // if (!edit) {
      //   dataSet.fieldMappings.push({
      //     fromField: avgField,
      //     toField: avgField
      //   });
      // }
      var Bars = dataSetForIndicators.length;
      var ExtMapBuffer1 = [];
      newdataSetForIndicators = dataSetForIndicators;
      var firstTime=true, AccountedBars=0, jj=0, ii=0, shift=0, series=0, vv=0, v1=0, v2=0, v3=0, v4=0, 
      s8=0, s10=0, s18=0, s20=0, v5=0, v6=0, s28=0, s30=0, s38=0, s40=0, s48=0, s50=0, s58=0, s60=0, 
      s68=0, s70=0, f8=0, f10=0, f18=0, f20=0, f28=0, f30=0, f38=0, f40=0, f48=0, f50=0, f58=0, 
      f60=0, f68=0, f70=0, f78=0, f80=0, f88=0, f90=0, f98=0, fA0=0, fA8=0, fB0=0, fB8=0, 
      fC0=0, fC8=0, fD0=0, f0=0, fD8=0, fE0=0, fE8=0, fF0=31, fF8=0, value2=0, JMA=0, 
      prevtime=0, list=[127], ring1=[127], ring2=[10], buffer=[61];

      if (firstTime)
      {
        AccountedBars = Bars-setting.BarCount;
        firstTime=false;
      }

      if ((CurTime()-prevtime)<30) return(-1);

      prevtime=CurTime();

      s28 = 63; 
      s30 = 64; 
      for (ii = 1 ; ii <= s28 ; ii++)
      { 
        list[ii] = -1000000; 
      } 
      for (ii = s30 ; ii <= 127  ; ii++)
      { 
        list[ii] = 1000000; 
      } 
      f0 = 1; 
    
      for (shift=0; shift <= dataSetForIndicators.length; shift++)
      { 
         if (typeof dataSetForIndicators[shift] !== "undefined") {
          series = dataSetForIndicators[shift][setting.source];
        }else{
          series = null;
        }
        if(series){
         if (fF0 < 61) { 
           fF0 = fF0 + 1; 
           buffer[fF0] = series; 
         }
         if (fF0 > 30) 
         {
           if (setting.length < 1.0000000002) {
             f80 = 0.0000000001; 
           }else{
             f80 = (setting.length - 1) / 2.0; 
           }
           
           if (setting.phase < -100) {
             f10 = 0.5;
           }else{
             if (setting.phase > 100)
             { 
                  f10 = 2.5;
             } 
             else
             {
               f10 = setting.phase / 100 + 1.5; 
             }
           }
         
           v1 = Math.log(Math.sqrt(f80)); 
           v2 = v1; 
           if (v1 / Math.log(2.0) + 2.0 < 0.0) 
           {
             v3 = 0;
           } else  {
             v3 = v2 / Math.log(2.0) + 2.0;
           } 
           f98 = v3; 
         
           if (0.5 <= f98 - 2.0) { 
             f88 = f98 - 2.0;
           } else {
             f88 = 0.5;
           } 
         
           f78 = Math.sqrt(f80) * f98;
           f90 = f78 / (f78 + 1.0); 
           f80 = f80 * 0.9; 
           f50 = f80 / (f80 + 2.0); 
         
           if (f0 != 0) 
           {
             f0 = 0; 
             v5 = 0; 
             for ( ii = 1 ; ii <=29 ; ii++ ) 
             { 
               if (buffer[ii+1] != buffer[ii])
               {
                 v5 = 1.0;
               } 
             } 
             
             fD8 = v5*30.0; 
             if (fD8 == 0)
             { 
               f38 = series;
             } 
             else 
             {
               f38 = buffer[1]; 
             }
             f18 = f38; 
             if (fD8 > 29) 
               fD8 = 29; 
           }
           else 
             fD8 = 0; 
           
           for ( ii = fD8 ; ii >= 0 ; ii-- )
           { 
             value2=31-ii; 
             if (ii == 0)
             { 
               f8 = series;
             } 
             else 
             {
               f8 = buffer[value2]; 
             }
             f28 = f8 - f18; 
             f48 = f8 - f38; 
             if (Math.abs(f28) > Math.abs(f48)) 
             {
               v2 = Math.abs(f28);
             } 
             else 
             {
               v2 = Math.abs(f48); 
             }
             fA0 = v2; 
             vv = fA0 + 0.0000000001; //{1.0e-10;} 
             
             if (s48 <= 1)
             { 
               s48 = 127;
             } 
             else
             { 
               s48 = s48 - 1;
             } 
             if (s50 <= 1) 
             {
               s50 = 10;
             } 
             else 
             {
               s50 = s50 - 1;
             } 
             if (s70 < 128) 
               s70 = s70 + 1; 
             s8 = s8 + vv - ring2[s50]; 
             ring2[s50] = vv; 
             if (s70 > 10) 
             {
               s20 = s8 / 10;
             } 
             else 
               s20 = s8 / s70; 
             
             if (s70 > 127) 
             {
               s10 = ring1[s48]; 
               ring1[s48] = s20; 
               s68 = 64; 
               s58 = s68; 
               while (s68 > 1) 
               { 
                 if (list[s58] < s10) 
                 {
                   s68 = s68 *0.5; 
                   s58 = s58 + s68; 
                 }
                 else 
                 if (list[s58] <= s10) 
                 {
                   s68 = 1; 
                 }
                 else 
                 { 
                   s68 = s68 *0.5; 
                   s58 = s58 - s68; 
                 } 
               } 
             }
             else 
             { 
               ring1[s48] = s20; 
               if (s28 + s30 > 127) 
               {
                 s30 = s30 - 1; 
                 s58 = s30; 
               }
               else 
               { 
                 s28 = s28 + 1; 
                 s58 = s28; 
               } 
               if (s28 > 96) 
               {
                 s38 = 96;
               } 
               else 
                 s38 = s28; 
               if (s30 < 32)
               { 
                 s40 = 32;
               } 
               else 
                 s40 = s30; 
             } 
             
             s68 = 64; 
             s60 = s68; 
             while (s68 > 1) 
             { 
               if (list[s60] >= s20) 
               {
                 if (list[s60 - 1] <= s20) 
                 {
                   s68 = 1; 
                 }
                 else 
                 { 
                   s68 = s68 *0.5; 
                   s60 = s60 - s68; 
                 } 
               }
               else 
               { 
                 s68 = s68 *0.5; 
                 s60 = s60 + s68; 
               } 
               if ((s60 == 127) && (s20 > list[127])) 
                 s60 = 128; 
             } 
             
             if (s70 > 127) 
             {
               if (s58 >= s60) 
               {
                 if ((s38 + 1 > s60) && (s40 - 1 < s60)) 
                 {
                   s18 = s18 + s20;
                 }
                 else 
                 if ((s40 > s60) && (s40 - 1 < s58)) 
                   s18 = s18 + list[s40 - 1]; 
               }
               else 
               if (s40 >= s60) 
               {
                 if ((s38 + 1 < s60) && (s38 + 1 > s58)) 
                   s18 = s18 + list[s38 + 1]; 
               }
               else 
               if (s38 + 2 > s60)
               { 
                 s18 = s18 + s20;
               }
               else 
               if ((s38 + 1 < s60) && (s38 + 1 > s58)) 
                 s18 = s18 + list[s38 + 1]; 
               
               if (s58 > s60) 
               {
                 if ((s40 - 1 < s58) && (s38 + 1 > s58)) 
                 {
                   s18 = s18 - list[s58];
                 }
                 else 
                 if ((s38 < s58) && (s38 + 1 > s60)) 
                   s18 = s18 - list[s38]; 
               }
               else 
               { 
                 if ((s38 + 1 > s58) && (s40 - 1 < s58)) 
                 {
                   s18 = s18 - list[s58];
                 } 
                 else 
                 if ((s40 > s58) && (s40 < s60)) 
                   s18 = s18 - list[s40]; 
               } 
             } 
             
             if (s58 <= s60) 
             {
               if (s58 >= s60) 
               {
                 list[s60] = s20;
               } 
               else 
               { 
                 for ( jj = s58 + 1 ; jj <= s60 - 1 ; jj++ ) 
                 { 
                   list[jj - 1] = list[jj]; 
                 } 
                 list[s60 - 1] = s20; 
               } 
             }
             else 
             { 
               for ( jj = s58 - 1 ; jj >= s60 ; jj-- )
               {
                 list[jj + 1] = list[jj]; 
               } 
               list[s60] = s20; 
             } 
             
             if (s70 <= 127) 
             {
               s18 = 0; 
               for (jj = s40 ; jj <= s38 ; jj++)
               {
                 s18 = s18 + list[jj]; 
               } 
             } 
             f60 = s18 / (s38 - s40 + 1); 
             if (fF8 + 1 > 31)
             { 
               fF8 = 31;
             }
             else
               fF8 = fF8 + 1; 
             
             if (fF8 <= 30) 
             {
               if (f28 > 0)
               { 
                 f18 = f8;
               }
               else 
                 f18 = f8 - f28 * f90; 
               if (f48 < 0)
               { 
                 f38 = f8;
               } 
               else 
                 f38 = f8 - f48 * f90; 
               fB8 = series; 
             
               if (fF8 != 30)
               { 
                 continue; 
               }
               if (fF8 == 30) 
               {
                 fC0 = series; 
                 if (Math.ceil(f78) >= 1)
                 { 
                   v4 = Math.ceil(f78);
                 } 
                 else 
                   v4 = 1; 
                 fE8 = Math.ceil(v4); 
                 if (Math.floor(f78) >= 1)
                 { 
                   v2 = Math.floor(f78);
                 } 
                 else 
                   v2 = 1; 
                 fE0 = Math.ceil(v2); 
                 if (fE8 == fE0)
                 { 
                   f68 = 1;
                 } 
                 else 
                 { 
                   v4 = fE8 - fE0; 
                   f68 = (f78 - fE0) / v4; 
                 } 
                 if (fE0 <= 29)
                 { 
                   v5 = fE0;
                 }
                 else 
                   v5 = 29; 
                 if (fE8 <= 29) 
                 {
                   v6 = fE8;
                 } 
                 else 
                   v6 = 29; 
                 fA8 = (series - buffer[fF0 - v5]) * (1 - f68) / fE0 + (series - buffer[fF0 - v6]) * f68 / fE8; 
               } 
             }
             else 
             { 
               if (f98 >= Math.pow(fA0/f60, f88))
               { 
                 v1 = Math.pow(fA0/f60, f88);
               } 
               else 
                 v1 = f98; 
               if (v1 < 1)
               { 
                 v2 = 1;
               }
               else 
               { 
                 if (f98 >= Math.pow(fA0/f60, f88))
                 { 
                   v3 = Math.pow(fA0/f60, f88);
                 } 
                 else 
                   v3 = f98; 
                 v2 = v3; 
               } 
               f58 = v2; 
               f70 = Math.pow(f90, Math.sqrt(f58)); 
               if (f28 > 0)
               { 
                 f18 = f8;
               } 
               else 
               {
                 f18 = f8 - f28 * f70; 
               }
               if (f48 < 0)
               { 
                 f38 = f8; 
               }
               else 
               {
                 f38 = f8 - f48 * f70;
               } 
             }   
           } 
         
           if (fF8 > 30) 
           {
             f30 = Math.pow(f50, f58); 
             fC0 = (1 - f30) * series + f30 * fC0; 
             fC8 = (series - fC0) * (1 - f50) + f50 * fC8; 
             fD0 = f10 * fC8 + fC0; 
             f20 = -f30 * 2; 
             f40 = f30 * f30; 
             fB0 = f20 + f40 + 1; 
             fA8 = (fD0 - fB8) * fB0 + f40 * fA8; 
             fB8 = fB8 + fA8; 
           } 
           JMA= fB8; 
         } 
         if (fF0 <= 30)
         { 
           JMA=0;
         }

         if(typeof newdataSetForIndicators[shift-setting.Offset] !== "undefined") newdataSetForIndicators[shift-setting.Offset][avgField]=JMA;  
      }
      }
       
      if (edit) {
        dataSet.dataProvider = newdataSetForIndicators;
      }
  },
  addIndicator: function(avgField, dataSet, panel, color, settings, oldDash){

       dataSet.fieldMappings.push({
         fromField: avgField,
         toField: avgField
       });
    
       if (settings.cName == "FA") {
        this.FACalcul(Chart.dataSets[0], currentDataSet.data, avgField, settings, 1);
       }else{
         this.MACalcul(Chart.dataSets[0], currentDataSet.data, avgField, settings, 1);
       }
    
       if (!oldDash) {
        var graph = new AmCharts.StockGraph();
         graph.closeField = "close";
         graph.useDataSetColors = false;
         graph.highField = "high";
         graph.lowField = "low";
         graph.openField = "open";
         graph.precision = 5;
         if(settings.cName == "FA" || settings.cName == "SA"){
           graph.showBalloon = false;
         }
         graph.lineColor = color;
         graph.cName = settings.cName;
         graph.sName = settings.name;
         graph.sLength = settings.length;
         graph.sSource = settings.source;
         if(settings.phase !== undefined) graph.sPhase = settings.phase;
         if(settings.Offset !== undefined) graph.sOffset = settings.Offset;
         graph.valueField = avgField;
       }else{
        var graph = oldDash;
       }
       panel.stockGraphs.push(graph);
      
       return graph;
  },
  isNumber: function (n) {
      return typeof n === 'number' && !isNaN(n);
  },
  sum: function(arr) {
        var len = arr.length,
            ret;
        if (!len && arr.hasNulls) {
            ret = null;
        } else if (len) {
            ret = 0;
            while (len--) {
                ret += arr[len];
            }
        }
        return ret;
  },
  average: function (arr) {
        var len = arr.length,
            ret = this.sum(arr);
        if (this.isNumber(ret) && len) {
            ret = ret / len;
        }
        return ret;
  },
  iATR: function (periods, data, shift) {  

      var trueRange;  

      if (!previousClose) {
          previousClose = data[shift].close;
          return null;
      }
      
      trueRange = Math.max(
          data[shift].high - data[shift].low,
          Math.abs(data[shift].high - previousClose),
          Math.abs(data[shift].low - previousClose)
      );  

      previousClose = data[shift].close;  

      if (trueRangeValues.length < periods) {
          trueRangeValues.push(trueRange);
          
          if (trueRangeValues.length < periods) {
              return null;
          } else {
              averageTrueRange = this.average(trueRangeValues);
              return averageTrueRange;
          }
      } else {
   
          averageTrueRange = ((averageTrueRange * (periods - 1)) + trueRange) / periods;
          return averageTrueRange;
      }
  },
  iMA: function (periods, data, shift) {
      var sum = 0;
      if (shift >= periods) {
        for (var j = shift - (periods - 1); j <= shift; j++) {
          if(data[j].close) sum += data[j].close;
        }
        return sum / periods;
      } else {
        for (var j = 0; j <= shift; j++) {
          if(data[j].close) sum += data[j].close;
        }
        return sum / (shift + 1);
      }
  },
  ADX: function (Bars, data) {
      PlusSdiBuffer = [];
      MinusSdiBuffer = [];
      PlusDiBuffer = [];
      MinusDiBuffer = [];
      TempBuffer = [];
      ADXBuffer = [];

      var pdm,mdm,tr;
      var price_high,price_low;
      var starti,__i;
      counted_bars = Bars;
      
      __i=Bars-2;
      PlusSdiBuffer[0]=0;
      MinusSdiBuffer[0]=0;
    
      for (var _o = 0; _o<(Bars+2); _o++)
      {

         if (typeof data[_o] == "undefined" || typeof data[_o-1] == "undefined"){
           continue;
         }
    
         price_low=data[_o].low;
         price_high=data[_o].high;
         
         pdm=price_high-data[_o-1].high;
         mdm=data[_o-1].low-price_low;
         if(pdm<0) { pdm=0; }
         if(mdm<0) { mdm=0; }
         if(pdm==mdm) { pdm=0; mdm=0; }
         else if(pdm<mdm) { pdm=0; }
         else if(mdm<pdm) { mdm=0; }
     
         num1=Math.abs(price_high-price_low);
         num2=Math.abs(price_high-data[_o-1].close);
         num3=Math.abs(price_low-data[_o-1].close);
         tr=Math.max(num1,num2);
         tr=Math.max(tr,num3);
         
         if(tr==0) {   

           PlusSdiBuffer[_o]=0; 
           MinusSdiBuffer[_o]=0; 
         } else {   

           PlusSdiBuffer[_o]=100.0*pdm/tr; 
           MinusSdiBuffer[_o]=100.0*mdm/tr; 
         }
         
      }
  },
  iADX: function (Bars, data, period, type, shi, id) {
    
      if (type == "+") {
        return this.iMAOnArray(PlusSdiBuffer, period, shi, id);
      }else if (type == "-"){
        return this.iMAOnArray(MinusSdiBuffer, period, shi, id);
      } 
  },
  iMAOnArray: function (data, periods, shift, id) {
     
        if (data[shift] == undefined) {
             data[shift] = 0;
        }

        if (_nbBarsSeen[id] == undefined) {
             _nbBarsSeen[id] = 0;
        }

        if (_ema[id] == undefined) {
             _ema[id] = 0;
        }

        _val = data[shift];

        _nbBarsSeen[id] = _nbBarsSeen[id] + 1;
        
        if (_nbBarsSeen[id] == periods) {
          _ema[id] = (_ema[id] + _val) / periods;
        } else {
          _ema[id] = _ema[id] + ((_val - _ema[id]) * 2 / (periods + 1));
        }

        return _ema[id];
   
  },
  TDCalcul: function (dataSets, data, avgField, periods, edit) {
  
    newData = data;
    _ema = {};
    _nbBarsSeen = {};

    for(var ox = 0; ox <= data.length; ox++){
      if(typeof data[ox] !== "undefined") {
          newData[ox][avgField+'H1'] = this.CheckCross(data, ox, periods.period_1, 'high', 1, "1");
          newData[ox][avgField+'H2'] = this.CheckCross(data, ox, periods.period_2, 'high', 2, "2");
          newData[ox][avgField+'H3'] = this.CheckCross(data, ox, periods.period_3, 'high', 3, "3");
          newData[ox][avgField+'L1'] = this.CheckCross(data, ox, periods.period_1, 'low', 1, "4");
          newData[ox][avgField+'L2'] = this.CheckCross(data, ox, periods.period_2, 'low', 2, "5");
          newData[ox][avgField+'L3'] = this.CheckCross(data, ox, periods.period_3, 'low', 3, "6");
      }
    }
    
    dataSets.dataProvider = newData;

  },
  CheckCross: function (data, bar, periods, type, number, id) {

       p1=this.iMAOnArray(PlusSdiBuffer,  periods, bar-1, id+"1");
       p0=this.iMAOnArray(PlusSdiBuffer,  periods, bar, id+"2");
       m1=this.iMAOnArray(MinusSdiBuffer, periods, bar-1, id+"3");
       m0=this.iMAOnArray(MinusSdiBuffer, periods, bar, id+"4");

       if (p1>m1 && p0<m0 && type == 'low')
       {  

           _adp = ((0.1/100)*data[bar].low);
          return data[bar].low-(_adp*number);
          // Low
       }

       if (p1<m1 && p0>m0 && type == 'high')
       {
           _adp = ((0.1/100)*data[bar].high);
           return data[bar].high+(_adp*number);
          // High
       }
 
       return null;
  },
  addTrendyzDots: function(avgField, dataSet, panel, periods, oldDash){
       _number = 1;
       var TDgraph;
       var onetime = 0;
       for (var i = 0; i < this.TDots.length; i++) {
         
         _avg = avgField+this.TDots[i].type+_number;
         
         dataSet.fieldMappings.push({
           fromField: _avg,
           toField: _avg
         });

         TDgraph = new AmCharts.StockGraph();
         TDgraph.name = "TD"+this.TDots[i].type+String(_number);
         TDgraph.closeField = "close";
         TDgraph.bullet = "round";
         TDgraph.labelText = String(_number);
         TDgraph.labelPosition = "middle";
         TDgraph.color = '#000';
         TDgraph.showBalloon = false;
         TDgraph.bulletColor = this.TDots[i].color;
         TDgraph.bulletAlpha = (_number/3);
         TDgraph.bulletSize = 8+(_number*2);
         TDgraph.fontSize = 6+(_number*2);
         TDgraph.useDataSetColors = false;
         TDgraph.highField = "high";
         TDgraph.lowField = "low";
         TDgraph.openField = "open";
         TDgraph.precision = 5;
         TDgraph.lineAlpha = 0;
         TDgraph.cName = "TD";
         TDgraph.sName = "GTMXDots";
         TDgraph.period_1 = periods.period_1;
         TDgraph.period_2 = periods.period_2;
         TDgraph.period_3 = periods.period_3;
         TDgraph.valueField = _avg;

         panel.stockGraphs.push(TDgraph);

         if (_number == 3 && !onetime) {
            _number = 1;
            onetime = 1;
         }else{
           _number++;
         }

       }

       this.TDCalcul(Chart.dataSets[0], currentDataSet.data, avgField, periods);

  },
  iTreandy6: function (bars, s, i){
     
     _r = {};

     if(bars[i].close) {
        a = this.iMA(s.maperiods, bars, i);
        aa = this.iATR(s.atrperiods, bars, i);
        
        _r.UpLine = a + aa;
        _r.DwLine = a - aa;
        
        if ( bars[i].high>=_r.UpLine&& bars[i].open<=_r.UpLine)
           _r.UP = _r.UpLine;
        if ( bars[i].low<=_r.DwLine&& bars[i].open>=_r.DwLine)
           _r.DW = _r.DwLine;
     }

     return _r;
    
  },
  addTest: function (dataSets, panels, data) {

    dataSets.fieldMappings.push({
      fromField: "Plus",
      toField: "Plus"
    });
    dataSets.fieldMappings.push({
      fromField: "Minus",
      toField: "Minus"
    });

    this.ADX(data.length, data);
    _ema["c1"] = 0;
    _ema["c2"] = 0;
    for (_o2 = 1; _o2 < data.length; _o2++) {
      if(typeof data[_o2+1] !== "undefined") {
         data[_o2+1]["Plus"] = this.iMAOnArray(PlusSdiBuffer, 60, _o2, "c1");
         data[_o2+1]["Minus"] = this.iMAOnArray(MinusSdiBuffer, 60, _o2, "c2");
      }
    }

    pnl = new AmCharts.StockPanel();
    var graph1 = {
      valueField: "Plus",
      useDataSetColors: false,
      lineThickness: 1,
      precision: 5,
      lineColor: "green",
      title: "Plus",
    };
    var graph2 = {
      valueField: "Minus",
      useDataSetColors: false,
      lineThickness: 1,
      precision: 5,
      lineColor: "red",
      title: "Minus"
    };
    pnl.stockGraphs.push(graph1);
    pnl.stockGraphs.push(graph2);
    panels.push(pnl);

  },
  addSP: function (dataSet, bars, panel, s) {
 
      if (!s.edit) {
        dataSet.fieldMappings.push({
          fromField: 'CDRW_T6',
          toField: 'CDRW_T6'
        });
      }

      iTrendline = 1;

      panel.trendLines = [];

      for(var i = 0; i < bars.length; i++){
         bars[i]["CDRW_T6"] = this.iTreandy6(bars, s, i);
      }

     if (bars[bars.length-1].CDRW_T6.UpLine!=0 && bars[bars.length-1].CDRW_T6.UpLine!=null && bars.length>UpBar) // When new bar begins to rise and current UpLine is valid
     {
             auxStr ="Long Signal on "+ this.symbols.replace('-', '/');
             if (this.SP.alert) this.Alert(auxStr);
             UpBar=bars.length;
     }
     if (bars[bars.length-1].CDRW_T6.DwLine!=0 && bars[bars.length-1].CDRW_T6.DwLine!=null && bars.length>DwBar)// When new bar begins to rise and current DwLine is valid
     {
             auxStr ="Short Signal on "+ this.symbols.replace('-', '/');
             if (this.SP.alert) this.Alert(auxStr);
             DwBar=bars.length;
     }

      var CuLUP = null;
      var CuLDW = null;
      var Old_valUP = 0;
      var Old_valDW = 0;
      var TrenIndexUP = 0;
      var TrenIndexDW = 0;
      var spd1, spd2;
      previousClose = null;
      trueRangeValues = [];
      averageTrueRange = null;

      for(var i = 0; i < bars.length; i++){

         Offset = 0.0001;
         
         if (!bars[i-1] || !bars[i-2]) {
          continue;
         }

         spd1 = bars[i-1].high - bars[i-1].low;
         spd2 = bars[i-2].high - bars[i-2].low;
         
         v1 = this.iATR(2, bars, i-1);
         v2 = this.iATR(2, bars, i-2);

         _candls = bars[i-1];
   
         if ( spd1 > spd2 ) {

               if ( v1 < v2 ) {
                 
                     if ( _candls.high-_candls.close < _candls.close-_candls.low ) {
                        if (bars[i-1]["CDRW_T6"].UP) {
                          CuLUP = bars[i-1].high;
                        }
                        if (bars[i-1]["CDRW_T6"].DW) {
                          CuLDW = bars[i-1].low;
                        }
                     }   

                     if ( _candls.high-_candls.close > _candls.close-_candls.low ) {
                        if (bars[i-1]["CDRW_T6"].UP) {
                          CuLUP = bars[i-1].high;
                        }
                        if (bars[i-1]["CDRW_T6"].DW) {
                          CuLDW = bars[i-1].low;
                        }
                     }

               }
   
         }

         trend = {
            initialDate: myDate(bars[i-1].time, 'y-m-d H:i'),
            initialValue: CuLUP,
            finalValue: CuLUP,
            finalDate: null,
            lineColor: s.RColor,
            lineThickness: s.RTickness,
            lineAlpha: s.RAlpha,
            isProtected: true,
         };

         trend2 = {
            initialDate: myDate(bars[i-1].time, 'y-m-d H:i'),
            initialValue: CuLDW,
            finalValue: CuLDW,
            finalDate: null,
            lineColor: s.SColor,
            lineThickness: s.STickness,
            lineAlpha: s.SAlpha,
            isProtected: true,
         };

         if (Old_valUP !== CuLUP) {
           panel.trendLines.push(trend);
           TrenIndexUP = panel.trendLines.length-1;
           Old_valUP = CuLUP;
         }else{
           if (panel.trendLines.length) {
             panel.trendLines[TrenIndexUP].finalDate = myDate(bars[i-1].time, 'y-m-d H:i');
           }
         }

         if (Old_valDW !== CuLDW) {
           panel.trendLines.push(trend2);
           TrenIndexDW = panel.trendLines.length-1;
           Old_valDW = CuLDW;
         }else{
           if (panel.trendLines.length) {
             panel.trendLines[TrenIndexDW].finalDate = myDate(bars[i-1].time, 'y-m-d H:i');
           }
         }
      }
 
    if(!s.load)
      Chart.validateNow();
      ci_chart.Loading();
      Chart.validateData();
  },
  Alert: function(val){
      AlertSound = new Audio('../sounds/alert.wav');
      AlertSound.play();
      AlertSound.onplaying = function () {
         alert(val);
      };
  },
  T6Calcul: function (dataSet, bars, avgField, s, edit){
     var newdataSet = bars;
     for (var i = 0; i < bars.length; i++) {
         if(!bars[i].close) continue;
         a = this.iMA(s.maperiods, bars, i);
         aa = this.iATR(s.atrperiods, bars, i);
         
         newdataSet[i]['UpLine'+avgField] = a + aa;
         newdataSet[i]['DwLine'+avgField] = a - aa;
         
         if ( bars[i].high>=newdataSet[i]['UpLine'+avgField]&& bars[i].open<=newdataSet[i]['UpLine'+avgField])
            newdataSet[i]['UP'+avgField]=newdataSet[i]['UpLine'+avgField];
         if ( bars[i].low<=newdataSet[i]['DwLine'+avgField]&& bars[i].open>=newdataSet[i]['DwLine'+avgField])
            newdataSet[i]['DW'+avgField]=newdataSet[i]['DwLine'+avgField];
     }
     
     if (!s.edit) {
      dataSet.dataProvider = newdataSet;
     }
  },
  T6Calcul2: function (dataSet, bars, avgField, s, edit){
     var newdataSet = bars;
     cs_t6_data = [];
     for (var i = 0; i < bars.length; i++) {
         if(!bars[i].close) continue;
         a = this.iMA(s.maperiods, bars, i);
         aa = this.iATR(s.atrperiods, bars, i);
         
         newdataSet[i]['UpLine2'+avgField] = a + aa;
         newdataSet[i]['DwLine2'+avgField] = a - aa;
         
         if ( bars[i].high>=newdataSet[i]['UpLine2'+avgField]&& bars[i].open<=newdataSet[i]['UpLine2'+avgField]){
            if (bars[i].open<bars[i].close) {
              newdataSet[i]['UP2'+avgField]=newdataSet[i].high;
              newdataSet[i]['line'+avgField]=newdataSet[i].high;
            }else{
              newdataSet[i]['UP2'+avgField]=newdataSet[i].low;
              newdataSet[i]['line'+avgField]=newdataSet[i].low;
            }
            cs_t6_data.push({date: bars[i].time});
         }
         if ( bars[i].low<=newdataSet[i]['DwLine2'+avgField]&& bars[i].open>=newdataSet[i]['DwLine2'+avgField]){
          if (bars[i].open<bars[i].close) {
              newdataSet[i]['DW2'+avgField]=newdataSet[i].high;
              newdataSet[i]['line'+avgField]=newdataSet[i].high;
            }else{
              newdataSet[i]['DW2'+avgField]=newdataSet[i].low;
              newdataSet[i]['line'+avgField]=newdataSet[i].low;
            }
            cs_t6_data.push({date: bars[i].time});
         }
     }
     if (!s.edit) {
      dataSet.dataProvider = newdataSet;
     }
  },
  addGTMS6: function (avgField, dataSet, panel, s) {
    dataSet.fieldMappings.push({
      fromField: 'UpLine'+avgField,
      toField: 'UpLine'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'DwLine'+avgField,
      toField: 'DwLine'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'UP'+avgField,
      toField: 'UP'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'DW'+avgField,
      toField: 'DW'+avgField
    });
    
    this.T6Calcul(Chart.dataSets[0], currentDataSet.data, avgField, s);

    var UpLineGraph = new AmCharts.StockGraph();
    UpLineGraph.type = 'line';
    UpLineGraph.name = 'UpLine';
    UpLineGraph.lineColor = '#0000ff';
    UpLineGraph.useDataSetColors = false;
    UpLineGraph.precision = 5;
    UpLineGraph.showBalloon = false;
    UpLineGraph.lineAlpha = 0;
    UpLineGraph.lineThickness = 1;
    UpLineGraph.cName = 'T6'+avgField;
    UpLineGraph.AvgField = avgField;
    UpLineGraph.sName = "GTMS6";
    UpLineGraph.hidden = false;
    UpLineGraph.maperiods = s.maperiods;
    UpLineGraph.atrperiods = s.atrperiods;
    UpLineGraph.valueField = 'UpLine'+avgField;

    var DwLineGraph = new AmCharts.StockGraph();
    DwLineGraph.type = 'line';
    DwLineGraph.name = 'DwLine';
    DwLineGraph.lineColor = '#ff0000';
    DwLineGraph.useDataSetColors = false;
    DwLineGraph.precision = 5;
    DwLineGraph.showBalloon = false;
    DwLineGraph.lineAlpha = 0;
    DwLineGraph.lineThickness = 1;
    DwLineGraph.cName = 'T6'+avgField;
    DwLineGraph.sName = "GTMS6";
    DwLineGraph.hidden = false;
    DwLineGraph.atrperiods = s.atrperiods;
    DwLineGraph.valueField = 'DwLine'+avgField;

    var UpGraph = new AmCharts.StockGraph();
    UpGraph.type = 'line';
    UpGraph.name = 'UP';
    UpGraph.bullet = "round";
    UpGraph.bulletColor = "#b4b5ad";
    UpGraph.bulletSize = 10;
    UpGraph.lineColor = '#008000';
    UpGraph.lineAlpha = 0;
    UpGraph.precision = 5;
    UpGraph.showBalloon = false;
    UpGraph.lineThickness = 1;
    UpGraph.useDataSetColors = false;
    UpGraph.cName = 'T6'+avgField;
    UpGraph.sName = "GTMS6";
    UpGraph.hidden = false;
    UpGraph.maperiods = s.maperiods;
    UpGraph.valueField = 'UP'+avgField;

    var DwGraph = new AmCharts.StockGraph();
    DwGraph.type = 'line';
    DwGraph.name = 'DW';
    DwGraph.bullet = "round";
    DwGraph.bulletColor = "#b4b5ad";
    DwGraph.bulletSize = 10;
    DwGraph.lineColor = '#ff0057';
    DwGraph.lineAlpha = 0;
    DwGraph.precision = 5;
    DwGraph.showBalloon = false;
    DwGraph.lineThickness = 1;
    DwGraph.useDataSetColors = false;
    DwGraph.precision = 5;
    DwGraph.cName = 'T6'+avgField;
    DwGraph.sName = "GTMS6";
    DwGraph.hidden = false;
    DwGraph.atrperiods = s.atrperiods;
    DwGraph.valueField = 'DW'+avgField;

    panel.stockGraphs.push(UpLineGraph);
    panel.stockGraphs.push(DwLineGraph);
    panel.stockGraphs.push(UpGraph);
    panel.stockGraphs.push(DwGraph);

    Chart.validateNow();
    Chart.validateData();
  },
  addGTMS62: function (avgField, dataSet, panel, s) {
    dataSet.fieldMappings.push({
      fromField: 'UpLine2'+avgField,
      toField: 'UpLine2'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'DwLine2'+avgField,
      toField: 'DwLine2'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'UP2'+avgField,
      toField: 'UP2'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'DW2'+avgField,
      toField: 'DW2'+avgField
    });
    dataSet.fieldMappings.push({
      fromField: 'line'+avgField,
      toField: 'line'+avgField
    });
    
    this.T6Calcul2(Chart.dataSets[0], currentDataSet.data, avgField, s);
 
    var UpLineGraph = new AmCharts.StockGraph();
    UpLineGraph.type = 'line';
    UpLineGraph.name = 'UpLine2';
    UpLineGraph.lineColor = '#0000ff';
    UpLineGraph.useDataSetColors = false;
    UpLineGraph.precision = 5;
    UpLineGraph.showBalloon = false;
    UpLineGraph.lineAlpha = 0;
    UpLineGraph.lineThickness = 1;
    UpLineGraph.cName = 'T6'+avgField;
    UpLineGraph.AvgField = avgField;
    UpLineGraph.sName = "GTMS62";
    UpLineGraph.hidden = false;
    UpLineGraph.maperiods = s.maperiods;
    UpLineGraph.atrperiods = s.atrperiods;
    UpLineGraph.valueField = 'UpLine2'+avgField;

    var DwLineGraph = new AmCharts.StockGraph();
    DwLineGraph.type = 'line';
    DwLineGraph.name = 'DwLine';
    DwLineGraph.lineColor = '#ff0000';
    DwLineGraph.useDataSetColors = false;
    DwLineGraph.precision = 5;
    DwLineGraph.showBalloon = false;
    DwLineGraph.lineAlpha = 0;
    DwLineGraph.lineThickness = 1;
    DwLineGraph.cName = 'T6'+avgField;
    DwLineGraph.sName = "GTMS62";
    DwLineGraph.hidden = false;
    DwLineGraph.atrperiods = s.atrperiods;
    DwLineGraph.valueField = 'DwLine2'+avgField;

    var UpGraph = new AmCharts.StockGraph();
    UpGraph.type = 'line';
    UpGraph.name = 'UP';
    UpGraph.bullet = "round";
    UpGraph.bulletColor = "#b4b5ad";
    UpGraph.bulletSize = 5;
    UpGraph.lineColor = '#008000';
    UpGraph.lineAlpha = 0;
    UpGraph.precision = 5;
    UpGraph.showBalloon = false;
    UpGraph.lineThickness = 1;
    UpGraph.useDataSetColors = false;
    UpGraph.cName = 'T6'+avgField;
    UpGraph.sName = "GTMS62";
    UpGraph.hidden = false;
    UpGraph.maperiods = s.maperiods;
    UpGraph.valueField = 'UP2'+avgField;

    var DwGraph = new AmCharts.StockGraph();
    DwGraph.type = 'line';
    DwGraph.name = 'DW';
    DwGraph.bullet = "round";
    DwGraph.bulletColor = "#b4b5ad";
    DwGraph.bulletSize = 5;
    DwGraph.lineColor = '#ff0057';
    DwGraph.lineAlpha = 0;
    DwGraph.precision = 5;
    DwGraph.showBalloon = false;
    DwGraph.lineThickness = 1;
    DwGraph.useDataSetColors = false;
    DwGraph.precision = 5;
    DwGraph.cName = 'T6'+avgField;
    DwGraph.sName = "GTMS62";
    DwGraph.hidden = false;
    DwGraph.atrperiods = s.atrperiods;
    DwGraph.valueField = 'DW2'+avgField;

    var line2 = new AmCharts.StockGraph();
    line2.type = 'line';
    line2.name = 'line';
    line2.lineColor = 'yellow';
    line2.useDataSetColors = false;
    line2.precision = 5;
    line2.dashLength = 5;
    line2.cName = 'T6'+avgField;
    line2.sName = "GTMS62";
    line2.showBalloon = false;
    line2.lineAlpha = 1;
    line2.lineThickness = 1;
    line2.valueField = 'line'+avgField;

    panel.stockGraphs.push(line2);
    panel.stockGraphs.push(UpLineGraph);
    panel.stockGraphs.push(DwLineGraph);
    panel.stockGraphs.push(UpGraph);
    panel.stockGraphs.push(DwGraph);

    Chart.validateNow();
    Chart.validateData();

    cs_chart.addGTMS6(0);
  },
  getCalendarDate: function (a, b) {
     if ("undefined" === typeof a.displayTime) {
       var c = a.displayDate.substring(0, 11) + "12:00:00";
       return c.replace('T',' ');
     }
     c = a.displayDate.substring(0, 11) + a.displayTime.substring(11, 19);
     return c.replace('T',' ');
  },
  dataNews: function (d, to) {
    html = '<table class="table-news" data-type="'+d.Importance.toLowerCase()+'">';
    if (!to) {
      html += '<tr class="dateTime">';
      html += '<td colspan="2" style="color: #f01000;font-weight: 600;">'+myDate(d.ReleaseDate, 'y-m-d H:i:s')+'</td>';
      html += '</tr>';
    }
    html += '<tr>'; 
    html += '<td width="35%"><b>Importance:</b></td><td><span class="label label-default '+d.Importance.toLowerCase()+'">'+d.Importance.toLowerCase()+'</label></td>';
    html += '</tr>';
    if(d.ActualValue){ 
      html += '<tr>'; 
      html += '<td width="35%" valign="top"><b>Actual:</b></td><td valign="top">'+d.ActualValue+'</td>';
      html += '</tr>';
    }
    if(d.ForecastValue){ 
      html += '<tr>'; 
      html += '<td width="35%" valign="top"><b>Forecast:</b></td><td valign="top">'+d.ForecastValue+'</td>';
      html += '</tr>';
    }
    if(d.PreviousValue){ 
      html += '<tr>'; 
      html += '<td width="35%" valign="top"><b>Previous:</b></td><td valign="top">'+d.PreviousValue+'</td>';
      html += '</tr>';
    }
    if(d.EventName){ 
      html += '<tr>'; 
      html += '<td width="35%" valign="top"><b>Name:</b></td><td valign="top" style="font-size:11px;">'+d.EventName+'</td>';
      html += '</tr>';
    }
    html += '</table>';
    if (to) {
         return to+html;
    }else{
      return html;
    }
  },
  sortNews: function (description, date) {
     newHTML = '<table class="table-news" style="margin-bottom:-10px;">';
     newHTML += '<tr class="dateTime">';
     newHTML += '<td colspan="2" style="color: #f01000;font-weight: 600;">'+date+'</td>';
     newHTML += '</tr>';
     newHTML += '</table>';
     sort = ["high", "medium", "low"];
     slimit = 0;
     Dt = '';
     for (var i = 0; i < sort.length; i++) {
        if (i == 0) {
          Dt = $('<div>'+description+'</div>').find('tr.dateTime')[0].outerHTML;
        }
        elm = $('<div>'+description+'</div>');
        elm.find('table').each(function (e){
              if ($(this).find('tr.dateTime').length) {
                  $(this).find('tr.dateTime').remove();
              }
              if ($(this).data('type') == sort[i] && slimit !== parseInt(ci_chart.NewsSettings.max)) {
                newHTML += $(this)[0].outerHTML;
                slimit++;
              }
        });
     }
     return newHTML;
  },
  addNews: function (c, from, to, edit, refresh) {
      if(!refresh) ci_chart.Loading();
      from = myDateFormat(new Date(from), 'y-m-dTH:i:s');
      to = myDateFormat(new Date(to), 'y-m-dTH:i:s');
      $.get('ajax/economic-calendar.php?from='+from+'&to='+to, function (res) {
          
          if (!edit) {
            ci_chart.config.panels[0].stockGraphs.push({
              id: "g1",
              cName: "news",
              sName: "News",
              valueField: "news",
              lineAlpha: 0,
              showBalloon: false,
            });
            Chart.validateNow();
          }
          c.dataSets[0].stockEvents = [];
          _history = null;
          x = 0;
          isD = 0;
          for(d in res){
              _Event = {
                date: myDate(res[d].ReleaseDate, 'y-m-d H:i:s'),
                backgroundColor: "#85CDE6",
                showOnAxis: true,
                type: "sign",
                text: res[d].CurrencyCode.toLowerCase(),
                graph: "g1",
                description: ci_chart.dataNews(res[d])
              };
              if (res[d].Importance && ci_chart.NewsSettings[String(res[d].Importance).toLowerCase()] == false) {
                 continue;
              }
              if (res[d].CurrencyCode && ci_chart.NewsSettings[String(res[d].CurrencyCode).toUpperCase()] == false) {
                 continue;
              }
              if (_history) {
                 if (_history.text == _Event.text && _history.date == _Event.date) {
                     isD++;
                     if(_history.description !== _Event.description) c.dataSets[0].stockEvents[x-1].description = ci_chart.dataNews(res[d], c.dataSets[0].stockEvents[x-1].description);
                 }else{
                   if (isD) {
                       c.dataSets[0].stockEvents[x-1].description = ci_chart.sortNews(c.dataSets[0].stockEvents[x-1].description, c.dataSets[0].stockEvents[x-1].date);
                       isD = 0;
                     }
                     c.dataSets[0].stockEvents.push(_Event);
                     _history = _Event;
                     x++;
                 }
              }else{   
                 c.dataSets[0].stockEvents.push(_Event);
                 _history = _Event;
                 x++;
              }
          }
          loadNews = 1;
          if(!refresh) ci_chart.Loading();
          Chart.validateData();
      }, "json").error(function (x) {
         console.log('Connection has been stopped for a while, but never mind the problem.');
      });
  },
  addResize: function () {
    $('#custom-indicators-chart .amChartsPanel').each(function (i) {
      if (i) {
        $( this ).resizable( {
          animate: false,
          handles: 'n, s',
          animateEasing: 'swing',
          animateDuration: 250,
          alsoResizeReverse: '#custom-indicators-chart .amChartsPanel:eq(0)',
          stop: function( event, ui ) {
            setTimeout(function () { chart.invalidateSize() }, 251 );
          }
        });
      }
    });
  },
  addOptions: function (i) {
    $('#custom-indicators-chart .amChartsPanel').each(function (i) {
      var h = '<div class="options">';
      h += '<a href="javascript:;" '+(i !== 0 ? 'data-id="'+i+'"' : '')+' class="fa fa-eye'+(i == 0 && ci_chart.config.panels[0].stockGraphs[0].hidden ? ' active' : '')+'"></a>';
      h += '<a href="javascript:;" '+(i !== 0 ? 'data-id="'+i+'"' : '')+' class="fa fa-cog"></a>';
      if(i !== 0) h += '<a href="javascript:;" '+(i !== 0 ? 'data-id="'+i+'"' : '')+' class="fa fa-times"></a>';
      h += '</div>';
      if (!$(this).find('.options').length) {
        $(this).find('.amcharts-main-div').prepend(h);
      }
    });

    if (ci_chart.config.panels[0].stockGraphs.length > 1) {
       for (i = 1; i < ci_chart.config.panels[0].stockGraphs.length; i++) {
         ci = ci_chart.config.panels[0].stockGraphs[i];
         var h = '<div class="options '+ci.cName+'">';
         h += '<a href="javascript:;" class="fa name">'+ci.sName.replace('GTMS62', 'GTM Divergence')+'</a>';
         h += '<a href="javascript:;" data-id="'+i+'" data-type="'+ci.cName+'" class="fa fa-eye'+(ci.hidden ? ' active' : '')+'"></a>';
         h += '<a href="javascript:;" data-id="'+i+'" data-type="'+ci.cName+'" class="fa fa-cog"></a>';
         h += '<a href="javascript:;" data-id="'+i+'" data-type="'+ci.cName+'" class="fa fa-times"></a>';
         h += '</div>';
           if (!$('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div .indicators').length) {
               $('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div').prepend('<div class="indicators"></div>');
           }else{
            if((ci.id && ci.id == 'g1') || ci.sName == "GTMS6" || ci.sName == "GTMS62" || ci.sName == "GTMXDots") {
             if ($('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div .indicators .options.'+ci.cName).length) {
              continue;
             }
            }
           }

           $('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div .indicators').append(h);  
       }
    }

    if (ci_chart.config.panels[0].trendLines.length > 0 && iTrendline) {
        var h = '<div class="options SP">';
         h += '<a href="javascript:;" class="fa name">Support/Resistances</a>';
         h += '<a href="javascript:;" data-type="SP" class="fa fa-eye'+(ci_chart.SP.hidden ? ' active' : '')+'"></a>';
         h += '<a href="javascript:;" data-type="SP" class="fa fa-cog"></a>';
         h += '<a href="javascript:;" data-type="SP" class="fa fa-times"></a>';
         h += '</div>';
         if (!$('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div .indicators').length) {
               $('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div').prepend('<div class="indicators"></div>');
         }
         if(!$('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div .indicators .SP').length) $('#custom-indicators-chart .amChartsPanel:first .amcharts-main-div .indicators').append(h); 
    }
    
  },
  addFlags: function (c) {
    if ($('.amcharts-graph-bullet').length > 0) {
        $('.amcharts-graph-bullet').each(function (e) {
          $(this).find('g g').each(function () {
             cry = $(this).find('text tspan').text(); 
             if(cry) $(this).html('<path cs="100,100" d="M0.5,0.5 L0.5,-7.5" fill="none" stroke-width="1" stroke-opacity="1" stroke="#888888"></path><'+'image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/countrys-flags/png/'+cry.toUpperCase()+'.png" x="4" y="1" width="22" height="25" transform="translate(-15,-28)"></image>');
          })
        });
    }
  },
  addSpace: function (dataProvider, length, timeFrame) {
     _ddDate = new Date();
     if (timeFrame == 60) {
       _ddDate.setHours(_ddDate.getHours()+8);
     }else if(timeFrame == 300){
       _ddDate.setDate(_ddDate.getDate()+1);
     }else if(timeFrame == 900){
       _ddDate.setHours(_ddDate.getHours()+30);
     }else if(timeFrame == 1800){
       _ddDate.setDate(_ddDate.getDate()+3);
     }else if(timeFrame == 3600){
       _ddDate.setDate(_ddDate.getDate()+5);
     }else if(timeFrame == 14400){
       _ddDate.setDate(_ddDate.getDate()+20);
     }else if(timeFrame == 86400){
       _ddDate.setDate(_ddDate.getDate()+40);
     }else{
       _ddDate.setMonth(_ddDate.getMonth()+4);
     }
     cc = dataProvider[dataProvider.length-1].close;
     __d = dataProvider[dataProvider.length-1].time;
     while (__d < _ddDate.getTime()) {
       dataProvider.push({
          time: __d,
          news: cc,
       });
       __d += timeFrame*1000;
     }
     addEndDate = _ddDate.getTime();
  },
  addCurrentLine: function (dataSets, panels) {
      var dataSet2 = dataSets;
      for (var i = 0; i < panels.length; i++) {
        var panel = panels[i];
        var dataPoint = dataSet2.dataProvider[dataSet2.dataProvider.length - 1];
        for (var x = 0; x < panel.stockGraphs.length; x++) {
          var graph = panel.stockGraphs[x];
          if (!panels[0].valueAxes[0].guides.length) {
            panel.valueAxes[0].guides.push({
              value: dataPoint[graph.valueField],
              inside: false,
              label: "",
              slabel: dataPoint[graph.valueField],
              lineAlpha: 0,
              dashLength: 3,
              color: 'red',
              lineColor: 'red',
            });
          }else{
            if (typeof panel.valueAxes[0].guides[0] !== "undefined") {
              panel.valueAxes[0].guides[0].value = dataPoint[graph.valueField];
              panel.valueAxes[0].guides[0].slabel = dataPoint[graph.valueField];
            }
          }
        }
      }
  },
  start: function (element, fsym, tsym, limit, timeframe, first, refresh, smb) {
      
      if (!first) {
        clearTimeout(_interval);
      }
      _self = this;
      if (!this.currency[fsym+'/'+tsym]) {
        alert('Currency invalid. '+fsym+'/'+tsym );
        return;
      }
      if(!refresh) this.Loading();
      $.get('ajax/get.php?pair_id='+this.currency[fsym+'/'+tsym]+'&candle_count='+limit+'&pair_interval='+timeframe+'&chart_type=candlestick', function(result) {
        
        startDate = new Date();
        endDate = new Date();

        if (!result) {
          _self.stopLoading();
          return false;
        }

        _self.timeframe = timeframe;

        currentData = _self.polyfillChartData2(result, timeframe);
        currentDataSet = _self.polyfillChartData2(result, timeframe);
 
        if (!first) {
           $('#'+element).empty();  
           _oldstockGraphs = _self.config.panels[0].stockGraphs;
           _oldPanels = _self.config.panels;
           _olddataSets = Chart.dataSets[0];
           ci_chart.config.panels[0].stockGraphs = [];
           Chart.panels = [_self.config.panels[0]];
           Chart.dataSets[0].fieldMappings = [];
           _self.config.dataSets[0].fieldMappings = [];
        }else{
          $('#Custom-Indicators .limit').val(_self.limit);
        }

        _self.config.dataSets[0].dataProvider = currentDataSet.data;
        _self.topCandleStick(_self.config.dataSets[0], _self.config.panels[0], fsym+'/'+tsym, first);
 
        _self.addCurrentLine(_self.config.dataSets[0], _self.config.panels);

        // _self.addTest(_self.config.dataSets[0], _self.config.panels, currentDataSet.data);
        
        _self.addSpace(_self.config.dataSets[0].dataProvider, 5, timeframe);

 
        if (!first) {
           Chart.panels[0].stockGraphs[0].hidden = _oldstockGraphs[0].hidden;

           for (var i = 1; i < _oldPanels.length; i++) {
              if(_oldPanels[i].cName == 'MACD') {
                _sst = {
                  type: _oldPanels[i].id,
                  fatsLength: _oldPanels[i].fatsLength,
                  slowLength: _oldPanels[i].slowLength,
                  signal: _oldPanels[i].signal,
                  source: _oldPanels[i].source,
                };
                pp = ci_chart.addMACD(Chart.dataSets[0], Chart.panels, currentDataSet.data.slice(0, ci_chart.maxIndicatorPeriod), _sst, _oldPanels[i]);
              }
           }
           for (var i = 1; i < _oldstockGraphs.length; i++) {
             if(_oldstockGraphs[i].cName) {
              if (_oldstockGraphs[i].cName.match(/T6([0-9]+)/g)) {
                 if (_oldstockGraphs[i].name == "UpLine") {
                    ci_chart.addGTMS6(_oldstockGraphs[i].AvgField, Chart.dataSets[0], Chart.panels[0], {maperiods: _oldstockGraphs[i].maperiods, atrperiods: _oldstockGraphs[i].atrperiods, edit: 1});
                 }
                 if (_oldstockGraphs[i].name == "UpLine2") {
                    ci_chart.addGTMS62(_oldstockGraphs[i].AvgField, Chart.dataSets[0], Chart.panels[0], {maperiods: _oldstockGraphs[i].maperiods, atrperiods: _oldstockGraphs[i].atrperiods, edit: 1});
                 }
                 continue;
              }
              if (_oldstockGraphs[i].cName == 'TD') {
                 if (_oldstockGraphs[i].name == "TDL1") {
                    ci_chart.ADX(currentDataSet.data.length, currentDataSet.data);
                    ci_chart.addTrendyzDots("TD1", Chart.dataSets[0], Chart.panels[0], _self.TDP);
                 }
                 continue;
              }  
              _ss = {};
              _ss.timeframe = timeframe;
              _ss.name = _oldstockGraphs[i].sName;
              _ss.cName = _oldstockGraphs[i].cName;
              _ss.length = _oldstockGraphs[i].sLength;
              _ss.source = _oldstockGraphs[i].sSource;
              if (_oldstockGraphs[i].sOffset !== undefined) {
                _ss.Offset = _oldstockGraphs[i].sOffset;
              }
              if (_oldstockGraphs[i].sPhase !== undefined) {
                _ss.phase = _oldstockGraphs[i].sPhase;
              }
                avgGraph = ci_chart.addIndicator(_oldstockGraphs[i].valueField, Chart.dataSets[0], Chart.panels[0], _oldstockGraphs[i].lineColor, _ss, _oldstockGraphs[i]);
                avgGraph.type = "line"; 
                avgGraph.title = _oldstockGraphs[i].cName; 
                avgGraph.position = "left";
 
             }
           }
           Chart.validateNow();
           Chart.validateData();

           if (smb) {
              _self.ADX(currentDataSet.data.length, currentDataSet.data);
              if (Chart.panels[0].trendLines.length) {
                _stg = ci_chart.SP;
                _stg.edit = true;
                _self.addSP(Chart.dataSets[0], currentDataSet.data, Chart.panels[0], _stg);
              }
           }

           if (Chart.dataSets[0].stockEvents.length) {
              ci_chart.addNews(Chart, ci_chart.NewsSettings.from, ci_chart.NewsSettings.to, 1, 1);
           }
 
           if (addEndDate) {
            endDate.setTime(endDate.getTime()+addEndDate);
           }
           if (!refresh) {
             if (timeframe == 60) {
               startDate.setDate(startDate.getDate()-2);
               Chart.zoom(startDate, endDate);
             }else if(timeframe == 300){
               startDate.setDate(startDate.getDate()-7);
               Chart.zoom(startDate, endDate); 
             }else if(timeframe == 900){
               startDate.setDate(startDate.getDate()-9);
               Chart.zoom(startDate, endDate); 
             }else if(timeframe == 1800){
               startDate.setDate(startDate.getDate()-20);
               Chart.zoom(startDate, endDate); 
             }else if(timeframe == 3600){
               startDate.setMonth(startDate.getMonth()-1);
               Chart.zoom(startDate, endDate); 
             }else if(timeframe == 86400){
               startDate.setMonth(startDate.getMonth()-8);
               Chart.zoom(startDate, endDate); 
             }else{
               startDate.setMonth(startDate.getMonth()-24);
               Chart.zoom(startDate, endDate); 
             }
           }

           dTime = $('#Custom-Indicators .timeframe .btn.active').data('time'); 

           if (dTime !== Chart.categoryAxesSettings.minPeriod) {
            Chart.categoryAxesSettings.minPeriod = dTime;
            Chart.chartScrollbarSettings.usePeriod = dTime;
            ci_chart.Loading();
            Chart.validateData();
           }

        }else{

           DwBar=currentData.data.length;
           UpBar=currentData.data.length;
           
           Chart = AmCharts.makeChart(element, _self.config);
     
           ci_chart.NewsSettings.from = myDateFormat(new Date(Chart.dataSets[0].dataProvider[0].time), 'y-m-d H:i:s');
           ci_chart.NewsSettings.to = myDateFormat(new Date(Chart.dataSets[0].dataProvider[Chart.dataSets[0].dataProvider.length-1].time), 'y-m-d H:i:s');

           // startDate2.setMonth(startDate2.getMonth()-1);
           startDate.setDate(startDate.getDate()-12);
           if (addEndDate) {
            endDate.setTime(endDate.getTime()+addEndDate);
           }
           setTimeout(function () {
             Chart.zoom(startDate, endDate); 
           }, 500);

        }
 
      _interval = setTimeout(function(){ _self.start(element, fsym, tsym, limit, timeframe, false, true); }, 30000);
      },"json");
  },
}

ci_chart.start('custom-indicators-chart', 'EUR', 'USD', ci_chart.limit, 3600, true);

cs_chart.start('current-strngth-chart', 'EUR|EUR|USD|GBP|CHF|JPY|CAD|AUD|NZD', cs_chart.limit, 3600, true);
  
