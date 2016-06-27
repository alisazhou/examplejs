const SELECT_SELLER = 'SELECT_SELLER';

const selectSellerActionCreator = targetSellerId => (
  {type: SELECT_SELLER, sellerId: targetSellerId}
);


export { selectSellerActionCreator, SELECT_SELLER };
