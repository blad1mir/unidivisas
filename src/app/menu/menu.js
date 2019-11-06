//https://s3.amazonaws.com/dolartoday/data.json
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json",function(data){
  $('#texto').html('Transferencia: '+data.USD.transferencia+ '<br> Sicad: ' + data.USD.sicad2);
  $('#al').html('DolarToday al: '+data._timestamp.fecha);
    });   