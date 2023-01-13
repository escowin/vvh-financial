function copyright() {
    let date = new Date().getFullYear();
    console.log(`\u00a9 ${date} VVH Financial 
    built by Edwin M. Escobar
    https://github.com/escowin/vvh-financial`);

    const copyrightEl = document.getElementById('copyright');
    copyrightEl.innerText = date;
}

copyright();