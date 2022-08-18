

  (function($) {

    var nav_btn = ".nav_btn";
    var sp_nav = ".gnavi_outer";
  
    $(window).on("load",function(){
      $("body").addClass("loaded");
    });
      
    $(function() {
  
      var is_mobile =false;
      var is_smp =false;
      var is_retina =false;
      var is_ie =false;
      
      var ua = navigator.userAgent.toLowerCase();
      
      if ( ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0) { 
        is_mobile =true;
        $("body").addClass("mobile");
      }
      if ( ua.indexOf('iphone') > 0 || ua.indexOf('android') > 0) { 
        is_smp =true;
        $("body").addClass("smp");
      }
      if ( window.devicePixelRatio >= 2) { 
        is_retina =true;
        $("body").addClass("retina");
      }
      if ( ua.indexOf('trident') > 0) { 
        is_ie =true;
        $("body").addClass("ie");
      }
      
      //IE スクロールをスムーズに
      
       var wd = 0;
       var csp = 0;
      
       if(is_ie) {
         $('body').on("mousewheel", function () {
           event.preventDefault(false);
           wd = wd+event.wheelDelta;
           csp = window.pageYOffset;
           console.log("wd:"+wd+" csp:"+csp);
           $("html,body").stop().animate({scrollTop:csp - wd},{duration:150,complete:function(){
             wd = 0;
             csp = 0;
           }
           });
          
         });
       }			
  
      //selflink
      
      $("a").each(function(){
        var urlLink = location.href;
        if(urlLink.substr( urlLink.length-1) ==="/" ){
          urlLink = urlLink+"index.html";
        }
        var tgLink = $(this).prop("href");
        if ( tgLink === urlLink ) {
          $(this).addClass("cr");
        } else if (0 <= urlLink.search(tgLink)) {
          $(this).addClass("cr");
        } else if (0 <= urlLink.search("lineup")) {
          if ( 0 <= tgLink.search("list") && $(this).parents().hasClass("submenu") ) {
            $(this).addClass("cr");
          }
        }
      });
  
      //nav:
  
      $(document).on("click",nav_btn,function() {
        $(sp_nav).stop().slideToggle('slow');
        $("body").toggleClass("nav_open");
      });
  
      $(window).on("resize",function(){
        $(sp_nav).attr("style", "");
        $("body").removeClass("nav_open");
        
      });
  
      //ロールオーバー
          
      $(".fadeimg, .gnavi>li img").each(function() {
        $(this).wrap("<span class='fadeimg_wrap'></span>");
        var This = $(this);
        var Parent = $(this).parent("span.fadeimg_wrap");
        $(this).addClass("off");
        Parent.append(Parent.find("img.off").clone(true).removeClass("off").addClass("on"));
        var onsrc =  Parent.find("img.on").attr("src").replace(new RegExp('(_on)?(\.gif|\.jpg|\.webp|\.png)$'), "_on$2");
        Parent.find("img.on").attr("src", onsrc);
      });
  
      //スクロール処理
          
      $(window).on("scroll load", function(){
        var scr = $(this).scrollTop();
        $("*[data-scrollbreak]").each(function(){
          var scr_break = $(this).data("scrollbreak");
          if(String(scr_break).indexOf("%") != -1){
            scr_break = parseInt(scr_break) / 100 * $(window).height();
          }
          if(scr > scr_break){
            $(this).addClass("scrolled");
          }else{
            $(this).removeClass("scrolled");
          }
        });
      });
  
      //ページ内リンクはするするスクロール
  
      //PARALLAX
  
      var s_position = 160;
  
      $(window).on("load",function(){
  
        if ($("body").hasClass("mobile")){ 
          s_position = s_position / 2;
        }
      });
  
      $(window).on("load scroll",function(){
        var scr = $(window).scrollTop();
  
        /*	下記「65」の変更は任意ですので臨機応変に	*/
        if(scr >= 65 && !$("body").hasClass("scrolled") ){
          $("body").addClass("scrolled")
        } else if(scr < 65 && $("body").hasClass("scrolled") ){
          $("body").removeClass("scrolled")
        }
  
        $(".parallax:not(.p-show)").each(function(){
          if(($(this).offset().top)-($(window).height()-s_position) <= scr && !$(this).hasClass("p-show") ){
            var delay = 0;
            if($(this).data("p-delay")){
               delay = $(this).data("p-delay");	   
            }
            $(this).delay(delay).queue(function(){
              $(this).addClass("p-view").dequeue();
            })
          }
        }); // $(".parallax").each(function(){
  
        $(".p-parent:not(.p-view)").each(function(){
          var Parent = this;
          if(($(Parent).offset().top)-($(window).height()-p_play) <= scr && !$(Parent).hasClass("p-view") ){
            $(Parent).addClass("p-view");
            var delay = 0;
            if($(Parent).data("p-delay")){
               delay = $(Parent).data("p-delay");	   
            }
            //var childDelay = 0;
            $(Parent).find(".p-child:visible").each(function(i){
              var Child = this;
              $(Child).delay(delay*i).queue(function(){
                $(Child).addClass("p-view").dequeue();
                //childDelay+=delay;
              });
            });
          }
        }); // $(".parallax").each(function(){
  
      });
      
      var head_h = 0;
      
      $(window).on("load resize",function(){
        head_h = $("header").innerHeight();
        $(".wrap").css("padding-top",head_h);
      });
      
      $("a[href*='#']").click(function(){
        var Hash = $(this.hash);
        var HashOffset = $(Hash).offset().top;
        $("html,body").animate({scrollTop: HashOffset - head_h}, 500);
        return false;
      });
      
      //popup
  
      $(document).on("click","a.popup",function(){
        window.open(this.href,'null','scrollbars=yes,resizable=yes,width=750,height=800');
        return false;
      });
      $(document).on("click","a.popup_map",function(){
        window.open(this.href,'null','scrollbars=yes,resizable=yes,width=1000,height=800');
        return false;
      });
  
      //rwdImageMaps
      $('img[usemap]').rwdImageMaps();
  
      //sp2x	MACなどを考慮して is_retinaも追加 211027
      if (is_mobile || is_retina) { 
        $("img.2x").each(function() {
          $(this).attr("srcset",$(this).attr("src").replace(new RegExp('(@2x)?(\.gif|\.jpg|\.webp|\.png)$'), "@2x$2") +" 2x");
        });
      }
            
      //ie_fontfix
      if (is_ie) {
        var _separate = "DBB50237AD3FA5B818B8EECA9CA25A047E0F29517DB2B25F4A8DB5F717FF90BF0B7E94EF4F5C4E313DFB06E48FBD9A2E40795906A75C470CDB619CF9C2D4F6D9";
        var _font = ["游ゴシック", "Yu Gothic", "YuGothic", "游ゴシック体", "游明朝", "Yu Mincho", "YuMincho", "游明朝体"];
        var _font_array = [];
        var _class = "iefontfix";
        for (var fontkey in _font) {
          _font_array.push(String(_font[fontkey].slice(0, 3)));
        }
        var hoge = function (fonfon) {
          var flag = true;
          if (_font_array.indexOf(fonfon.replace(/(\'|\")/g, '')) < 0) {
            flag = false;
          }
          return flag;
        }
        var isSurfaceText = function (selector) {
          var elem = $(selector[0].outerHTML);
          elem.children().empty();
          elem = elem.text().replace(" ", "").replace(/\r?\n/g, "").replace(/\t/g, "");
          if (elem == "") {
            return false;
          } else {
            return true;
          }
        }
        var ie_font = function (_tgt) {
  
  
          if (isSurfaceText($(_tgt)) && hoge($(_tgt).css("font-family").slice(0, 4))) {
            var view_array = [];
            if ($(_tgt).children().length) {
              $(_tgt).children().before(_separate).after(_separate);
              var output = $(_tgt).html().split(_separate);
              for (var key in output) {
                var strt = output[key].slice(0, 1),
                  end = output[key].slice(-1),
                  i_tag = '<i class="' + _class + '">' + output[key] + '</i>';
  
                if (strt == "<" && end == ">") {
                  i_tag = output[key];
                } else {
                  if (String(i_tag).replace(/\s+/g, "") == '<i class="' + _class + '"></i>') {
                    i_tag = null;
                  }
                }
                view_array.push(i_tag);
              }
            } else {
              view_array.push('<i class="' + _class + '">' + $(_tgt).html() + '</i>');
            }
            $(_tgt).html(view_array.join(""));
            $(_tgt).children().each(function () {
              if (!$(this).hasClass(_class)) {
                ie_font(this);
              }
            });
          }
        }
        $("body .contents_wrap .iefont").each(function () {
          ie_font(this);
        });
      }				
  
      
    });
  
    $.fn.matchWidth = function(breakpoint) {
      if(breakpoint==null || window.matchMedia("(max-width:"+breakpoint+"px)").matches ){
        var array = [];
        
        var This = this;
        
        var mw_length = $(this).length;
        
        $(this).each(function(i){
          var img = new Image();
          img.src = $(this).attr('src');
          img.onload = function () {
            //console.log(img.width);
            var width  = img.width ;
            array.push(width);
  
             if (i+1 === mw_length) {
              // console.log(array);
  
              var arr_max = Math.max.apply(null,array);
              if(arr_max != 0){
                $(This).each(function(j){
                  var max = Math.round(array[j] / arr_max *10000)/100;
                  $(this).css("max-width",max+"%");
                });
              }
  
            }				
          }
        
        });
      }
  
    }
  
  })(jQuery);


  //ハンバーガーメニューボタン
  $('.burgerButton').on('click', function () {
    $('.burgerButton').toggleClass('close');
    $('.navWrapper').toggleClass('slide-in');
  });

  $('.navWrapper a').on('click', function () {
    $('.navWrapper').removeClass('slide-in');
    $('.burgerButton').toggleClass('close');
  });


