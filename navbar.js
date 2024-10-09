// this function is used to display the current local time for a city
const showTime = (el) => {
  fetch('./timezones.json')
    .then(response => response.json())
    .then(data => {
      const map = new Map(Object.entries(data.cities));
      // could do more data transformation if JSON was larger, avoid long for loop
      map.forEach((k, v) => {
        if (k.section === el.target.id) {
          var date = new Date(Date.now());
          // parsing to get only the time, not date
          var dateSplit = date.toLocaleString('en-US', {timeZone: k.timezone}).split(" ");
          var timeComponent = document.getElementById('time-div');
          timeComponent.innerHTML = 'Current local time is: ' + dateSplit[1] + ' ' + dateSplit[2];
          // setting diplay property to show time
          timeComponent.style.display = 'block';
          document.getElementById('close-button').style.display = 'block';
        }
      });
    })
    .catch(err => alert('Error retrieving timezone file: ', err));
};
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
    document.getElementById('nav-container').appendChild(nav);
  }).then(() => {
    // setting the animation and interaction behaviors
    var menu = document.querySelector("nav");
    var elements = document.getElementsByTagName('a');
    // setting the onclick function for each nav item
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = function(el) {
        showTime(el);
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
    // set onclick for the hide time button
    var closeButton = document.querySelector('button');
    closeButton.onclick = function() {
      document.getElementById('time-div').style.display = 'none';
      document.getElementById('close-button').style.display = 'none';
    }
  })
  .catch(err => alert('Error loading the navigation.json file: ', err));
