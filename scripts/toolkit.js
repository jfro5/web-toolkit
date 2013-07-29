"undefined"==typeof toolkit&&(toolkit={}),toolkit.hashmanager=function(){function e(){$(window).on("hashchange",t);var e="onhashchange"in window;e||(a.hash=document.location.hash,setInterval(function(){document.location.hash!==a.hash&&t(document.location.hash)},200)),a.windowLoaded=!0}function t(e){var t,n;e=o("string"==typeof e?e:location.hash),e?(t=a.globalHashList[e],n="callback",a.lastExecutor=e):a.lastExecutor&&(t=a.globalHashList[a.lastExecutor],n="undo"),t&&"function"==typeof t[n]&&t[n](e)}function n(){var e=window.location;"pushState"in history?(location.hash="!",history.pushState("",document.title,e.pathname+e.search)):location.hash="!"}function r(e){location.hash="!"+e}function i(e,n,r){var i=a.globalHashList;$(e).each(function(e,s){if(s=o(s),i[s]){var u="hashManager: hash ("+s+") already exists";throw new Error(u)}i[s]={callback:n,undo:r},a.windowLoaded&&s===o(location.hash)&&t(s)})}function o(e){return e.replace(/[#!]/g,"")}var a={globalHashList:{},hasLoaded:!1,windowLoaded:!1,lastExecutor:null};return e(),{register:i,change:r,remove:n,onHashChange:t,cleanHash:o}}(),"function"==typeof window.define&&window.define.amd&&define("utils/hashmanager",[],function(){return toolkit.hashmanager}),"undefined"==typeof toolkit&&(toolkit={}),toolkit.tabs=function(e){function t(){o.rememberState?e.register(n(),r):i.tabs.on("click",function(e){e.preventDefault(),r($(this).find("a").attr("href"))})}function n(){var e=[];return i.tabs.each(function(){e.push($(this).attr("aria-controls"))}),e}function r(e){i.tabTargets.add(i.tabs).removeClass("selected"),$("#"+e+"-tab").add($("#"+e)).addClass("selected")}var i={tabContainer:$("section[data-function=tabs]"),tabs:$("section[data-function=tabs] li[role=tab]"),tabTargets:$("section[data-function=tabs] div[role=tabpanel]")},o={rememberState:"true"===i.tabContainer.attr("data-remember-state")};return t(),{getHashList:n,changeTab:r}}(toolkit.hashmanager),"function"==typeof window.define&&window.define.amd&&define("modules/tabs",["utils/hashmanager"],function(){return toolkit.tabs}),"undefined"==typeof toolkit&&(toolkit={}),toolkit.carousel=function(e,t){function n(e,t){this.options=t,this.$viewport=e,this.$slideContainer=e.find(".skycom-carousel-container"),this.$slides=this.$slideContainer.find(">"),this.currentIndex=0,this.slideCount=this.$slides.length,this.timerId=!1,this.touchReset(),this.bindEvents()}function r(e,n,r){this.carousel=n,this.wrapper=e,this.videoId=this.wrapper.data("video-id"),this.player=this.wrapper.find("video"),this.player.sky_html5player(t.extend(!0,{videoId:this.videoId},r.player)),this.videocontrolcontainer=this.wrapper.find(".videocontrolcontainer"),this.videocontrolcontainer.find("img").on("error",function(){this.src=r.placeHolderImage}),this.bindEvents()}var i=function(){return"WebKitCSSMatrix"in e&&"m11"in new e.WebKitCSSMatrix}(),o=function(){var e=document.body.style;return void 0!==e.transform||void 0!==e.WebkitTransform||void 0!==e.MozTransform||void 0!==e.OTransform}(),a="ontouchend"in document.documentElement?"touchend":"click";n.prototype={unbindTouchEvents:function(){this.$slideContainer.off("touchstart touchmove touchend touchcancel")},bindTouchEvents:function(){this.$slideContainer.on("touchstart",this.touchstart.bind(this)).on("touchmove",this.touchmove.bind(this)).on("touchend",this.touchend.bind(this)).on("touchcancel",this.touchReset.bind(this))},bindEvents:function(){this.bindTouchEvents(),this.$slideContainer.find("a").on("click",this.pause.bind(this))},unbindEvents:function(){this.unbindTouchEvents(),this.$slideContainer.find("a").off("click")},setOffset:function(e,t){var n=this.$slideContainer.removeClass("animate");return t&&n.addClass("animate"),i?n.css("transform","translate3d("+e+"%,0,0) scale3d(1,1,1)"):o?n.css("transform","translate("+e+"%,0)"):t?n.animate({left:2*e+"%"},600):n.css({left:2*e+"%"}),this},moveSlide:function(e){var t,n,r=this,i=this.$slides;return n=e.index>=this.slideCount?0:e.index<0?this.slideCount-1:e.index,t=e.index>this.currentIndex&&!e.reverse?"left":"right",i.filter(":not(:eq("+this.currentIndex+"))").hide(),i.eq(this.currentIndex).css("float",t),i.eq(n).show().css("float","left"==t?"right":"left"),this.setOffset(e.start,!1),"undefined"!=typeof e.end&&(setTimeout(function(){r.setOffset(e.end,!0),r.$viewport.trigger("change",n)},20),this.currentIndex=n,"function"==typeof e.callback&&e.callback(n)),n},"goto":function(e,t,n){return t!==!1&&this.pause(),e!==this.currentIndex?(e>this.currentIndex?this.moveSlide({index:e,start:0,end:-50,callback:n}):this.moveSlide({index:e,start:-50,end:0,callback:n}),this):void 0},next:function(e,t){return this.goto(this.currentIndex+1,e,t),this.$viewport.find(".indicators, .actions").css("display","block"),this},previous:function(){return this.goto(this.currentIndex-1),this.$viewport.find(".indicators, .actions").css("display","block"),this},play:function(e,t){var n=this,r=this.options.interval;return n.timerId=setTimeout(function(){n.next(!1),n.timerId=setTimeout(function e(){n.next(!1,function(){n.timerId=setTimeout(e,r)})},r)},t||this.options.onPlayDelay),this.$viewport.trigger("playing"),"function"==typeof e&&e(),this},pause:function(e){return clearTimeout(this.timerId),this.$viewport.trigger("paused"),"function"==typeof e&&e(),this},touchstart:function(e){var t=e.originalEvent.touches[0];this.pause(),this.swipe.start={x:t.pageX,y:t.pageY}},touchmove:function(e){var t,n=this.swipe,r=e.originalEvent.touches[0],i=r.pageX-n.start.x,o=r.pageY-n.start.y,a=Math.abs(i)>Math.abs(o),s=0>i?this.currentIndex+1:this.currentIndex-1;n.start&&a!==!1&&(e.preventDefault(),t=100*(i/this.$slideContainer.outerWidth(!0)),i>0&&(t-=50),this.swipe.positionAsPercentage=t,this.moveSlide({index:s,start:t}))},touchend:function(e){if(this.swipe.start){var t=this.swipe,n=t.positionAsPercentage,r=e.originalEvent.changedTouches[0],i=r.pageX-t.start.x,o=null,a=75;if(Math.abs(i)>a&&(o=0>i?"left":"right"),"left"===o)this.moveSlide({index:this.currentIndex+1,start:n,end:-50});else if("right"===o)this.moveSlide({index:this.currentIndex-1,start:n,end:0});else if(0!==n){var s,u=i>0?n+50:n,c=this.currentIndex,l=0;0>u?this.currentIndex=c+1>=this.slideCount?0:c+1:(this.currentIndex-=1,l=-50,u-=50),s=0===this.currentIndex&&c===this.slideCount-1,this.moveSlide({index:c,start:u,end:l,reverse:s})}this.touchReset()}},touchReset:function(){this.swipe={start:!1,positionAsPercentage:0}}},r.prototype={bindEvents:function(){var e=this,t=function(){return!1},n=function(){return e.stop(),r.off("click",t),!1},r=this.wrapper;r.on("click",t).find(".close").one(a,n),this.player.on("ended webkitendfullscreen",n)},play:function(){var e=this,t=this.carousel.$viewport.find(".actions, .indicators");this.originalHtml=this.videocontrolcontainer.html(),this.carousel.pause(),this.showCanvas(function(){t.hide(),e.carousel.unbindTouchEvents(),e.videocontrolcontainer.add(e.player).show(),sky.html5player.play(e.wrapper)})},stop:function(){var e=this,n=this.carousel.$viewport.find(".actions, .indicators");sky.html5player.close(this.wrapper),this.hideCanvas(function(){e.carousel.bindTouchEvents(),e.videocontrolcontainer.hide().remove(),n.show(),t("<div></div>").addClass("videocontrolcontainer").html(e.originalHtml).appendTo(e.wrapper)})},showCanvas:function(e){var t,n=this.carousel.$viewport,r=n.find(".video-overlay"),i=n.find(".video-wrapper"),o=n.find(".video-wrapper .play"),a=n.find(".video-wrapper .close"),s=500;this.originalHeight=n.height(),i.addClass("playing-video"),r.fadeIn(function(){o.fadeOut(),t=Math.round(9*(n.width()/16)),n.animate({height:t},s,function(){e(),r.fadeOut(s,function(){a.addClass("active")})})})},hideCanvas:function(e){var n=this.carousel.$viewport,r=n.find(".video-overlay"),i=n.find(".video-wrapper"),o=n.find(".video-wrapper .play"),a=n.find(".video-wrapper .close"),s=500,u=this.originalHeight;r.fadeIn(s,function(){a.removeClass("active"),t(".skycom-carousel").animate({height:u},s,function(){t(".skycom-carousel").css({height:"auto"}),e(),o.fadeIn(),r.fadeOut(),i.removeClass("playing-video")})})}},t.fn.skycom_carousel=function(e){var i=t.extend(!0,{carousel:{actions:[{id:"previous",label:"Previous"},{id:"next",label:"Next"},{id:"play",label:"Play Carousel"},{id:"pause",label:"Pause Carousel"}],autoplay:!0,onPlayDelay:500,interval:6e3},video:{player:{token:"8D5B12D4-E1E6-48E8-AF24-F7B13050EE85",autoplay:!1},placeHolderImage:"//static.video.sky.com/posterframes/skychasky.jpg",autoplay:!globalskycom.browserSupport.isMobile()}},e),o={actions:function(e,n){var r,i,o,a,s="",u=n.actions,c=n.onclick;if(n.count<=1)return this;for(o in u)a="",r=u[o].id,i=u[o].label,("next"==r||"previous"==r)&&(a=" hidden-touch "),s+='<a href="#" class="skycom-internal '+a+r+'" >',s+='<span class="icon-carousel-'+r+'"></span>'+i,("next"==r||"previous"==r)&&(s+='<span class="icon-carousel-'+r+'-over over"></span>'),s+="</a>";return e.prepend('<div class="actions">'+s+"</div>").find("> .actions > *").each(function(e){t(this).attr("data-action",u[e].id).on("click",function(t){c(u[e].id),t.preventDefault()})}),this},indicators:function(e,n){var r,i,o=n.count,a=n.onclick,s='<div class="indicators"><div class="container">',u=' class="active"';if(1>=o)return this;for(i=o;i--;)s+="<span"+u+' data-track data-tracking-label="indicator"></span>',u="";return r=t(s+"</div></div>").on("click","span",function(e){a(t(e.currentTarget).index())}),e.append(r),this},video:function(e){return e.append('<div class="video-overlay"></div>'),this}};return this.each(function(){var e=t(this),a=new n(e,i.carousel);o.indicators(e,{count:a.slideCount,onclick:function(e){a.goto(e)}}).actions(e,{count:a.slideCount,actions:i.carousel.actions,onclick:function(e){a[e]()}}).video(e),e.on("click",".video-wrapper .play",function(){var e=new r(t(this).closest(".video-wrapper"),a,i.video);return e.play(),!1}).on("change",function(t,n){n=n||0,e.find(".indicators .container > *").removeClass("active").eq(n).addClass("active"),a.$slides.removeClass("active").find("a").attr("tabindex",-1),a.$slides.eq(n).addClass("active").find("a").removeAttr("tabindex")}).on("playing",function(){e.removeClass("paused").addClass("playing")}).on("paused",function(){e.removeClass("playing").addClass("paused")}).on("pause",function(){a.pause()}).on("play",function(){a.play()}).on("keyup",function(e){switch(e.keyCode){case 9:a.pause();break;case 37:a.previous();break;case 39:a.next()}}).find(".toggle-terms").on("click",function(){a.$viewport.toggleClass("showing-tandcs")}),a[i.carousel.autoplay===!0?"play":"pause"](!1,i.carousel.interval),e.trigger("change")})}}(window,jQuery),"function"==typeof window.define&&window.define.amd&&define("modules/carousel",[],function(){return toolkit.carousel}),"function"==typeof window.define&&window.define.amd&&define("toolkit",["utils/hashmanager","modules/tabs","modules/carousel"],function(e,t,n){return{hashmanager:e,tabs:t,carousel:n}});
//# sourceMappingURL=toolkit.js.map