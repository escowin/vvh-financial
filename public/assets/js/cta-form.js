async function ctaFormHandler(e) {
    e.preventDefault();

    console.log("clicked")
};

document.getElementById('cta-form').addEventListener('submit', ctaFormHandler);