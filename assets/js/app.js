// =================== APP STARTUP AND EVENTS ===================
(function (app) {
  function bindAdminEvents() {
    document.addEventListener('click', event => {
      const actionTarget = event.target.closest('[data-action]');
      if (!actionTarget) return;

      const action = actionTarget.dataset.action;
      if (action === 'show-tab') app.showTab(actionTarget.dataset.tab, actionTarget);
      if (action === 'send-to-customer') app.sendToCustomer();
      if (action === 'show-cat') app.showCat(actionTarget.dataset.cat);
      if (action === 'add-service-modal') app.addServiceModal();
      if (action === 'save-prices') app.savePrices();
      if (action === 'hide-save-banner') app.hideSaveBanner();
      if (action === 'close-modal') app.closeModal();
      if (action === 'confirm-add-service') app.confirmAddService();
      if (action === 'add-price-row') app.addRowInline(actionTarget.dataset.cat);
      if (action === 'delete-service') app.deleteRow(actionTarget.dataset.cat, actionTarget.dataset.id);
      if (action === 'save-preset') app.savePreset();
      if (action === 'load-preset') app.loadPreset(Number(actionTarget.dataset.index));
      if (action === 'delete-preset') app.deletePreset(Number(actionTarget.dataset.index));
      if (action === 'show-customer-cat') app.showCustomerCategory(actionTarget.dataset.customerCat);
    });

    document.addEventListener('change', event => {
      const input = event.target.closest('[data-action="update-service"]');
      if (input) app.refreshPriceRow(input);
    });

    document.addEventListener('input', event => {
      const input = event.target.closest('[data-action="update-calc"]');
      if (input) app.updateCalc(input.dataset.id, input.value);
    });
  }

  function bindCustomerEvents() {
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-action="show-customer-cat"]');
      if (button) app.showCustomerCategory(button.dataset.customerCat);
    });
  }

  app.initAdmin = function initAdmin() {
    bindAdminEvents();
    if (app.checkCustomerView()) return;
    app.renderServiceCards();
  };

  app.initCustomer = function initCustomer() {
    bindCustomerEvents();
    app.renderCustomerServices();
    app.showCustomerCategory('printing');
  };

  app.init = function init() {
    if (document.body.dataset.page === 'customer') {
      app.initCustomer();
      return;
    }
    app.initAdmin();
  };

  document.addEventListener('DOMContentLoaded', app.init);
})(window.DatApp);
