var form = document.getElementsByTagName('form')[0];
var updatevalue = function(e){
    var val, value, valuewrap;

    e.target.id == 'blur' ? val = e.target.value + 'px' : val = e.target.value;

    value = document.createTextNode(val),
    valuewrap = e.target.nextElementSibling;



    valuewrap.replaceChild(value,valuewrap.firstChild);
}

var coo = function(e){
    var filter = document.getElementById('filter');
    console.log(filter);
}

form.addEventListener('change',updatevalue,false);
form.addEventListener('change',coo,false);

