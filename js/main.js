/* Sidebar */
$('#sidebarCollapse').on('click', function() {
  $('#sidebar').toggleClass('active');
});
/* Get content max height */
var navHeight = $('.navbar').height();
var subnavbarHeight = $('.subnavbar').height();
//var bottomAddRecordHeight = $('.bottom-add-record').height();
var bottomAddRecordHeight = 120;
var windowHeight = $(window).height();
var maxcontentinnerHeight = windowHeight - bottomAddRecordHeight - subnavbarHeight - navHeight;
$('.content-inner').css('max-height', maxcontentinnerHeight);
$(window).resize(function() {
  var navHeight = $('.navbar').height();
  var subnavbarHeight = $('.subnavbar').height();
  //var bottomAddRecordHeight = $('.bottom-add-record').height();
	var bottomAddRecordHeight = 120;
  var windowHeight = $(window).height();
  var maxcontentinnerHeight = windowHeight - bottomAddRecordHeight - subnavbarHeight - navHeight;
  $('.content-inner').css('max-height', maxcontentinnerHeight);
});

/* Datepicker  */
var fp = flatpickr(".date", {
  dateFormat: "d/m/yy",

})

// prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
//Autocomplete FOR  Customer NAME
const customerData = [{
    id: 1,
    company: "MYER",
    name: "Tom Scott",
    code: "myer01",
    phone: "03 98877770",
    email: "info@google.com.au",
  }, {
    id: 2,
    company: "Commonwealth Bank",
    name: "Michael Cater",
    code: "comm02",
    phone: "03 98854677",
    email: "info@hotmail.com.au",
  },
  {
    id: 3,
    company: "ANZ",
    name: "Vanessa Leevers",
    code: "anz01",
    phone: "03 98877744",
    email: "info@gmail.com",
  },
  {
    id: 4,
    company: "Baby Bunting",
    name: "Kim Hudson",
    code: "bb01",
    phone: "03 98877777",
    email: "info@outlook.com",
  }
];

const productData = [{
    id: 1,
    title: "T-Shirt",
    sku: "TS234",
    qty: 10,
    uom: "BOXS",
    availability: 100,
    price: 50,
    discount: "20%",
    comment: 'Chect expire date '

  }, {
    id: 2,
    title: "Hoodie",
    sku: "HO1234",
    qty: 40,
    uom: "BOXS",
    availability: 70,
    price: 25,
    discount: "20%",
    comment: "Chect expire date "
  },
  {
    id: 3,
    title: "Desk",
    sku: "D2234",
    qty: 40,
    uom: "BOXS",
    availability: 70,
    price: 25,
    discount: "20%",
    comment: "Chect expire date "
  },
  {
    id: 4,
    title: "Blender",
    sku: "BL1234",
    qty: 40,
    uom: "BOXS",
    availability: 70,
    price: 25,
    discount: "20%",
    comment: "Chect expire date "
  }
];
const cartData = [{
	id: 1,
	title: "T-Shirt",
	sku: "TS234",
	qty: 10,
	uom: "BOXS",
	availability: 100,
	price: 50,
	discount: "20%",
	comment: 'Chect expire date '

}, {
	id: 2,
	title: "Hoodie",
	sku: "HO1234",
	qty: 40,
	uom: "BOXS",
	availability: 70,
	price: 25,
	discount: "20%",
	comment: "Chect expire date "
}

];

// const OrderData = [{
// 	id: '',
// 	orderid: '',
// 	productid: '',
// 	title: '',
// 	sku: '',
// 	qty: '',
// 	uom: '',
// 	availability: '',
// 	price: '',
// 	discount: '',
// 	comment:'' 

// }

// ];

var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
  console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: " + db);
  loadTable();
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("customer", {
    keyPath: "id", autoIncrement:true
  });
  var objectStore2 = db.createObjectStore("product", {
    keyPath: "id", autoIncrement:true
  });
	var objectStore3 = db.createObjectStore("cart", {
    keyPath: "id", autoIncrement:true
  });
	var objectStore4 = db.createObjectStore("order", {
    keyPath: "id", autoIncrement:true
  });
	var objectStore5 = db.createObjectStore("order_lines", {
    keyPath: "id", autoIncrement:true
  });

  for (var i in customerData) {
    objectStore.add(customerData[i]);
  }
  for (var k in productData) {
    objectStore2.add(productData[k]);
  }
	for (var l in cartData) {
    objectStore3.add(cartData[l]);
  }
	// for (var m in OrderData) {
  //   objectStore4.add(OrderData[m]);
  // }
}

