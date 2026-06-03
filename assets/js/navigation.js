// =================== NAVIGATION ===================
(function (app) {
  app.showTab = function showTab(tab, trigger) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(navTab => navTab.classList.remove('active'));

    const page = document.getElementById('page-' + tab);
    if (page) page.classList.add('active');
    if (trigger) trigger.classList.add('active');

    if (tab === 'prices') app.renderPrices();
    if (tab === 'services') app.renderServiceCards();
    if (tab === 'calculator') app.renderCalc();
  };
})(window.DatApp);
