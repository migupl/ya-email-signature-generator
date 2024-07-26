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
    let copied = document.getElementById('card-copied-ok');

    const toClipboard = async () => {
        copy.style.display = 'none'
        copied.style.display = ''

        const card = document.getElementById('signature-card-content');

        const type = 'text/html';
        try {
            const blob = new Blob([card.innerHTML], { type });
            await navigator.clipboard.write([
                new ClipboardItem({
                    [type]: blob
                })
            ])

        } catch (error) {
            copied.style.display = 'none'

            copied = document.getElementById('card-copied-x');
            copied.style.display = ''

            console.error(error)
        }

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

    const defaultPictureProfile = '/assets/empty-profile.png';
    const clean = event => {
        const { ids, lang } = event.detail;

        event.stopPropagation()
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return

            if ('profile-picture' === id) {
                el.src = defaultPictureProfile
            }
            else {
                el.parentNode.style.display = 'none'
            }
        })

        message.changeLanguageTo(lang)
        message.hide()
    };

    const details = (() => {
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

        const fill = event => {
            event.stopPropagation()
            fillSignature(event.detail)
        };

        return { fill }
    })();

    const style = (() => {
        const set = attribute => value => el => el.style[attribute] = value;
        const changeActions = {
            font: { attribute: 'font', action: set('fontFamily') },
            'font-size': {
                attribute: 'font',
                action: value => el => {
                    set('fontSize')(value)(el)

                    const resize = { small: 11, medium: 14, large: 16};
                    const imgs = el.querySelectorAll('img');
                    imgs.forEach(imagen => {
                        const size = resize[value];
                        imagen.height = size
                        imagen.width = size
                    })
                }
            },
            'profile-border-radius': {
                attribute: 'profile-radius',
                action: value => el => set('borderRadius')(`${value}%`)(el)
            },
            'social-color': { attribute: 'social-color', action: set('backgroundColor') },
            'text-color': { attribute: 'font', action: set('color') },
            'theme-color': {
                attribute: 'theme-color',
                action: value => el => set('img' === el.localName ? 'backgroundColor' : 'color')(value)(el)
            }
        };

        const change = event => {
            const { type, value } = event.detail;
            const { attribute, action } = changeActions[type];

            event.stopPropagation()
            document.querySelectorAll(`[${attribute}]`)
                .forEach(action(value))
        };

        return {
            change
        }
    })();

    return {
        changeStyle: style.change,
        clean,
        fill: details.fill
    }
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
