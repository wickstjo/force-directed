
         //FUNCTION FOR CONFIGURING RADIUS
         function nodeSize(nodes, settings){

            var rad = settings.size.small;
            if(nodes.weight > 6){
                rad = settings.size.medium;
            } if (nodes.weight > 12){
                rad = settings.size.large;
            }else {
                return rad;
            }    
        }