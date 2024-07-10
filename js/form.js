import { fakeData } from './faker.js'

const details = [
    {
        type: 'url',
        key: 'profile-picture',
        label: 'Profile Picture',
        placeholder: fakeData.profilePicture,
        input: true,
        errors: {
            invalid_url: 'Profile picture must be a valid url'
        },
        validateOn: 'blur'
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
        type: 'phoneNumber',
        key: 'telephone',
        label: 'Main Phone Number',
        placeholder: fakeData.phone,
        input: true,
        inputMask: fakeData.phoneNumberMask,
        errors: {
            mask: 'Main Phone Number does not match the mask'
        },
        validateOn: 'blur'
    },
    {
        type: 'phoneNumber',
        key: 'mobile-phone',
        label: 'Mobile Phone Number',
        placeholder: fakeData.phone,
        input: true,
        inputMask: fakeData.phoneNumberMask,
        errors: {
            mask: 'Mobile Phone Number does not match the mask'
        },
        validateOn: 'blur'
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
            required: true,
            onlyAvailableItems: true,
            custom: ({ input }) => {
                formEl.dispatchEvent(new CustomEvent('form:font-change', {
                    bubbles: true,
                    composed: true,
                    detail: input
                }));
                return true
            }
        },
        widget: 'html5',
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
            'Company Email': 'Correo electrónico',
            'Company Name': 'Nombre de la empresa',
            'Font': 'Tipo de letra',
            'Job Title': 'Cargo',
            'Main Phone Number': 'Número de teléfono',
            'Mobile Phone Number': 'Número de móvil',
            'Name and surname': 'Nombre y apellidos',
            'Profile Picture': 'Foto del perfil',
            'Signature Details': 'Detalles de la Firma',
            'Stylize': 'Estilo',
            'Website URL': 'Sitio Web',
            'Company Email Address must be a valid email': 'El correo electrónico es inválido',
            'Main Phone Number does not match the mask': 'El número de teléfono es inválido',
            'Mobile Phone Number does not match the mask': 'El número de móvil es inválido',
            'Profile picture must be a valid url': 'La foto del perfil no es una URL válida',
            'Website URL must be a valid url': 'La URL del Sitio Web es inválida'
        }
    }
};

const fill = ({ changed }) => updateSignature => {
    const { component: { key }, value } = changed;
    updateSignature(key, value)
}

const initilize = updateSignature => details.forEach(component => {
    const { key, placeholder } = component;
    updateSignature(key, placeholder)
})

const removeFormBorder = (removeBorderClass = 'border-0') => {
    const el = formEl.querySelector('.card');
    el.classList.add(removeBorderClass)
}

const setLanguage = lang => form.language = lang;

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
