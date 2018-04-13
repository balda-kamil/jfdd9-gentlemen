window.addEventListener('scroll', function (event) {
    document.querySelector('.hero').style.backgroundPositionX = (window.pageYOffset * 2) +'px';
    document.querySelector('.hero').style.backgroundPositionY = (window.pageYOffset * 2) +'px';
});
