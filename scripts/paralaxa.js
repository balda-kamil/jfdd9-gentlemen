window.addEventListener('scroll', function (event) {
    document.querySelector('.hero').style.backgroundPositionX = (window.pageYOffset * 0.5) +'px';
    document.querySelector('.hero').style.backgroundPositionY = (window.pageYOffset * 0.5) +'px';
});
