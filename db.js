class BKDatabase {
  constructor() {
    this.init();
  }

  init() {
    this.initProducts();
    this.initUsers();
    this.initOrders();
  }

  initProducts() {
    const defaultProducts = [
      {
        id: 'sugar-white-1',
        name: 'Premium White Sugar',
        category: 'Sugar',
        description: 'High-quality refined white sugar for industrial use',
        price: 45.50,
        unit: '50kg bag',
        image: 'resources/sugar-product-1.png',
        stock: 250,
        minOrder: 10,
        specifications: {
          purity: '99.9%',
          moisture: '0.05% max',
          origin: 'Local'
        }
      },
      {
        id: 'sugar-brown-1',
        name: 'Golden Brown Sugar',
        category: 'Sugar',
        description: 'Natural brown sugar with rich molasses flavor',
        price: 52.75,
        unit: '50kg bag',
        image: 'resources/sugar-product-2.png',
        stock: 180,
        minOrder: 5,
        specifications: {
          purity: '98.5%',
          moisture: '0.08% max',
          origin: 'Local'
        }
      },
      {
        id: 'sugar-powder-1',
        name: 'Confectioners Sugar',
        category: 'Sugar',
        description: 'Ultra-fine powdered sugar for baking applications',
        price: 58.90,
        unit: '25kg bag',
        image: 'resources/sugar-product-3.png',
        stock: 120,
        minOrder: 8,
        specifications: {
          purity: '99.5%',
          mesh: '10X fine',
          origin: 'Local'
        }
      },
      {
        id: 'packaging-bag-1',
        name: 'Industrial Food Grade Bags',
        category: 'Packaging',
        description: 'Food-safe packaging bags for sugar products',
        price: 2.25,
        unit: 'per bag',
        image: 'resources/sugar-product-1.png',
        stock: 5000,
        minOrder: 100,
        specifications: {
          material: 'Food grade plastic',
          capacity: '50kg',
          features: 'Moisture resistant'
        }
      },
      {
        id: 'sweetener-1',
        name: 'Natural Sweetener Blend',
        category: 'Other Products',
        description: 'Healthy alternative sweetener for food processing',
        price: 89.99,
        unit: '25kg bag',
        image: 'resources/sugar-product-2.png',
        stock: 75,
        minOrder: 5,
        specifications: {
          composition: 'Stevia blend',
          calories: 'Zero calorie',
          applications: 'Beverages, baking'
        }
      }
    ];

    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }

  initUsers() {
    const defaultUsers = [
      {
        id: 'user-1',
        username: 'demo@bkcustomer.com',
        password: 'demo123',
        company: 'BK Distribution',
        contact: {
          name: 'John Baker',
          phone: '+1 (555) 123-4567',
          address: '123 Bakery St, Food City, FC 12345'
        },
        preferences: {
          notifications: true,
          autoSync: true
        },
        lastLogin: null,
        isActive: true
      }
    ];

    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }

  initOrders() {
    if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('orderCounter')) {
      localStorage.setItem('orderCounter', '1000');
    }
  }

  // Product methods
  getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  getProduct(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  addProduct(product) {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }

  searchProducts(query) {
    const products = this.getProducts();
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterProductsByCategory(category) {
    const products = this.getProducts();
    return products.filter(p => p.category === category);
  }

  // User methods
  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getUser(username) {
    const users = this.getUsers();
    return users.find(u => u.username === username);
  }

  validateUser(username, password) {
    const user = this.getUser(username);
    return user && user.password === password;
  }

  updateUser(username, updates) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  }

  changePassword(username, oldPassword, newPassword) {
    if (this.validateUser(username, oldPassword)) {
      return this.updateUser(username, { password: newPassword });
    }
    return false;
  }

  // Order methods
  getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }

  getOrder(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id);
  }

  getOrdersByUser(username) {
    const orders = this.getOrders();
    return orders.filter(o => o.customerId === username);
  }

  generateOrderNumber() {
    const counter = parseInt(localStorage.getItem('orderCounter') || '1000');
    const newCounter = counter + 1;
    localStorage.setItem('orderCounter', newCounter.toString());
    return `BK${newCounter.toString().padStart(6, '0')}`;
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    const orderNumber = this.generateOrderNumber();
    
    const order = {
      id: `order-${Date.now()}`,
      orderNumber,
      customerId: orderData.customerId,
      type: orderData.type || 'PO',
      status: orderData.status || 'pending',
      items: orderData.items,
      totals: this.calculateTotals(orderData.items),
      customerInfo: orderData.customerInfo,
      notes: orderData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    return order;
  }

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('orders', JSON.stringify(orders));
      return orders[orderIndex];
    }
    return null;
  }

  convertToInvoice(orderId) {
    const order = this.getOrder(orderId);
    if (order && order.type === 'SO') {
      const invoiceOrder = {
        ...order,
        id: `invoice-${Date.now()}`,
        type: 'Invoice',
        status: 'invoiced',
        invoiceNumber: `INV-${order.orderNumber}`,
        updatedAt: new Date().toISOString()
      };
      
      const orders = this.getOrders();
      orders.push(invoiceOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      return invoiceOrder;
    }
    return null;
  }

  calculateTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 500 ? 0 : 25; // Free shipping over $500
    const total = subtotal + tax + shipping;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }

  // Shopping cart methods
  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(productId, quantity, notes = '') {
    const cart = this.getCart();
    const product = this.getProduct(productId);
    
    if (product) {
      const existingItem = cart.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.notes = notes;
      } else {
        cart.push({
          productId,
          name: product.name,
          price: product.price,
          quantity,
          unit: product.unit,
          notes,
          image: product.image
        });
      }
      
      this.setCart(cart);
      return true;
    }
    return false;
  }

  removeFromCart(productId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.productId !== productId);
    this.setCart(updatedCart);
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

  // Analytics methods
  getOrderStats(username) {
    const orders = username ? this.getOrdersByUser(username) : this.getOrders();
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const totalOrders = orders.length;
    const thisMonthOrders = orders.filter(o => new Date(o.createdAt) >= thisMonth).length;
    const totalValue = orders.reduce((sum, o) => sum + o.totals.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;

    return {
      totalOrders,
      thisMonthOrders,
      totalValue: Math.round(totalValue * 100) / 100,
      avgOrderValue: Math.round(avgOrderValue * 100) / 100
    };
  }
}

// Initialize database
const db = new BKDatabase();
