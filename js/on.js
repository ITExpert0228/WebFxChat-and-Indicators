var _target, indicatorId, firstTimec = 1;
$(document)
.on('click', '.fullscreen1',function () {
   _target = $(this).data('target');
   $(document).fullScreen(true);
})
.on('click', '.fullscreen2',function () {
   _target = $(this).data('target');
   $(document).fullScreen(true);
   if (Chart) {
   	 Chart.invalidateSize();
   }
})
.bind("fullscreenchange", function() {
   if ($(document).fullScreen()) {
     $(_target).addClass('fullscreen');
     $('.cencelFullscreen').show();
   }else{
     $(_target).removeClass('fullscreen');
     $('.cencelFullscreen').hide();
   }
})
.on('click', '.cencelFullscreen', function () {
    $(_target).removeClass('fullscreen');
    $(document).fullScreen(false);
})
.on('click', '.options a.fa-eye', function () {
	if ($(document).fullScreen()) {
		$(_target).removeClass('fullscreen');
		$(document).fullScreen(false);
	}
	var id = $(this).parents('.amChartsPanel').index();
	if (id == 0) {
	    dpanel = Chart.panels[0];
	     if ($(this).data('type')) {
           if ($(this).data('type') == "SP") {
              ci_chart.Loading();
              for (var t = 0; t < Chart.panels[0].trendLines.length; t++){
                Chart.panels[0].trendLines[t].lineAlpha = $(this).hasClass('active') ? 1 : 0;
              }
              ci_chart.SP.hidden = $(this).hasClass('active') ? false : true;
              $(this).toggleClass('active');
              Chart.validateData();
              return;
           }
           if ($(this).data('id')) {
               if (String($(this).data('type')).match(/T6([0-9]+)/g) || String($(this).data('type')) == "TD") {
                   if (Chart.panels[0].stockGraphs[parseInt($(this).data('id'))].hidden) {
                       $(this).removeClass('active');
                       for (var i = 0; i < Chart.panels[0].stockGraphs.length; i++) {
                          if (Chart.panels[0].stockGraphs[i].cName == $(this).data('type')) {
                           Chart.panels[0].stockGraphs[i].hidden = false;
                          }
                       }
                   }else{
                       $(this).addClass('active');
                       for (var i = 0; i < Chart.panels[0].stockGraphs.length; i++) {
                          if (Chart.panels[0].stockGraphs[i].cName == $(this).data('type')) {
                            Chart.panels[0].stockGraphs[i].hidden = true;
                          }
                       }
                   }
                   Chart.validateNow();
                 return;
               }
               if (Chart.panels[0].stockGraphs[parseInt($(this).data('id'))].hidden) {
                   dpanel.showGraph(dpanel.stockGraphs[parseInt($(this).data('id'))]);
                   $(this).removeClass('active');
		           }else{
                   $(this).addClass('active');
                   dpanel.hideGraph(dpanel.stockGraphs[parseInt($(this).data('id'))]);
		           }
           }else{
           	for (i = 1; i < ci_chart.config.panels[0].stockGraphs.length; i++) {
            	  if ($(this).data('type') == ci_chart.config.panels[0].stockGraphs[i].cName) {
            	  	if (ci_chart.config.panels[0].stockGraphs[i].hidden) {
                        dpanel.showGraph(dpanel.stockGraphs[i]);
                        $(this).removeClass('active');
		            }else{
                        $(this).addClass('active');
                        dpanel.hideGraph(dpanel.stockGraphs[i]);
		            }
            	  }
            }
           }
        }else{
		   if (ci_chart.config.panels[0].stockGraphs[0].hidden) {
               dpanel.showGraph(dpanel.stockGraphs[0]);
               $(this).removeClass('active');
		   }else{
               $(this).addClass('active');
               dpanel.hideGraph(dpanel.stockGraphs[0]);
		   }
		}
	}else{
		for (var i = 1; i < ci_chart.config.panels.length; i++) {
			dpanel = ci_chart.config.panels[i];
			for (var x = 0; x < ci_chart.config.panels[i].stockGraphs.length; x++) {
				if (ci_chart.config.panels[i].stockGraphs[x].hidden) {
                    dpanel.showGraph(dpanel.stockGraphs[x]);
                    $(this).removeClass('active');
		        }else{
                    $(this).addClass('active');
                    dpanel.hideGraph(dpanel.stockGraphs[x]);
		        }
			}
		}
	} 
})
.on('click', '.options a.fa-times', function () {
	if ($(document).fullScreen()) {
		$(_target).removeClass('fullscreen');
		$(document).fullScreen(false);
	}
	if ($(this).data('type')) {
     if ($(this).data('type') == "SP") {
        ci_chart.Loading();
        iTrendline = 0;
        Chart.panels[0].trendLines = [];
        Chart.validateNow();
        return;
     }
	   if ($(this).data('id')) {
          if (String($(this).data('type')).match(/T6([0-9]+)/g) || String($(this).data('type')) == "TD") {
            var Glength = Chart.panels[0].stockGraphs.length;
            for (var x = 0; x < Glength; x++) {
               if (typeof Chart.panels[0].stockGraphs[x] !== "undefined" && Chart.panels[0].stockGraphs[x].cName == $(this).data('type')) {
                 if(Chart.panels[0].stockGraphs[x].name == 'UpLine2'){
                    isT6D = 0;
                    cs_chart.resetGTMS6(CChart.dataSets[0]);
                    CChart.validateData();
                 }
                 Chart.panels[0].stockGraphs.splice(x, 1);
                 x--;
               }
            }
          }else{
           Chart.panels[0].stockGraphs.splice(parseInt($(this).data('id')), 1);
          }
       }else{
            for (var i = 1; i < ci_chart.config.panels[0].stockGraphs.length; i++) {
            	_ci = ci_chart.config.panels[0].stockGraphs[i];
            	if (_ci.cName == $(this).data('type')) {
            		ci_chart.config.panels[0].stockGraphs.splice(i, 1);
            	}
            }
        }
        Chart.validateNow();
	}else{
		var id = $(this).parents('.amChartsPanel').index();
        $(this).parents('.amChartsPanel').remove();
        var Panel = ci_chart.config.panels[id];
        Chart.panels.splice(parseInt(id), 1);
        Chart.removePanel(Panel);
        Chart.validateSize();
	}
})
.on('click', '.options a.fa-cog', function () {
	if ($(document).fullScreen()) {
		$(_target).removeClass('fullscreen');
		$(document).fullScreen(false);
	}
 
  if (String($(this).data('type')).match(/T6([0-9]+)/g)) {
     indicatorId = $(this).data('id');
     $('#modal-indicator-GTMS6').modal();
     _html_input = $('#GTMS6-input').html();
     _html = $('#GTMS6-style').html();
     $('#modal-indicator-GTMS6 #p22-setting').empty();
     ei = $('<div>'+_html_input+'</div>');
     $('#modal-indicator-GTMS6 #p22-style').empty();
     for (var i = 1; i < ci_chart.config.panels[0].stockGraphs.length; i++) {
       if (ci_chart.config.panels[0].stockGraphs[i].cName == $(this).data('type')) {
         option = 'ci_chart.config.panels[0].stockGraphs['+i+'].';
         if (ci_chart.config.panels[0].stockGraphs[i].name == "UpLine") {
             ei.find('.maperiods').attr('data-option', option+ei.find('.maperiods').data('option'));
             $('#modal-indicator-GTMS6 #p22-setting').append('<div class="form-group">'+ei.find('.form-group:first').html()+'</div>');
         }else if(ci_chart.config.panels[0].stockGraphs[i].name == "DwLine"){
             ei.find('.atrperiods').attr('data-option', option+ei.find('.atrperiods').data('option'));
             $('#modal-indicator-GTMS6 #p22-setting').append('<div class="form-group">'+ei.find('.form-group:last').html()+'</div>');
         }
         e = $('<div>'+_html+'</div>');
         e.find('.name').text(ci_chart.config.panels[0].stockGraphs[i].name);
         e.find('.fields').each(function () {
            _ops = $(this).data('option');
            if ($.inArray(ci_chart.config.panels[0].stockGraphs[i].name, ["UP", "DW"]) !== -1) {
               _ops = _ops.replace('lineColor', 'bulletColor');
            }
            $(this).attr('data-option', option+_ops);
         })
         $('#modal-indicator-GTMS6 #p22-style').append('<div class="form-group">'+e.html()+'</div>');
       } 
     }
     $('#modal-indicator-GTMS6 .fields').each(function () {
          if ($(this).data('option').match(/hidden/g)) {
           v = eval($(this).data('option')) ? false : true;
           eval('$(this).prop("checked",'+v+')');
          }else{
           eval('$(this).val('+$(this).data('option')+')');
          }
     });
    return;
  }
  if ($(this).data('type') == "TD") {
     indicatorId = $(this).data('id');
     $('#modal-indicator-TD').modal();
     _html = $('#TD-style').html();
     $('#modal-indicator-TD #p23-style').empty();
     for (var i = 1; i < ci_chart.config.panels[0].stockGraphs.length; i++) {
       if (ci_chart.config.panels[0].stockGraphs[i].cName == $(this).data('type')) {
         option = 'ci_chart.config.panels[0].stockGraphs['+i+'].';
         e = $('<div>'+_html+'</div>');
         e.find('.name').text(ci_chart.config.panels[0].stockGraphs[i].name.replace('TDH', 'Trendy High ').replace('TDL', 'Trendy Low '));
         e.find('.fields').each(function () {
            _ops = $(this).data('option');
            _ops = _ops.replace('lineColor', 'bulletColor');
            $(this).attr('data-option', option+_ops);
         });
         $('#modal-indicator-TD #p23-style').append('<div class="form-group">'+e.html()+'</div>');
       } 
     }
     $('#modal-indicator-TD .fields').each(function () {
          if ($(this).data('option').match(/hidden/g)) {
           v = eval($(this).data('option')) ? false : true;
           eval('$(this).prop("checked",'+v+')');
          }else{
           eval('$(this).val('+$(this).data('option')+')');
          }
     });
    return;
  }
	var id = $(this).parents('.amChartsPanel').index();
 
    md = 'modal-panle-1';
 
    if (id > 0) {
       	md = 'modal-panle-2'; 
    } 

    if ($(this).data('type')) {
       	md = 'modal-indicator-'+$(this).data('type'); 
    } 
    $('#'+md).modal();
    if ($(this).data('type') == "news") {
       el = $('#'+md);
       for (x in ci_chart.NewsSettings){
          _val = ci_chart.NewsSettings[x];
          el.find('[name="'+x+'"]').val(_val);
          el.find('[name="'+x+'"]').prop('checked', _val);
       }
    }
    $this = $(this);
    $('#'+md+' .fields').each(function () {
    	option = $(this).data('option');
    	form = $(this).parents('.edit-options');
    	if (form.data('panel')) {
			if (form.data('panel') == "panels") {
				if ($this.data('id')) {
              indicatorId = $this.data('id');
              option = 'Chart.panels['+indicatorId+'].'+option;
				}else{
					for (var i = 1; i < ci_chart.config.panels.length; i++) {
				    	if (ci_chart.config.panels[i].cName == form.data('type') && !$(this).hasClass('npl')) {
				    		option = 'Chart.panels['+i+'].'+option;
				    	} 
				    }
				}
			}else if(form.data('panel') == "stockGraphs"){
				if($this.data('id')){
					indicatorId = $this.data('id');
          if(!$(this).hasClass('npl')) option = 'ci_chart.config.panels[0].stockGraphs['+$this.data('id')+'].'+option;
				}else{
    				for (var i = 1; i < ci_chart.config.panels[0].stockGraphs.length; i++) {
    					if (ci_chart.config.panels[0].stockGraphs[i].cName == form.data('type') && !$(this).hasClass('npl')) {
    						option = 'ci_chart.config.panels[0].stockGraphs['+i+'].'+option;
    					} 
    				}
				}
			}
		}
        if (option) {
    		if (option.match(/hidden/g)) {
	        	v = eval(option) ? false : true;
		        $(this).prop('checked', v);
	        }else if(option.match(/SAlpha|RAlpha|alert/g)){
            $(this).prop('checked', eval(option));
          }else{
		       eval('$(this).val('+option+')');
	        }
    	}
    	if ($(this).hasClass('inputNumber')) {
    		$inputWrap = $(this).parent('div');
    		if ($inputWrap.find('.slider').hasClass('slider-line')) {
    			if(slider_l) slider_l.slider('value', eval(option));
    		}else if ($inputWrap.find('.slider').hasClass('slider-column')) {
    			if(slider_c) slider_c.slider('value', eval(option));
    		}else if ($inputWrap.find('.slider').hasClass('slider-column-2')) {
    			if(slider_c2) slider_c2.slider('value', eval(option));
    		}
    	}
	});
})
.on('change', '.edit-options .fields', function (e) {
    
    // $(this).parents('form').submit();
})
.on('change', '.edit-options .f-color', function (e) {
    
   cs_chart.config.colors[parseInt($(this).attr('data-key'))] =  $(this).val();
   cs_chart.config.dataSets[parseInt($(this).attr('data-key'))].color =  $(this).val();
   CChart.validateNow();
})
.on('submit', '.edit-options', function (e) {
	e.preventDefault();
	t = $(this);
	$(this).find('.fields').each(function () {
		if($(this).data('format')) {
			var val = $(this).val();
			var option = $(this).data('option');
			if (t.data('panel')) {
				if (t.data('panel') == "panels") {
					if(!$(this).hasClass('npl')) option = 'Chart.panels['+indicatorId+'].'+$(this).data('option');
				}else if(t.data('panel') == "stockGraphs"){
             if(!$(this).hasClass('npl') && t.data('type') !== "GTMS6" && t.data('type') !== "TD") option = 'Chart.panels[0].stockGraphs['+indicatorId+'].'+option;
				}
			}
			if (option.match(/guides/g)) {
				val = $(this).prop('checked') ? 1 : 0;
				if (val) {
					eval(option.replace('lineAlpha', 'label')+' = '+option.replace('lineAlpha', 'slabel'));
				}else{
					eval(option.replace('lineAlpha', 'label')+" = ''");
				}
			}
			if (option.match(/hidden/g)) {
				  val = $(this).prop('checked') ? false : true;
			    eval(option+' = '+val);
			}else if (option.match(/SAlpha|RAlpha|alert/g)) {
          val = $(this).prop('checked') ? 1 : 0;
          eval(option+' = '+val);
      }else{ 
     			eval(option+' = '+$(this).data('format').replace('%s', val ? val : 0));
			}
     
		    if(option.match(/negativeFillColors/g)) {
		    	eval(option.replace('negativeFillColors', 'negativeLineColor')+' = '+$(this).data('format').replace('%s', val));
		    }else if(option.match(/lineColor/g)) { 
		    	eval(option.replace('lineColor', 'fillColors')+' = '+$(this).data('format').replace('%s', val));
		    }
		    if (option.match(/type/g)) {
		    	if (val == "column") {
		        	eval(option.replace('type', 'fillAlphas')+' = 1');
		        }else if (val == "candlestick") {
		        	eval(option.replace('type', 'fillAlphas')+' = 1');
		        }else if (val == "area") {
		        	eval(option+" = 'line'");
		        	eval(option.replace('type', 'fillAlphas')+' = 0.4');
		        }else{
		        	eval(option.replace('type', 'fillAlphas')+' = 0');
		        }
		    }
		}
	});

  if ($(this).data('type') == "SP") {
    _stg = ci_chart.SP;
    _stg.edit = true;
    ci_chart.Loading();
    ci_chart.addSP(Chart.dataSets[0], currentDataSet.data, Chart.panels[0], _stg);
    return;
  }

  Chart.validateNow();

	if ($(this).data('panel')) {
	if ($(this).data('panel') == "panels") {
		_p = Chart.panels[parseInt(indicatorId)];
        if (_p.id == "MACD-"+indicatorId) {
        	_sst = {
                  type: _p.id,
                  fatsLength: _p.fatsLength,
                  slowLength: _p.slowLength,
                  signal: _p.signal,
                  source: _p.source,
                };I 
        	ci_chart.MACDCalcul(Chart.dataSets[0], currentDataSet.data.slice(0, ci_chart.maxIndicatorPeriod), _sst);
            _p.title = 'MACD ('+_p.fatsLength+',  '+_p.slowLength+', '+_p.signal+', '+_p.source+')';
        }
	    Chart.validateNow();
	    ci_chart.Loading();
	    Chart.validateData();
	}else{
		stG = Chart.panels[0].stockGraphs[parseInt(indicatorId)];
    if (!stG) {
      stG = ci_chart.config.panels[0].stockGraphs[parseInt(indicatorId)];
    }
        if($(this).data('type') == "FA"){
            _setting = {
              name: stG.sName,
              length: stG.sLength,
              cName: 'FA',
              source: stG.sSource,
              Offset: stG.sOffset,
              phase: stG.sPhase,
              BarCount: 40,
              NumOfBars: 10000,
            };	
        	ci_chart.FACalcul(ci_chart.config.dataSets[0], currentDataSet.data, "FA-"+indicatorId, _setting, 1);
        }else if ($(this).data('type') == "GTMS6"){
           _setting = {
              maperiods: stG.maperiods,
              atrperiods: stG.atrperiods,
            };
            ci_chart.T6Calcul(ci_chart.config.dataSets[0], currentDataSet.data, "1", _setting, 1);
        }else if ($(this).data('type') == "TD"){
            ci_chart.TDCalcul(Chart.dataSets[0], currentDataSet.data, "TD1", ci_chart.TDP, 1);
        }else{
            _setting = {
            	name: stG.sName,
            	length: stG.sLength,
            	source: stG.sSource,
            };
            ci_chart.MACalcul(ci_chart.config.dataSets[0], currentDataSet.data, 'TD1', _setting, 1);
        }
        if ($(this).data('type') !== "GTMS6" && $(this).data('type') !== "TD") {
          Chart.panels[0].stockGraphs[parseInt(indicatorId)].sName = $(this).data('type')+' ('+_setting.length+', '+_setting.source+')';
        }
        Chart.validateNow();
        ci_chart.Loading();
        Chart.validateData();
	}
	}
	// $('.modal').modal('hide');
})
.on('shown.bs.modal', function () {
	$('.modal .select').selectpicker('refresh');
    doSlider();
    $('.select-macd-type').each(function () {
    	if ($(this).val() !== "") {
	    	if($(this).val() == 'column'){
	        	  e = $(this).parents('table');
	        	  e.find('.slider-column').show();
	        	  e.find('.slider-line').hide();
	        }else{
	        	  e = $(this).parents('table');
	        	  e.find('.slider-column').hide();
	        	  e.find('.slider-line').show();
	        }
	    }
    });
	$(this).find('.modal-content').draggable();
})
.on('click', '.add-GTMS6', function (e) {
   ci_chart.Loading();
   ci_chart.addGTMS6($('.indicators .options').length, Chart.dataSets[0], Chart.panels[0], {maperiods: 5, atrperiods: 14});  
})
.on('click', '.add-GTMS62', function (e) {
   ci_chart.Loading();
   ci_chart.addGTMS62($('.indicators .options').length, Chart.dataSets[0], Chart.panels[0], {maperiods: 5, atrperiods: 14});
})
.on('click', '.add-TD', function (e) {
   ci_chart.ADX(currentData.data.length, currentData.data);
   ci_chart.addTrendyzDots('TD1', Chart.dataSets[0], Chart.panels[0], ci_chart.TDP);
   Chart.validateNow();
   ci_chart.Loading();
   Chart.validateData();
})
.on('click', '.add-News', function (e) {
   for(i in ci_chart.config.panels[0].stockGraphs){
      if(ci_chart.config.panels[0].stockGraphs[i].id == "g1") return;
   } 
   ci_chart.addNews(ci_chart.config, ci_chart.NewsSettings.from, ci_chart.NewsSettings.to);
})
.on('submit', '.form-news', function (e) {
   e.preventDefault();
   $(this).find('input').each(function () {
     if ($(this).attr('type') == "checkbox") {
      ci_chart.NewsSettings[$(this).attr('name')] = $(this).prop('checked');
    }else{
      ci_chart.NewsSettings[$(this).attr('name')] = $(this).val();
    }
   });
   ci_chart.addNews(ci_chart.config, ci_chart.NewsSettings.from, ci_chart.NewsSettings.to, 1);
})
.on('click', '.add-MACD', function (e) {
	e.preventDefault();
	if(currentDataSet && ci_chart.config.panels.length >= 1) { 
	  _sts = ci_chart.MACDsettings;
      _sts.type = 'MACD-'+Chart.panels.length; 
	  ci_chart.addMACD(Chart.dataSets[0], Chart.panels, currentData.data.slice(0, ci_chart.maxIndicatorPeriod), _sts);
	  Chart.validateNow();
	  ci_chart.Loading();
	  Chart.validateData();
	}
})
.on('click', '.add-SP', function (e) {
  e.preventDefault();
  ci_chart.Loading();
  ci_chart.addSP(Chart.dataSets[0], Chart.dataSets[0].dataProvider, Chart.panels[0], ci_chart.SP);
})
.on('click', '.add-indicator', function (e) {
	e.preventDefault();
	if(currentDataSet && ci_chart.config.panels[0].stockGraphs.length >= 1) {
	  _settings = eval('ci_chart.'+$(this).data('type')+'settings');
	  _settings.cName = $(this).data('type');	
	  _settings.timeframe = parseInt($('#Custom-Indicators .timeframe .btn.active').data('val'));	
	  avgGraph = ci_chart.addIndicator($(this).data('type')+'-'+Chart.panels[0].stockGraphs.length, Chart.dataSets[0], Chart.panels[0], $(this).data('color'), _settings);
	  avgGraph.type = "line"; 
	  avgGraph.title = $(this).data('type'); 
	  avgGraph.position = "left"; 
	  Chart.validateNow();
	  ci_chart.Loading();
	  Chart.validateData();
	}
})
.on('change', '.select-macd-type', function () {
	if ($(this).val() !== "") {
		if($(this).val() == 'column'){
	    	  e = $(this).parents('table');
	    	  e.find('.slider-column').show();
	    	  e.find('.slider-line').hide();
	    }else{
	    	  e = $(this).parents('table');
	    	  e.find('.slider-column').hide();
	    	  e.find('.slider-line').show();
	    }
	}
})
.on('change', 'select.sambols', function () {
	
	ci_chart.symbols = $(this).val();
	syms = $(this).val().split('-');
	fsym = syms[0];
	tsym = syms[1];
	if (!$(this).val().match(/JPY/i)) {
       ci_chart.config.valueAxesSettings.precision = 4;
	}else{
	   ci_chart.config.valueAxesSettings.precision = 2;	
	}
 
	ci_chart.start('custom-indicators-chart', fsym, tsym, ci_chart.limit, parseInt($('#Custom-Indicators .timeframe .btn.active').data('val')), 0, 0, 1); 
})
.on('click', '.timeframe .btn', function () {
   $(this).parents('.timeframe').find('.btn').removeClass('active');
   $(this).addClass('active');
   if ($(this).parents('.timeframe').data('type') == "Current-strngth") {
   	// cs_chart.config.categoryAxesSettings.minPeriod = $(this).data('time');
    // CChart.validateNow();
    cs_chart.start('current-strngth-chart', 'EUR|EUR|USD|GBP|CHF|JPY|CAD|AUD|NZD', cs_chart.limit, parseInt($(this).data('val')));
   }else{
   
   		syms = ci_chart.symbols.split('-');
        fsym = syms[0];
        tsym = syms[1];
         
        ci_chart.start('custom-indicators-chart', fsym, tsym, ci_chart.limit, $(this).data('val'), false);
 
   }
})
.on('click', '.go-limit', function () {
   p = $(this).parents('.panel-body');
   pvalue = p.find('.limit').val();
   if (p.attr('id') == "Custom-Indicators") {
   	ci_chart.limit = pvalue;
   	syms = ci_chart.symbols.split('-');
    fsym = syms[0];
    tsym = syms[1];
    ci_chart.start('custom-indicators-chart', fsym, tsym, pvalue, parseInt($('#Custom-Indicators .timeframe .btn.active').data('val'))); 
   }else{
   	cs_chart.limit = pvalue;
    // $('#Current-strngth .timeframe .btn').removeClass('active');
    // $('#Current-strngth .timeframe .btn[data-time="mm"]').addClass('active');
   	// cs_chart.config.categoryAxesSettings.minPeriod = 'mm';
   	cs_chart.start('current-strngth-chart', 'EUR|EUR|USD|GBP|CHF|JPY|CAD|AUD|NZD', pvalue, parseInt($('#Current-strngth .timeframe .btn.active').data('val')));
   }
})
.on('click', '.mycheckbox .item', function () {
   cs_chart.Loading();
   $this = $(this);
   var id = $this.index();
   $this.toggleClass('active');
   hddn = false;
   setTimeout(function () {
     if ($('.mycheckbox .item.active').length == 1 && isT6D) {
      ds = $('.mycheckbox .item.active').index();
      sym = $('#Custom-Indicators .sambols').val().split('-');
      val = $('.mycheckbox .item.active .check-box').data('value');
      if (val == sym[0] || val == sym[1]) {
         cs_chart.GTMS6to(CChart.dataSets[ds]);
      }else{
         hddn = true;
      }
      currecntCur = $('.mycheckbox .item.active .check-box').data('value');
     }
       for (var i = 1; i < cs_chart.config.panels[0].stockGraphs.length; i++) {
         cs_chart.config.panels[0].stockGraphs[i].hidden = $this.hasClass('active') && !hddn ? false : true; 
       }
       cs_chart.config.dataSets[id].compared = $this.hasClass('active');
     if ($('.mycheckbox .item.active').length > 1) {
      CChart.panels[0].recalculateToPercents = "always";
     }else{
      CChart.panels[0].recalculateToPercents = "never";
     }
     CChart.validateNow();   
     CChart.validateData();  
   },300);
})
.on('click', '.setColors .item', function () {
	$('#modal-panle-4').modal();
    i = $(this).index()-1;
	$('#modal-panle-4 .f-color').attr('data-key', i).val(cs_chart.config.colors[i]);
})
.on('click', '.edit-color', function(){
    $('#modal-edit-color').modal();
	  ht = '<div class="setColors">';
    $('.mycheckbox .item').each(function (i) {
    ht += '<div class="item">'+
                    '  <input type="color" class="color f-color" data-key="'+i+'" value="'+cs_chart.config.colors[i]+'">'+
                    '  <div class="text">'+$(this).find('.check-box').data('value')+'</div>'+
                    '</div>';
    }); 
    ht += '</div>';
    $('#modal-edit-color .modal-body').html(ht);
})
.on('click', '.zoomOut', function () {
   if ($(this).data('type') == "1") {
     c = CChart;
   }else{
     c = Chart;
   }

     var event = window.event ? window.event : e;
    _left = 37;
    _right = 39;
    _time = ci_chart.timeframe;
    _ChartStartDate = c.dataSets[0].dataProvider[0].time;
    _ChartEndDate = c.dataSets[0].dataProvider[c.dataSets[0].dataProvider.length-1].time;
    
    _startDate = c.startDate.getTime()/1000;
    _endDate = c.endDate.getTime()/1000;
    _Bars = 0;
    while(_startDate <= _endDate){
      
      _startDate += _time;
      _Bars++;
    }

    _20p = (20/100)*_Bars;
    
    _time = (_time*_20p)*1000;

    _startDate = c.startDate;
    _endDate = c.endDate;
  
    _startDate.setTime(_startDate.getTime()-_time); 
    _endDate.setTime(_endDate.getTime()); 
    c.zoom(_startDate, _endDate);

 
})
.on('click', '.scroll-lr', function (){
  $(this).toggleClass('active');
  if ($(this).data('type') == "1") {
    iChart = Chart;
    e = '#Custom-Indicators';
  }else{

    e = '#Current-strngth';
    iChart = CChart;
  }
  iChart.chartCursorSettings.pan = $(this).hasClass('active');
  if ($(this).hasClass('active')) {
    $(e).addClass('e-resize');
  }else{
    $(e).removeClass('e-resize');
  }
  iChart.validateNow();
})
.on('keydown', function(e){
    var event = window.event ? window.event : e;
    _left = 37;
    _right = 39;
    _time = ci_chart.timeframe;
    _ChartStartDate = Chart.dataSets[0].dataProvider[0].time;
    _ChartEndDate = Chart.dataSets[0].dataProvider[Chart.dataSets[0].dataProvider.length-1].time;
    
    _startDate = Chart.startDate.getTime()/1000;
    _endDate = Chart.endDate.getTime()/1000;
    _Bars = 0;
    while(_startDate <= _endDate){
      
      _startDate += _time;
      _Bars++;
    }

    _20p = (20/100)*_Bars;
    
    _time = (_time*_20p)*1000;

    _startDate = Chart.startDate;
    _endDate = Chart.endDate;
    
    if (event.keyCode == _left) {

      _startDate.setTime(_startDate.getTime()-_time); 
      _endDate.setTime(_endDate.getTime()-_time); 
      Chart.zoom(_startDate, _endDate);

    }else if(event.keyCode == _right){

      _startDate.setTime(_startDate.getTime()+_time); 
      _endDate.setTime(_endDate.getTime()+_time); 
      Chart.zoom(_startDate, _endDate);

    }
});