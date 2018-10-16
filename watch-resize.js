//https://gist.github.com/glueckpress/d1a7e98fe234498c5589
(function(a){a.watchResize=function(d){var c;d.size=0;function b(){var e=a.innerWidth;clearTimeout(c);c=null;if(d.size!=e){d();d.size=e}}a.addEventListener("resize",function(){if(c){clearTimeout(c);c=null}c=setTimeout(b,50)});d()}}(window));
