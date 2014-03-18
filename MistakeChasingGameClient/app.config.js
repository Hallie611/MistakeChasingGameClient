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
          "title": "User",
          "action": "#User"
          //"icon": "questiondetail"
      },
      {
          "id": "Dictionary",
          "title": "Dictionary",
          "action": "#Dictionary",
          "location": "navigation"
      }
    ]
    }
});