function loadTable() {

	/* Autocomplete Get Account details */
  var company_names = [];
  var objectStore = db.transaction("customer").objectStore("customer");
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {

      company_names.push({ "label": cursor.value.company, "value": cursor.key });
      cursor.continue(); // wait for next event

    } else {

      const field2 = document.getElementById('search-account-name');
      const ac2 = new Autocomplete(field2, {
        data: [{ label: "I'm a label", value: 42 }],
        maximumItems: 5,
        threshold: 1,
        onSelectItem: ({ label, value }) => {
          console.log("user selected:", label, value);
          findCustomer(value);
        }
      });
      ac2.setData(company_names);
    }
  };

/* Autocomplete Get Product details */
	var products_names = [];
  var objectStore2 = db.transaction("product").objectStore("product");
  objectStore2.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      products_names.push({ "label": cursor.value.title, "value": cursor.key });
      cursor.continue(); // wait for next event
    } else {

      //Autocomplete FOR  PRODUCT NAME
      const field = document.getElementById('ProdTitle');
      const ac = new Autocomplete(field, {
        data: [{ label: "I'm a label", value: 42 }],
        maximumItems: 5,
        threshold: 1,
        onSelectItem: ({ label, value }) => {
          console.log("user selected:", label, value);
					findProduct(value);
        }
      });

      ac.setData(products_names);
      //  console.log(ac.setData);
    }
  };

  /* Create cart content */
  var cartProducts = "";
	var order_products = [];
  $('.record-item.row').remove();

  var objectStore3 = db.transaction("cart").objectStore("cart");

  objectStore3.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      cartProducts = cartProducts.concat('<div id="product'+ cursor.key +'" class="record-item row ">' +
        '<div class="col-prod-select">' + '<input type="checkbox" id="selectall" name="selectall" value="selectall">' + '</div>' +
        '<div class="col-record-id">' + cursor.key + '</div>' +
        '<div class="col-prod-img">' + ' <img src="img/image-solid.svg">' + '</div>' +
        '<div class="col-prod-title">' + cursor.value.title + '</div>' +
        '<div class="col-prod-sku">' + cursor.value.sku + '</div>' +
        '<div class="col-prod-qty"> <input type="text" class="form-control" id="CartProdQty" value="' + cursor.value.qty + '"></div>' + 
				'<div class="col-prod-uom">' + cursor.value.uom + '</div>' +
        '<div class="col-prod-availability">' + cursor.value.availability + '</div>' +
        '<div class="col-prod-price"> <input type="text" class="form-control" id="CartProdPrice" value="' + cursor.value.price + '"></div>' +
        '<div class="col-prod-discount"><input type="text" class="form-control" id="CartProdDiscount" value="' + cursor.value.discount + '" ></div>' +
        '<div class="col-prod-comment">' + '<i class="fad fa-comment" data-bs-toggle="tooltip" data-bs-placement="top" title="' + cursor.value.comment + '" ></i>' + '</div>' +
        '<div class="col-prod-del">' + '<i id=' + cursor.key + ' class="fal fa-trash-alt prod-del"  onclick="deleteCartProduct(this.id)"></i>' + '</div>' +
        '</div>');
		  order_products.push({ "name": cursor.value.title, "id": cursor.key });
      cursor.continue(); // wait for next event

    } else {
      $('.records-header').after(cartProducts); // no more events
    }

  };

}

function addToCart() {

  var ProdTitle = $('#ProdTitle').val();
  var ProdSku = $('#ProdSku').val();
  var ProdQty = $('#ProdQty').val();
  var ProdUom = $('#ProdUom').val();
  var ProdAvai = $('#ProdAvai').val();
  var ProdPrice = $('#ProdPrice').val();
  var ProdDiscount = $('#ProdDiscount').val();
  var ProdComment = $('#ProdComment').val();

/* ID is autoIncrement */
  var request = db.transaction(["cart"], "readwrite").objectStore("cart").add({
    title: ProdTitle,
    sku: ProdSku,
    qty: ProdQty,
    uom: ProdUom,
    availability: ProdAvai,
    price: ProdPrice,
    discount: ProdDiscount,
    comment: ProdComment
  });


  request.onsuccess = function(event) {
    loadTable();
    clearButtons();
		/* Move to latest record*/
		$('.content-inner').animate({
			scrollTop: $("#record-bottom").offset().top
		}, 2000);
  };

  request.onerror = function(event) {
    alert("error");
  }
}

/* Validate form  */
// $( ".save-order" ).click(function(event) {
//   //alert( "Handler for .click() called." );
	
// 	if (!$("#search-account-name")[0].checkValidity()) {
// 		event.preventDefault()
// 		event.stopPropagation()
// 		alert($( "#search-account-name" )[0].checkValidity());
// 		console.log(11111);
// 	}else{

