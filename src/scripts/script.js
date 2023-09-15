const toggleMenu = document.querySelector('.menu-toggle');
const toggleMenuCls = document.querySelector('.navigation__list__item-cls');

function hideMobMenu() {
    const mobMenu = document.querySelector('.navigation__list');
    mobMenu.classList.toggle('active');
}

toggleMenu.addEventListener('click', hideMobMenu);
toggleMenuCls.addEventListener('click', hideMobMenu);