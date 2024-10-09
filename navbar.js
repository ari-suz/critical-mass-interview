fetch('./navigation.json')
  .then(response => response.json())
  .then(data => {
    var list = document.createElement('ul');
    list.id = "nav";
    for (var i = 0; i < data.cities.length; i++) {
      let entry = document.createElement('li');
      let link = document.createElement('a');
      link.innerText = data.cities[i].label;
      link.id = data.cities[i].section;
      entry.appendChild(link);
      list.appendChild(entry);
    }
    document.getElementById("main").appendChild(list);
    }
  ).then(() => {
    // var menu = document.getElementById("nav");
    // menu.addEventListener('mouseover', function(el) {
    //   menu.style.setProperty('--decoration-left', el.target.offsetLeft + 'px');
    //   menu.style.setProperty('--decoration-width', el.target.offsetLeft + 'px');
    // });
    var elements = document.getElementsByTagName('a');
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = function(el) {
        var tmp = document.getElementsByTagName('a');
        for (let j = 0; j < tmp.length; j++) {
          tmp[j].classList.remove('selected');
        }
        el.target.classList.add('selected');
      };
    }
  });
