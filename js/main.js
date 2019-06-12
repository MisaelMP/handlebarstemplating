function ajax_get(url, callback) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader('Authorization', 'Client-ID 40c86708e3c2809973512765e2b06431e435bfc689ad03aee990f46a01d9b1d6');
  xmlhttp.send();
}

function doSearch(searchTerm) {
  ajax_get(`https://api.unsplash.com/search/photos/?query=${searchTerm}`, function(data) {
    document.getElementsByClassName('template-container')[0].innerHTML = 'Search Unsplash';
    document.getElementsByClassName('template-container')[0].style.cssText = 'color:rgb(188, 193, 200); text-align:center; margin-top: 2rem;';
    const source = document.getElementById("template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);
    const container = document.getElementById('template-content');

    console.log(data);

    container.innerHTML = html;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementsByClassName('button')[0];
  const input = document.querySelector('input');

  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      btn.click();
    }
  });

  btn.addEventListener('click', function() {
    event.preventDefault();
    doSearch(input.value);
  });

  doSearch(input.value);
});
