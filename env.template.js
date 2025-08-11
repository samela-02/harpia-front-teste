(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["protocol"]       = "${protocol}";
    window["env"]["apiroot"]        = "${apiroot}";
    window["env"]["host"]           = "${host}";
    window["env"]["port"]           = "${port}";
    window["env"]["context"]        = "${context}";
  })(this);
