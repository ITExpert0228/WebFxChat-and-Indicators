<?php

header('Content-Type: application/json;');
 
$url = 'https://sslcharts.forexprostools.com/data.php?pair_id=1&candle_count=10&pair_interval=86400&chart_type=candlestick';    
if (@$_GET) {
	$request = $_GET;
	foreach ($request as $key => $value) {
		if (preg_match('#'.$key.'=#i', $url)) {
			$url = preg_replace('#'.$key.'=([a-zA-Z0-9]+)#', $key.'='.$value, $url);
		}
	}
}    
$curl = curl_init(); 
       
curl_setopt($curl,CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_HEADER, false); 
 
$result = curl_exec($curl);    
$data = json_encode(json_decode($result));
    
curl_close($curl);    
echo $data;


