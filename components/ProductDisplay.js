app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
    ` <div class="product-display">
        <div class="product-container">
        <div class="product-image">
            <img :src="image" :class="{ 'out-of-stock-img': !inStock }">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <a :href="url">Click here for more info on Piranhas</a>
            <p v-if="inStock > 10">In stock</p>
            <p v-else-if="inStock <=10 && inStock > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <p v-if="onSale">{{ isOnSale }}</p>
            <product-details :details="details"></product-details>
            <div class="color-circle-group">
            <div
                v-for="(variant, index) in variants"
                :key="variant.id"
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{ backgroundColor: variant.color }">
            </div>
            </div>
            <ul>
            <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
            </ul>
            <div class="buttons">
            <button 
                class="button"
                :class="{ disabledButton: !inStock }"
                :disabled="!inStock" 
                @click="addToCart">
                Add to Cart
            </button>
            <button 
                class="button" 
                @click="removeFromCart"
                :class="{ disabledButton: !inStock }"
                :disabled="!inStock" >
                Remove Item
            </button>
            </div>
        </div>
        </div>
    </div>`,

    data() {
        return {
            product: 'el Fisho',
            description: `This is the best pair of socks ever!`,
            selectedVariant: 0,
            url: 'https://en.wikipedia.org/wiki/Piranha',
            inventory: 7,
            onSale: true,
            details: ['50% teeth', '30% rage', '20% cute fishy'],
            variants: [
                {id: 2234, color: 'green', image: '../assets/images/green.png', quantity: 50},
                {id: 2235, color: 'blue', image: '../assets/images/blue.png', quantity: 0},
                {id: 2236, color: 'red', image: '../assets/images/red.png', quantity: 7},
                {id: 2237, color: 'yellow', image: '../assets/images/yellow.png', quantity: 37},
            ],
            sizes: ['big fishy', 'medium fishy', 'itty bitty fishy'],
            brand: "Jo's",
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        isOnSale() {
            return this.brand + ' ' + this.product + ' is on sale!'
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})