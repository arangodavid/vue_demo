var app = new Vue({
	el: '#app',
	data: {
		product: 'socks',
		image: 'assets/green-socks.jpg',
		link: "https://www.dropbox.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0",
		inventory: 100,
		onSale: true,
		details: ["80% cotton", "20% polyester", "gender-neutral"],
		variants: [
			{
				variantId: 2234,
				variantCOlor: "green"
			},
			{
				variantId: 2235,
				variantColor: "blue"
			}
		]
	}
})