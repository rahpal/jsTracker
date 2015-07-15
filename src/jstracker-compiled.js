/**
 * JS tracker
 *
 * Created by rahulp on 15-07-2015.
 */

'use strict';

var JSTRACKER = {
    configs: {
        ApiBaseUrl: 'http://localhost:8899/',
        routeUrl: 'api/jstracker/logerror', //api/{controllername}/{actionname}
        RequestType: 'GET',
        async: true
    }
};

(function (window) {
    try {
        (function () {
            var xmlhttpRequestObject = null;

            if (!!window.XMLHttpRequest) {
                xmlhttpRequestObject = new XMLHttpRequest(); // Asynchronous request for IE7+, Firefox and Chrome
            } else {
                xmlhttpRequestObject = new ActiveXObject('Microsoft.XMLHTTP'); // Asynchronous request for IE6 and IE5
            }

            window.onerror = function (errorMsg, url, lineNumber, colNumber, errObject) {

                xmlhttpRequestObject.onreadystatechange = function () {
                    var responseText = null;

                    if (xmlhttpRequestObject.readyState === 4) {
                        if (xmlhttpRequestObject.status === 200) {
                            responseText = xmlhttpRequestObject.responseText;
                            console.log('Error logged.');
                        }
                    }
                };

                var queryString = JSTRACKER.configs.routeUrl + '?errmsg=' + errorMsg + '&url=' + url + '&linenum=' + lineNumber + '&colnum=' + colNumber + '&etrace=' + errObject;

                xmlhttpRequestObject.open(JSTRACKER.configs.RequestType, '' + JSTRACKER.configs.ApiBaseUrl + queryString, JSTRACKER.configs.async);
                xmlhttpRequestObject.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                xmlhttpRequestObject.setRequestHeader('Accept', 'application/json');
                xmlhttpRequestObject.send();
            };
        })();
    } catch (ex) {
        xmlhttpRequestObject.abort();
    }
})(window);

//# sourceMappingURL=jstracker-compiled.js.map