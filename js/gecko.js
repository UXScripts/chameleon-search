var gecko = (function () {

  var me = {};

  // Launch a browser with the specified URL.
  me.openUrl = function(url) {
    chameleon.intent({
      action:"android.intent.action.VIEW",
      data: url
    });
  };

  // Set the title of the widget.
  me.setTitle = function(title) {
    chameleon.setTitle({ text: title });
  };

  // Reload the entire widget code.
  me.reloadWidget = function() {
    chameleon.refresh({ reload: true });
  };

  // Show the loading animation. 
  me.showLoading = function() {
    chameleon.showLoading({ showloader: true });
  };

  // Hide the loading animation.
  me.hideLoading = function() {
    chameleon.showLoading({ showloader: false });
  };

  // Get the value of a single entry in the widget instance data.
  // If the entry doesn't exist, the default value will be returned.
  me.getInstanceData = function(key, def) {
    var data = _getInstanceData(); 
    if (data[key]) {
      return data[key];
    }
    if (def) {
      return def;
    }
    return null;
  }

  // Set the value of a single entry in the widget instance data.
  me.setInstanceData = function(key, value) {
    var data = _getInstanceData();
    data[key] = value;
    _saveInstanceData(data);
  }

  // ## Private Functions

  // Get the data object for this widget instance, creating it if it
  // currently doesn't exist.
  var _getInstanceData = function() {
    var data = chameleon.getData();
    if (data == null) {
      data = {};
    }
    return data;
  }

  // Save the _data_ object into the widget instance data storage.
  var _saveInstanceData = function(data) {
    chameleon.saveData(data);
  }

  return me;

}());
