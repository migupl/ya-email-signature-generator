const [userData, dummyData, save] = await (async fakerLib => {
    const storageKey = 'yaEsgState';
    const save = (data, storage = sessionStorage) => storage.setItem(storageKey, JSON.stringify(data))

    const localData = localStorage.getItem(storageKey);
    const sessionDummy = sessionStorage.getItem(storageKey);

    let dummy;
    if (sessionDummy) {
        dummy = JSON.parse(sessionDummy)
    }
    else {
        const lib = await import(fakerLib);
        dummy = await lib.fakeData

        save(dummy)
    }

    let data = localData ? JSON.parse(localData) : undefined;
    return [data, dummy, save]
})('./faker.js');

const emitFieldEvent = (id, value) => {
    formEl.dispatchEvent(new CustomEvent('form:change-field', {
        bubbles: true,
        composed: true,
        detail: { id, value }
    }))
}

const fill = changed => {
    if (!changed) return

    const { component: { key }, value } = changed;
    emitFieldEvent(key, value)
}

const initilize = () => {
    form.everyComponent((component) => {
        const { component: { key, placeholder } } = component;
        const value = form.getComponent(key).getValue() || placeholder;
        if (value && typeof value === 'string') emitFieldEvent(key, value)
    });
}

const removeFormBorder = (removeBorderClass = 'border-0') => {
    const el = formEl.querySelector('.card');
    el.classList.add(removeBorderClass)
}

