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

const change = attribute => value => el => {
    el.style[attribute] = value
};
const fontChangeTypes = {
    font: { attribute: 'font', action: change('fontFamily') },
    'font-size': { attribute: 'font', action: change('fontSize') },
    'social-color': { attribute: 'social-color', action: change('backgroundColor') },
    'text-color': { attribute: 'font', action: change('color') },
    'theme-color': {
        attribute: 'theme-color',
        action: value => el => change('img' === el.localName ? 'backgroundColor' : 'color')(value)(el)
    }
};

document.addEventListener('form:change', ev => {
    const { type, value } = ev.detail;
    const { attribute, action } = fontChangeTypes[type];

    ev.stopPropagation();
    document.querySelectorAll(`[${attribute}]`)
        .forEach(action(value))
})

window.setLanguage = signatureForm.setLanguage
signatureForm
    .then(fillSignature);
