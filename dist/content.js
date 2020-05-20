//start connection in content script
let contentPort = chrome.runtime.connect({
  name: 'background-content',
});

//Listen for runtime message
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const products = [];
  console.log('message', message.action);
  // getting products list (ul)
  console.log('products element', document.getElementById('lpBloc'));
  // getting products (li)
  console.log(
    'products list nodes',
    document.getElementById('lpBloc').childNodes
	);
	const arrayOfNodeChilds = Array.prototype.slice.call(document.getElementById('lpBloc').childNodes);
	arrayOfNodeChilds.map(product => {
		if (!product.hasAttribute("class")) {
			const infoContainer = product.getElementsByTagName('form')[0];
			const productInfo = {
				name: infoContainer.getElementsByClassName('prdtBILTit')[0].innerText,
				// ratingImg: infoContainer.getElementsByClassName('ratingPosition')[0].getElementsByTagName('img')[0].src,
				productImage: infoContainer.getElementsByClassName('prdtBImg')[0].src,
			};
			products.push(productInfo)
		}
	})
  if (message.action === 'GET_PRODUCTS') {
    contentPort.postMessage({
      type: 'PRODUCTS',
      payload: {
        products
      },
    });
  }
});
