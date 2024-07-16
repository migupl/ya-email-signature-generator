const fakeData = await (async fakerLib => {
    const storageKey = 'yaEsgState';
    const sessionSavedData = sessionStorage.getItem(storageKey);

    if (sessionSavedData) {
        return JSON.parse(sessionSavedData)
    }

    const lib = await import(fakerLib);
    const data = await lib.fakeData;

    sessionStorage.setItem(storageKey, JSON.stringify(data))
    return data
})('./faker.js');

const fill = ({ changed }) => updateSignature => {
    const { component: { key }, value } = changed;
    updateSignature(key, value)
}

const initilize = updateSignature => {
    details.forEach(component => {
        const { key, placeholder } = component;
        updateSignature(key, placeholder)
    })

    stylize.forEach(component => {
        const applyStyle = component.validate?.custom || component.components[0].validate.custom;
        applyStyle({ input: component.defaultValue })
    })
}

const removeFormBorder = (removeBorderClass = 'border-0') => {
    const el = formEl.querySelector('.card');
    el.classList.add(removeBorderClass)
}

const setLanguage = lang => form.language = lang;

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
        input: true,
        validateOn: 'change',
        validate: {
            custom: fill
        }
    },
    {
        type: 'textfield',
        key: 'mobile-phone',
        label: 'Mobile Phone Number',
        placeholder: fakeData.phone,
        input: true,
        validateOn: 'change',
        validate: {
            custom: fill
        }
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
    return s.color ? emitEvent(eventType, s.color) : false
}

const emitEvent = (type, value) => {
    formEl.dispatchEvent(new CustomEvent('form:change', {
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
            custom: ({ input }) => emitEvent('font', input)
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
                    custom: ({ input }) => emitEvent('font-size', input)
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
            custom: ({ input }) => emitEvent('profile-border-radius', input),
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

const formEl = document.getElementById('formio');
let form = await Formio.createForm(formEl, layout, translations)

const signatureForm = {
    setLanguage,
    then: (signatureFill) => {
        form.on('change', data => {
            fill(data)(signatureFill)
        })

        initilize(signatureFill)
        removeFormBorder()
    }
}

export { signatureForm }
