var gecko = (function () {

  var me = {};

  // Launch a browser with the specified URL.
  me.openUrl = function(url) {
    chameleon.intent({
      action:"android.intent.action.VIEW",
      data: url
    });
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

  return me;

}());
