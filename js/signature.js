import { signatureForm } from './form.js'

const getUrl = str => {
    const clean = str.trim();
    if (clean.startsWith('http')) return clean
    return `https://${clean}`
};

const fillSignature = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return

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

document.addEventListener('form:font-changes', ev => {
    ev.stopPropagation();
    document.querySelectorAll('[font]')
        .forEach(el => el.style.fontFamily = ev.detail)
})

document.addEventListener('form:font-size-changes', ev => {
    ev.stopPropagation();
    document.querySelectorAll('[font]')
        .forEach(el => el.style.fontSize = ev.detail)
})

document.addEventListener('form:text-color-changes', ev => {
    ev.stopPropagation();
    document.querySelectorAll('[font]')
        .forEach(el => {
            el.style.color = ev.detail
        })
})

window.setLanguage = signatureForm.setLanguage
signatureForm
    .then(fillSignature);
