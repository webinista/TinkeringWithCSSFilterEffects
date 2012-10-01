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

var form,
    resethandler,
    obj = document.getElementById('filtered'),
    startstyle,
    update;

update = function(e){
    var f = obj.style.webkitFilter, newfilt,
        val = e.target.nextElementSibling,
        dropshad;

        console.log( f );

    switch( e.target.id ){
        case 'blur':
            newfilt = f.replace(/blur\([0-9]+/g,'blur('+(e.target.value*1) );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'brightness':
            newfilt = f.replace(/brightness\([\.0-9]+/,'brightness('+(e.target.value*1) );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'contrast':
            newfilt = f.replace(/contrast\([0-9]+/,'contrast('+(e.target.value*1) );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'grayscale':
            newfilt = f.replace(/grayscale\([\.0-9]+/,'grayscale('+(e.target.value*1) );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'invert':
            newfilt = f.replace(/invert\([\.0-9]+/,'invert('+(e.target.value*1) );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'hue-rotate':
            newfilt = f.replace(/hue\-rotate\([0-9]+/,'hue-rotate('+e.target.value );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'opacity':
            newfilt = f.replace(/opacity\([0-9]+/,'opacity('+e.target.value );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'sepia':
            console.log(e.target.value);
            newfilt = f.replace(/sepia\([\.0-9]+/,'sepia('+(e.target.value*1) );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'saturate':
            newfilt = f.replace(/saturate\([0-9]+/,'saturate('+e.target.value );
            val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
            break;
         case 'drop-shadow-x':
         case 'drop-shadow-y':
         case 'drop-shadow-blur':
         case 'drop-shadow-color':
            dropshad = document.querySelectorAll('input[name|=drop-shadow]')
            newfilt = f.replace(/(drop-shadow\()rgb\([0-9]+, [0-9]+, [0-9]+\) [0-9]+px [0-9]+px [0-9]+px\)/,"$1"+dropshad[0].value+'px '+dropshad[1].value+'px '+dropshad[2].value+'px '+dropshad[3].value+')');
            break;
    }

    obj.style.webkitFilter = newfilt;
}


form = document.getElementsByTagName('form')[0];
resethandler = function(){
    var values = document.getElementsByClassName('value');
    values.mappish( function(){
        var it = arguments[0];
        it.replaceChild( document.createTextNode( it.previousElementSibling.getAttribute('value') ), it.firstChild );
    });
    obj.style.webkitFilter = startstyle;
}
form.addEventListener('input',update,false);
form.addEventListener('reset',resethandler,false);
window.addEventListener('load',function(e){
    obj.style.webkitFilter = "blur(0px) brightness(0) contrast(100%) drop-shadow(0px 0px 0px #000) grayscale(0) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)";
    console.log( obj.style.webkitFilter );
},false);