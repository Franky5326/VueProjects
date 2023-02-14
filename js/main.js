Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
 
    template: `
    <div class="product">
    
     
        <div class="product-image">
            <img :src="image" :alt="altText"/>
            
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>

            <p v-if="inStock">In stock</p>
            <p v-else-if="variants.variantQuantity <= 10 && variants.variantQuantity > 0">Almost sold out!</p>
            <p
                v-else
                :class="{ outOffStock: !inStock }"
            >
                Out of stock
            </p>
            <span v-show="OnSale">{{ sale }}</span>

            <product-details></product-details>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <p>Shipping: {{ shipping }}</p>

            <div
                class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)"
            >
            </div>
        
                


            

            <button 
            v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
            Add to cart</button>
            
            <button style="width:115px;"  v-on:click="removeFromCart">Remove to cart</button> 
            <a href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks"> {{ link }}</a>
            
        
    </div>
`,
    data() {
        return {
        product: "Socks",
        brand: 'Vue Mastery',
        description: "A pair of warm, fuzzy socks.",
        selectedVariant: 0,
        altText: "A pair of socks",
        link: "More products like this.",
        
        inventory: 0,
        OnSale: 'On sale',
        sizes: ['S','M','L','XL','XXL','XXXL'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
            }
        ],
        
        cart: 0,
    }
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
         }
         
     },

     computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
         },

         inStock(){
            return this.variants[this.selectedVariant].variantQuantity
         },

         sale() {
            return this.product + ' ' + this.brand + ' ' + "Проходит распродажа!";
         },

         shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
         },
         
     },

  
    
})

Vue.component('product-details', {
    template: `
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
    `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
})


 let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})