function ajax_get(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('https://jsonplaceholder.typicode.com/photos', function(data) {
    document.getElementById("template-container").innerHTML = `<h1>by Misael M</h1>`;
  
    var source = document.getElementById('template').innerHTML;
    var template = Handlebars.compile(source);
    var html = template(data);
    document.getElementById("template-content").innerHTML = html;
});
