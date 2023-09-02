// ==UserScript==
// @name         Baidu Netdisk Cookie
// @namespace    https://greasyfork.org/zh-CN/users/123456
// @version      1.0
// @description  Automatically get BDUSS cookie value from Baidu Netdisk and save it to Quantumult X config file
// @author       Bing
// ==/UserScript==

var bduss = $request.headers['Cookie'].match(/BDUSS=([^;]+)/)[1];
if (bduss) {
    var config = {
        url: 'http://127.0.0.1:9999/set_prefs?bduss=' + bduss,
        method: 'GET'
    };
    $task.fetch(config).then(function(response) {
        var result = JSON.parse(response.body);
        if (result.error) {
            console.log('Baidu Netdisk Cookie: Failed! Error: ' + result.error);
        } else {
            console.log('Baidu Netdisk Cookie: Success!');
        }
    }, function(reason) {
        console.log('Baidu Netdisk Cookie: Failed! Reason: ' + reason.error);
    });
}
$done({});