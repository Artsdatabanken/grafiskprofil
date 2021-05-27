// Startup
window.addEventListener('load', function() {
    console.log("loaded script header")
    getHeaderMenu();
})

window.addEventListener('click', function(e) {
    // Closes dropdown menu when clicking outside it. 
    if (document.getElementById('headermenu')){
        if (!document.getElementById('headermenu').contains(e.target)) {
            if(document.getElementById("Omoss")){
                document.getElementById("Omoss").style.display = "none";
            }
            if(document.getElementById("Meny")){
                document.getElementById("Meny").style.display = "none";
            }
            //document.getElementById("English").style.display = "none";
        }

        if(e.target.id == "navbar-mobile"){
            let drop = document.getElementById("headermenu");
            if(drop.className == "hide"){
                drop.className = "show"
            }else{
                drop.className = "hide"
            }
        }
   }
})

// Lets pretend this is a part of the main site
function getHeaderMenu(){       
    try{
        console.log("making header menu")
        // Obtaining the relevant doi to look up.
        let url = "https://www.artsdatabanken.no/api/Content/224883";
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {     
            try{
                //console.log("received data")
                let apimenus = data.Records;            
                for (let i in apimenus){
                    let item = apimenus[i];
                    let id = item.Values.toString().replace(" ","");

                    //console.log("stage 1")
                    // Using createelement to enable attachment of eventlistener
                    let buttonname = item.Values;
                    if(buttonname == "English"){
                        // Currently hiding it due to lack of uu in homepage. 
                        // Add to page
                        let spacer = document.createElement('div');
                        spacer.className = "englishspacer";   
                        appendData('headermenu',spacer);
                        return null;                       
                    }

                    //console.log("stage 2")
                    let menubutton = document.createElement('button');
                    menubutton.className = "menuitems";                    
                    let dropicon = " <span class='dropicon material-icons'>arrow_drop_down</span>";
                    
                    // Generate the dropdowncontent 
                    let newdropdown ="<ul class='dropdown' id='"+id+"' style='display:none'>";      
                    let subitems = item.References;  
                    //console.log("stage 3")                  
                    for(let j in subitems){
                        subitem = subitems[j];                        
                        let infotext = "";
                        let link = null;
                        for(let k in subitem.Records){
                            let subsub = subitem.Records[k];
                           if( subsub.Label == "MenuInfoText"){
                            infotext = subsub.Values.toString();
                            infotext = "<span>"+infotext+"</span>";
                           }else{
                            link = subsub.Values.toString();
                           }                           
                        }
                        let name = subitem.Heading;
                        let external = "";                        
                        let url = "https://artsdatabanken.no"+subitem.Url;
                        if(!subitem.Heading){
                            name= subitem.Header.Content;                           
                            if(link[0] == "/"){
                                link = "https:" + link;
                            }
                            external = " <b class='material-icons'>open_in_new</b>";
                            url = link;
                        }
                        newdropdown += "<li><a href='"+url+"'>"+name+external+infotext+"</a></li>";
                    }                
                    newdropdown +="</ul>";
                    
                    //console.log("stage 4")
                    // ADD ALL BUTTONCNTENT
                    menubutton.innerHTML = buttonname+dropicon+ newdropdown; // attach it

                    // Toggle the relevant dropdownmenu
                    menubutton.addEventListener('click',function(e){
                        let target = e.target;
                        if(target.className =="dropicon material-icons"){
                            target = target.parentElement;
                        }
                        target = target.querySelector('.dropdown');
                        let siblings = $(".dropdown");
                        let show = false;
                        if(target && target.style.display == "none"){
                            show = true;
                        }
                        for(let i in siblings){
                            // hide all the siblings before dealing with the current
                            let sibling = siblings[i];
                            if(sibling.style){
                                sibling.style.display = "none";
                            }                            
                        }
                        if(show){
                            target.style.display = "block";
                        }
                    });
                    // Add to page
                    //console.log("stage 5")
                    appendData('headermenu',menubutton);
                }
            }catch(err){
                console.error("failed at headermenu")
            }        
        })
        .catch((err) => {
            console.error("failed obtaining headermenu")
        })
    }catch{
        console.log("error in headermenu")
    }
}

function appendData(id,content){
    
    if(content!= undefined && id!= undefined ){
        try{
            document.getElementById(id).appendChild(content);
        } catch(err){
            console.error("failed for id: ",id,"and content:" ,content);
        }
        
    }else{
        // To avoid entire page breaking down if one error occurs
        console.error("no such content ", id,content);
    }            
}