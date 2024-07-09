import { signatureForm } from './form.js'

const getUrl = str => {
    const clean = str.trim();
    if (clean.startsWith('http')) return clean
    return `https://${clean}`
};

const fillSignature = (id, value) => {
    const el = document.getElementById(id);
    if ('homepage' === id) {
        el.href = getUrl(value)
        el.innerText = value
    }
    else if ('email' === id) {
        el.href = 'mailto:' + value
        el.innerText = value
    }
    else if ('profile-picture' === id) {
        el.src = value
    }
    else {
        el.innerText = value
    }
};

window.setLanguage = signatureForm.setLanguage
signatureForm
    .then(fillSignature);
