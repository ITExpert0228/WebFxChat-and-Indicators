<!DOCTYPE html>
<html lang="en" style="background: #eee">
<head>
	<meta charset="UTF-8">
	<title>Charts</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="css/theme-default.css">
	<link rel="stylesheet" type="text/css" href="css/style.css?<?=time()?>">
  <link rel="stylesheet" href="js/plugins/jqwidgets/styles/jqx.base.css" type="text/css" />
  <link rel="stylesheet" href="js/plugins/jqwidgets/styles/jqx.energyblue.css" type="text/css" />

</head>
<body style="padding:0;background: #eee">

<a href="javascript:;" class="btn btn-default cencelFullscreen">Cancel Fullscreen</a>

<div class="panel panel-default">
    <div id="jqxDockingLayout">
        <div data-container="Current-strngth" style="height: 600px">
          <div class="panel-body" id="Current-strngth">
            <div class="head-options pull-right">
                <div class="btn-group">
                    <div class="input-group" style="width:130px;">
                      <input type="number" min="1" class="form-control limit" style="height: 34px;">
                      <span class="input-group-btn">
                          <button class="btn btn-default go-limit" type="button">Go!</button>
                      </span>
                    </div>
                </div>
                <div class="btn-group timeframe" data-type="Current-strngth">
                   <button type="button" data-val="60" class="btn btn-default" data-time="mm">1M</button>
                   <button type="button" data-val="300" class="btn btn-default" data-time="5mm">5M</button>
                   <button type="button" data-val="900" class="btn btn-default" data-time="15mm">15M</button>
                   <button type="button" data-val="3600" class="btn btn-default active" data-time="hh">1H</button>
                   <button type="button" data-val="86400" class="btn btn-default" data-time="DD">1D</button>
                </div>
                <button class="btn btn-default zoomOut" data-toggle="tooltip" data-type="1" title="Zoom Out"><span class="glyphicon glyphicon-zoom-out" style="margin: 2px 0;"></span></button>
                <button class="btn btn-default fullscreen1" data-target="#Current-strngth"><span class="fa fa-arrows-alt"></span></button>
             </div> 
            <div class="mgtcc pull-left">
              <label style="font-size: 13px;font-family: 'Open Sans', sans-serif;margin-left: 10px;width: 100%;margin-top: 1px;">
                Currency Select:
              </label>
              <div class="mycheckbox">
                <div class="item" style="width: 0;position: absolute;opacity: 0;"></div>
                <div class="item active">
                  <div class="check-box" data-value="EUR"></div>
                  <div class="check-label">EUR</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="USD"></div>
                  <div class="check-label">USD</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="GBP"></div>
                  <div class="check-label">GBP</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="CHF"></div>
                  <div class="check-label">CHF</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="JPY"></div>
                  <div class="check-label">JPY</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="CAD"></div>
                  <div class="check-label">CAD</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="AUD"></div>
                  <div class="check-label">AUD</div>
                </div>
                <div class="item">
                  <div class="check-box" data-value="NZD"></div>
                  <div class="check-label">NZD</div>
                </div>
              </div>
            </div>
            <div style="clear:both;"></div>
            <a href="javascript:;" class="fa fa-cog edit-color"></a>
            <button type="button" class="btn btn-default scroll-lr" data-type="2">
              <span class="fa fa-arrows-h"></span>
            </button>
            <div id="current-strngth-chart" class="chart"></div>
            <div class="loading"></div>
          </div>
        </div>
        <div data-container="Custom-Indicators">
          <div class="panel-body" id="Custom-Indicators">
            <div class="head-options pull-right">
                <div class="btn-group">
                    <div class="input-group" style="width:130px;">
                      <input type="number" min="1" class="form-control limit" style="height: 34px;">
                      <span class="input-group-btn">
                          <button class="btn btn-default go-limit" type="button">Go!</button>
                      </span>
                    </div>
                </div> 
                <div class="btn-group timeframe" data-type="Custom-Indicators">
                   <button type="button" data-val="60" class="btn btn-default" data-time="1mm">1M</button>
                   <button type="button" data-val="300" class="btn btn-default" data-time="5mm">5M</button>
                   <button type="button" data-val="900" class="btn btn-default" data-time="15mm">15M</button>
                   <button type="button" data-val="3600" class="btn btn-default active" data-time="hh">1H</button>
                   <button type="button" data-val="86400" class="btn btn-default" data-time="DD">1D</button>
                </div>
                <div style="width:120px;display: inline-block;position: relative;top: -2px;">
                  <select class="form-control sambols">
                    <option value="EUR-USD">EUR/USD</option>
                    <option value="USD-JPY">USD/JPY</option>
                    <option value="GBP-USD">GBP/USD</option>
                    <option value="EUR-GBP">EUR/GBP</option>
                    <option value="CAD-CHF">CAD/CHF</option>
                    <option value="CAD-JPY">CAD/JPY</option>
                    <option value="CHF-JPY">CHF/JPY</option>
                    <option value="EUR-AUD">EUR/AUD</option>
                    <option value="USD-CHF">USD/CHF</option>
                    <option value="EUR-JPY">EUR/JPY</option>
                    <option value="EUR-CHF">EUR/CHF</option>
                    <option value="USD-CAD">USD/CAD</option>
                    <option value="AUD-USD">AUD/USD</option>
                    <option value="GBP-JPY">GBP/JPY</option>
                    <option value="AUD-CAD">AUD/CAD</option>
                    <option value="AUD-CHF">AUD/CHF</option>
                    <option value="AUD-JPY">AUD/JPY</option>
                    <option value="AUD-NZD">AUD/NZD</option>
                    <option value="EUR-CAD">EUR/CAD</option>
                    <option value="EUR-NOK">EUR/NOK</option>
                    <option value="EUR-NZD">EUR/NZD</option>
                    <option value="GBP-CAD">GBP/CAD</option>
                    <option value="GBP-CHF">GBP/CHF</option>
                    <option value="NZD-JPY">NZD/JPY</option>
                    <option value="NZD-USD">NZD/USD</option>
                    <option value="USD-NOK">USD/NOK</option>
                    <option value="USD-SEK">USD/SEK</option>
                  </select>
                </div> 
                <!-- GTMXDots, GTM Currency Strength -->
                <div class="btn-group">
                    <a href="#" data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">Choose Indicators <span class="caret"></span></a>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu">
                        <li><a href="#" class="add-indicator" data-color="#4300f4" data-type="MA">GTM MA</a></li>
                        <li><a href="#" class="add-indicator" data-color="#FF0040" data-type="SA">GTM Slow Average</a></li>
                        <li><a href="#" class="add-indicator" data-color="#008639" data-type="FA">GTM Fast Average</a></li>
                        <li><a href="#" class="add-MACD">GTM MACD</a></li>
                        <li><a href="#" class="add-News">GTM Calendar News</a></li>
                        <li><a href="#" class="add-GTMS6">GTM S6</a></li>
                        <li><a href="#" class="add-GTMS62">GTM Divergence</a></li>
                        <li><a href="#" class="add-SP">GTM Support/Resistance</a></li>
                        <li><a href="#" class="add-TD">GTM XDots</a></li>
                    </ul>
                </div>
                <button class="btn btn-default zoomOut" data-toggle="tooltip" title="Zoom Out"><span class="glyphicon glyphicon-zoom-out" style="margin: 2px 0;"></span></button>
                <button class="btn btn-default fullscreen2" data-target="#Custom-Indicators"><span class="fa fa-arrows-alt"></span></button>
            </div>
            <button type="button" class="btn btn-default scroll-lr" data-type="1">
              <span class="fa fa-arrows-h"></span>
            </button>
            <div id="custom-indicators-chart" class="chart"></div>
            <div class="loading"></div>
           </div>
        </div>
        <div data-container="chatroom">
          <iframe src="https://www.gtmlive.com/trading-chatroom" style="position: absolute;border: 0;height: 100%;width:100%;"></iframe>
        </div>                 
    </div>
