const message = (() => {
    const message = document.getElementById('clean-message');
    const changeLanguageTo = language => {
        const messages = message.querySelectorAll('[lang]')
        messages.forEach(message =>
            message.style.display = language === message.lang ? '' : 'none'
        )
    }
    const hide = () => message.style.display = '';

    const close = message.querySelector('button');
    close.onclick = () => message.style.display = 'none'

    return {
        changeLanguageTo, hide
    }
})();

const onCopyCard = (() => {
    const copy = document.getElementById('copy-card');
    const copied = document.getElementById('card-copied');

    const toClipboard = async () => {
        copy.style.display = 'none'
        copied.style.display = ''

        const card = document.getElementById('signature-card-content');

        // Trick, override the relative path with the resolution of src thas is always an absolute path
        const images = card.querySelectorAll('img');
        images.forEach(img => img.src = img.src)

        await navigator.clipboard.write([
            new ClipboardItem({
                'text/html': card.innerHTML
            })
        ])

        setTimeout(() => {
            copy.style.display = ''
            copied.style.display = 'none'
        }, 2000)
    }

    return {
        toClipboard
    }
})();

const onForm = (() => {
    const getUrl = str => {
        const clean = str.trim();
        if (clean.startsWith('http')) return clean
        return `https://${clean}`
    };

    const fillSignature = ({ id, value }) => {
        const el = document.getElementById(id);
        if (!el) return

        el.parentNode.style.display = value ? '' : 'none'

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
        else if ('telephone' === id || 'mobile-phone' === id) {
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
            action: value => el => change('borderRadius')(`${value}%`)(el)
        },
        'social-color': { attribute: 'social-color', action: change('backgroundColor') },
        'text-color': { attribute: 'font', action: change('color') },
        'theme-color': {
            attribute: 'theme-color',
            action: value => el => change('img' === el.localName ? 'backgroundColor' : 'color')(value)(el)
        }
    };

    const changeStyle = event => {
        const { type, value } = event.detail;
        const { attribute, action } = layoutChangeTypes[type];

        event.stopPropagation()
        document.querySelectorAll(`[${attribute}]`)
            .forEach(action(value))
    };
    const clean = event => {
        const { ids, lang } = event.detail;

        event.stopPropagation()
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return

            if ('profile-picture' === id) {
                el.src = './assets/empty-profile.png'
            }
            else {
                el.parentNode.style.display = 'none'
            }
        })

        message.changeLanguageTo(lang)
        message.hide()
    };
    const fill = event => {
        event.stopPropagation()
        fillSignature(event.detail)
    };

    return { changeStyle, clean, fill }
})();

const onPictureProfile = (() => {
    const profilePicture = document.getElementById('profile-picture');
    const resize = event => {
        const { detail: { percent } } = event;

        event.stopPropagation()
        profilePicture.height *= percent
        profilePicture.width *= percent
    };

    return { resize };
})();

document.addEventListener('form:clean-card', onForm.clean)
document.addEventListener('form:change-field', onForm.fill)
document.addEventListener('form:change-style', onForm.changeStyle)

document.addEventListener('form:profile-picture:resize', onPictureProfile.resize)

const onLoadForm = (async file => {
    try {
        const module = await import(file);
        const form = await module.signatureForm;

        window.setLanguage = form.setLanguage

    } catch (error) {
        console.error(error)
    }

    window.copyCardToClipboard = onCopyCard.toClipboard

    const card = document.getElementById('signature-card');
    card.style.display = 'block'

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none'

    const inputs = document.querySelectorAll('input[name="btn-language"]');
    inputs.forEach(input => {
        const language = input.lang;
        input.oninput = () => {
            setLanguage(language)
            message.changeLanguageTo(language)
        }
    })
})('./form.js');
