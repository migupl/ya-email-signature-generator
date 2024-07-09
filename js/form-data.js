import { fakeData } from './faker.js'

const components = [
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

const translations = {
    language: 'en',
    i18n: {
        sp: {
            'Company Email': 'Correo electrónico',
            'Company Name': 'Nombre de la empresa',
            'Job Title': 'Cargo',
            'Main Phone Number': 'Número de teléfono',
            'Mobile Phone Number': 'Número de móvil',
            'Name and surname': 'Nombre y apellidos',
            'Profile Picture': 'Foto del perfil',
            'Website URL': 'Sitio Web',
            'Company Email Address must be a valid email': 'El correo electrónico es inválido',
            'Main Phone Number does not match the mask': 'El número de teléfono es inválido',
            'Mobile Phone Number does not match the mask': 'El número de móvil es inválido',
            'Profile picture must be a valid url': 'La foto del perfil no es una URL válida',
            'Website URL must be a valid url': 'La URL del Sitio Web es inválida'
        }
    }
};

const signatureForm = Formio.createForm(document.getElementById('formio'), { components }, translations)

export { signatureForm, components }