</div>
 
<!-- START SCRIPTS -->
<!-- START PLUGINS -->
<script type="text/javascript" src="js/plugins/jquery.min.js"></script>
<script type="text/javascript" src="js/plugins/cookie.js"></script>
<script type="text/javascript" src="js/plugins/jquery-ui.js"></script>
<script type="text/javascript" src="js/plugins/jquery-ui-timepicker-addon.js"></script>
<link rel="stylesheet" type="text/css" href="js/plugins/jquery-ui-timepicker-addon.css">
<script type="text/javascript" src="js/plugins/moment.min.js"></script>
<link rel="stylesheet" href="js/plugins/jquery-ui.css">
<script type="text/javascript">$.ui.plugin.add("resizable","alsoResizeReverse",{start:function(){var that=$(this).resizable("instance"),o=that.options;$(o.alsoResizeReverse).each(function(){var el=$(this);el.data("ui-resizable-alsoresizeReverse",{width:parseInt(el.width(),10),height:parseInt(el.height(),10),left:parseInt(el.css("left"),10),top:parseInt(el.css("top"),10)});});},resize:function(event,ui){var that=$(this).resizable("instance"),o=that.options,os=that.originalSize,op=that.originalPosition,delta={height:(that.size.height-os.height)||0,width:(that.size.width-os.width)||0,top:(that.position.top-op.top)||0,left:(that.position.left-op.left)||0};$(o.alsoResizeReverse).each(function(){var el=$(this),start=$(this).data("ui-resizable-alsoresize-reverse"),style={},css=el.parents(ui.originalElement[0]).length?["width","height"]:["width","height","top","left"];$.each(css,function(i,prop){var sum=(start[prop]||0)-(delta[prop]||0);if(sum&&sum>=0){style[prop]=sum||null;}});el.css(style);});},stop:function(){$(this).removeData("resizable-alsoresize-reverse");}});</script>
<script type="text/javascript" src="js/plugins/bootstrap.min.js"></script>        
<script type="text/javascript" src="js/plugins/bootstrap-select.js"></script>        
<!-- END PLUGINS -->

