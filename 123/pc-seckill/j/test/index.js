+function() {
  setTimeout(function() {
    $.ajax = function(options) {
      var dfd = $.Deferred()
        , data = {
        }
        , url = options.url
        , params = options.data
        , code = 0
        , message;

      if(url.indexOf('/time') > -1) {
        message = 'time ok';
        data = {
          currentTime:'1458893775'
          , seckillTime:'1458907200'
          , inventoryOpen:1
        }
        code = 0;
      }else if(url.indexOf('/remain') > -1){
        message = 'remain ok';
        data = {
          inventory:1
        }
        code = 0;
      }

      console.log('$.ajax', url, options, {code: 0, message: message, data:data});
      setTimeout(function() {
        dfd.resolve({code: code, message: message, data:data});
      }, 0);
      return dfd;
    }
  });
}();
