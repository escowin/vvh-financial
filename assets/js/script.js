function copyright() {
    let date = new Date().getFullYear();

    const copyrightEl = document.getElementById('copyright');
    if (date >= 2022) {
        copyrightEl.innerText = `\u00A9 ${date}`;
    } else {
        copyrightEl.innerText = `\u00A9 2022 - ${date}`;
    }
};

copyright();