<script type="text/javascript" src="js/plugins/jquery.fullscreen-min.js"></script>

<!-- AmCharts PLUGINS -->
<script src="js/plugins/amcharts/amcharts.js"></script>
<script src="js/plugins/amcharts/serial.js"></script>
<script src="js/plugins/amcharts/amstock.js"></script>
<script src="js/plugins/amcharts/dataloader.min.js"></script>
<script src="js/plugins/amcharts/export.min.js"></script>
<link rel="stylesheet" href="js/plugins/amcharts/export.css" type="text/css" media="all" />
<script src="js/plugins/amcharts/light.js"></script>
<script src="js/plugins/amcharts/responsive.min.js"></script>
<!-- END PLUGINS -->

<!-- THIS PAGE PLUGINS -->
<script type='text/javascript' src='js/plugins/icheck.min.js'></script>
<script type="text/javascript" src="js/plugins/jquery.mCustomScrollbar.min.js"></script>
<script type="text/javascript" src="js/plugins/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="js/plugins/jqwidgets/jqxribbon.js"></script>
<script type="text/javascript" src="js/plugins/jqwidgets/jqxwindow.js"></script>
<script type="text/javascript" src="js/plugins/jqwidgets/jqxlayout.js"></script>
<script type="text/javascript" src="js/plugins/jqwidgets/jqxdockinglayout.js"></script>
<!-- END PAGE PLUGINS -->
 
<script type="text/javascript" src="js/plugins/plugins.js"></script>        
<script type="text/javascript" src="js/plugins/actions.js"></script>     
<script type="text/javascript" src="js/base.js?<?=time()?>"></script>     
<script type="text/javascript" src="js/script.js?<?=time()?>"></script>     
<script type="text/javascript" src="js/on.js?<?=time()?>"></script>

