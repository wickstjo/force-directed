//FUNCTION FOR CONFIGURING RADIUS
function nodeSize (nodes, settings) {

   // DEFAULT
   var rad = settings.size.small;

   if (nodes.weight > 6) {
      rad = settings.size.medium;
   } else if (nodes.weight > 12){
      rad = settings.size.large;
   }

   log(rad)
   return rad;
}

function log(stuff) { console.log(stuff); }