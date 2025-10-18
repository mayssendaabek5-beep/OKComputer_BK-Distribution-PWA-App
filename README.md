# BK Distribution Orders - Progressive Web App

A comprehensive mobile-first Progressive Web App for BK Distribution's order management system. This PWA provides secure customer authentication, dynamic product catalog, order creation with PDF generation, and WhatsApp integration.

## Features

### 🔐 Secure Access
- Customer authentication with username/password
- Password change functionality
- Session management with secure storage
- Remember me functionality

### 📱 Mobile-First Design
- Progressive Web App (PWA) with offline support
- Responsive design optimized for mobile devices
- Touch-friendly interface with smooth animations
- Installable like a native app

### 🛍️ Product Management
- Dynamic product catalog with search and filtering
- Multiple product categories (Sugar, Packaging, Other Products)
- Shopping cart with quantity management
- Real-time price calculation

### 📋 Order Management
- Create Purchase Orders (PO) from customer side
- View Sales Orders (SO) from company side
- Convert SO to Invoice functionality
- Order status tracking (Pending → Processing → Completed)
- Auto-generated order numbers

### 📄 PDF Generation
- Professional Purchase Order PDF generation
- Sales Order PDF for internal use
- Download and share functionality
- Company branding included

### 📱 WhatsApp Integration
- Deep link integration for sharing orders
- PDF attachment support
- Message template customization

### 📊 Analytics Dashboard
- Order statistics and trends
- Visual charts using ECharts
- Monthly and total order tracking
- Customer spending analysis

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - Core application logic
- **Anime.js** - Smooth animations
- **ECharts.js** - Data visualization
- **Splide** - Product carousels

### PWA Features
- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - Install prompt and app metadata
- **Local Storage** - Client-side data persistence
- **Background Sync** - Queue operations when offline

### Libraries
- **jsPDF** - PDF generation
- **Custom Database Layer** - Local storage management

## Project Structure

```
/
├── index.html              # Main dashboard
├── login.html              # Authentication page
├── products.html           # Product catalog
├── orders.html             # Order management
├── profile.html            # User profile
├── main.js                 # Core application logic
├── db.js                   # Database simulation
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── resources/              # Static assets
│   ├── bk-distribution-logo.png
│   ├── sugar-product-1.png
│   ├── sugar-product-2.png
│   ├── sugar-product-3.png
│   └── warehouse-hero.png
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)
- HTTPS enabled (for PWA features)

### Local Development

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone [repository-url]
   cd bk-distribution-pwa
   ```

2. **Start a local web server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

4. **Install as PWA**
   - Click the install prompt in your browser
   - Or go to browser menu → "Install app"
   - Add to home screen for mobile access

### Production Deployment

#### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy with default settings
4. Enable HTTPS (automatic)

#### Other Platforms
- **Netlify**: Drag and drop deployment
- **Firebase Hosting**: Firebase CLI deployment
- **AWS S3 + CloudFront**: Static hosting with CDN

## Usage Guide

### Getting Started

1. **Login**
   - Use demo credentials:
     - Email: `demo@bkcustomer.com`
     - Password: `demo123`
   - Or register for new account

2. **Browse Products**
   - Navigate to Products page
   - Use search and filters
   - Add items to cart

3. **Create Order**
   - Review cart contents
   - Add special instructions
   - Generate Purchase Order
   - Download PDF or share via WhatsApp

### Customer Workflow

1. **Authentication** → Login with secure credentials
2. **Product Selection** → Browse catalog and add to cart
3. **Order Creation** → Review and submit order
4. **PDF Generation** → Download professional PO document
5. **Order Tracking** → Monitor order status updates

### Company Workflow

1. **Receive Orders** → View incoming Purchase Orders
2. **Process Orders** → Update status to Processing
3. **Generate SO** → Create Sales Order for internal use
4. **Convert to Invoice** → Final billing document
5. **Complete Order** → Mark as completed

## Demo Data

### Default Products
- **Premium White Sugar** - $45.50 per 50kg bag
- **Golden Brown Sugar** - $52.75 per 50kg bag
- **Confectioners Sugar** - $58.90 per 25kg bag
- **Industrial Food Grade Bags** - $2.25 per bag
- **Natural Sweetener Blend** - $89.99 per 25kg bag

### Demo User
- **Company**: Sweet Bakery Co.
- **Contact**: John Baker
- **Phone**: +1 (555) 123-4567
- **Address**: 123 Bakery St, Food City, FC 12345

## Configuration

### PWA Settings
Edit `manifest.json` to customize:
- App name and description
- Theme colors
- Icons and screenshots
- Display preferences

### Database Configuration
The app uses local storage for demo purposes. For production:
- Replace `db.js` with real database integration
- Implement proper authentication backend
- Add data validation and sanitization

### Styling Customization
- Modify Tailwind classes in HTML files
- Update color scheme in CSS
- Customize animations in `main.js`

## Browser Support

### Fully Supported
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### PWA Features
- Install prompt: Chrome, Edge, Safari
- Offline support: All modern browsers
- Push notifications: Chrome, Firefox

## Security Considerations

### Current Implementation
- Password hashing simulation (demo only)
- Input validation on forms
- XSS protection measures
- CSRF prevention

### Production Recommendations
- Implement proper password hashing (bcrypt)
- Use HTTPS only
- Add rate limiting
- Implement proper session management
- Add input sanitization
- Use Content Security Policy (CSP)

## Performance Optimization

### Built-in Features
- Service worker caching
- Lazy loading of images
- Optimized animations
- Compressed assets

### Additional Optimizations
- Image optimization
- Code splitting
- CDN for external libraries
- Gzip compression

## Troubleshooting

### Common Issues

1. **PWA not installing**
   - Ensure HTTPS is enabled
   - Check manifest.json validity
   - Verify service worker registration

2. **Offline functionality not working**
   - Check service worker cache
   - Verify network requests are cached
   - Check browser compatibility

3. **PDF generation failing**
   - Ensure jsPDF library is loaded
   - Check for CORS issues
   - Verify data is properly formatted

4. **WhatsApp sharing not working**
   - Check device has WhatsApp installed
   - Verify deep link format
   - Test on mobile device

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Test thoroughly
5. Submit pull request

## License

This project is created for BK Distribution. All rights reserved.

## Support

For technical support or questions:
- Check troubleshooting section
- Review browser console for errors
- Test with demo credentials
- Ensure HTTPS for PWA features

## Future Enhancements

### Planned Features
- Real-time order notifications
- Advanced analytics dashboard
- Multi-language support
- Integration with accounting systems
- Advanced search and filtering
- Customer feedback system
- Inventory management
- Supplier integration

### Technical Improvements
- Backend API integration
- Real-time database (Firebase)
- Advanced PWA features
- Performance monitoring
- Error tracking
- A/B testing framework

---

**BK Distribution Orders PWA** - Professional order management for modern distribution businesses.