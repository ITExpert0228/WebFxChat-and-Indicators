function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    document.querySelector('#chartdiv_currindex_comp').className = 'fullscreen';
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else { 
    document.querySelector('#chartdiv_currindex_comp').className = ''; 
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}
function myDateFormat(_date, format) {
    return format.replace('y', _date.getFullYear())
               .replace('m', add0((_date.getMonth()+1))) 
               .replace('d', add0(_date.getDate())) 
               .replace('H', add0(_date.getHours())) 
               .replace('i', add0(_date.getMinutes())) 
               .replace('s', add0(_date.getSeconds())) 
}
function add0(date) {
   return parseInt(date) < 10 ? '0'+date : date;
}
function myDate(date, format) {
    _dd = new Date(date);
    return myDateFormat(_dd, format);
} 
function objectifyForm(formArray) { var returnArray = {};for (var i = 0; i < formArray.length; i++){  returnArray[formArray[i]['name']] = formArray[i]['value'];}return returnArray;} 
var slider_c, slider_l, slider_c2;
function doSlider() {
    slider_c = $(".slider-column").slider({
        min: 0,
        max: 1,
        step: 0.1,
        slide: function (event, ui) {
            $(this).parent().find(".inputNumber").val(ui.value);
            $(this).parent().find(".inputNumber").find('.handle').text(ui.value);
        },
        stop: function () {
          $(this).parent().find(".inputNumber").change();
        },
        create: function(event, ui){
            $(this).slider('value',$(this).parent().find(".inputNumber").val());
            $(this).parent().find(".inputNumber").find('.handle').text(ui.value);
        }
    });
    slider_l = $(".slider-line").slider({
        min: 1,
        max: 5,
        step: 0.1,
        slide: function (event, ui) {
            $(this).parent().find(".inputNumber").val(ui.value);
        },
        stop: function () {
          $(this).parent().find(".inputNumber").change();
        },
        create: function(event, ui){
            $(this).slider('value',$(this).parent().find(".inputNumber").val());
        }
    });
    slider_c2 = $(".slider-column-2").slider({
        min: 0,
        max: 50,
        step: 0.1,
        slide: function (event, ui) {
            $(this).parent().find(".inputNumber").val(ui.value);
            $(this).parent().find(".inputNumber").find('.handle').text(ui.value);
        },
        stop: function () {
          $(this).parent().find(".inputNumber").change();
        },
        create: function(event, ui){
            $(this).slider('value',$(this).parent().find(".inputNumber").val());
            $(this).parent().find(".inputNumber").find('.handle').text(ui.value);
        }
    });
}

function CurTime(){
    var cd = new Date();
    return cd.getTime();
}

$(document).ready(function () {
    var layout = [{
            type: 'layoutGroup',
            orientation: 'vertical',
            width: '100%',
            items: [{
                type: 'documentGroup',
                height: '100%',
                items: [{
                    minHeight: 200,
                    type: 'documentPanel',
                    title: 'Chat Room',
                    contentContainer: "chatroom"
                },{
                    type: 'documentPanel',
                    title: 'Forex Chart',
                    contentContainer: "Custom-Indicators"
                },{
                    minHeight: 200,
                    type: 'documentPanel',
                    title: 'Currency Strength',
                    contentContainer: "Current-strngth"
                }]
            }]
    }];
    $('#jqxDockingLayout').jqxDockingLayout({ theme: 'energyblue', width: '100%', height: 850, layout: layout });
    $('.datetimepicker').datetimepicker({
        timeFormat: "hh:mm:ss"
    });
});