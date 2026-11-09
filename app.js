let currentUser = null;

function getStorage(key, defaultValue = []) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

let currentLanguage = localStorage.getItem('language') || 'ar';
let currentTheme = localStorage.getItem('theme') || 'light';
let foods = getStorage('foods', []);
let orders = getStorage('orders', []);
let users = getStorage('users', []);
let deliveryPersons = getStorage('deliveryPersons', []);
const validRoles = ['admin', 'user', 'delivery'];

function initializeData() {
    if (foods.length === 0) {
        foods = [
            { id: 1, name: 'برجر لحم', nameEn: 'Beef Burger', price: 25, description: 'برجر لحم طازج مع خضار', descriptionEn: 'Fresh beef burger with vegetables', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
            { id: 2, name: 'بيتزا', nameEn: 'Pizza', price: 35, description: 'بيتزا بالجبن والطماطم', descriptionEn: 'Pizza with cheese and tomatoes', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' },
            { id: 3, name: 'سوشي', nameEn: 'Sushi', price: 45, description: 'سوشي طازج', descriptionEn: 'Fresh sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop' },
            { id: 4, name: 'تاكو', nameEn: 'Taco', price: 20, description: 'تاكو مكسيكي', descriptionEn: 'Mexican taco', image: 'https://images.unsplash.com/photo-1565299585323-38174c0b5d5a?w=400&h=300&fit=crop' },
            { id: 5, name: 'سلطة', nameEn: 'Salad', price: 15, description: 'سلطة طازجة', descriptionEn: 'Fresh salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' },
            { id: 6, name: 'دجاج مشوي', nameEn: 'Grilled Chicken', price: 30, description: 'دجاج مشوي مع أرز', descriptionEn: 'Grilled chicken with rice', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop' },
            { id: 7, name: 'برجر دجاج', nameEn: 'Chicken Burger', price: 22, description: 'برجر دجاج مقرمش', descriptionEn: 'Crispy chicken burger', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop' },
            { id: 8, name: 'بيتزا مارجريتا', nameEn: 'Margherita Pizza', price: 32, description: 'بيتزا إيطالية كلاسيكية', descriptionEn: 'Classic Italian pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop' },
            { id: 9, name: 'شاورما', nameEn: 'Shawarma', price: 24, description: 'شاورما لحم أو دجاج', descriptionEn: 'Beef or chicken shawarma', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' },
            { id: 10, name: 'كباب', nameEn: 'Kebab', price: 35, description: 'كباب لحم مشوي', descriptionEn: 'Grilled meat kebab', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop' },
            { id: 11, name: 'باستا', nameEn: 'Pasta', price: 28, description: 'باستا إيطالية بالصلصة', descriptionEn: 'Italian pasta with sauce', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
            { id: 12, name: 'سمك مشوي', nameEn: 'Grilled Fish', price: 40, description: 'سمك مشوي طازج', descriptionEn: 'Fresh grilled fish', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
            { id: 13, name: 'دجاج كنتاكي', nameEn: 'Fried Chicken', price: 28, description: 'دجاج مقلي مقرمش', descriptionEn: 'Crispy fried chicken', image: 'https://images.unsplash.com/photo-1626087927381-6e1ecc0b6123?w=400&h=300&fit=crop' },
            { id: 14, name: 'لحم مشوي', nameEn: 'Grilled Steak', price: 50, description: 'لحم مشوي طازج', descriptionEn: 'Fresh grilled steak', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop' },
            { id: 15, name: 'سلطة قيصر', nameEn: 'Caesar Salad', price: 18, description: 'سلطة قيصر كلاسيكية', descriptionEn: 'Classic Caesar salad', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop' }
        ];
        localStorage.setItem('foods', JSON.stringify(foods));
    }

    if (deliveryPersons.length === 0) {
        deliveryPersons = [
            { id: 1, name: 'أحمد محمد', available: true },
            { id: 2, name: 'محمد علي', available: true },
            { id: 3, name: 'خالد أحمد', available: true }
        ];
        localStorage.setItem('deliveryPersons', JSON.stringify(deliveryPersons));
    }

    if (!users.find(u => u.role === 'admin')) {
        users.push({ id: 1, name: 'Admin', email: 'admin@admin.com', password: 'admin123', role: 'admin' });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = lang === 'ar' ? 'تطبيق طلب الطعام' : 'Food Ordering App';
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-ar]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
            el.placeholder = currentLanguage === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
        } else {
            el.textContent = currentLanguage === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        }
    });
    document.querySelectorAll('select option').forEach(option => {
        if (option.getAttribute('data-ar')) {
            option.textContent = currentLanguage === 'ar' ? option.getAttribute('data-ar') : option.getAttribute('data-en');
        }
    });
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('#theme-toggle').forEach(themeBtn => {
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    if (!email || !password || !role) {
        showMessage('error', currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }

    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showDashboard();
    } else {
        showMessage('error', currentLanguage === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
    }
}

function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    if (!name || !email || !password || !role) {
        showMessage('error', currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
        return;
    }

    users = getStorage('users', []);
    if (users.find(u => u.email === email)) {
        showMessage('error', currentLanguage === 'ar' ? 'البريد الإلكتروني مستخدم بالفعل' : 'Email already exists');
        return;
    }

    const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push({ id: newUserId, name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    if (role === 'delivery') {
        deliveryPersons = getStorage('deliveryPersons', []);
        deliveryPersons.push({ id: newUserId, name, available: true });
        localStorage.setItem('deliveryPersons', JSON.stringify(deliveryPersons));
    }

    showMessage('success', currentLanguage === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully');
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
}

function showMessage(type, text) {
    const messageEl = document.getElementById('message');
    if (!messageEl) {
        alert(text);
        return;
    }
    messageEl.className = `message ${type}`;
    messageEl.textContent = text;
    setTimeout(() => messageEl.className = 'message', 3000);
}

function showDashboard() {
    if (!currentUser || !validRoles.includes(currentUser.role)) {
        localStorage.removeItem('currentUser');
        return;
    }
    
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) authContainer.style.display = 'none';
    
    if (currentUser.id) cart = getStorage(`cart_${currentUser.id}`, []);
    
    let dashboard = document.getElementById(`${currentUser.role}-dashboard`);
    if (!dashboard) {
        createDashboard();
        dashboard = document.getElementById(`${currentUser.role}-dashboard`);
    }
    
    if (dashboard) {
        dashboard.classList.add('active');
        loadDashboardContent();
    }
}

function createDashboard() {
    const container = document.querySelector('.container');
    if (currentUser.role === 'admin') container.innerHTML = createAdminDashboard();
    else if (currentUser.role === 'user') container.innerHTML = createUserDashboard();
    else if (currentUser.role === 'delivery') container.innerHTML = createDeliveryDashboard();
    attachDashboardEvents();
}

function createAdminDashboard() {
    return `<div class="dashboard active" id="admin-dashboard">
        <div class="dashboard-header">
            <h1 data-ar="لوحة تحكم المسؤول" data-en="Admin Dashboard">لوحة تحكم المسؤول</h1>
            <div class="dashboard-controls">
                <div class="user-info"><span data-ar="مرحباً" data-en="Welcome">مرحباً</span> <strong>${currentUser.name}</strong></div>
                <button id="lang-toggle" class="btn-icon">🌐</button>
                <button id="theme-toggle" class="btn-icon">🌙</button>
                <button class="btn-secondary" onclick="logout()" data-ar="تسجيل الخروج" data-en="Logout">تسجيل الخروج</button>
            </div>
        </div>
        <div class="tabs">
            <button class="tab active" data-tab="orders" data-ar="الطلبات" data-en="Orders">الطلبات</button>
            <button class="tab" data-tab="reports" data-ar="التقارير" data-en="Reports">التقارير</button>
        </div>
        <div id="orders-tab" class="tab-content active"><div class="orders-container" id="admin-orders"></div></div>
        <div id="reports-tab" class="tab-content"><div class="report-container"><div class="report-stats" id="report-stats"></div></div></div>
    </div>`;
}

function createUserDashboard() {
    return `<div class="dashboard active" id="user-dashboard">
        <div class="dashboard-header">
            <h1 data-ar="تطبيق طلب الطعام" data-en="Food Ordering App">تطبيق طلب الطعام</h1>
            <div class="dashboard-controls">
                <div class="user-info"><span data-ar="مرحباً" data-en="Welcome">مرحباً</span> <strong>${currentUser.name}</strong></div>
                <button id="lang-toggle" class="btn-icon">🌐</button>
                <button id="theme-toggle" class="btn-icon">🌙</button>
                <button class="btn-secondary" onclick="showCart()" data-ar="السلة" data-en="Cart">السلة (<span id="cart-count">0</span>)</button>
                <button class="btn-secondary" onclick="logout()" data-ar="تسجيل الخروج" data-en="Logout">تسجيل الخروج</button>
            </div>
        </div>
        <div class="tabs">
            <button class="tab active" data-tab="foods" data-ar="الأطعمة" data-en="Foods">الأطعمة</button>
            <button class="tab" data-tab="my-orders" data-ar="طلباتي" data-en="My Orders">طلباتي</button>
        </div>
        <div id="foods-tab" class="tab-content active"><div class="food-grid" id="food-grid"></div></div>
        <div id="my-orders-tab" class="tab-content"><div class="orders-container" id="user-orders"></div></div>
        <div id="cart-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeCart()">&times;</span>
                <h2 data-ar="السلة" data-en="Cart">السلة</h2>
                <div id="cart-items"></div>
                <div class="cart-total">
                    <span data-ar="الإجمالي" data-en="Total">الإجمالي:</span>
                    <span id="cart-total">0</span> <span data-ar="دولار" data-en="$">دولار</span>
                </div>
                <button class="btn-primary" onclick="checkout()" data-ar="إتمام الطلب" data-en="Checkout">إتمام الطلب</button>
            </div>
        </div>
    </div>`;
}

function createDeliveryDashboard() {
    return `<div class="dashboard active" id="delivery-dashboard">
        <div class="dashboard-header">
            <h1 data-ar="لوحة تحكم الموصل" data-en="Delivery Dashboard">لوحة تحكم الموصل</h1>
            <div class="dashboard-controls">
                <div class="user-info"><span data-ar="مرحباً" data-en="Welcome">مرحباً</span> <strong>${currentUser.name}</strong></div>
                <button id="lang-toggle" class="btn-icon">🌐</button>
                <button id="theme-toggle" class="btn-icon">🌙</button>
                <button class="btn-secondary" onclick="logout()" data-ar="تسجيل الخروج" data-en="Logout">تسجيل الخروج</button>
            </div>
        </div>
        <div class="orders-container" id="delivery-orders"></div>
    </div>`;
}

function attachDashboardEvents() {
    setTimeout(() => {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const tabContent = document.getElementById(`${tabName}-tab`);
                if (tabContent) tabContent.classList.add('active');
                loadDashboardContent();
            });
        });

    }, 100);
}

function loadDashboardContent() {
    if (currentUser.role === 'admin') {
        loadAdminOrders();
        loadReports();
    } else if (currentUser.role === 'user') {
        loadFoods();
        loadUserOrders();
        updateCartCount();
    } else if (currentUser.role === 'delivery') {
        loadDeliveryOrders();
    }
    updateLanguage();
    setTheme(currentTheme);
}

function loadAdminOrders() {
    const container = document.getElementById('admin-orders');
    if (!container) return;
    orders = getStorage('orders', []);
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const otherOrders = orders.filter(o => o.status !== 'pending');
    container.innerHTML = '';
    [...pendingOrders, ...otherOrders].forEach(order => container.appendChild(createOrderCard(order, 'admin')));
    updateLanguage();
}

function loadReports() {
    const container = document.getElementById('report-stats');
    if (!container) return;
    orders = getStorage('orders', []);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
    container.innerHTML = `
        <div class="stat-card"><div class="stat-value">${totalOrders}</div><div class="stat-label" data-ar="إجمالي الطلبات" data-en="Total Orders">إجمالي الطلبات</div></div>
        <div class="stat-card"><div class="stat-value">${completedOrders}</div><div class="stat-label" data-ar="الطلبات المكتملة" data-en="Completed Orders">الطلبات المكتملة</div></div>
        <div class="stat-card"><div class="stat-value">${pendingOrders}</div><div class="stat-label" data-ar="الطلبات المعلقة" data-en="Pending Orders">الطلبات المعلقة</div></div>
        <div class="stat-card"><div class="stat-value">${totalRevenue}</div><div class="stat-label" data-ar="إجمالي الإيرادات" data-en="Total Revenue">إجمالي الإيرادات <span data-ar="دولار" data-en="$">دولار</span></div></div>
    `;
    updateLanguage();
}

function approveOrder(orderId) {
    orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'approved';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadAdminOrders();
    }
}

function assignDelivery(orderId) {
    orders = getStorage('orders', []);
    deliveryPersons = getStorage('deliveryPersons', []);
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const availableDelivery = deliveryPersons.find(d => d.available);
    if (!availableDelivery) {
        alert(currentLanguage === 'ar' ? 'لا يوجد موصل متاح' : 'No delivery person available');
        return;
    }
    order.status = 'delivering';
    order.deliveryPersonId = availableDelivery.id;
    order.deliveryPersonName = availableDelivery.name;
    availableDelivery.available = false;
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('deliveryPersons', JSON.stringify(deliveryPersons));
    loadAdminOrders();
}

function updateOrderStatus(orderId, status) {
    orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadAdminOrders();
    }
}

let cart = [];

function loadFoods() {
    const container = document.getElementById('food-grid');
    if (!container) return;
    foods = getStorage('foods', []);
    container.innerHTML = '';
    foods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        const img = document.createElement('img');
        img.src = food.image;
        img.alt = currentLanguage === 'ar' ? food.name : food.nameEn;
        img.onerror = function() {
            this.onerror = null;
            this.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
        };
        foodCard.innerHTML = `
            <h3>${currentLanguage === 'ar' ? food.name : food.nameEn}</h3>
            <p>${currentLanguage === 'ar' ? food.description : food.descriptionEn}</p>
            <div class="food-price">${food.price} <span data-ar="دولار" data-en="$">دولار</span></div>
            <div class="food-actions">
                <button class="btn-small btn-add-cart" onclick="addToCart(${food.id})" data-ar="إضافة للسلة" data-en="Add to Cart">${currentLanguage === 'ar' ? 'إضافة للسلة' : 'Add to Cart'}</button>
            </div>
        `;
        foodCard.insertBefore(img, foodCard.firstChild);
        container.appendChild(foodCard);
    });
    updateLanguage();
}

function addToCart(foodId) {
    if (!currentUser || !currentUser.id) {
        showMessage('error', currentLanguage === 'ar' ? 'يرجى تسجيل الدخول أولاً' : 'Please login first');
        return;
    }
    const food = foods.find(f => f.id === foodId);
    if (!food) return;
    const existingItem = cart.find(item => item.foodId === foodId);
    if (existingItem) existingItem.quantity++;
    else cart.push({ foodId: food.id, foodName: currentLanguage === 'ar' ? food.name : food.nameEn, price: food.price, quantity: 1 });
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    updateCartCount();
    showMessage('success', currentLanguage === 'ar' ? 'تمت الإضافة للسلة' : 'Added to cart');
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function showCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.foodName}</h4>
                <p>${item.price} <span data-ar="دولار" data-en="$">دولار</span> × ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="btn-danger" onclick="removeFromCart(${index})" data-ar="حذف" data-en="Remove">${currentLanguage === 'ar' ? 'حذف' : 'Remove'}</button>
            </div>
        `;
        cartItemsEl.appendChild(cartItem);
    });
    cartTotalEl.textContent = total;
    modal.style.display = 'block';
    updateLanguage();
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.style.display = 'none';
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    showCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    showCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) {
        alert(currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty');
        return;
    }
    orders = getStorage('orders', []);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        userId: currentUser.id,
        userName: currentUser.name,
        items: cart.map(item => ({ foodId: item.foodId, foodName: item.foodName, price: item.price, quantity: item.quantity })),
        total: total,
        status: 'pending',
        date: new Date().toISOString(),
        paymentMethod: 'cash_on_delivery'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    closeCart();
    updateCartCount();
    loadUserOrders();
    showMessage('success', currentLanguage === 'ar' ? 'تم إتمام الطلب بنجاح' : 'Order placed successfully');
}

function loadUserOrders() {
    const container = document.getElementById('user-orders');
    if (!container) return;
    orders = getStorage('orders', []);
    const userOrders = orders.filter(o => o.userId === currentUser.id).reverse();
    container.innerHTML = '';
    if (userOrders.length === 0) {
        container.innerHTML = `<p style="text-align: center; padding: 20px;" data-ar="لا توجد طلبات" data-en="No orders">لا توجد طلبات</p>`;
        updateLanguage();
        return;
    }
    userOrders.forEach(order => container.appendChild(createOrderCard(order, 'user')));
    updateLanguage();
}

function cancelOrder(orderId) {
    orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);
    if (order && order.status === 'pending') {
        if (confirm(currentLanguage === 'ar' ? 'هل تريد إلغاء هذا الطلب؟' : 'Do you want to cancel this order?')) {
            order.status = 'cancelled';
            localStorage.setItem('orders', JSON.stringify(orders));
            loadUserOrders();
        }
    } else {
        alert(currentLanguage === 'ar' ? 'لا يمكن إلغاء هذا الطلب' : 'Cannot cancel this order');
    }
}

function loadDeliveryOrders() {
    const container = document.getElementById('delivery-orders');
    if (!container) return;
    orders = getStorage('orders', []);
    deliveryPersons = getStorage('deliveryPersons', []);
    const availableOrders = orders.filter(o => o.status === 'approved');
    const myOrders = orders.filter(o => o.deliveryPersonId === currentUser.id && o.status === 'delivering');
    container.innerHTML = '';
    if (myOrders.length > 0) {
        const myOrdersTitle = document.createElement('h2');
        myOrdersTitle.textContent = currentLanguage === 'ar' ? 'طلباتي' : 'My Orders';
        myOrdersTitle.style.marginBottom = '20px';
        container.appendChild(myOrdersTitle);
        myOrders.forEach(order => container.appendChild(createOrderCard(order, 'delivery')));
    }
    if (availableOrders.length > 0) {
        const availableTitle = document.createElement('h2');
        availableTitle.textContent = currentLanguage === 'ar' ? 'الطلبات المتاحة' : 'Available Orders';
        availableTitle.style.marginTop = '30px';
        availableTitle.style.marginBottom = '20px';
        container.appendChild(availableTitle);
        availableOrders.forEach(order => container.appendChild(createOrderCard(order, 'delivery')));
    }
    if (availableOrders.length === 0 && myOrders.length === 0) {
        container.innerHTML = `<p style="text-align: center; padding: 20px;" data-ar="لا توجد طلبات متاحة" data-en="No available orders">لا توجد طلبات متاحة</p>`;
        updateLanguage();
    }
    updateLanguage();
}

function takeOrder(orderId) {
    orders = getStorage('orders', []);
    deliveryPersons = getStorage('deliveryPersons', []);
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status !== 'approved') return;
    const deliveryPerson = deliveryPersons.find(d => d.id === currentUser.id);
    if (!deliveryPerson || !deliveryPerson.available) {
        alert(currentLanguage === 'ar' ? 'أنت غير متاح حالياً' : 'You are not available');
        return;
    }
    order.status = 'delivering';
    order.deliveryPersonId = currentUser.id;
    order.deliveryPersonName = currentUser.name;
    deliveryPerson.available = false;
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('deliveryPersons', JSON.stringify(deliveryPersons));
    loadDeliveryOrders();
}

function completeDelivery(orderId) {
    orders = getStorage('orders', []);
    deliveryPersons = getStorage('deliveryPersons', []);
    const order = orders.find(o => o.id === orderId);
    if (!order || order.deliveryPersonId !== currentUser.id) return;
    if (confirm(currentLanguage === 'ar' ? 'هل تم توصيل الطلب بنجاح؟' : 'Was the order delivered successfully?')) {
        order.status = 'completed';
        const deliveryPerson = deliveryPersons.find(d => d.id === currentUser.id);
        if (deliveryPerson) deliveryPerson.available = true;
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('deliveryPersons', JSON.stringify(deliveryPersons));
        loadDeliveryOrders();
    }
}

function createOrderCard(order, viewType) {
    const card = document.createElement('div');
    card.className = 'order-card';
    const statusLabels = {
        pending: { ar: 'قيد الانتظار', en: 'Pending' },
        approved: { ar: 'موافق عليه', en: 'Approved' },
        delivering: { ar: 'قيد التوصيل', en: 'Delivering' },
        completed: { ar: 'مكتمل', en: 'Completed' },
        cancelled: { ar: 'ملغي', en: 'Cancelled' }
    };
    // Prevent dashboard crash if old/corrupted localStorage has an unknown status
    const statusLabel = statusLabels[order.status] || { ar: 'غير معروف', en: 'Unknown' };
    const statusText = currentLanguage === 'ar' ? statusLabel.ar : statusLabel.en;
    let actionsHTML = '';
    if (viewType === 'admin') {
        if (order.status === 'pending') {
            actionsHTML = `<button class="btn-success" data-order-id="${order.id}" data-action="approve" data-ar="موافقة" data-en="Approve">موافقة</button>
                <button class="btn-danger" data-order-id="${order.id}" data-action="cancel" data-ar="إلغاء" data-en="Cancel">إلغاء</button>`;
        } else if (order.status === 'approved') {
            actionsHTML = `<button class="btn-primary" data-order-id="${order.id}" data-action="assign" data-ar="تعيين موصل" data-en="Assign Delivery">تعيين موصل</button>`;
        }
    } else if (viewType === 'user') {
        if (order.status === 'pending') {
            actionsHTML = `<button class="btn-danger" data-order-id="${order.id}" data-action="cancel-order" data-ar="إلغاء الطلب" data-en="Cancel Order">إلغاء الطلب</button>`;
        }
    } else if (viewType === 'delivery') {
        if (order.status === 'approved') {
            actionsHTML = `<button class="btn-success" data-order-id="${order.id}" data-action="take" data-ar="أخذ الطلب" data-en="Take Order">أخذ الطلب</button>`;
        } else if (order.status === 'delivering' && order.deliveryPersonId === currentUser.id) {
            actionsHTML = `<button class="btn-success" data-order-id="${order.id}" data-action="complete" data-ar="إتمام التوصيل" data-en="Complete Delivery">إتمام التوصيل</button>`;
        }
    }
    card.innerHTML = `
        <div class="order-header">
            <div><strong data-ar="طلب رقم" data-en="Order #">${currentLanguage === 'ar' ? 'طلب رقم' : 'Order #'} ${order.id}</strong>
                <p style="margin-top: 5px; opacity: 0.7;">${order.userName}</p>
            </div>
            <span class="order-status status-${order.status}">${statusText}</span>
        </div>
        <div class="order-items">${order.items.map(item => `
            <div class="order-item">
                <span>${item.foodName} × ${item.quantity}</span>
                <span>${item.price * item.quantity} <span data-ar="دولار" data-en="$">دولار</span></span>
            </div>
        `).join('')}</div>
        <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
            <strong data-ar="الإجمالي" data-en="Total">${currentLanguage === 'ar' ? 'الإجمالي' : 'Total'}: ${order.total} <span data-ar="دولار" data-en="$">دولار</span></strong>
            ${order.deliveryPersonName ? `<span data-ar="الموصل" data-en="Delivery">${currentLanguage === 'ar' ? 'الموصل' : 'Delivery'}: ${order.deliveryPersonName}</span>` : ''}
        </div>
        ${actionsHTML ? `<div class="order-actions">${actionsHTML}</div>` : ''}
    `;
    card.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-order-id'));
            const action = this.getAttribute('data-action');
            if (action === 'approve') approveOrder(orderId);
            else if (action === 'cancel') updateOrderStatus(orderId, 'cancelled');
            else if (action === 'assign') assignDelivery(orderId);
            else if (action === 'cancel-order') cancelOrder(orderId);
            else if (action === 'take') takeOrder(orderId);
            else if (action === 'complete') completeDelivery(orderId);
        });
    });
    return card;
}

function logout() {
    currentUser = null;
    cart = [];
    localStorage.removeItem('currentUser');
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            if (currentUser && currentUser.id && validRoles.includes(currentUser.role)) {
                cart = getStorage(`cart_${currentUser.id}`, []);
                showDashboard();
            } else {
                currentUser = null;
                localStorage.removeItem('currentUser');
            }
        } catch (e) {
            currentUser = null;
            localStorage.removeItem('currentUser');
        }
    }
    setTheme(currentTheme);
    setLanguage(currentLanguage);
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`${tab}-form`).classList.add('active');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'lang-toggle' || (e.target.closest && e.target.closest('#lang-toggle')))) {
            setLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
            if (currentUser) loadDashboardContent();
        }
        if (e.target && (e.target.id === 'theme-toggle' || (e.target.closest && e.target.closest('#theme-toggle')))) {
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        }
    });
});

window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) closeCart();
}

window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.showCart = showCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.cancelOrder = cancelOrder;