<div class="modal fade in" data-backdrop="false" id="modal-edit-color" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog modal-sm">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Color</h4>
      </div>
      <form class="edit-options form-horizontal">
          <div class="modal-body">
              
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade in" data-backdrop="false" id="modal-panle-1" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="edit-options form-horizontal">
          <div class="modal-body">
              <div class="form-group">
                  <label class="col-md-3 col-xs-5 control-label">Price Line</label>
                  <div class="col-md-7 col-xs-7">
                      <input type="checkbox" style="margin-top:8px;" class="fields" data-option="ci_chart.config.panels[0].valueAxes[0].guides[0].lineAlpha" data-format="%s">
                  </div>
              </div>
          <!--     <div class="form-group">
                  <label class="col-md-3 col-xs-5 control-label">Column With</label>
                  <div class="col-md-7 col-xs-7">
                     <div class="inputWrap">
                         <input class="mini inputNumber fields" type="hidden" data-option="ci_chart.config.panels[0].stockGraphs[0].columnWidth" data-format="%s">
                         <div class="slider slider-column-2"></div>
                     </div>
                  </div>
              </div> -->
              
              <div class="form-group">
                  <label class="col-md-3 col-xs-5 control-label">Chart Type</label>
                  <div class="col-md-7 col-xs-7">
                      <select class="select form-control fields"  data-option="ci_chart.config.panels[0].stockGraphs[0].type" data-format="'%s'">
                          <option value="candlestick">Candlestick</option>
                          <option value="line">Line</option>
                          <option value="area">Area</option>
                          <option value="smoothedLine">Smoothed Line</option>
                          <option value="ohlc">OHLC</option>
                      </select>
                  </div>
              </div>
              <div class="form-group">
                  <label class="col-md-3 col-xs-5 control-label">Colors</label>
                  <div class="col-md-7 col-xs-7">
                      <input type="color" class="pull-left form-control fields" data-option="ci_chart.config.dataSets[0].color" data-format="'%s'" />
                      <input type="color" style="margin-left:5px;" class="pull-left form-control fields" data-option="ci_chart.config.panels[0].stockGraphs[0].negativeFillColors" data-format="'%s'" />
                  </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<?php

$indicators = [['id'=> "MA"], ['id'=> "SA"], ['id'=> "FA"]];

?>
<?php foreach ($indicators as $indicator): ?>  
<div class="modal fade in" data-backdrop="false" id="modal-indicator-<?=$indicator['id']?>" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="edit-options form-horizontal" data-type="<?=$indicator["id"]?>" data-panel="stockGraphs">
         <div class="modal-body" style="padding: 0;">
          <div class="panel panel-default tabs" style="margin-bottom: 0;box-shadow: none;">
              <div class="tab-content">
                 <ul class="nav nav-tabs" style="padding:0;">
                     <li class="active"><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p3-<?=$indicator["id"]?>-setting" data-toggle="tab">Input</a></li>
                     <li><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p3-<?=$indicator["id"]?>-style" data-toggle="tab">Style</a></li>
                 </ul>
                 <div class="panel-body tab-pane active" id="p3-<?=$indicator["id"]?>-setting">
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">Length</label>
                        <div class="col-md-5 col-xs-7">
                            <input type="number" class="pull-left form-control fields" min="1" data-option="sLength" data-format="%s" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">Source</label>
                        <div class="col-md-5 col-xs-7">
                            <select class="pull-left select form-control fields" data-option="sSource" data-format="'%s'" >
                                <option value="close">close</option>
                                <option value="low">low</option>
                                <option value="high">high</option>
                                <option value="open">open</option>
                            </select>
                        </div>
                    </div>
                 </div>
                 <div class="panel-body tab-pane" id="p3-<?=$indicator["id"]?>-style">
                    <div class="col-md-3 control-label"><?=$indicator["id"]?></div>
                    <div class="col-md-8">
                        <table width="100%">
                            <tr>
                                <td width="10%" style="padding-right:10px;">
                                   <input type="color" class="pull-left form-control fields" data-option="lineColor" data-format="'%s'" />
                                </td>
                                <td width="45%" style="padding:0 10px;">
                                   <div class="inputWrap">
                                       <input class="mini inputNumber fields" type="hidden" data-option="columnWidth" data-format="%s">
                                       <div class="slider slider-column"></div>
                                   </div>
                                   <div class="inputWrap">
                                       <input class="mini inputNumber fields" type="hidden" data-option="lineThickness" data-format="%s">
                                       <div class="slider slider-line"></div>
                                   </div>
                                </td>
                                <td width="45%" style="padding-left:10px;">
                                    <select class="pull-left select form-control fields select-macd-type" data-option="type" data-format="'%s'" >
                                        <option value="line">Line</option>
                                        <option value="column">Histogram</option>
                                        <option value="area">Area</option>
                                        <option value="smoothedLine">Smoothed Line</option>
                                        <option value="step">Step</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                 </div>
               </div>
             </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>
