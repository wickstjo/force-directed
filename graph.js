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
var i = 0;
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
            links.push({'source': id, 'target': friend, 'weight': weight})
        }
    }
    //testing
    console.log(nodes);
    console.log(links);
    
    
    //Generate canvas
    var canvas = d3.select("body").append("svg")
            .attr("height", settings.height-settings.padding)
            .attr("width", settings.width-settings.padding)
            .style("background", settings.color)
    

    //Simulate nodes and links
    var simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-40))
            .force("center", d3.forceCenter(settings.width / 2, settings.height / 2))
            .force("collision", d3.forceCollide().radius((d) => { return d.weight * 40}))
            .force("link", d3.forceLink().id((d) => { return d.id; }).distance((d) => { return d.weight / 10}))
            .on("tick", ticked)
            

    //Just to make things easier down the line        
    var link = canvas.append("g").selectAll("link"),
        node = canvas.append("g").attr("class", "node").selectAll("node"),
        text = canvas.append("g").attr("class", "labels").selectAll("text");

    //Using links and nodes from our simulation
    simulation.nodes(nodes)
    simulation.force("link").links(links);
    
    //Append links through enter method
    link = link.data(links)
                .enter().append("line");

    //Append nodes through enter method 
    node = node.data(nodes)
                .enter().append("circle"); 

    text = text.data(nodes)
                .enter().append("text");
                
    //Draw the links and nodes
    function ticked(){
            
            //Properties for links
            link.attr("x1", (d) => { return d.source.x; })
                .attr("y1", (d) => { return d.source.y; })
                .attr("x2", (d) => { return d.target.x; })
                .attr("y2", (d) => { return d.target.y; })
                .attr("stroke","#2c3539")
                .attr("stroke-width", (d) => { return d.weight * 2});
                
                
            //Properties for nodes    
            node.attr('r', (d) => { return d.weight * 25; })
                .attr('cx', (d) => { return d.x; })
                .attr('cy', (d) => { return d.y; })
                .attr("stroke", "black")
                .attr("stroke-width", (d) => { return d.weight * 2})
                .attr("fill", "gray");

            //Properties for text
            text.attr('dx', (d) => { return d.x; })
                .attr('dy', (d) => { return d.y; })
                .text((d) => { return d.name; })
                .style("font-size", 12)
                .style("text-anchor", "middle");
               
    }

    
});
