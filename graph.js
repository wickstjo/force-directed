//Track window size
window.watchResize(() => {

   // EMPTY OLD CONTENT BEFORE RENDERING NEW 
   $('body').html("");

   // Read in json file with promise
   d3.json("facebookFriends.json").then((data) => {

      //Settings for canvas    
      var settings = {
         color: "lightgrey",
         height: window.innerHeight,
         width: window.innerWidth,
         padding: 20,
         size: { 
               small: 16,
               medium: 60,
               large: 88 
         }
      }

      //Create variables to use with json data
      var nodes = [];
      var links = [];

      //loop through all entries
      for (let key in data.facebookFriends) {
         let name = data.facebookFriends[key].name
         let id = data.facebookFriends[key].FacebookID
         let friends = data.facebookFriends[key].friends
         let weight = friends.length * 4
         
         //Push data in nodes array
         nodes.push({
            'id': id,
            'name': name,
            'weight': weight
         })

         //get the friends for each entry and create the links
         for (let i in friends) {
            let friend = friends[i].FriendId

            //Push data in links array
            links.push({
               'source': id,
               'target': friend,
               'weight': weight
            })
         }
      }
      
      var size = nodeSize(nodes, settings);

      //Generate canvas
      var canvas = d3.select("body").append("svg")
         .attr("height", settings.height - settings.padding)
         .attr("width", settings.width - settings.padding)
         .style("background", settings.color)


      //Simulate nodes and links
      var simulation = d3.forceSimulation(nodes)
         .force("charge", d3.forceManyBody().strength(-40))
         .force("center", d3.forceCenter(settings.width / 2, settings.height / 2))
         .force("collision", d3.forceCollide().radius((d) => { return d.weight }))
         .force("link", d3.forceLink().id((d) => { return d.id; })
         .distance((d) => { return d.weight * 50 }))
         .on("tick", render)

      // SHORTHANDS FOR SPECIFIC ELEMENTS
      var   link = canvas.append("g").attr("class", "links").selectAll("link"),
            node = canvas.append("g").attr("class", "node").selectAll("node"),
            label = canvas.append("g").attr("class", "labels").selectAll("rect"),
            text = canvas.append("g").attr("class", "text").selectAll("text");

      //Using force properties on links and nodes
      simulation.nodes(nodes)
      simulation.force("link").links(links);

      // APPEND LINKS, NODES, LABELS & TEXT TO EACH ENTRY
      link = link.data(links).enter().append("line");
      node = node.data(nodes).enter().append("circle")
      label = label.data(nodes).enter().append("rect").style("visibility", "hidden");
      text = text.data(nodes).enter().append("text").style("visibility", "visible");

      // RENDER FUNCTION
      function render() {

         link
            .attr("x1", (d) => { return d.source.x; })
            .attr("y1", (d) => { return d.source.y; })
            .attr("x2", (d) => { return d.target.x; })
            .attr("y2", (d) => { return d.target.y; })
            .attr("stroke", "#2c3539")
            .attr("stroke-width", size / 2 );

         node
            .attr('r', (d) => { return d.weight })
            .attr('cx', (d) => { return d.x; })
            .attr('cy', (d) => { return d.y; })
            .attr("stroke", "black")
            .attr("stroke-width", (d) => { return size / 1.5 })
            .attr("fill", "gray")

         label
            .attr('x', (d) => { return d.x - d.name.length; })
            .attr('y', (d) => { return d.y - d.weight * 3; })
            .attr("width", (d) => { return d.name.length * d.weight * 3; })
            .attr("height", (d) => { return size })
            .style("fill", "white");

         text
            .attr('dx', (d) => { return d.x; })
            .attr('dy', (d) => { return d.y; })
            .text((d) => { return d.name; })
            .style("font-size", size * 3)
            .style("font-weight", 600)
            .style("text-anchor", "middle");
      }
   });
});