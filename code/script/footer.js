
// Startup
window.addEventListener('load', function() {
    console.log("loaded script footer")
    getFooter();
})

// Lets pretend this is a part of the main site
function getFooter(){       
    try{
        console.log("making footer")
        // Obtaining the relevant doi to look up.
        let url = "https://www.artsdatabanken.no/api/Content/224885";
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {     
            try{
               let footer = document.getElementById('footer');
               footer.innerHTML = data.Body;
                  
                
            }catch(err){
                console.error("failed at footer")
            }        
        })
        .catch((err) => {
            console.error("failed obtaining footer")
        })
    }catch{
        console.log("error in footer")
    }
}