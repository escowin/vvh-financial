function copyright() {
    let date = new Date().getFullYear();
    const copyrightEl = document.getElementById('copyright');
    copyrightEl.innerText = date;
}

copyright();