// 		alert($( "#search-account-name" )[0].checkValidity());

// 		console.log(2222);
// 	}



//   $( ".content-inner" ).addClass('was-validated');

// });


	// Example starter JavaScript for disabling form submissions if there are invalid fields
	(function () {
		'use strict'

		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.querySelectorAll('.needs-validation')

		// Loop over them and prevent submission
		Array.prototype.slice.call(forms)
			.forEach(function (form) {
				form.addEventListener('submit', function (event) {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
						console.log(1111);
					}else{

						console.log(2222);
					}

					form.classList.add('was-validated')
				}, false)
			})
	})()

function addToOrder() {


	/* Add record to order table */
	var	orderId="ON-"+ Date.now();

	/* Get current date for create order date */
	var date=new Date();
	var createDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

	var customerName = $('#contactname').val();
	var shippingDate = $('#ShippingDate').val();
	var request = db.transaction(["order"], "readwrite").objectStore("order").add({

    orderId:orderId,
   // customerId: ProdSku,
    customerName: customerName,
		shippingDate: shippingDate,
    createDate: createDate,
    //amount: ProdAvai,
  });
	request.onsuccess = function(event) {
		addToOrderLines(orderId)
	};
}
function addToOrderLines(orderId) {

// 	const items = db.transaction("cart").objectStore("cart").getAll()

//  console.log(items);
//  for (const row of items) {
// 	console.log('object:', row);
//  }

/* Add products to order line table  */

function query(db, myCallbackFunction) {
  const tx = db.transaction('cart');
  const store = tx.objectStore('cart');
  const request = store.getAll();

  request.onsuccess = event => {
    // denote the array of objects with a variable
    // here, event.target is === to request, can use either one
    const data = event.target.result;
    // pass the data to the callback function so that caller can
    // access it
    myCallbackFunction(data);
  };
}

// Open the database and then run the query
var openRequest = indexedDB.open('newDatabase');
openRequest.onsuccess = event => {
  query(db, (data = []) => {
    // This gets called when the query has run with the loaded
    // data
    console.log('received %d rows of data', data.length);
    for (const row of data) {
      console.log('object:', row);

			var request = db.transaction(["order_lines"], "readwrite").objectStore("order_lines").add({
					  orderId: orderId,
					  product: row.title,
						sku:row.sku,
						qty: row.qty,
						uom: row.uom,
						// availability: ProdAvai,
						price: row.price,
						discount: row.discount,
						comment: row.comment,
					});
					request.onsuccess = function(event) {

					};
    }
  });
};


}

function deleteCartProduct(clicked_id) {
  /* convert id to integer */
	var ProdID = parseInt(clicked_id);
  var request = db.transaction(["cart"], "readwrite").objectStore("cart").delete(ProdID);
  request.onsuccess = function(event) {
    loadTable();
  };
}

function clearButtons() {
  $('#ProdID').val("");
  $('#ProdTitle').val("");
  $('#ProdSku').val("");
  $('#ProdQty').val("");
  $('#ProdUom').val("");
  $('#ProdAvai').val("");
  $('#ProdPrice').val("");
  $('#ProdDiscount').val("");
  $('#ProdComment').val("");

}
/* Autofill cutomer info  */
function findCustomer(value) {

  var objectStore = db.transaction("customer").objectStore("customer");
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      if (cursor.key = value) {
        console.log("value:", value);
        var customercode = cursor.value.code;
        var contactname = cursor.value.name;
        var contactemail = cursor.value.email;
        var contactphone = cursor.value.phone;
        //  console.log("customerName:", customerName);
        $('#customercode').val(customercode);
        $('#contactname').val(contactname);
        $('#contactemail').val(contactemail);
        $('#contactphone').val(contactphone);
      }
      cursor.continue(); // wait for next event

    } else {

    }
  };
}
/* Autofill product info on add to cart */
function findProduct(value) {

  var objectStore = db.transaction("product").objectStore("product");
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      if (cursor.key = value) {
        console.log("value:", value);
        var ProdSku = cursor.value.sku;
        var ProdUom = cursor.value.uom;
        var ProdAvai = cursor.value.availability;
        var ProdPrice = cursor.value.price;
				var ProdDiscount = cursor.value.discount;
				var ProdComment = cursor.value.comment;
        //  console.log("customerName:", customerName);
        $('#ProdSku').val(ProdSku);
        $('#ProdUom').val(ProdUom);
        $('#ProdAvai').val(ProdAvai);
        $('#ProdPrice').val(ProdPrice);
				$('#ProdDiscount').val(ProdDiscount);
				$('#ProdComment').val(ProdComment);
      }
      cursor.continue(); // wait for next event

    } else {

    }
  };
}
