import R from 'ramda';


const byText = text => menus => {
  const match = menuInfo => (
    text => menuInfo.toLowerCase().includes(text)
  );
  const filteredMenus = menus.filter(menu =>
    R.either(match(menu.name), match(menu.description))(text.toLowerCase())
  );
  return filteredMenus;
};

const byCuisine = cuisine => menus => {
  if (cuisine === 'all') {
    return menus;
  }
  return menus.filter(menu => menu.tagWords.includes(cuisine));
};


const combineFilters = (menus, form) => {
  if (!form || !form.searchBar) {
    return menus;
  }
  return R.compose(
    byText(form.searchBar.searchText.value),
    byCuisine(form.searchBar.searchCuisine.value)
  )(menus);
};


export { byCuisine, byText, combineFilters };
