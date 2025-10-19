class BKApp {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.initEventListeners();
    // Only check authentication if not on the login page
    if (window.location.pathname !== '/login.html') {
      this.checkAuthentication();
    }
    this.initAnimations();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }
  }

  initEventListeners() {
    // Navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-page]')) {
        e.preventDefault();
        this.navigate(e.target.dataset.page);
      }
    });

    // Forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('#loginForm')) {
        e.preventDefault();
        this.handleLogin(e.target);
      }
      if (e.target.matches('#passwordChangeForm')) {
        e.preventDefault();
        this.handlePasswordChange(e.target);
      }
      if (e.target.matches('#orderForm')) {
        e.preventDefault();
        this.handleOrderSubmit(e.target);
      }
    });

    // Product interactions
    document.addEventListener('click', (e) => {
      if (e.target.matches('.add-to-cart')) {
        const productId = e.target.dataset.productId;
        const quantity = parseInt(document.querySelector(`[data-product-id="${productId}"] .quantity-input`).value);
        const notes = document.querySelector(`[data-product-id="${productId}"] .product-notes`).value;
        this.addToCart(productId, quantity, notes);
      }

      if (e.target.matches('.remove-from-cart')) {
        const productId = e.target.dataset.productId;
        this.removeFromCart(productId);
      }

      if (e.target.matches('.quantity-btn')) {
        const input = e.target.parentElement.querySelector('.quantity-input');
        const currentValue = parseInt(input.value);
        const min = parseInt(input.min) || 1;
        const max = parseInt(input.max) || 999;
        
        if (e.target.dataset.action === 'increase' && currentValue < max) {
          input.value = currentValue + 1;
        } else if (e.target.dataset.action === 'decrease' && currentValue > min) {
          input.value = currentValue - 1;
        }
        this.updateCartDisplay();
      }
    });

    // Search and filter
    document.addEventListener('input', (e) => {
      if (e.target.matches('#productSearch')) {
        this.searchProducts(e.target.value);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches('#categoryFilter')) {
        this.filterProductsByCategory(e.target.value);
      }
    });

    // PDF and sharing
    document.addEventListener('click', (e) => {
      if (e.target.matches('.generate-pdf')) {
        const orderId = e.target.dataset.orderId;
        this.generatePDF(orderId);
      }

      if (e.target.matches('.share-whatsapp')) {
        const orderId = e.target.dataset.orderId;
        this.shareViaWhatsApp(orderId);
      }
    });
  }

  initAnimations() {
    // Fade in animations for content
    anime({
      targets: '.fade-in',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(100),
      easing: 'easeOutQuart'
    });

    // Button press animations
    document.addEventListener('touchstart', (e) => {
      if (e.target.matches('button, .btn')) {
        anime({
          targets: e.target,
          scale: 0.95,
          duration: 100,
          easing: 'easeOutQuart'
        });
      }
    });

    document.addEventListener('touchend', (e) => {
      if (e.target.matches('button, .btn')) {
        anime({
          targets: e.target,
          scale: 1,
          duration: 100,
          easing: 'easeOutQuart'
        });
      }
    });
  }

  checkAuthentication() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.updateUIForLoggedInUser();
    } else {
      this.navigate('login');
    }
  }

  handleLogin(form) {
<<<<<<< HEAD
    console.log('handleLogin called');
=======
>>>>>>> 63d4c3fda3a9938500d449a7ea0861a65e2a4886
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

<<<<<<< HEAD
    console.log('Attempting login for:', username);
    if (db.validateUser(username, password)) {
      console.log('Login successful for:', username);
=======
    if (db.validateUser(username, password)) {
>>>>>>> 63d4c3fda3a9938500d449a7ea0861a65e2a4886
      this.currentUser = db.getUser(username);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      
      db.updateUser(username, { lastLogin: new Date().toISOString() });
      
      this.showSuccessMessage('Login successful!');
      setTimeout(() => this.navigate('dashboard'), 1000);
    } else {
<<<<<<< HEAD
      console.log('Login failed for:', username);
=======
>>>>>>> 63d4c3fda3a9938500d449a7ea0861a65e2a4886
      this.showErrorMessage('Invalid username or password');
    }
  }

  handlePasswordChange(form) {
    const formData = new FormData(form);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      this.showErrorMessage('New passwords do not match');
      return;
    }

    if (db.changePassword(this.currentUser.username, currentPassword, newPassword)) {
      this.showSuccessMessage('Password changed successfully!');
      form.reset();
    } else {
      this.showErrorMessage('Current password is incorrect');
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.navigate('login');
  }

  navigate(page) {
    const pages = {
      'dashboard': 'index.html',
      'login': 'login.html',
      'products': 'products.html',
      'orders': 'orders.html',
      'profile': 'profile.html'
    };

    if (pages[page]) {
      window.location.href = pages[page];
    }
  }

  updateUIForLoggedInUser() {
    const userElements = document.querySelectorAll('.username');
    userElements.forEach(el => {
      el.textContent = this.currentUser.company || this.currentUser.username;
    });
  }

  // Product methods
  searchProducts(query) {
    const products = query ? db.searchProducts(query) : db.getProducts();
    this.displayProducts(products);
  }

  filterProductsByCategory(category) {
    const products = category ? db.filterProductsByCategory(category) : db.getProducts();
    this.displayProducts(products);
  }

  displayProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = products.map(product => `
      <div class="product-card bg-white rounded-lg shadow-md p-4 fade-in" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
        <p class="text-gray-600 text-sm mb-2">${product.description}</p>
        <div class="flex justify-between items-center mb-4">
          <span class="text-2xl font-bold text-green-600">$${product.price}</span>
          <span class="text-sm text-gray-500">${product.unit}</span>
        </div>
        <div class="flex items-center gap-2 mb-2">
          <button class="quantity-btn bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center" data-action="decrease">-</button>
          <input type="number" value="${product.minOrder}" min="${product.minOrder}" max="${product.stock}" class="quantity-input w-16 text-center border rounded">
          <button class="quantity-btn bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center" data-action="increase">+</button>
        </div>
        <input type="text" placeholder="Special instructions..." class="product-notes w-full text-sm border rounded px-2 py-1 mb-3">
        <button class="add-to-cart w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `).join('');

    // Re-initialize animations
    anime({
      targets: '.product-card',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      delay: anime.stagger(50),
      easing: 'easeOutQuart'
    });
  }

  // Cart methods
  addToCart(productId, quantity, notes) {
    if (db.addToCart(productId, quantity, notes)) {
      this.showSuccessMessage('Product added to cart!');
      this.updateCartDisplay();
    } else {
      this.showErrorMessage('Failed to add product to cart');
    }
  }

  removeFromCart(productId) {
    db.removeFromCart(productId);
    this.updateCartDisplay();
    this.showSuccessMessage('Product removed from cart');
  }

  updateCartDisplay() {
    const cart = db.getCart();
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    
    if (cartCount) {
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    if (cartItems) {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
          <div class="flex-1">
            <h4 class="font-medium text-gray-800">${item.name}</h4>
            <p class="text-sm text-gray-600">${item.quantity} × $${item.price}</p>
            ${item.notes ? `<p class="text-xs text-gray-500 mt-1">${item.notes}</p>` : ''}
          </div>
          <button class="remove-from-cart text-red-500 hover:text-red-700 ml-2" data-product-id="${item.productId}">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      `).join('');
    }
  }

  // Order methods
  handleOrderSubmit(form) {
    const cart = db.getCart();
    if (cart.length === 0) {
      this.showErrorMessage('Your cart is empty');
      return;
    }

    const orderData = {
      customerId: this.currentUser.username,
      type: 'PO',
      status: 'pending',
      items: cart,
      customerInfo: this.currentUser.contact,
      notes: formData.get('notes') || ''
    };

    const order = db.createOrder(orderData);
    db.clearCart();
    
    this.showSuccessMessage('Order created successfully!');
    setTimeout(() => {
      this.generatePDF(order.id);
      this.navigate('orders');
    }, 2000);
  }

  // PDF generation
  async generatePDF(orderId) {
    try {
      const order = db.getOrder(orderId);
      if (!order) {
        this.showErrorMessage('Order not found');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text('BK Distribution', 20, 30);
      doc.setFontSize(16);
      doc.text(`Purchase Order #${order.orderNumber}`, 20, 45);
      
      // Order details
      doc.setFontSize(12);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 60);
      doc.text(`Customer: ${order.customerInfo.name}`, 20, 75);
      doc.text(`Company: ${this.currentUser.company}`, 20, 90);
      
      // Items
      let yPosition = 110;
      doc.text('Items:', 20, yPosition);
      yPosition += 15;
      
      order.items.forEach(item => {
        doc.text(`${item.name} - ${item.quantity} × $${item.price}`, 20, yPosition);
        yPosition += 10;
      });
      
      // Totals
      yPosition += 20;
      doc.text(`Subtotal: $${order.totals.subtotal}`, 20, yPosition);
      doc.text(`Tax: $${order.totals.tax}`, 20, yPosition + 15);
      doc.text(`Shipping: $${order.totals.shipping}`, 20, yPosition + 30);
      doc.text(`Total: $${order.totals.total}`, 20, yPosition + 45);
      
      // Save PDF
      doc.save(`PO-${order.orderNumber}.pdf`);
      this.showSuccessMessage('PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      this.showErrorMessage('Failed to generate PDF');
    }
  }

  // WhatsApp sharing
  shareViaWhatsApp(orderId) {
    const order = db.getOrder(orderId);
    if (!order) return;

    const message = `Purchase Order #${order.orderNumber} from BK Distribution. Total: $${order.totals.total}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  }

  // UI helpers
  showSuccessMessage(message) {
    this.showMessage(message, 'success');
  }

  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    anime({
      targets: messageEl,
      translateX: [300, 0],
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutQuart'
    });
    
    setTimeout(() => {
      anime({
        targets: messageEl,
        translateX: [0, 300],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutQuart',
        complete: () => messageEl.remove()
      });
    }, 3000);
  }

  // Dashboard analytics
  initDashboard() {
    if (!document.getElementById('orderChart')) return;
    
    const stats = db.getOrderStats(this.currentUser?.username);
    
    // Update stats display
    document.getElementById('totalOrders').textContent = stats.totalOrders;
    document.getElementById('monthlyOrders').textContent = stats.thisMonthOrders;
    document.getElementById('totalValue').textContent = `$${stats.totalValue}`;
    
    // Initialize chart
    const chartDom = document.getElementById('orderChart');
    const myChart = echarts.init(chartDom);
    
    const option = {
      title: {
        text: 'Order Trends',
        textStyle: { color: '#2D5A27' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: { type: 'value' },
      series: [{
        data: [12, 19, 15, 25, 22, 30],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#2D5A27' },
        areaStyle: { color: 'rgba(45, 90, 39, 0.1)' }
      }]
    };
    
    myChart.setOption(option);
  }
}

<<<<<<< HEAD
// Initialize app and make it globally accessible
const app = new BKApp();
window.app = app;
=======
// Initialize app
const app = new BKApp();
>>>>>>> 63d4c3fda3a9938500d449a7ea0861a65e2a4886
