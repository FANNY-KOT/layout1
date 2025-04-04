const basePath = window.location.hostname.includes('github.io')
  ? '/layout1/'
  : '/'

document.addEventListener('DOMContentLoaded', function () {
  fetch(basePath + 'header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error loading header:', error))

  fetch(basePath + 'footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error('Error loading footer:', error))

  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (link.href.includes('https://') || link.href.includes('http://')) {
      return
    }
    link.href = basePath + link.getAttribute('href')
  })

  document.querySelectorAll('script').forEach(script => {
    if (
      script.src &&
      (script.src.includes('https://') || script.src.includes('http://'))
    ) {
      return
    }
    if (script.src) {
      script.src = basePath + script.getAttribute('src')
    }
  })
})

var app = new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Russet Potato',
        short_text: 'Classic starchy potato with a rough brown skin.',
        image: 'images/russet_potato.jpg',
        desc: 'Perfect for baking, frying, and mashing, with a fluffy texture.',
        characteristics: {
          resistance: 'HR: Late Blight; IR: Common Scab',
          plant: [
            'Medium to large-sized tubers.',
            'High yield and excellent storage capability.',
            'Prefers cool climates.'
          ],
          tuber: [
            'Oblong shape with a rough brown skin.',
            'Light and fluffy texture when cooked.',
            'Average weight: 250 – 300 grams.'
          ],
          cycle: ['Spring', 'Fall'],
          color: 'Brown'
        }
      },
      {
        id: 2,
        title: 'Yukon Gold Potato',
        short_text: 'Smooth golden skin with a rich, buttery flavor.',
        image: 'images/yukon_gold_potato.jpg',
        desc: 'Ideal for roasting, mashing, and making creamy dishes.',
        characteristics: {
          resistance: 'HR: PVY; IR: Late Blight',
          plant: [
            'Compact plant with uniform tubers.',
            'Good resistance to common pests.',
            'Medium maturation time.'
          ],
          tuber: [
            'Round to oval shape with golden skin.',
            'Creamy texture with a rich flavor.',
            'Average weight: 180 – 220 grams.'
          ],
          cycle: ['Summer', 'Fall'],
          color: 'Yellow'
        }
      },
      {
        id: 3,
        title: 'Red Bliss Potato',
        short_text: 'Small red-skinned potato with firm flesh.',
        image: 'images/red_bliss_potato.jpg',
        desc: 'Great for boiling, salads, and roasting.',
        characteristics: {
          resistance: 'HR: Late Blight; IR: Fusarium',
          plant: [
            'Compact plant with good disease resistance.',
            'Early harvesting variety.',
            'Thrives in moist soil.'
          ],
          tuber: [
            'Smooth red skin with white flesh.',
            'Holds shape well when cooked.',
            'Average weight: 120 – 150 grams.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Red'
        }
      },
      {
        id: 4,
        title: 'Purple Majesty Potato',
        short_text: 'Deep purple skin and flesh with high antioxidants.',
        image: 'images/purple_majesty_potato.jpg',
        desc: 'A nutritious variety great for boiling, baking, and frying.',
        characteristics: {
          resistance: 'HR: Early Blight; IR: Common Scab',
          plant: [
            'Strong plant with good adaptability.',
            'Medium to late maturity.',
            'High resistance to pests and diseases.'
          ],
          tuber: [
            'Dark purple skin with vibrant purple flesh.',
            'Firm texture and rich flavor.',
            'Average weight: 150 – 200 grams.'
          ],
          cycle: ['Spring', 'Fall'],
          color: 'Purple'
        }
      },
      {
        id: 5,
        title: 'Fingerling Potato',
        short_text: 'Small, elongated potato with a waxy texture.',
        image: 'images/fingerling_potato.jpg',
        desc: 'Perfect for roasting and salads due to its firm texture.',
        characteristics: {
          resistance: 'HR: Late Blight; IR: Powdery Scab',
          plant: [
            'Compact plant with small tubers.',
            'Early to mid-season variety.',
            'Thrives in well-drained soil.'
          ],
          tuber: [
            'Thin skin with a firm, waxy texture.',
            'Mild, nutty flavor.',
            'Average weight: 80 – 120 grams.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Varied (Yellow, Red, Purple)'
        }
      }
    ],
    product: {},
    cart: [],
    btnVisible: 0,
    orderSummary: null,
    orderProducts: []
  },
  mounted: function () {
    this.getProduct()
    this.getCart()
  },
  methods: {
    getProduct: function () {
      const productId = window.location.hash.replace('#', '')
      if (productId) {
        this.product = this.products.find(p => p.id == productId) || {}
        this.checkInCart(productId)
      }
    },
    addToCart (id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      if (!cart.includes(id)) {
        cart.push(id)
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      this.btnVisible = 1
    },
    goToCart () {
      window.location.href = '/layout1/contact-us.html'
    },

    checkInCart: function (id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      this.btnVisible = cart.includes(parseInt(id)) ? 1 : 0
    },
    getCart: function () {
      this.cart = JSON.parse(localStorage.getItem('cart')) || []
    }
  }
})
