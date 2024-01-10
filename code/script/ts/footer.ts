const setElementContent = async (element: HTMLElement, contentId: number): Promise<HTMLElement> => {
    const mainUrl = 'https://www.artsdatabanken.no/api/Content/';
    try {
        const result = await fetch(mainUrl + contentId);
        const json = await result.json();
        
        // some responses have html in the body, some don't...
        if (json?.Body) {
            element.innerHTML = json.Body;
        } else if (json?.Records[0]?.References?.length) {
            json.Records[0].References.forEach(el => {
                const listElement = document.createElement('li');
                const anchorElement = document.createElement('a');
                anchorElement.innerHTML = el.Heading;
                anchorElement.href = `https://artsdatabanken.no/${el.Url}`;
                listElement.appendChild(anchorElement);
                element.appendChild(listElement);
            });
        } else {
            element.innerHTML = 'Innholdet er ikke tilgjengelig for øyeblikket.'
        }
    } catch (err) {
        console.error(err)
    }
    return element;
}

const assembleFooter = () => {
    const mainContentId = 342287; 
    const someContentId = 342288;
    const linksContentId = 341268; 

    const mainElementId = 'adb-footer-center';
    const someElementId = 'adb-footer-some';
    const linksElementId = 'adb-footer-links';

    const mainElement = setElementContent(document.getElementById(mainElementId), mainContentId);
    const someElement = setElementContent(document.getElementById(someElementId), someContentId);
    const linksElement = setElementContent(document.getElementById(linksElementId), linksContentId);

    
}

window.addEventListener('load', function() {
    assembleFooter();
})
