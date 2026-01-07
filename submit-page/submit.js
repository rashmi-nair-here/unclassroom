var dropdowns = document.querySelectorAll('.wrap');
var dropdownBtns = document.querySelectorAll('#dropdown');
dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener('click', function() {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            dropdownBtns.forEach(function(btn) {
                btn.style.transform = "rotate(0deg)";
            });
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            dropdownBtns.forEach(function(btn) {
                btn.style.transform = "rotate(180deg)";
            });
        }
    });
});