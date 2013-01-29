 /*!
  * "Tasty Cookies" v0.1.0 | jQuery Plugin
  * http://zolidweb.com
  * 
  * Copyright (c) 2010 Mark Eliasen
  * Licensed under the MIT licenses.
  * http://www.opensource.org/licenses/mit-license.php
  */

//You need an anonymous function to wrap around your function to avoid conflict
(function ($) {
    'use strict';

    //Attach this new method to jQuery
    $.fn.extend({

        //This is where you write your plugin's name
        TastyCookies: function (options) {

            var settings = {
                textMore: "Some of the cookies are <span>essential</span> for this website to functions correctly, and have already been set. Others help us improving the user experience by giving us some insight into how the site is being used, but these will only be set if you allow it.",
                cookieName: 'tastyCookie',
                cookiePath: '/',
                cookieExpire: 180, //days
                analytics: '', //the google analytics ID
                fadeSpeed: 200,
                animationSpeed: 300,
                css: "#tastyCookies_icon{background:url(images/tastyCookies_icon.png) no-repeat bottom left;position:fixed;bottom:0;left:0;height:100px;width:100px;z-index:999999999}#tastyCookies_widget{background:#444;position:fixed;width:237px;bottom:0;left:0;z-index:99999999;height:100px;border-top-right-radius:5px;-moz-border-top-right-radius:5px;-webkit-border-top-right-radius:5px}#tastyCookies_widget p{color:#d7d7d7;font-size:12px;line-height:16px;margin:0;padding:0}#tastyCookies_widget p.tc_text{padding-right:5px;text-align:right}#tastyCookies_widget p.tc_line_1{padding-top:7px}#tastyCookies_widget div.tc_textMore{padding:7px 7px 0px 100px;display:none}#tastyCookies_widget div.tc_textMore p span{font-weight:bold}#tastyCookies_widget div.tc_textMore p a{color:#d7d7d7}#tastyCookies_widget div.tc_actions{padding-left:104px;position:absolute;bottom:0}#tastyCookies_agree{background:url(images/tastyCookies_button.png) repeat-x center left;border:0;color:#fff;font-weight:bold;font-size:12px;width:110px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;text-shadow:#363636 -1px -1px;-moz-text-shadow:#363636 -1px -1px;-webkit-text-shadow:#363636 -1px -1px}#tastyCookies_agree:active{padding-top:2px!important}#tastyCookies_More{border:0;width:21px;height:20px;display:inline-block;vertical-align:middle;padding-bottom:4px;vertical-align:top\\9}",
                html: '<div id="tastyCookies_icon"></div><div id="tastyCookies_widget"><div class="tc_textMore"><p></p></div><p class="tc_text tc_line_1">This site uses cookies to store info on</p><p class="tc_text">your computer. For the best user</p><p class="tc_text">experience you must allow</p><p class="tc_text">cookies from this site.</p><div class="tc_actions"><button id="tastyCookies_agree">Allow Cookies</button><img id="tastyCookies_More" src="images/tastyCookies_more.png" title="More Information" /></div></div>'
            },
                moreInfoOpen = false,
                total = 0;

            options =  $.extend(settings, options);

            function initAnalytics() {
                if (options.analytics.length > 0) {
                    jQuery.getScript("http://www.google-analytics.com/ga.js", function () {
                        var GATracker = _gat._createTracker(options.analytics);
                        GATracker._trackPageview();
                    });
                }
            }

            if ($.cookie(options.cookieName) === null) {
                //Add the CSS and HTML to the page
                if (options.css.length > 0) {
                    $('head').append('<style type="text/css">' + options.css + '</style>');
                }
                if (options.html.length > 0) {
                    $('body').prepend(options.html);
                    $('#tastyCookies_widget .tc_textMore p').html(options.textMore);
                }

                //Set the animation on mouse over and mouse out.
                total = $(".tc_text").length;
                moreInfoOpen = false;

                $("#tastyCookies_More").click(function () {
                    if (moreInfoOpen) {
                        $("#tastyCookies_widget div.tc_textMore").fadeOut(options.fadeSpeed, function () {
                            $("#tastyCookies_widget").animate({
                                width: 235
                            }, options.animationSpeed, function () {
                                var i = 0;
                                $(".tc_text").each(function () {
                                    $(this).fadeIn(options.fadeSpeed, function () {
                                        i += 1;
                                        if (i === total) {
                                            moreInfoOpen = false;
                                        }
                                    });
                                });
                            });
                        });
                    } else {
                        var i = 0;
                        $(".tc_text").each(function () {
                            $(this).fadeOut(options.fadeSpeed, function () {
                                i += 1;
                                if (i === total) {
                                    $("#tastyCookies_widget").animate({
                                        width: 500
                                    }, options.animationSpeed, function () {
                                        $("#tastyCookies_widget div.tc_textMore").fadeIn(options.fadeSpeed, function () {
                                            moreInfoOpen = true;
                                        });
                                    });
                                }
                            });
                        });
                    }
                });

                //set what happens when they accept
                $("#tastyCookies_agree").click(function () {
                    //hide the widget
                    $("#tastyCookies_widget, #tastyCookies_icon").fadeOut(options.fadeSpeed);
                    //set the cookie which we check for
                    $.cookie(options.cookieName, true, {
                        expires: options.cookieExpire,
                        path: options.cookiePath
                    });
                    //include analytics if set
                    initAnalytics();
                });
            } else {
                //include analytics if set
                initAnalytics();
            }
        }
    });
})(jQuery);

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(e){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],e)}else{e(jQuery)}})(function(e){function n(e){return e}function r(e){return decodeURIComponent(e.replace(t," "))}function i(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return s.json?JSON.parse(e):e}var t=/\+/g;var s=e.cookie=function(t,o,u){if(o!==undefined){u=e.extend({},s.defaults,u);if(typeof u.expires==="number"){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}o=s.json?JSON.stringify(o):String(o);return document.cookie=[encodeURIComponent(t),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=s.raw?n:r;var c=document.cookie.split("; ");var h=t?undefined:{};for(var p=0,d=c.length;p<d;p++){var v=c[p].split("=");var m=l(v.shift());var g=l(v.join("="));if(t&&t===m){h=i(g);break}if(!t){h[m]=i(g)}}return h};s.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend(n,{expires:-1}));return true}return false}})