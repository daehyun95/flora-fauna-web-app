import axios from "axios";

function fetchWikiExtract(query) {

    const wikiEndpoint = "https://en.wikipedia.org/w/api.php"
    const wikiParams = "?action=query"
    +'&format=json'
    +'&prop=extracts%7Cinfo&titles=' + query
    +'&inprop=url'
    // +'&redirects=true'
    +"&origin=*"

        // + "&format=json"
        // + "&prop=links" 
        // + "&meta=&titles=" + query
        // + "&list=search" 
        // + "&srsearch=" + query
        // + "&prop=info&inprop=url"
        // + "&pllimit=500"
        // + "&origin=*"


    const wikiLink = wikiEndpoint + wikiParams;
    console.log(wikiLink);

    let wikiConfig = {
        timeout: 6500
    };

    async function getJsonResponse(url, config) {
        const res = await axios.get(url, config)
        return res.data;
    }
    return getJsonResponse(wikiLink, wikiConfig).then(result => {
        return result
    }).catch(error => { console.log("an error has occured: " + error) });
    return null;
}

  export default fetchWikiExtract;