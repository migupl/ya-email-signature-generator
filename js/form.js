import { signatureForm, components } from './form-data.js'

const getUrl = str => {
    const clean = str.trim();
    if (clean.startsWith('http')) return clean
    return `https://${clean}`
};

const fillSignature = ({ changed }) => {
    const { component: { key }, value } = changed;

    const el = document.getElementById(key);
    if ('homepage' === key) {
        el.href = getUrl(value)
        el.innerText = value
    }
    else if ('email' === key) {
        el.href = 'mailto:' + value
        el.innerText = value
    }
    else if ('profile-picture' === key) {
        el.src = value
    }
    else {
        el.innerText = value
    }
};

const initilizeSignature = components =>
    components.forEach(component => {
        const { key, placeholder } = component;

        if ('profile-picture' != key) {
            const el = document.getElementById(key);
            el.innerText = placeholder;
        }
    });

signatureForm
    .then(form => {
        form.on('change', fillSignature);

        window.setLanguage = lang => {
            form.language = lang;
        }

        initilizeSignature(components);
    });
