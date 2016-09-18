import R from 'ramda';


const byText = text => menus => {
  if (!text) {
    return menus;
  }
  const match = menuInfo => (
    text => menuInfo.toLowerCase().includes(text)
  );
  const filteredMenus = menus.filter(menu =>
    R.either(match(menu.name), match(menu.description))(text.toLowerCase())
  );
  return filteredMenus;
};

const byCuisine = cuisine => menus => {
  if (!cuisine || cuisine === 'All Cuisines') {
    return menus;
  }
  return menus.filter(menu => menu.category === cuisine);
};


const combineFilters = (menus, searchText, searchCuisine) => (
  R.compose(byText(searchText), byCuisine(searchCuisine))(menus)
);


export { byCuisine, byText, combineFilters };
