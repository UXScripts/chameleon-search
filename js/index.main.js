var SearchComponents = {
  'jellybean': {
    package:'com.google.android.googlequicksearchbox',
    name: 'com.google.android.googlequicksearchbox.VoiceSearchActivity'
  },
  'ics': {
    package:'com.google.android.voicesearch',
    name: 'com.google.android.voicesearch.RecognitionActivity'
  }
};

var WIDGET = null;

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

$(document).ready(function() {

  WIDGET = $('#chameleon-widget');

  chameleon.widget({
    onLoad: function() {
      renderWidget();
    },
    onResume: function() {
      renderWidget();
    },
    onLayout: function() {
      resizeWidget();
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
    var oldText = $('#search-box').val();
    var focus = $('#search-box').is(':focus');
    loadSettings();
    WIDGET.html(ich.search_widget({ 
      placeholder: engines[settings.engine].placeholder 
    }));
    gecko.setTitle('Web Search | ' + engines[settings.engine].title);
    $('#search-box').val(oldText);
    resizeWidget();
    if (focus) {
      $('#search-box').focus();
    }
  }

  function resizeWidget() {
    $('#search-button').removeClass('tiny');
    $('#left').width(WIDGET.width() - $('#right').width() - 10);
    if ($('#search-box').width() < 200) {
      $('#search-button').addClass('tiny');
      $('#left').width(WIDGET.width() - $('#right').width() - 10);
    }
  }

  WIDGET.on('click', '#search-button', function() {
    var query = $('#search-box').val();
    if (query.length > 0) {
      var url = engines[settings.engine].query.replace('%QUERY', query);
      $('#search-box').val('');
      if (settings.popup) {
        chameleon.promptHTML({ url: url });
      }
      else {
        gecko.openUrl(url);
      }
    }
  });

  WIDGET.on('click', '#voice-button', function() {
    
    if (chameleon.componentExists(SearchComponents.jellybean)) {
      return chameleon.intent({
        component: SearchComponents.jellybean,
        action: 'android.speech.action.WEB_SEARCH'
      });
    }
    if (chameleon.componentExists(SearchComponents.ics)) {
      return chameleon.intent({
        component: SearchComponents.ics,
        action: 'android.speech.action.MAIN'
      });
    }
  });

  WIDGET.on('keyup', '#search-box', function(e) {
    if (e.which === 13) {
      $('#search-button', WIDGET).click();
      return false;
    }
  });

});
