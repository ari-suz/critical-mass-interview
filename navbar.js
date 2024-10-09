// read data from json file
fetch('./navigation.json')
  .then(response => response.json())
  .then(data => {
    // create nav bar element
    var nav = document.createElement('nav');
    nav.id = 'navbar';
    // iterate over json data to create nav items
    for (var i = 0; i < data.cities.length; i++) {
      let link = document.createElement('a');
      link.innerText = data.cities[i].label;
      link.id = data.cities[i].section;
      nav.appendChild(link);
    }
    // adding nav bar to html
    document.body.appendChild(nav);
  }).then(() => {
    // setting the animation and interaction behaviors
    var menu = document.querySelector("nav");
    var elements = document.getElementsByTagName('a');
    // setting the onclick function for each nav item
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = function(el) {
        var tmp = document.getElementsByTagName('a');
        for (let j = 0; j < tmp.length; j++) {
          // removing styling from any previously selected items
          tmp[j].classList.remove('selected');
        }
        // adding styles for selected item
        el.target.classList.add('selected');
        // updates the custom property (underline) with the proper placement; i.e.,
        // anchoring to the start of the menu item (offsetLeft) and sizing to the
        // width of the menu item (offsetWidth)
        menu.style.setProperty('--underline-left', el.target.offsetLeft + 'px');
        menu.style.setProperty('--underline-width', el.target.offsetWidth + 'px');
      };
    }
  });
