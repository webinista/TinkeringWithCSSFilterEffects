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
    var val, value, valuewrap, style = '',
        filter = document.getElementById('filter')
        filter.style.webkitFilter = 'grayscale(0) sepia(0) saturate(0) hue-rotate(0) invert(0) opacity(1) brightness(0) contrast(1) blur(0) drop-shadow(0px 0px 0px #000)';

    if( e.target.type === 'range' ){

        if( e.target.id == 'blur' ){
            val = e.target.value + 'px';
        } else if(e.target.id == 'hue-rotate') {
            val = e.target.value + 'deg';
        } else {
            val = e.target.value;
        }

        value = document.createTextNode(val),
        valuewrap = e.target.nextElementSibling;

        style = e.target.id+'('+val+')';

        valuewrap.replaceChild(value,valuewrap.firstChild);
    } else {
        console.log('not a range element.');
    }
    console.log(style);

    filter.style.webkitFilter = style;

}

var resethandler = function( ){
    var filter = document.getElementById('filter'),
        values = document.getElementsByClassName('value');
    values.mappish( function(){
        var it = arguments[0];
        it.replaceChild( document.createTextNode( it.previousElementSibling.getAttribute('value') ), it.firstChild );
    });
    filter.style.webkitFilter = '';
    filter.removeAttribute('style');
}

form.addEventListener('change',updatevalue,false);
form.addEventListener('reset',resethandler,false);

