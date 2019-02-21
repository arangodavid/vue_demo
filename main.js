var app = new Vue({
	el: '#app',
	data: {
		product: 'socks',
		image: 'assets/green-socks.jpg',
		link: "https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0",
		inventory: 100,
		onSale: true,
		inStock: false,
		details: ["80% cotton", "20% polyester", "gender-neutral"],
		variants: [
			{
				variantId: 2234,
				variantColor: "green",
				variantImage: 'assets/green-socks.jpg',
				variantUrl: 'https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0'
			},
			{
				variantId: 2235,
				variantColor: "blue",
				variantImage: 'assets/blue-socks.jpg',
				variantUrl: 'https://www.dropbox.com/s/t32hpz32y7snfna/vmSocks-blue-onWhite.jpg?dl=0'
			}
		],
		sizes: ["small", "medium", "large"],
		cart: 0,
	},
	methods: {
		addToCart() {
			this.cart++;
		},
		subtractFromCart() {
			if(this.cart === 0) return;
			this.cart--;

		},
		updateProduct(variantImage, variantUrl) {
			this.image = variantImage;
			this.link = variantUrl;
		}
	}
});