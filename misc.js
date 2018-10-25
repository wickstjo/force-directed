function log(stuff) { console.log(stuff); }

function fix(data) {

   // TEMP FRIEND OBJECT
   var temp = {};

   data.facebookFriends.forEach(entry => {
      temp[entry.facebookFriends] = [];
   });

   // RETURN FIXED DATA OBJECT
   return data;
}