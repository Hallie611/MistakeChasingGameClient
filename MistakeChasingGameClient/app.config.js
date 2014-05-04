window.MistakeChasingGameClient = $.extend(true, window.MistakeChasingGameClient, {
    "config": {
        "navigationType": "slideout",
        "navigation": [
      {
          "id": "home",
          "title": "Home",
          "action": "#home",
          "icon": "home",
          "location": "navigation"
      },
       {
           "title": "Chasing",
           "action": "#Chasing",
           "icon": "globe",
           "location": "navigation"
           //"icon": "questiondetail"
       },
      {
          "id": "Dictionary",
          "title": "Dictionary",
          "action": "#Dictionary",
          "location": "navigation",
          "icon": "tips"
      },
      {
          "id": "History",
          "title": "History",
          "action": "#History",
          "location": "navigation",
          "icon": "event"
      }]
    }
});