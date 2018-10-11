//Read in json file with promise
d3.json("facebookFriends.json").then((data) => {

//Settings for canvas    
var settings = {
    color: "lightgrey",
    height: window.innerHeight,
    width: window.innerWidth,
    radius: 3,
    padding: 20
}

//Create variables to use with json data
var nodes = [];
var links = [];


    //loop through all entries
    for (let key in data.facebookFriends) {
        let name = data.facebookFriends[key].name
        let id = data.facebookFriends[key].FacebookID
        let friends = data.facebookFriends[key].friends
        var weight = friends.length
        //Push data in nodes array
        nodes.push({'id': id, 'name': name, 'weight': weight})
        
        //get the friends for each entry and create the links
        for(let i in friends){
            let friend = friends[i].FriendId
            //Push data in links array
            links.push({'source': id, 'target': friend})
        }
    }
    //testing
    console.log(nodes);
    console.log(links);
    
    
    //Generate canvas
    var canvas = d3.select("body").append("svg")
            .attr("height", settings.height-settings.padding)
            .attr("width", settings.width-settings.padding)
            .style("background", settings.color);
            
    //Simulate nodes
    var simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-30))
            .force("center", d3.forceCenter(settings.width / 2, settings.height / 2))
            .force("collision", d3.forceCollide().radius((d) => { return d.weight * 20}))
            .force("link", d3.forceLink())
            .on("tick", ticked);


    //Function that creates visual nodes                 
    function ticked() {

        var node = canvas.selectAll('circle')
                .data(nodes)
            //Loop that creates every circle based on nodes arraydata
            node.enter()
                    .append('circle')
                    .attr('r', (d) => {
                        return d.weight * 15
                    })
                    .merge(node)
                    .attr('cx', (d) => {
                        return d.x
                    })
                    .attr('cy', (d) => {
                        return d.y
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", (d) => { return d.weight * 2})
                    .attr("fill", "gray")
            
            node.exit().remove()
        }
   
});
