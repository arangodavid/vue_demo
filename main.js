Vue.component('product-review', {
	template: `
		<form class="review-form" @submit="onSubmit">
			<section class="form-sections">
				<label class="form-label" for="name">Name:</label>
				<input class="form-feedback" id="name" v-model="name"/>
			</section>
			<section class="form-sections">
				<label class="form-label">Review:</label>
				<textarea class="form-feedback" id="review" v-model="review"></textarea>
			</section>
			<section class="form-sections">
				<label class="form-label" for="rating">Rating:</label>
				<select class="form-feedback-rating" id="rating" v-model.number="rating">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</section>
			<section>
				<input type="submit" value="submit" />
			</section>
		</form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null
		}
	}
});
Vue.component('productDetails', {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: `
		<ul class="product-detail-cont">
			<li class="product-detail" v-for="detail in details">{{ detail }}</li>
		</ul>
	`
});


Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<section class="product">
				<section class="product-image-cont">
					<a class="product-image-link" :href="link" target="_blank">
						<img class="product-image" :src="image" />
					</a>	
				</section>

				<section class="product-info-cont">

					<h1 class="product-info">{{ title }}</h1>
					<span v-show="onSale" class="product-sale">{{ isSale }}</span>
					<p v-if="inStock" class="product-count">In Stock</p>
					<p v-else-if="inStock <= 10 && inStock > 0" class="product-count">Almost Sold Out</p>
					<p v-else class="product-count" :class="[ !inStock ? outOfStock : 'product-count' ]">Out of Stock</p>
					<p class="shipping">Shipping is: {{ shipping }}</p>

					<productDetails :details="this.details"></productDetails>

					<section class="variant-cont">
						<section v-for="(variant, index) in variants" 
						 :key="variant.variantId" 
						 @mouseover="updateProduct(index, variant.variantUrl)"
						 class="color-box"
						 :style="{ background: variant.variantColor }"
						 >
						</section>
					</section>

					<section class="product-size-cont">
						<section class="product-sizes" v-for="size in sizes">
							<p class="product-size">{{ size }}</p>
						</section>
					</section>

					<section class="cart-cont">
						<button @click="addToCart" 
								:disabled="!inStock"
								:class="{ disabledButton: !inStock, activeButton: inStock }">Add to Cart</button>
						<button class="remove-from-cart" @click="subtractFromCart">Remove From Cart</button>
					</section>

				</section>
				<product-review></product-review>
			</section>
	`,
	data() {
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
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: 'assets/green-socks.jpg',
					variantUrl: 'https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0',
					variantQuantity: 10
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: 'assets/blue-socks.jpg',
					variantUrl: 'https://www.dropbox.com/s/t32hpz32y7snfna/vmSocks-blue-onWhite.jpg?dl=0',
					variantQuantity: 0
				}
			],
			sizes: ["small", "medium", "large"]
		} 
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
		},
		subtractFromCart() {
			this.$emit('subtract-from-cart');
		},
		updateProduct(variantIndex, variantUrl) {
			this.selectedVariant = variantIndex;
			this.link = variantUrl;
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		isSale() {
			if(this.onSale) return this.brand + ' ' + this.product + ' ' + 'are on Sale!'
			return;
		},
		shipping() {
			if(this.premium) return "Free";
			return "$2.99"
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: false,
		cart: [],
		cartClicked: false
	},
	methods: {
		updateCart(id) {
			this.cart.push(id);
			this.cartClicked = true;
			setTimeout(() => {
				this.cartClicked = false;
			}, 500);
		},
		subtractFromCart() {
			if(this.cart === 0) return;
			this.cart.pop();
		}
	}
});