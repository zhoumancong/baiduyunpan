// ==UserScript==
// @name         Baidu Netdisk Auto Sign
// @namespace    https://greasyfork.org/zh-CN/users/123456
// @version      1.0
// @description  Automatically sign in to Baidu Netdisk every day and get rewards
// @author       Bing
// @match        https://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Check if the current page is Baidu Netdisk
    if (window.location.host.indexOf('pan.baidu.com') !== -1) {
        // Get the cookie value of BDUSS
        var bduss = getCookie('BDUSS');
        // If BDUSS exists, send a request to sign in
        if (bduss) {
            var url = 'https://pan.baidu.com/api/report/user';
            var data = 'channel=chunlei&clienttype=0&web=1&op_type=sign3&bdstoken=null&channel_sign=null&clienttype=0';
            GM_xmlhttpRequest({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'BDUSS=' + bduss
                },
                data: data,
                onload: function(response) {
                    // Parse the response JSON
                    var json = JSON.parse(response.responseText);
                    // If the sign in is successful, show a message
                    if (json.error_code === 0) {
                        alert('Baidu Netdisk Auto Sign: Success!');
                    }
                    // If the sign in is failed, show the error message
                    else {
                        alert('Baidu Netdisk Auto Sign: Failed! Error code: ' + json.error_code + ', Error message: ' + json.error_msg);
                    }
                }
            });
        }
    }

    // A function to get the cookie value by name
    function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
})();