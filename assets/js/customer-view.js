// =================== CUSTOMER VIEW ===================
(function (app) {
  function customerUrl() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';

    if (url.pathname.endsWith('/') || !url.pathname.match(/\.html$/i)) {
      url.pathname = url.pathname.replace(/\/?$/, '/') + 'customer.html';
    } else {
      url.pathname = url.pathname.replace(/[^/]+$/i, 'customer.html');
    }

    return url.href;
  }

  app.customerUrl = customerUrl;

  function fallbackCopy(text) {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.className = 'clipboard-fallback';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    return copied;
  }

  app.copyText = function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
    }
    return Promise.resolve(fallbackCopy(text));
  };

  app.sendToCustomer = function sendToCustomer() {
    const url = customerUrl();
    const box = document.getElementById('customer-link-box');
    const msg = document.getElementById('copy-msg');

    if (box) {
      box.textContent = url;
      box.classList.add('show');
    }

    app.copyText(url).then(copied => {
      if (!msg) return;
      msg.textContent = copied ? 'Link copied!' : 'Copy the link above';
      msg.classList.add('show');
      setTimeout(() => msg.classList.remove('show'), 2500);
    });
  };

  app.showCustomerCategory = function showCustomerCategory(cat) {
    document.querySelectorAll('.customer-category-btn').forEach(button => {
      const isActive = button.dataset.customerCat === cat;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      const card = button.closest('.customer-column');
      if (card) card.classList.toggle('active', isActive);
    });

    document.querySelectorAll('.customer-service-list').forEach(panel => {
      const isActive = panel.dataset.customerPanel === cat;
      panel.classList.toggle('active', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
  };

  app.checkCustomerView = function checkCustomerView() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') !== 'customer') return false;

    window.location.replace(customerUrl());
    return true;
  };

  app.showToast = function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  };
})(window.DatApp);
