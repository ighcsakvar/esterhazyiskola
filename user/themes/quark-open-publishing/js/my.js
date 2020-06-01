$(document).ready(function () {
    $("a.newwindow").attr("target", "_blank");
    $("a.topwindow").attr("target", "_top");

    $('a[target="_blank"]').addClass("external-link");
    $('a[target="_top"]').addClass("external-link");

    $('#body-wrapper').on('click', 'a:not(.external-link):not([href^="#"])', function (e) {
        if ($(this).attr('rel') != 'lightbox') {
            e.preventDefault();
            var url = window.location.href;
            var newurl = $(this).attr('href');

            if (url.indexOf("chromeless:true") >= 0) {
                newurl = newurl + "/chromeless:true";
            }

            if (url.indexOf("embedded:true") >= 0) {
                newurl = newurl + "/embedded:true";
            }

            if (url.indexOf("hidepagetitle:true") >= 0) {
                newurl = newurl + "/hidepagetitle:true";
            }

            if (e.ctrlKey || e.metakey) {
              window.open(newurl,'_blank');
            } else {
              window.location.href = newurl;
            }
        }
    });
});
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function eraseCookie(key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, '-1');
}
