module.exports = (temp, product) => {
  let retData = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  retData = retData.replace(/{%IMAGE%}/g, product.image);
  retData = retData.replace(/{%PRICE%}/g, product.price);
  retData = retData.replace(/{%FROM%}/g, product.from);
  retData = retData.replace(/{%NUTRIENTS%}/g, product.nutrients);
  retData = retData.replace(/{%QUANTITY%}/g, product.quantity);
  retData = retData.replace(/{%DESCRIPTION%}/g, product.description);
  retData = retData.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    retData = retData.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return retData;
};
