$(document).ready(function() {

  var WIDGET = $('#chameleon-widget');
  
  var settings = {
    _keys: {
      engine: 'search-engine',
      popup: 'search-popup'
    },
    _defaults: {
      engine: 'google',
      popup: false
    }
  };

  chameleon.widget({
    onLoad: function() {
      renderWidget();
    },
    onResume: function() {
      renderWidget();
    },
    onConfigure: function() {
      if (chameleon.connected()) {
        chameleon.promptHTML({
          url: 'settings.html', 
          result: function(success) {
            if (success) {
              renderWidget();
            }
          }
        });
      }
    },
    onRefresh: function() {
      if (chameleon.devMode() && chameleon.connected()) {
        gecko.reloadWidget();
      }
    },
    notChameleon: function() {
      if (window.location.hash == '#testing') {
        WIDGET.addClass('debug');
        renderWidget();
      }
      else {
        window.location = '/chameleon/about/#search';
      }
    },
  });

  function loadSettings() {
    _.each(settings._keys, function(key, name) {
      settings[name] = gecko.getInstanceData(key, settings._defaults[name]);
    });
  }

  function renderWidget() {
    loadSettings();
    WIDGET.html(ich.search_widget({ 
      placeholder: engines[settings.engine].placeholder 
    }));
  }

  WIDGET.on('click', '#search-button', function() {
    var query = $('#search-box').val();
    if (query.length > 0) {
      var url = engines[settings.engine].query.replace('%QUERY', query);
      if (settings.popup) {
        chameleon.promptHTML({ url: url });
      }
      else {
        gecko.openUrl(url);
      }
    }
  });

});
