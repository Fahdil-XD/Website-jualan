 // Product data
  const products = [
    {
      id: 'p1',
      name: 'ASUS TUF Gaming A15',
      price: 9500000,
      description: 'ASUS TUF A15 adalah salah satu laptop gaming dari lini ASUS TUF (The Ultimate Force) yang dikenal karena ketangguhan, performa, dan daya tahan dalam permainan.',
      image: 'https://media.karousell.com/media/photos/products/2023/6/13/asus_tuf_gaming_a15_2023_model_1686642510_5bcdb7de_progressive'
    },
    {
      id: 'p2',
      name: 'MSI gf63 thin',
      price: 9000000,
      description: 'MSI GF63 Thin 11UC 1204ID adalah laptop gaming bertenaga Intel Core i5-11400H dan Nvidia GeForce RTX 3050 yang ringan, kompak, dan memiliki layar 144Hz.',
      image: 'https://cdn1.productnation.co/stg/sites/4/648a6e139bd6a.jpg'
    },
    {
      id: 'p3',
      name: 'lenovo LOQ 15',
      price: 12000000,
      description: 'Laptop Gaming ini adalah Lenovo LOQ 15 keluaran tahun 2024. Penggunaan Intel Arc Graphics memang membuat Laptop Gaming dari Lenovo ini terasa beda dibandingkan merk lainnya.',
      image: 'https://th.bing.com/th/id/OIP.c6BwKSmQZAKsv9wd74XhFAHaFC?r=0&cb=iwp2&rs=1&pid=ImgDetMain'
    },
    {
      id: 'p4',
      name: 'ASUS ROG Zephyrus G14',
      price: 15990000,
      description: 'Laptop gaming unik ini adalah ASUS ROG Zephyrus G14 keluaran tahun 2024. Sudah menjadi tradisi kalau setiap tahunnya ASUS mengeluarkan penerus dari seri Laptop Gaming 14 Inch mereka. ',
      image: 'https://www.techhub.in.th/wp-content/uploads/2023/10/G16_white-11_b-scaled.jpg'
    },
    {
      id: 'p5',
      name: 'HP Victus 15',
      price: 10990000,
      description: 'Victus 15-fb0012AX ini masih mengusung desain clamshell dengan material polikarbonat. Tampilannya mirip banget dengan seri Victus 15 sebelumnya.',
      image: 'https://hnau.imgix.net/media/catalog/product/2/2/22c1_victus_rokuophir_15_micasilver_nt_hdcam_nonodd_nonfpr_intelfreedos_coreset_frontright_1.jpg?auto=compress&auto=format&fill-color=FFFFFF&fit=fill&fill=solid&w=992&h=558'
    },
    {
      id: 'p6',
      name: 'Acer Nitro V15 SE',
      price: 10990000,
      description: 'Acer kembali menghadirkan laptop gaming untuk kelas entry, namun tidak benar-benar entry. Nitro V 15 kembali hadir dengan spesifikasi yang gahar dan dapat memanjakan penggunanya',
      image: 'https://images.hothardware.com/contentimages/newsitem/62627/content/acer-nitro-v-15-laptops.jpg'
    }
  ];

  // Cart object to hold items {productId: quantity}
  let cart = {};

  // Elements references
  const productGrid = document.getElementById('product-grid');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElem = document.getElementById('cart-total');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');

  // Format price to Indonesian Rupiah
  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  }

  // Render products grid
  function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
      const article = document.createElement('article');
      article.className = 'product-card';

      article.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price">${formatPrice(product.price)}</div>
          <p class="product-description">${product.description}</p>
          <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      `;

      productGrid.appendChild(article);
    });
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    const productIds = Object.keys(cart);
    if (productIds.length === 0) {
      cartItemsContainer.innerHTML = '<p>No items in cart.</p>';
      cartTotalElem.textContent = 'Total: Rp0';
      return;
    }

    let total = 0;
    productIds.forEach(pid => {
      const product = products.find(p => p.id === pid);
      const quantity = cart[pid];
      const itemTotal = product.price * quantity;
      total += itemTotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatPrice(product.price)} x ${quantity} = ${formatPrice(itemTotal)}</p>
        </div>
        <button class="cart-remove-btn" data-id="${pid}" title="Remove one">−</button>
        <button class="cart-add-btn" data-id="${pid}" title="Add one">+</button>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotalElem.textContent = 'Total: ' + formatPrice(total);
  }

  // Add product to cart
  function addToCart(productId) {
    if (cart[productId]) {
      cart[productId]++;
    } else {
      cart[productId] = 1;
    }
    renderCart();
  }

  // Remove one quantity from cart or remove item
  function removeFromCart(productId) {
    if (!cart[productId]) return;
    if (cart[productId] === 1) {
      delete cart[productId];
    } else {
      cart[productId]--;
    }
    renderCart();
  }

  // Event listeners
  productGrid.addEventListener('click', e => {
    if (e.target.classList.contains('add-cart-btn')) {
      const pid = e.target.dataset.id;
      addToCart(pid);
      // Open cart automatically when adding item
      cartSidebar.classList.add('open');
    }
  });

  // Event delegation for cart buttons
  cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('cart-remove-btn')) {
      const pid = e.target.dataset.id;
      removeFromCart(pid);
    }
    if (e.target.classList.contains('cart-add-btn')) {
      const pid = e.target.dataset.id;
      addToCart(pid);
    }
  });

  cartToggleBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
  });

  closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
  });

  // Initial rendering
  renderProducts();
  renderCart();