/*
Tinkering with CSS Filter Effects
Copyright (c) 2012 Tiffany B. Brown

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Tinkering with CSS Filter Effects
Copyright (c) 2012 Tiffany B. Brown

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


window.addEventListener('load',function(e){
   var form = document.forms[0],
    cssObj = document.styleSheets[0],
    resethandler,
    obj = document.getElementById('filtered'),
    startstyle,
    update,
    buttonhandler,
    overlay   = document.getElementById('overlay'),
    /* Remove them from the DOM and add them back when needed */
    showabout = overlay.removeChild( document.getElementById('showabout') ),
    showcss   = overlay.removeChild( document.getElementById('showcss') ),

    filterRule = function(){
        var rules = cssObj.cssRules,
			index = rules.length,
			i = 0,
			result = {};

		while( i < index ){
			if( /filter:/.test( rules[i].cssText ) ){
				result.rule = rules[i].cssText;
				result.index = i;
				return result;
				break;
			}
			i++;
		}
	},

    startstyle = filterRule(cssObj[0]),

    update = function(e){
        var f = cssObj.cssRules[ startstyle.index ].cssText,
        	newfilt,
            val = e.target.nextElementSibling,
            dropshad,
            ind = startstyle.index,
            rgb1 = /(drop-shadow\()[0-9]+px [0-9]+px [0-9]+px rgb\(0, 0, 0\)\)/,
            rgb2 = /(drop-shadow\()rgb\(0, 0, 0\) [0-9]+px [0-9]+px [0-9]+px\)/,
            hex = /(drop-shadow\()[0-9]+px [0-9]+px [0-9]+px #[0-9a-f]{6}\)/;

        switch( e.target.id ){
            case 'blur':
                newfilt = f.replace(/blur\([0-9]+/g,'blur('+(e.target.value*1) );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'brightness':
                newfilt = f.replace(/brightness\([\.0-9]+/,'brightness('+(e.target.value*1) );
                break;
             case 'contrast':
                newfilt = f.replace(/contrast\([0-9]+/,'contrast('+(e.target.value*1) );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'grayscale':
                newfilt = f.replace(/grayscale\([\.0-9]+/,'grayscale('+e.target.value );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'invert':
                newfilt = f.replace(/invert\([\.0-9]+/,'invert('+e.target.value );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'hue-rotate':
                newfilt = f.replace(/hue\-rotate\([0-9]+/,'hue-rotate('+e.target.value );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'opacity':
                newfilt = f.replace(/opacity\([\.0-9]+/,'opacity('+e.target.value );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'sepia':
                newfilt = f.replace(/sepia\([\.0-9]+/,'sepia('+(e.target.value*1) );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'saturate':
                newfilt = f.replace(/saturate\([\.0-9]+/,'saturate('+(e.target.value*1) );
                val.replaceChild(document.createTextNode(e.target.value),val.firstChild);
                break;
             case 'drop-shadow-x':
             case 'drop-shadow-y':
             case 'drop-shadow-blur':
             case 'drop-shadow-color':
                dropshad = document.querySelectorAll('input[name|=drop-shadow]');

                newfilt = function(rule){
                    var nf;

                    if (rgb1.test(rule)) {
                        nf = f.replace(rgb1,"$1"+dropshad[0].value+'px '+dropshad[1].value+'px '+dropshad[2].value+'px '+dropshad[3].value+')');
                    }
                    if (rgb2.test(rule)) {
                        nf = f.replace(rgb2,"$1"+dropshad[0].value+'px '+dropshad[1].value+'px '+dropshad[2].value+'px '+dropshad[3].value+')');
                    }
                    if (hex.test(rule)) {
                        nf = f.replace(hex,"$1"+dropshad[0].value+'px '+dropshad[1].value+'px '+dropshad[2].value+'px '+dropshad[3].value+')');
                    }
                    return nf;
                }(f);
                break;
        }

       if( newfilt ) {
            cssObj.deleteRule( ind );
            cssObj.insertRule( newfilt, ind );
       }
    }

    buttonhandler = function(e){
        if( Object.prototype.toString.call( e.target ) == '[object HTMLButtonElement]' && e.target.type !== 'reset'){
            overlay.classList.remove('hide');

            var index = filterRule( cssObj[0] ).index;

            if( e.target.id == 'getcss' ){
                var css = document.createTextNode( cssObj.cssRules[ index ].cssText );
                var c = document.createElement('code');
                c.appendChild(css);

                if( showcss.lastElementChild.firstChild ){
                    showcss.lastElementChild.replaceChild(c, showcss.lastElementChild.firstChild );
                } else {
                    showcss.lastElementChild.appendChild(c);
                }

                overlay.replaceChild(showcss, overlay.firstChild);
            }
            if( e.target.id == 'getabout' ){
                overlay.replaceChild(showabout, overlay.firstChild);
            }
        }
    },

    resethandler = function(){
        var values = document.getElementsByClassName('value');

        Array.prototype.map.call( values, function(v){
            if( v.previousElementSibling.getAttribute('value') != v.firstChild ){
                v.replaceChild( document.createTextNode( v.previousElementSibling.getAttribute('value') ), v.firstChild );
            }
        });

		cssObj.deleteRule( startstyle.index );
        cssObj.insertRule( startstyle.rule, startstyle.index );

    }

    form.addEventListener('input',update,false);
    form.addEventListener('reset',resethandler,false);

    form.addEventListener('click',buttonhandler,false);

    form.addEventListener('submit', function(e){ e.preventDefault() },false);

    overlay.addEventListener('click',function(e){
        if( e.target.classList.contains('close') || e.target.id == 'overlay'){
            this.classList.add('hide');
        }
    },true);
},false);
