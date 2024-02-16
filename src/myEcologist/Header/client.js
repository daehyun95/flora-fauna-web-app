import  fetchWikiExtract from "./apiHelper";

export const search = async(query) => {
    const response = await fetchWikiExtract(query);
    console.log(Object.values(response.query.pages)[0]);
    return Object.values(response.query.pages)[0];
} 