const formComponents = (fakeData => {
    const details = [
        {
            type: 'url',
            key: 'profile-picture',
            label: 'Profile Picture',
            placeholder: fakeData.profilePicture,
            errors: {
                invalid_url: 'Profile picture must be a valid url'
            },
            validateOn: 'blur',
            input: true,
        },
        {
            type: 'textfield',
            key: 'name',
            label: 'Name and surname',
            placeholder: fakeData.fullname,
            input: true
        },
        {
            type: 'textfield',
            key: 'job-title',
            label: 'Job Title',
            placeholder: fakeData.jobTitle,
            input: true
        },
        {
            type: 'textfield',
            key: 'company-name',
            label: 'Company Name',
            placeholder: fakeData.companyName,
            input: true
        },
        {
            type: 'textfield',
            key: 'telephone',
            label: 'Main Phone Number',
            placeholder: fakeData.phone,
            input: true
        },
        {
            type: 'textfield',
            key: 'mobile-phone',
            label: 'Mobile Phone Number',
            placeholder: fakeData.phone,
            input: true
        },
        {
            type: 'url',
            key: 'homepage',
            label: 'Website URL',
            placeholder: fakeData.website,
            input: true,
            errors: {
                invalid_url: 'Website URL must be a valid url'
            },
            validateOn: 'blur'
        },
        {
            type: 'email',
            key: 'email',
            label: 'Company Email',
            placeholder: fakeData.email,
            input: true,
            errors: {
                invalid_email: 'Company Email must be a valid email'
            },
            validateOn: 'blur'
        },
        {
            type: 'textfield',
            key: 'address',
            label: 'Address',
            placeholder: fakeData.address,
            input: true
        }
    ];

    const emitEventOnValidColor = eventType => ({ input }) => {
        const s = new Option().style;
        s.color = /\d/.test(input) ? `#${input}` : input;
        return s.color ? emitStyleEvent(eventType, s.color) : false
    }

    const emitStyleEvent = (type, value) => {
        formEl.dispatchEvent(new CustomEvent('form:change-style', {
            bubbles: true,
            composed: true,
            detail: { type, value }
        }))
        return true
    }

    const social = ['Facebook', 'Instagram', 'LinkedIn', 'Mastodon', 'TikTok', 'Twitter X', 'Youtube']
        .reduce((arr, socialName) => {
            const key = socialName.toLowerCase().replace(/\s/g, '-');
            arr.push({
                type: 'url',
                key: key,
                label: socialName,
                errors: {
                    invalid_url: 'Must be a valir url'
                },
                validateOn: 'blur',
                input: true,
            })
            return arr
        }, []);

    const stylize = [
        {
            type: 'select',
            key: 'select',
            label: 'Font',
            placeholder: 'Arial',
            data: {
                values: [
                    {
                        label: 'Andale Mono',
                        value: 'Andale Mono, AndaleMono, monospace'
                    },
                    {
                        label: 'Arial',
                        value: 'Arial, sans-serif'
                    },
                    {
                        label: 'Courier New',
                        value: 'Courier New, Courier, monospace'
                    },
                    {
                        label: 'Georgia',
                        value: 'Georgia, serif'
                    },
                    {
                        label: 'Monospace',
                        value: 'monospace'
                    },
                    {
                        label: 'Tahoma',
                        value: 'Tahoma, sans-serif'
                    },
                    {
                        label: 'Times New Roman',
                        value: 'Times New Roman, TimesNewRoman, Times, serif'
                    },
                    {
                        label: 'Trebuchet MS',
                        value: 'Trebuchet MS, sans-serif'
                    },
                    {
                        label: 'Verdana',
                        value: 'Verdana, sans-serif'
                    },
                ]
            },
            defaultValue: 'Arial, sans-serif',
            validate: {
                onlyAvailableItems: true,
                custom: ({ input }) => emitStyleEvent('font', input)
            },
            widget: 'html5',
            input: true
        },
        {
            type: 'fieldset',
            key: 'fieldSet',
            label: 'Field Set',
            components: [
                {
                    key: 'radio',
                    type: 'radio',
                    label: 'Font Size',
                    optionsLabelPosition: 'right',
                    defaultValue: 'medium',
                    inline: true,
                    values: [
                        {
                            label: 'Small',
                            value: 'small',
                            shortcut: ''
                        },
                        {
                            label: 'Medium',
                            value: 'medium',
                            shortcut: ''
                        },
                        {
                            label: 'Large',
                            value: 'large',
                            shortcut: ''
                        }
                    ],
                    validate: {
                        custom: ({ input }) => emitStyleEvent('font-size', input)
                    },
                    input: true
                }
            ],
            input: false,
        },
        {
            type: 'textfield',
            key: 'textColor',
            label: 'CSS Text Color',
            labelPosition: 'left-left',
            labelMargin: 0,
            labelWidth: 30,
            defaultValue: 'black',
            validateOn: 'change',
            validate: {
                custom: emitEventOnValidColor('text-color'),
                customMessage: 'The CSS color is invalid'
            },
            input: true
        },
        {
            type: 'textfield',
            key: 'themeColor',
            label: 'CSS Theme Color',
            labelPosition: 'left-left',
            labelMargin: 0,
            labelWidth: 30,
            defaultValue: 'SlateGrey',
            validateOn: 'change',
            validate: {
                custom: emitEventOnValidColor('theme-color'),
                customMessage: 'The CSS color is invalid'
            },
            input: true
        },
        {
            type: 'textfield',
            key: 'socialColor',
            label: 'CSS Social Color',
            labelPosition: 'left-left',
            labelMargin: 0,
            labelWidth: 30,
            defaultValue: 'DarkBlue',
            validateOn: 'change',
            validate: {
                custom: emitEventOnValidColor('social-color'),
                customMessage: 'The CSS color is invalid'
            },
            input: true
        },
        {
            type: 'number',
            key: 'number',
            label: 'Picture border radius',
            defaultValue: 15,
            requireDecimal: false,
            truncateMultipleSpaces: false,
            labelPosition: 'left-left',
            labelMargin: 0,
            labelWidth: 50,
            mask: false,
            validateOn: 'change',
            validate: {
                min: 0,
                max: 50,
                custom: ({ input }) => emitStyleEvent('profile-border-radius', input),
                customMessage: 'Number must be a value between 0 and 50'
            },
            inputFormat: 'plain',
            input: true
        }
    ];

    const layout = {
        components: [
            {
                label: 'Tabs',
                components: [
                    {
                        label: 'Signature Details',
                        key: 'tab1',
                        components: details
                    },
                    {
                        label: 'Social Nets',
                        key: 'tab3',
                        components: social
                    },
                    {
                        label: 'Stylize',
                        key: 'tab2',
                        components: stylize
                    }
                ],
                key: 'tabs',
                type: 'tabs',
                input: false,
                tableView: false
            }
        ]
    }

    const translations = {
        language: 'en',
        i18n: {
            sp: {
                'Address': 'Dirección',
                'Company Email': 'Correo electrónico',
                'Company Name': 'Nombre de la empresa',
                'CSS Social Color': 'Color CSS iconos sociales',
                'CSS Text Color': 'Color CSS del texto',
                'CSS Theme Color': 'Color CSS del tema',
                'Font': 'Tipo de letra',
                'Font Size': 'Tamaño de letra',
                'Job Title': 'Cargo',
                'Large': 'Grande',
                'Main Phone Number': 'Número de teléfono',
                'Medium': 'Medio',
                'Mobile Phone Number': 'Número de móvil',
                'Name and surname': 'Nombre y apellidos',
                'Must be a valir url': 'Debe ser una url válida',
                'Number must be a value between 0 and 50': 'El número debe ser un valor entre 0 y 50',
                'Picture border radius': 'Curbatura del radio de la imagen',
                'Profile Picture': 'Foto del perfil',
                'Signature Details': 'Detalles de la Firma',
                'Small': 'Pequeño',
                'Social Nets': 'Redes sociales',
                'Stylize': 'Estilo',
                'Website URL': 'Sitio Web',
                'Company Email Address must be a valid email': 'El correo electrónico es inválido',
                'Profile picture must be a valid url': 'La foto del perfil no es una URL válida',
                'The CSS color is invalid': 'El código de color CSS es inválido',
                'Website URL must be a valid url': 'La URL del Sitio Web es inválida'
            }
        }
    };

    return {
        layout, translations
    }
})(dummyData);

const formEl = document.getElementById('formio');
const form = await Formio.createForm(formEl, formComponents.layout, formComponents.translations)

form.ready.then(() => {
    initilize()
    removeFormBorder()
})

form.on('change', ({ data, changed }) => {
    save(data, localStorage)
    fill(changed)
})

if (userData) {
    form.submission = {
        data: userData
    };
}

const signatureForm = {
    setLanguage: lang => {
        form.language = lang
        removeFormBorder()
    }
}

export { signatureForm }
