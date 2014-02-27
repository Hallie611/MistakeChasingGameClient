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
        "id": "about",
        "title": "About",
        "action": "#about",
        "icon": "info",
        "location": "navigation"
      },
      {
        "title": "User",
        "action": "#User",
        //"icon": "questiondetail"
      }
    ]
  }
});