<?php endforeach ?>
  
<div class="modal fade in" data-backdrop="false" id="modal-panle-2" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="edit-options form-horizontal" data-type="MACD" data-panel="panels">
          <input type="hidden" name="type" value="MACD">
          <input type="hidden" name="edit" value="true">
          <div class="modal-body" style="padding: 0;">
          <div class="panel panel-default tabs" style="margin-bottom: 0;box-shadow: none;">
              <div class="tab-content">
                 <ul class="nav nav-tabs" style="padding:0;">
                     <li class="active"><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p2-setting" data-toggle="tab">Input</a></li>
                     <li><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p2-style" data-toggle="tab">Style</a></li>
                 </ul>
                 <div class="panel-body tab-pane active" id="p2-setting">
                  <div class="form-group">
                      <label class="col-md-4 col-xs-5 control-label">Fast Length</label>
                      <div class="col-md-5 col-xs-7">
                          <input type="number" class="pull-left form-control fields" data-option="fatsLength" data-format="%s" />
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-md-4 col-xs-5 control-label">Slow Length</label>
                      <div class="col-md-5 col-xs-7">
                          <input type="number" class="pull-left form-control fields" data-option="slowLength" data-format="%s" />
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-md-4 col-xs-5 control-label">Signal Smoothing</label>
                      <div class="col-md-5 col-xs-7">
                          <input type="number" class="pull-left form-control fields" data-option="signal" data-format="%s" />
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-md-4 col-xs-5 control-label">Source</label>
                      <div class="col-md-5 col-xs-7">
                          <select class="pull-left select form-control fields" data-option="source" data-format="'%s'" >
                              <option value="close">close</option>
                              <option value="low">low</option>
                              <option value="high">high</option>
                              <option value="open">open</option>
                          </select>
                      </div>
                  </div>
                 </div>
                 <div class="panel-body tab-pane" id="p2-style">
                  <div class="form-group">
                      <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="stockGraphs[0].hidden" class="fields" data-format="%s"> MACD</label>
                      <div class="col-md-9 col-xs-7">
                          <table width="100%">
                              <tr>
                                  <td width="10%" style="padding-right:10px;">
                                     <input type="color" class="pull-left form-control fields" data-option="stockGraphs[0].lineColor" data-format="'%s'" />
                                  </td>
                                  <td width="45%" style="padding:0 10px;">
                                     <div class="inputWrap">
                                         <input class="mini inputNumber fields" type="hidden" data-option="stockGraphs[0].columnWidth" data-format="%s">
                                         <div class="slider slider-column"></div>
                                     </div>
                                     <div class="inputWrap">
                                         <input class="mini inputNumber fields" type="hidden" data-option="stockGraphs[0].lineThickness" data-format="%s">
                                         <div class="slider slider-line"></div>
                                     </div>
                                  </td>
                                  <td width="45%" style="padding-left:10px;">
                                      <select class="pull-left select form-control fields select-macd-type" data-option="stockGraphs[0].type" data-format="'%s'" >
                                          <option value="line">Line</option>
                                          <option value="column">Histogram</option>
                                          <option value="smoothedLine">Smoothed Line</option>
                                          <option value="step">Step</option>
                                      </select>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="stockGraphs[1].hidden" class="fields" data-format="%s"> Signal</label>
                      <div class="col-md-9 col-xs-7">
                          <table width="100%">
                              <tr>
                                  <td width="10%" style="padding-right:10px;">
                                     <input type="color" class="pull-left form-control fields" data-option="stockGraphs[1].lineColor" data-format="'%s'" />
                                  </td>
                                  <td width="45%" style="padding:0 10px;">
                                     <div class="inputWrap">
                                         <input class="mini inputNumber fields" type="hidden" data-option="stockGraphs[1].columnWidth" data-format="%s">
                                         <div class="slider slider-column"></div>
                                     </div>
                                     <div class="inputWrap">
                                         <input class="mini inputNumber fields" type="hidden" data-option="stockGraphs[1].lineThickness" data-format="%s">
                                         <div class="slider slider-line"></div>
                                     </div>
                                  </td>
                                  <td width="45%" style="padding-left:10px;">
                                      <select class="pull-left select form-control fields select-macd-type" data-option="stockGraphs[1].type" data-format="'%s'" >
                                          <option value="line">Line</option>
                                          <option value="column">Histogram</option>
                                          <option value="smoothedLine">Smoothed Line</option>
                                          <option value="step">Step</option>
                                      </select>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </div>
                  <div class="form-group">
                      <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="stockGraphs[2].hidden" class="fields" data-format="%s"> Histogram</label>
                      <div class="col-md-9 col-xs-7">
                          <table width="100%">
                              <tr>
                                  <td width="10%" style="padding-right:10px;">
                                     <input type="color" class="pull-left form-control fields" data-option="stockGraphs[2].lineColor" data-format="'%s'" />
                                  </td>
                                  <td width="45%" style="padding:0 10px;">
                                     <div class="inputWrap">
                                         <input class="mini inputNumber fields" type="hidden" data-option="stockGraphs[2].columnWidth" data-format="%s">
                                         <div class="slider slider-column"></div>
                                     </div>
                                     <div class="inputWrap">
                                         <input class="mini inputNumber fields" type="hidden" data-option="stockGraphs[2].lineThickness" data-format="%s">
                                         <div class="slider slider-line"></div>
                                     </div>
                                  </td>
                                  <td width="45%" style="padding-left:10px;">
                                      <select class="pull-left select form-control fields select-macd-type" data-option="stockGraphs[2].type" data-format="'%s'" >
                                          <option value="line">Line</option>
                                          <option value="column">Histogram</option>
                                          <option value="smoothedLine">Smoothed Line</option>
                                          <option value="step">Step</option>
                                      </select>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </div>
                 </div>
             </div> 
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade in" data-backdrop="false" id="modal-indicator-GTMS6" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="edit-options form-horizontal" data-type="GTMS6" data-panel="stockGraphs">
          <div class="modal-body" style="padding: 0;">
          <div class="panel panel-default tabs" style="margin-bottom: 0;box-shadow: none;">
              <div class="tab-content">
                 <ul class="nav nav-tabs" style="padding:0;">
                     <li class="active"><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p22-setting" data-toggle="tab">Input</a></li>
                     <li><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p22-style" data-toggle="tab">Style</a></li>
                 </ul>
                 <div class="panel-body tab-pane active" id="p22-setting">
                 
                 </div>
                 <div class="panel-body tab-pane" id="p22-style">
                     
                 </div>
             </div> 
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade in" data-backdrop="false" id="modal-indicator-TD" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="edit-options form-horizontal" data-type="TD" data-panel="stockGraphs">
          <div class="modal-body" style="padding: 0;">
          <div class="panel panel-default tabs" style="margin-bottom: 0;box-shadow: none;">
              <div class="tab-content">
                 <ul class="nav nav-tabs" style="padding:0;">
                     <li class="active"><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p23-setting" data-toggle="tab">Input</a></li>
                     <li><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#p23-style" data-toggle="tab">Style</a></li>
                 </ul>
                 <div class="panel-body tab-pane active" id="p23-setting">
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">Periods 1</label>
                        <div class="col-md-5 col-xs-7">
                            <input type="number" class="pull-left form-control fields" data-option="ci_chart.TDP.period_1" data-format="%s" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">Periods 2</label>
                        <div class="col-md-5 col-xs-7">
                            <input type="number" class="pull-left form-control fields" data-option="ci_chart.TDP.period_2" data-format="%s" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">Periods 3</label>
                        <div class="col-md-5 col-xs-7">
                            <input type="number" class="pull-left form-control fields" data-option="ci_chart.TDP.period_3" data-format="%s" />
                        </div>
                    </div>
                 </div>
                 <div class="panel-body tab-pane" id="p23-style">
                     
                 </div>
             </div> 
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade in" data-backdrop="false" id="modal-indicator-SP" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="edit-options form-horizontal" data-type="SP">
          <div class="modal-body" style="padding: 0;">
          <div class="panel panel-default tabs" style="margin-bottom: 0;box-shadow: none;">
              <div class="tab-content">
                 <ul class="nav nav-tabs" style="padding:0;">
                     <li class="active"><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#sp22-setting" data-toggle="tab">Input</a></li>
                     <li><a style="border-radius: 0;margin-top: -1px;margin:0;" href="#sp22-style" data-toggle="tab">Style</a></li>
                 </ul>
                 <div class="panel-body tab-pane active" id="sp22-setting">
                    <div class="form-group">
                         <label class="col-md-4 col-xs-5 control-label"><input type="checkbox" data-option="ci_chart.SP.alert" class="fields" data-format="%s"> Alert</label>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">MA periods</label>
                        <div class="col-md-5 col-xs-7">
                            <input type="number" class="pull-left form-control fields" data-option="ci_chart.SP.maperiods" data-format="%s" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 col-xs-5 control-label">ATR periods</label>
                        <div class="col-md-5 col-xs-7">
                            <input type="number" class="pull-left form-control fields" data-option="ci_chart.SP.atrperiods" data-format="%s" />
                        </div>
                    </div>
                 </div>
                 <div class="panel-body tab-pane" id="sp22-style">
                     <div class="form-group">
                         <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="ci_chart.SP.SAlpha" class="fields" data-format="%s"> Supports</label>
                         <div class="col-md-9 col-xs-7">
                             <table width="100%">
                                 <tr>
                                     <td width="10%" style="padding-right:10px;">
                                        <input type="color" class="pull-left form-control fields" data-option="ci_chart.SP.SColor" data-format="'%s'" />
                                     </td>
                                     <td width="90%" style="padding:0 10px;">
                                        <div class="inputWrap">
                                            <input class="mini inputNumber fields" type="hidden" data-option="ci_chart.SP.STickness" data-format="%s">
                                            <div class="slider slider-line"></div>
                                        </div>
                                     </td> 
                                 </tr>
                             </table>
                         </div>
                     </div>
                     <div class="form-group">
                         <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="ci_chart.SP.RAlpha" class="fields" data-format="%s"> Resistances</label>
                         <div class="col-md-9 col-xs-7">
                             <table width="100%">
                                 <tr>
                                     <td width="10%" style="padding-right:10px;">
                                        <input type="color" class="pull-left form-control fields" data-option="ci_chart.SP.RColor" data-format="'%s'" />
                                     </td>
                                     <td width="90%" style="padding:0 10px;">
                                        <div class="inputWrap">
                                            <input class="mini inputNumber fields" type="hidden" data-option="ci_chart.SP.RTickness" data-format="%s">
                                            <div class="slider slider-line"></div>
                                        </div>
                                     </td> 
                                 </tr>
                             </table>
                         </div>
                     </div>
                 </div>
             </div> 
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade in" data-backdrop="false" id="modal-indicator-news" tabindex="-1" role="dialog" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content pn">
      <div class="modal-header">
        <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit options</h4>
      </div>
      <form class="form-news form-horizontal">
          <div class="modal-body">
              <div class="form-group">
                 <label for="importance" class="col-md-4 col-xs-5 control-label">From</label>
                 <div class="col-md-5 col-xs-7">
                   <input type="text" class="form-control datetimepicker" name="from" /> 
                 </div>
              </div> 

              <div class="form-group">
                 <label for="currencies" class="col-md-4 col-xs-5 control-label">To</label>
                 <div class="col-md-5 col-xs-7">
                   <input type="text" class="form-control datetimepicker" name="to" />  
                 </div>
              </div>

              <div class="form-group">
                 <label for="currencies" class="col-md-4 col-xs-5 control-label">Maximum Rows</label>
                 <div class="col-md-5 col-xs-7">
                   <input type="number" class="form-control" name="max" max="4" min="1" />  
                 </div>
              </div>

              <div class="form-group">
                 <label for="currencies" class="col-md-4 col-xs-5 control-label">Importance</label>
                 <div class="col-md-5 col-xs-7">
                   <label style="margin-right:15px;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="high"> High</label>
                   <label style="margin-right:15px;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="medium"> Medium</label>
                   <label style="margin-right:15px;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="low"> Low</label>
                 </div>
              </div> 

              <div class="form-group">
                 <label for="currencies" class="col-md-4 col-xs-5 control-label">Countries</label>
                 <div class="col-md-5 col-xs-7">
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="USD"> United States</label>
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="EUR"> European Union</label>
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="JPY"> Japan</label>
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="GBP"> United Kingdom</label>
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="CAD"> Canada</label>
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="AUD"> Australia</label>
                   <label style="margin-right:15px;display:block;margin-top: 7px;"><input style="float: left;margin-right: 5px;" type="checkbox" name="ALL"> ALL</label>
                 </div>
              </div> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary save">Save</button>
            <button type="button" class="btn btn-primary" onclick="$(this).parent('div').find('.save').click(); $(this).parents('.modal').modal('hide');">Save &amp; Close</button>
          </div>
      </form>
    </div>
  </div>
