<?php

header('Content-Type: application/json;');
 
$url = 'https://www.mql5.com/en/economic-calendar/content?date_mode=0&from=2017-10-16T00:00:00&to=2017-10-16T23:59:59&importance=15&currencies=36';    

if (@$_GET) {
	$request = $_GET;
	foreach ($request as $key => $value) {
		if (preg_match('#'.$key.'=#i', $url)) {
			$url = preg_replace('#'.$key.'=([a-zA-Z0-9-:]+)#', $key.'='.$value, $url);
		}
	}
}    

$data = file_get_contents($url, true);

$data = preg_replace("#<!--(.*?)-->#", "", $data);

die($data);