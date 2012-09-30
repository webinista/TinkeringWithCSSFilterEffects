/*
Mimics Array.prototype.map().
Need to use arguments[0] instead of this
inside of func. Rethink this.
*/
NodeList.prototype.mappish = function(func){
    var nodelistarr = [], len = this.length, i;
    for(i=0; i<len; i++){
        nodelistarr[i] = this[i];
    }
    nodelistarr.map(func);
}

var form = document.getElementsByTagName('form')[0];

var updatevalue = function(e){
    var val, value, valuewrap;

    if( e.target.type === 'range' ){

        e.target.id == 'blur' ? val = e.target.value + 'px' : val = e.target.value;

        value = document.createTextNode(val),
        valuewrap = e.target.nextElementSibling;

        valuewrap.replaceChild(value,valuewrap.firstChild);
    } else {
        console.log('not a range element.');
    }
}

var resethandler = function( ){
    var filter = document.getElementById('filter'),
        values = document.getElementsByClassName('value');
    values.mappish( function(){
        var it = arguments[0];
        it.replaceChild( document.createTextNode( it.previousElementSibling.getAttribute('min') ), it.firstChild );
    });
    filter.style.webkitFilter = '';
    filter.removeAttribute('style');
}

form.addEventListener('change',updatevalue,false);
form.addEventListener('reset',resethandler,false);