</div>

<div style="display: none">
  <div class="form-group" id="GTMS6-style">
      <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="hidden" class="fields" data-format="%s"> <span class="name">{{name}}</span></label>
      <div class="col-md-9 col-xs-7">
          <table width="100%">
              <tr>
                  <td width="10%" style="padding-right:10px;">
                     <input type="color" class="pull-left form-control fields" data-option="lineColor" data-format="'%s'" />
                  </td>
                  <td width="45%" style="padding:0 10px;">
                     <div class="inputWrap">
                         <input class="mini inputNumber fields" type="hidden" data-option="lineThickness" data-format="%s">
                         <div class="slider slider-line"></div>
                     </div>
                  </td>
              </tr>
          </table>
      </div>
  </div>
  <div id="GTMS6-input">
     <div class="form-group">
         <label class="col-md-4 col-xs-5 control-label">MA Periods</label>
         <div class="col-md-5 col-xs-7">
             <input type="number" class="pull-left form-control maperiods fields" data-option="maperiods" data-format="%s" />
         </div>
     </div>
     <div class="form-group">
         <label class="col-md-4 col-xs-5 control-label">ATR Periods</label>
         <div class="col-md-5 col-xs-7">
             <input type="number" class="pull-left form-control atrperiods fields" data-option="atrperiods" data-format="%s" />
         </div>
     </div>
  </div>
</div>

<div style="display: none">
  <div class="form-group" id="TD-style">
      <label class="col-md-3 col-xs-5 control-label"><input type="checkbox" onchange="if($(this).prop('checked')) { $(this).parents('.form-group').find('table').css('opacity', '1') }else{ $(this).parents('.form-group').find('table').css('opacity', '0.3') }" data-option="hidden" class="fields" data-format="%s"> <span class="name">{{name}}</span></label>
      <div class="col-md-9 col-xs-7">
          <table width="100%">
              <tr>
                  <td width="10%" style="padding-right:10px;">
                     <input type="color" class="pull-left form-control fields" data-option="bulletColor" data-format="'%s'" />
                  </td>
              </tr>
          </table>
      </div>
  </div>
</div>

<script type="text/javascript">
// $('#modal-indicator-GTMS6').modal();
</script>
 
</body>
</html>