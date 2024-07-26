const [userData, dummyData, save] = await (async fakerLib => {
    const size = 150;

    const storageKey = 'yaEsgState';
    const save = (data, storage = sessionStorage, percent = 1) => {
        if (!data.size) data = { ...data, size }
        data.size *= percent
        storage.setItem(storageKey, JSON.stringify(data))
    }

    const localData = localStorage.getItem(storageKey);
    const sessionDummy = sessionStorage.getItem(storageKey);

    let dummy;
    if (sessionDummy) {
        dummy = JSON.parse(sessionDummy)
    }
    else {
        let fake;
        try {
            const lib = await import(fakerLib);
            fake = await lib.fakeData

        } catch (error) {
            console.error(error)
            console.log('Using a harcoded dummy data')

            fake = {
                address: "Solar Patricia 22, 06812, Avilés",
                companyName: "Salgado y Fonseca",
                email: "Dolores.AriasGuzman@huge-freckle.info",
                fullname: "Dolores Arias Guzmán",
                jobTitle: "Ejecutivo de Creativo Distrito",
                phone: "996 102 379",
                profilePicture: "https://loremflickr.com/250/250/face?lock=3981216531349504",
                website: "https://huge-freckle.info/"
            }
        }

        dummy = { ...fake, size };
        save(dummy)
    }

    let data = localData ? JSON.parse(localData) : undefined;
    return [data, dummy, save]
})('./faker.js');

const emitEvent = (type, detail = {}) => formEl.dispatchEvent(new CustomEvent(type, {
    bubbles: true,
    composed: true,
    detail: detail
}))

const emitFieldEvent = (id, value) => emitEvent('form:change-field', { id, value })

const initilize = () => {
    form.everyComponent((component) => {
        const { component: { key, placeholder } } = component;
        const value = form.getComponent(key).getValue() || placeholder;
        if (value && typeof value === 'string') emitFieldEvent(key, value)
    });

    const percent = userData ? userData.size / dummyData.size : 1;
    emitEvent('form:profile-picture:resize', { percent })
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

    const emitStyleEvent = (type, value) => emitEvent('form:change-style', { type, value })
    const emitEventOnCleanCard = ({ data }) => {
        const empties = [];
        for (const [key, value] of Object.entries(data)) {
            if (!value) empties.push(key)
        }

        emitEvent('form:clean-card', { ids: empties, lang: form.language })
    }

    const resize = (percent => {
        const step = 0.05;

        const resize = percent => ({ data }) => {
            save(data, localStorage, percent)
            emitEvent('form:profile-picture:resize', { percent })
        };

        return {
            down: resize(1 - step),
            up: resize(1 + step)
        }
    })();

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
                    labelPosition: 'left-left',
                    labelMargin: 0,
                    labelWidth: 30,
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
            labelWidth: 40,
            defaultValue: 'black',
            validateOn: 'change',
            validate: {
                custom: emitEventOnValidColor('text-color'),
                customMessage: 'The CSS color is invalid'
            },
            tooltip: 'A color name or a hex value',
            input: true
        },
        {
            type: 'textfield',
            key: 'themeColor',
            label: 'CSS Theme Color',
            labelPosition: 'left-left',
            labelMargin: 0,
            labelWidth: 40,
            defaultValue: 'SlateGrey',
            validateOn: 'change',
            validate: {
                custom: emitEventOnValidColor('theme-color'),
                customMessage: 'The CSS color is invalid'
            },
            tooltip: 'A color name or a hex value',
            input: true
        },
        {
            type: 'textfield',
            key: 'socialColor',
            label: 'CSS Social Color',
            labelPosition: 'left-left',
            labelMargin: 0,
            labelWidth: 40,
            defaultValue: 'DarkBlue',
            validateOn: 'change',
            validate: {
                custom: emitEventOnValidColor('social-color'),
                customMessage: 'The CSS color is invalid'
            },
            tooltip: 'A color name or a hex value',
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
            tooltip: 'A value between 0 (square border) or 50 (rounded)',
            input: true
        },
        {
            type: 'fieldset',
            key: 'resizing',
            legend: 'Resize Picture Profile',
            tableview: false,
            components: [
                {
                    type: 'columns',
                    key: 'resizing',
                    label: 'columns',
                    columns: [
                        {
                            components: [
                                {
                                    type: 'button',
                                    key: 'smaller',
                                    label: 'Smaller Image',
                                    action: 'custom',
                                    custom: resize.down,
                                    showValidations: false,
                                    theme: 'secondary',
                                    size: 'sm'
                                }
                            ],
                            width: 4,
                            currentWidth: 4
                        },
                        {
                            components: [
                                {
                                    type: 'button',
                                    key: 'bigger',
                                    label: 'or bigger',
                                    action: 'custom',
                                    custom: resize.up,
                                    showValidations: false,
                                    theme: 'secondary',
                                    size: 'sm'
                                },
                            ],
                            width: 4,
                            currentWidth: 4
                        }
                    ],
                    input: false
                },
            ],
            input: false
        }
    ];

    const editable = (() => {
        const isNot = stylize.reduce((arr, styleComponent) => {
            const { key, components } = styleComponent

            arr.push(key)
            components?.forEach(c => arr.push(c.key))
            return arr
        }, []);

        const is = key => !isNot.includes(key)

        return {
            is
        }
    })();

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
            },
            {
                key: 'submit',
                type: 'button',
                label: 'Clean the Card',
                tooltip: 'Remove all empty data from the signature card to be copied',
                action: 'custom',
                custom: emitEventOnCleanCard,
                showValidations: false,
                disableOnInvalid: true,
                theme: 'info',
                size: 'sm',
                block: true,
                customClass: 'clean-button',
                input: true
            }
        ]
    }

    const translations = {
        language: 'en',
        i18n: {
            es: {
                'A color name or a hex value': 'Un nombre de color o valor hexadecimal',
                'A value between 0 (square border) or 50 (rounded)': 'Un valor entre 0 (borde cuadrado) ó 50 (redondeado)',
                'Address': 'Dirección',
                'Clean the Card': 'Limpiar la tarjeta',
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
                'or bigger': 'o más grande',
                'Picture border radius': 'Curbatura del radio de la imagen',
                'Profile Picture': 'Foto del perfil',
                'Remove all empty data from the signature card to be copied':
                    'Eliminar todos los datos vacíos de la tarjeta de firma para su copia',
                'Resize Picture Profile': 'Redimensionar la imagen de perfil',
                'Signature Details': 'Detalles de la Firma',
                'Small': 'Pequeño',
                'Smaller Image': 'Más pequeña',
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
        layout, translations, isEditable: editable.is
    }
})(dummyData);

const formEl = document.getElementById('formio');
const form = await Formio.createForm(formEl, formComponents.layout, formComponents.translations)

form.ready.then(() => {
    initilize()
})

form.on('change', ({ data, changed }) => {
    if (!changed) return

    save(data, localStorage)

    const { component: { key }, value } = changed;
    if (formComponents.isEditable(key)) emitFieldEvent(key, value)
})

if (userData) {
    form.submission = {
        data: userData
    };
}

const signatureForm = {
    setLanguage: lang => form.language = lang
}

export { signatureForm }
