/* ==========================================================
 * index.js v20160323
 * ==========================================================
 * Copyright 胡慧玲
 *
 * 秒杀首页
 * ========================================================== */
(function($) {
  var ui = {
    $hour : $('.hour')
  , $minute : $('.minute')
  , $second : $('.second')
  , $btnno : $('.btn-no')
  , $btnyes : $('.btn-yes')
  , $btnnull : $('.btn-null')
  };
  //秒杀时间5min=300s
  var runtime = 3;
  var oPage = {
    init: function() {
      this.view();
      this.listen();
    }
  , view: function() {
      var self = this;
    }
  , listen: function() {
      var self = this;

      setTimeout(function(){
        self.fajax();
      }, 500);

      ui.$btnyes.on('click', function(){
        $.ajax({
          url: oPageConfig.oUrl.remainUrl
        , type: 'get'
        , data: {}
        ,dataType: 'JSON'
        }).done(function(msg){
           //点击秒杀时候 库存量
          var inventory = msg.data.inventory;
          if(msg.code == 0){
            if(inventory==0){
              console.log(inventory);
              ui.$btnyes.addClass('hide');
              ui.$btnnull.removeClass('hide');
              ui.$btnno.addClass('hide');
            }else{
              console.log('win prize');
              ui.$btnyes.removeClass('hide');
              ui.$btnnull.addClass('hide');
              ui.$btnno.addClass('hide');
            }
          }else{
            alert(msg.message);
          }


        })
      })

   }
   //ajax请求
 , fajax: function(){
     var self = this;
      $.ajax({
        url:oPageConfig.oUrl.timeUrl
      , type:'POST'
      , data: oPageConfig.oData
      , dataType:'JSON'
      })
       .done(function(msg){
         console.log(msg.data);
         //当前时间
         var curTime = msg.data.currentTime;
         //下次 秒杀开始时间
         var seckillTime = msg.data.seckillTime;
         //打开页面时判断库存是否为0
         var inventoryOpen = msg.data.inventoryOpen;
         //剩余时间
         var timeRemain = (seckillTime - curTime);
         ui.$btnyes.addClass('hide');
         ui.$btnnull.addClass('hide');
         ui.$btnno.removeClass('hide');
/*         if(1 == inventoryOpen){
            ui.$btnyes.removeClass('hide');
            ui.$btnnull.addClass('hide');
            ui.$btnno.addClass('hide');
          } else{
            ui.$btnyes.addClass('hide');
            ui.$btnnull.removeClass('hide');
            ui.$btnno.addClass('hide');
          }*/
         setTimeout(function(){
          if(1 == inventoryOpen){
            ui.$btnyes.removeClass('hide');
            ui.$btnnull.addClass('hide');
            ui.$btnno.addClass('hide');
          } else{
            ui.$btnyes.addClass('hide');
            ui.$btnnull.removeClass('hide');
            ui.$btnno.addClass('hide');
          }

         }, timeRemain*1000);
         timeRemain;
         self.getTimeRemaining(timeRemain,runtime);
         self.printTime(timeRemain);
       }
     )

 }
  //计算剩余时间
  , getTimeRemaining: function(ret,runtime){
      console.log(ret);
      var self = this;

      //问一下
      setTimeout(function(){
        self.fajax();
      },(ret+runtime)*1000)
    }

  //换成时分秒，页面显示
  , printTime: function(ret){
      //-----换算成 时、分 、秒
        var self = this;
        setInterval(function(){
           ret = ret-1;
          if(ret< 0){
            return
          }
          var h = parseInt(ret/3600);
          var m = parseInt((ret-h*3600)/60);
          var s = Math.floor((ret-h*3600)-m*60);
          /*这两种秒数写法都可以*/
         /* var s =   Math.floor(ret%60);*/
          //更改显示效果：在小于10的数字前
          if(h <10){
            h="0"+h;
          }
          if(m<10){
            m="0"+m;
          }
          if(s<10){
            s="0"+s;
          }

          //-----显示时间
          console.log(h,m,s ,145);
          ui.$hour.html(h);
          ui.$minute.html(m);
          ui.$second.html(s);
        }, 1000);
    }


  };
  oPage.init();
})($);