

d3.json("facebookFriends.json").then((data) => {

var colour = "lightgrey";

var nodes = [];
var links = [];

var canvas = d3.select("body")
   .append("div")
   .classed("svg-container", true) //container class to make it responsive
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 400 400")
   //class to make it responsive
   .classed("svg-content-responsive", true)
   .style("background", colour);


    //loop through all entries
    for (let key in data['facebookFriends']) {
        let id = data['facebookFriends'][key]['FacebookID']
        let name = data['facebookFriends'][key]['name']
        let friends = data['facebookFriends'][key]['friends']

        //create the nodes
        nodes.push({'id': id, 'name': name})
        
        //get the friends for each entry and create the links
        for(let i in friends){
            let friend = friends[i]['FriendId']
            links.push({'source': id, 'target': friend})
            
        }
    }
    console.log(nodes);
    console.log(links);
});
