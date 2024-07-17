import { signatureForm } from './form.js'

const getUrl = str => {
    const clean = str.trim();
    if (clean.startsWith('http')) return clean
    return `https://${clean}`
};

const fillSignature = ({ id, value }) => {
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
    else if ('telephone' === id || 'mobile-phone' ===id) {
        el.href = 'tel:' + value.replace(/\s/g, '')
        el.innerText = value
    }
    else if ('a' === el.localName) {
        el.href = getUrl(value)
    }
    else {
        el.innerText = value
    }
};

const change = attribute => value => el => {
    el.style[attribute] = value
};
const layoutChangeTypes = {
    font: { attribute: 'font', action: change('fontFamily') },
    'font-size': { attribute: 'font', action: change('fontSize') },
    'profile-border-radius': {
        attribute: 'profile-radius',
        action: value => el =>  change('borderRadius')(`${value}%`)(el)
    },
    'social-color': { attribute: 'social-color', action: change('backgroundColor') },
    'text-color': { attribute: 'font', action: change('color') },
    'theme-color': {
        attribute: 'theme-color',
        action: value => el => change('img' === el.localName ? 'backgroundColor' : 'color')(value)(el)
    }
};

document.addEventListener('form:change-field', ev => {
    ev.stopPropagation()
    fillSignature(ev.detail)
});

document.addEventListener('form:change-style', ev => {
    const { type, value } = ev.detail;
    const { attribute, action } = layoutChangeTypes[type];

    ev.stopPropagation()
    document.querySelectorAll(`[${attribute}]`)
        .forEach(action(value))
});

const onLoadForm = (() => {
    window.setLanguage = signatureForm.setLanguage
    signatureForm
        .then(fillSignature);

    const card = document.getElementById('signature-card');
    card.style.display = 'block'

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none'
})();
