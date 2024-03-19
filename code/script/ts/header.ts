window.addEventListener('load', function () {
    getHeaderMenu();
})

window.addEventListener('click', function (e: MouseEvent) {
    // Closes menu dropdown menu when clicking outside it.
    if (document.getElementById('adb-headermenu')) {
        const target = e.target as HTMLElement;
        if (!document.getElementById('adb-headermenu').contains(target)) {
            const headerMenu = document.getElementById('dropdown-header-menu');
            if (headerMenu) {
                headerMenu.style.display = "none";
                const dropDownButton = document.getElementById('toggle-dropdown-button');
                dropDownButton.setAttribute('aria-expanded', 'false');
            }
        }
    }

    // Closes search field dropdown menu when clicking outside it.
    const searchField = document.getElementById('adb_header_search');
    const searchFieldToggleButton = document.getElementById('adb_header_search_mobile');
    if (searchField) {
        const target = e.target as HTMLElement;
        if (!searchField.contains(target) && !searchFieldToggleButton.contains(target)) {
            const closedClassName = 'closed';
            searchField.classList.add(closedClassName);
        }
    }
});

const toggleDropdown = (button: HTMLButtonElement) => {
    const headerMenu = document.getElementById('dropdown-header-menu');
    const isOpen = headerMenu.style.display == 'block';

    if (isOpen) {
        headerMenu.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
    } else {
        headerMenu.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
    }
}

const toggleSearch = () => {
    const closedClassName = 'closed';
    const id = 'adb_header_search';
    const searchField = document.getElementById(id);

    if (searchField.classList.contains(closedClassName)) {
        searchField.classList.remove(closedClassName);
    } else {
        searchField.classList.add(closedClassName);
    }
}

const getHeaderMenu = () => {
    try {
        let url = "https://www.artsdatabanken.no/api/Content/341039";
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                try {
                    let apimenus = data.Records;

                    const menuButtonChevron = document.createElement('span');
                    menuButtonChevron.classList.add('material-icons');
                    menuButtonChevron.innerHTML = 'expand_more';

                    const menuButton = document.createElement('button');
                    menuButton.id = 'toggle-dropdown-button';
                    menuButton.classList.add('dropdown-toggle');
                    menuButton.ariaHasPopup = 'true';
                    menuButton.innerHTML = 'Meny';
                    menuButton.appendChild(menuButtonChevron);

                    const menuDiv = document.createElement('div');
                    menuDiv.id = 'dropdown-header-menu';
                    menuDiv.classList.add('dropdown-menu', 'header-mega-menu');
                    menuDiv.style.display = 'none';

                    const menuUl = document.createElement('ul');
                    menuUl.classList.add('adb-dropdown-box');

                    menuDiv.appendChild(menuUl);

                    try {
                        document.getElementById('adb-headermenu').appendChild(menuButton);
                        document.getElementById('adb-headermenu').appendChild(menuDiv);
                    } catch (e) {
                        console.error('unable to add header menu');
                    }

                    apimenus.forEach((submenu: any, index: number) => {

                        let buttonname = submenu.Values;

                        // Generate the dropdowncontent 
                        const listElement = document.createElement('li');
                        listElement.classList.add('dropdown-list');
                        listElement.id = 'dropdown-list-' + index;

                        const listTitle = document.createElement('span');
                        listTitle.classList.add('dropdown-list-title');
                        listTitle.innerHTML = buttonname;

                        listElement.appendChild(listTitle);

                        const menuDropdownList = document.createElement('ul');
                        submenu.References.forEach((item: any) => {
                            const listItem = document.createElement('li');
                            const anchorItem = document.createElement('a');
                            anchorItem.classList.add('header-mega-link-element');

                            if (item.Records.length < 2 || item.Heading === 'Kunnskapsstatus for artsmangfoldet') {
                                anchorItem.href = 'https://artsdatabanken.no' + item.Url;
                            } else {
                                anchorItem.href = item.Records.find((record: any) => !record.Label).Values[0];
                            }

                            const anchorItemContent = document.createElement('div');
                            anchorItemContent.classList.add('header-mega-link-text');

                            const anchorItemContentHeader = document.createElement('b');
                            anchorItemContentHeader.classList.add('header-site-name');
                            anchorItemContentHeader.innerHTML = item.Heading ?? item.Title;

                            const anchorItemContentDescription = document.createElement('p');
                            anchorItemContentDescription.classList.add('header-site-description');
                            anchorItemContentDescription.innerHTML = item.Records[0].Values[0].startsWith('//') || item.Records[0].Values[0].startsWith('http') ? item.Records[1].Values[0] : item.Records[0].Values[0];

                            anchorItemContent.appendChild(anchorItemContentHeader);
                            anchorItemContent.appendChild(anchorItemContentDescription);

                            const anchorItemIconContainer = document.createElement('div');
                            anchorItemIconContainer.classList.add('contain-the-icon');

                            const anchorItemIcon = document.createElement('div');
                            anchorItemIcon.classList.add('material-icons');
                            anchorItemIcon.innerHTML = 'chevron_right';

                            anchorItemIconContainer.appendChild(anchorItemIcon);

                            anchorItem.appendChild(anchorItemContent);
                            anchorItem.appendChild(anchorItemIconContainer);

                            listItem.appendChild(anchorItem);

                            menuDropdownList.appendChild(listItem);
                        });

                        listElement.appendChild(menuDropdownList);
                        menuUl.appendChild(listElement);
                    });


                    menuButton.addEventListener('click', function () {
                        const dropDown = document.getElementById('dropdown-header-menu');
                        if (dropDown.style.display == 'none') {
                            dropDown.style.display = 'block';
                        } else {
                            dropDown.style.display = 'none';
                        }
                    });
                } catch (err) {
                    console.error("failed at headermenu")
                }
            })
            .catch(() => {
                console.error("failed obtaining headermenu")
            })
    } catch {
        console.error("error in headermenu")
    }
}