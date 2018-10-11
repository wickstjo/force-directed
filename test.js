var nodes = [];
var links = [];

d3.json("test.json").then((data) => {
    //loops through json data
    for(let key in data["facebookFriends"]){
        let name = data["facebookFriends"][key]["names"];
        let id = data["facebookFriends"][key]["id"];
        let friends = data["facebookFriends"][key]["friends"];

        //create nodes
        nodes.push({"id": id, "name": name})
        
        //get friends for each object/entry and create links
        for (let i in friends){
            let friend = friends[i]["FriendId"]
            links.push({"source":id, "target": friend})
        }
    }
    
    
});