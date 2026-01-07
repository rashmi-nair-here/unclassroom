const quoteBlock = document.getElementById('quote');
const quotes = ['"Never stop learning because life never stops teaching."', '"He who laughs most, learns best."', '"The beautiful thing about learning is nobody can take it away from you.', '"The great aim of education is not knowledge but action."', '"The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn."']
const speed = 60;
const pause = 1200;

let i = 0;
let isDeleting = false;
let j = 0;

function typeWriter() {
    const txt = quotes[j];

    if (!isDeleting) {
        quoteBlock.textContent = txt.substring(0, i + 1);
        i++;
        if (i === txt.length) {
            isDeleting = true;
            setTimeout(typeWriter, pause);
            return;
        }
    } else {
        quoteBlock.textContent = txt.substring(0, i - 1);
        i--;
        if (i === 0) {
            isDeleting = false;
            j = (j + 1) % quotes.length;
            setTimeout(typeWriter, speed);
            return;
        }
    }
    setTimeout(typeWriter, isDeleting ? Math.floor(speed / 2) : speed);
}

typeWriter();