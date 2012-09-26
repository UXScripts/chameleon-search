$(document).ready(function() {

  var options = [];
  _.each(engines, function(engine, name) {
    options.push({ value: name, name: engine.title });
  });

  $("#engine_select").chameleonSelectList({
    title: "Select a Search Engine:",
    list: options,
  });

  if (gecko.getInstanceData('search-engine') !== null) {
    $("#engine_select").chameleonSelectList({ 
      selectedValue: gecko.getInstanceData('search-engine') 
    });
  }

  if (gecko.getInstanceData('search-popup') == true) {
    $("#popup_toggle").attr('checked', 'checked');
  }

  $("#save-button").click(function(e) {
    var engine = $("#engine_select").chameleonSelectList({ getSelectedItem: true }).value;
    var popup = ($("#popup_toggle").attr('checked') == 'checked');
    var changes = false;

    if (engine !== gecko.getInstanceData('search-engine')) {
      gecko.setInstanceData('search-engine', engine);
      changes = true;
    }

    if (popup !== gecko.getInstanceData('search-popup')) {
      gecko.setInstanceData('search-popup', popup);
      changes = true;
    }

    chameleon.close(changes); 
    return false;
  });  
  
  $("#cancel-button").click(function(e) {
    chameleon.close(false);
    return false;
  });

});
