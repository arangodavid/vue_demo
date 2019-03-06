"use strict";

var vuesaceDb = [{
  name: 'david'
}];
var eventBus = new Vue();
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: "\n\t\t<section class=\"product\">\n\t\t\t\t<section class=\"product-image-cont\">\n\t\t\t\t\t<a class=\"product-image-link\" :href=\"link\" target=\"_blank\">\n\t\t\t\t\t\t<img class=\"product-image\" :src=\"image\" />\n\t\t\t\t\t</a>\t\n\t\t\t\t</section>\n\n\t\t\t\t<section class=\"product-info-cont\">\n\n\t\t\t\t\t<h1 class=\"product-info\">{{ title }}</h1>\n\t\t\t\t\t<span v-show=\"onSale\" class=\"product-sale\">{{ isSale }}</span>\n\t\t\t\t\t<p v-if=\"inStock\" class=\"product-count\">In Stock</p>\n\t\t\t\t\t<p v-else-if=\"inStock <= 10 && inStock > 0\" class=\"product-count\">Almost Sold Out</p>\n\t\t\t\t\t<p v-else class=\"product-count\" :class=\"[ !inStock ? outOfStock : 'product-count' ]\">Out of Stock</p>\n\t\t\t\t\t<!-- <p class=\"shipping\">Shipping is: {{ shipping }}</p> -->\n\n\t\t\t\t\t<productDetails :details=\"details\"></productDetails>\n\n\t\t\t\t\t<section class=\"variant-cont\">\n\t\t\t\t\t\t<section v-for=\"(variant, index) in variants\" \n\t\t\t\t\t\t :key=\"variant.variantId\" \n\t\t\t\t\t\t @mouseover=\"updateProduct(index, variant.variantUrl)\"\n\t\t\t\t\t\t class=\"color-box\"\n\t\t\t\t\t\t :style=\"{ background: variant.variantColor }\"\n\t\t\t\t\t\t >\n\t\t\t\t\t\t</section>\n\t\t\t\t\t</section>\n\n\t\t\t\t\t<section class=\"product-size-cont\">\n\t\t\t\t\t\t<section class=\"product-sizes\" v-for=\"size in sizes\">\n\t\t\t\t\t\t\t<p class=\"product-size\">{{ size }}</p>\n\t\t\t\t\t\t</section>\n\t\t\t\t\t</section>\n\n\t\t\t\t\t<section class=\"cart-cont\">\n\t\t\t\t\t\t<button @click=\"addToCart\" \n\t\t\t\t\t\t\t\t:disabled=\"!inStock\"\n\t\t\t\t\t\t\t\t:class=\"{ disabledButton: !inStock, activeButton: inStock }\">Add to Cart</button>\n\t\t\t\t\t\t<button class=\"remove-from-cart\" @click=\"subtractFromCart\">Remove From Cart</button>\n\t\t\t\t\t</section>\n\n\t\t\t\t</section>\n\t\t\t\t<product-tabs :reviews=\"reviews\"></product-tabs>\n\t\t\t</section>\n\t",
  data: function data() {
    return {
      brand: "VuesaceJS",
      product: 'socks',
      selectedVariant: 0,
      link: "https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0",
      inventory: 100,
      onSale: true,
      outOfStock: 'out-of-stock',
      cartClicked: false,
      details: ["80% cotton", "20% polyester", "gender-neutral"],
      sizes: ["small", "medium", "large"],
      reviews: [],
      variants: [{
        variantId: 2234,
        variantColor: "green",
        variantImage: '../assets/green-socks.jpg',
        variantUrl: 'https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0',
        variantQuantity: 10
      }, {
        variantId: 2235,
        variantColor: "blue",
        variantImage: '../assets/blue-socks.jpg',
        variantUrl: 'https://www.dropbox.com/s/t32hpz32y7snfna/vmSocks-blue-onWhite.jpg?dl=0',
        variantQuantity: 0
      }]
    };
  },
  methods: {
    addToCart: function addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    subtractFromCart: function subtractFromCart() {
      this.$emit('subtract-from-cart');
    },
    updateProduct: function updateProduct(variantIndex, variantUrl) {
      this.selectedVariant = variantIndex;
      this.link = variantUrl;
    }
  },
  computed: {
    title: function title() {
      return this.brand + ' ' + this.product;
    },
    image: function image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock: function inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    isSale: function isSale() {
      if (this.onSale) return this.brand + ' ' + this.product + ' ' + 'are on Sale!';
      return;
    } // shipping() {
    // 	if(this.premium) return "Free";
    // 	return "$2.99"
    // }

  },
  mounted: function mounted() {
    var _this = this;

    eventBus.$on('review-submitted', function (productReview) {
      _this.reviews.push(productReview);
    });
  }
});
Vue.component('productDetails', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: "\n\t\t<section>\n\t\t\t<section>\n\t\t\t\t<span v-for=\"(productDetail, index) in productDetails\" \n\t\t\t\t\t  @click=\"selectedDetail = productDetail\"\n\t\t\t\t\t  >\n\t\t\t\t\t  \t{{ productDetail }}\n\t\t\t\t</span>\n\t\t\t</section>\n\t\t\t<ul class=\"product-detail-cont\" v-show=\" selectedDetail === 'Details' \">\n\t\t\t\t<li class=\"product-detail\" v-for=\"detail in details\">{{ detail }}</li>\n\t\t\t</ul>\n\t\t\t<section v-show=\" selectedDetail === 'Shipping' \">\n\t\t\t\t<p>Shipping is $2.99</p>\n\t\t\t</section>\n\t\t</section>\n\t",
  data: function data() {
    return {
      productDetails: ['Shipping', 'Details'],
      selectedDetail: 'Details'
    };
  }
});
Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: "\n\t\t<div>\n\t\t\t<span class=\"tab\" \n\t\t\t\t  :class=\"{ activeTab: selectedTab === tab }\"\n\t\t\t\t  v-for=\"(tab, index) in tabs\" \n\t\t\t\t  :key=\"index\"\n\t\t\t\t  @click=\"selectedTab = tab\">\n\t\t\t\t  {{ tab }}\n\t\t\t</span>\n\t\t\t<section class=\"user-reviews-cont\" v-show=\"selectedTab === 'Reviews'\">\n\t\t\t\t<p v-if=\"!reviews.length\">There are no reviews yet!</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for=\"review in reviews\">\n\t\t\t\t\t\t<p>{{ review.name }}</p>\n\t\t\t\t\t\t<p>Rating: {{ review.rating }}</p>\n\t\t\t\t\t\t<p>{{ review.review }}</p>\n\t\t\t\t\t\t<p>Would you recommend this product? {{ review.recommended }}</p>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</section>\n\t\t\t<product-review v-show=\"selectedTab === 'Make a Review'\">\n\t\t\t</product-review>\n\t\t</div>\n\t",
  data: function data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    };
  }
});
Vue.component('product-review', {
  template: "\n\t\t<form class=\"review-form\" @submit.prevent=\"onSubmit\">\n\t\t\t<section v-if=\"errors.length\">\n\t\t\t\t<p>Please correct the following error(s)</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for=\"error in errors\">{{ error }}</li>\n\t\t\t\t</ul>\n\t\t\t</section>\n\t\t\t<section class=\"form-sections\">\n\t\t\t\t<label class=\"form-label\" for=\"name\">Name:</label>\n\t\t\t\t<input class=\"form-feedback\" id=\"name\" v-model=\"name\"/>\n\t\t\t</section>\n\t\t\t<section class=\"form-sections\">\n\t\t\t\t<label class=\"form-label\">Review:</label>\n\t\t\t\t<textarea class=\"form-feedback\" id=\"review\" v-model=\"review\"></textarea>\n\t\t\t</section>\n\t\t\t<section class=\"form-sections\">\n\t\t\t\t<p class=\"form-label\">Would you recommend this product?</p>\n\t\t\t\t<input type=\"radio\" name=\"recommend\" value=\"yes\" v-model=\"recommended\"/>Yes\n\t\t\t\t<input type=\"radio\" name=\"recommend\" value=\"no\" v-model=\"recommended\"/>No\n\t\t\t</section>\n\t\t\t<section class=\"form-sections\">\n\t\t\t\t<label class=\"form-label\" for=\"rating\">Rating:</label>\n\t\t\t\t<select class=\"form-feedback-rating\" id=\"rating\" v-model.number=\"rating\">\n\t\t\t\t\t<option>1</option>\n\t\t\t\t\t<option>2</option>\n\t\t\t\t\t<option>3</option>\n\t\t\t\t\t<option>4</option>\n\t\t\t\t\t<option>5</option>\n\t\t\t\t\t<option>6</option>\n\t\t\t\t\t<option>7</option>\n\t\t\t\t\t<option>8</option>\n\t\t\t\t\t<option>9</option>\n\t\t\t\t\t<option>10</option>\n\t\t\t\t</select>\n\t\t\t</section>\n\t\t\t<section>\n\t\t\t\t<input type=\"submit\" value=\"submit\" />\n\t\t\t</section>\n\t\t</form>\n\t",
  data: function data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommended: null,
      errors: []
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      if (this.name && this.review && this.rating && this.recommended) {
        this.errors.length = 0;
        var productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommended: this.recommended
        };
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommended = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.recommended) this.errors.push("Recommendation required");
      }
    }
  }
});
var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: [],
    cartClicked: false
  },
  methods: {
    updateCart: function updateCart(id) {
      var _this2 = this;

      this.cart.push(id);
      this.cartClicked = true;
      setTimeout(function () {
        _this2.cartClicked = false;
      }, 500);
    },
    subtractFromCart: function subtractFromCart() {
      if (this.cart === 0) return;
      this.cart.pop();
    }
  }
});