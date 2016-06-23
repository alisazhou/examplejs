import R from 'ramda';


const filterBySearchText = (menus, form) => {
  if (form && form.searchBar) {
    const searchText = form.searchBar.searchText.value.toLowerCase();
    const match = menuInfo => (
      text => menuInfo.toLowerCase().includes(text)
    );
    const filteredMenus = menus.filter(menu => {
      const matchName = match(menu.name);
      const matchDes = match(menu.description);
      return R.either(matchName, matchDes)(searchText);
    });
    return filteredMenus;
  } else {
    return menus;
  }
};

const filterBySearchCuisine = (menus, form) => {
  if (form && form.searchBar) {
    const searchCuisine = form.searchBar.searchCuisine.value;
    if (searchCuisine === 'all') {
      return menus;
    } else {
      return menus.filter(menu => menu.tagWords.includes(searchCuisine));
    }
  } else {
    return menus;
  }
};


export { filterBySearchCuisine, filterBySearchText};
