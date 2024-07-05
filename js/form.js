window.onload = () => {
    const telephoneCheck = document.createElement('input');
    telephoneCheck.type = 'tel'
    telephoneCheck.value = ''

    const telInputIntl = window.intlTelInput(telephoneCheck, {
        autoPlaceholder: "aggressive",
        initialCountry: "auto",
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"))
        },
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
    });
    window.intlTelInput = null

    telInputIntl.promise
        .then(() => {
            const getUrl = str => {
                const clean = str.trim();
                if (clean.startsWith('http')) return clean
                return `https://${clean}`
            };

            const defaults = {
                address: '81019 Cormier Mall, BQ 11474-0882',
                email: 'green.smith@acmt.com',
                companyName: 'A Company Making Things',
                fullname: 'Green Smith',
                jobTitle: 'Software Developer',
                phone: telephoneCheck.placeholder,
                phoneNumberMask: telephoneCheck.placeholder.replace(/\d/g, "9"),
                profilePicture: 'https://acmt.com/employees/f12645ff6a58e619d096afbbda394794.jpg',
                website: 'https://acmt.com/'
            };
            const components = [
                {
                    type: 'url',
                    key: 'profile-picture',
                    label: 'Profile Picture',
                    placeholder: defaults.profilePicture,
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
                    placeholder: defaults.fullname,
                    input: true
                },
                {
                    type: 'textfield',
                    key: 'job-title',
                    label: 'Job Title',
                    placeholder: defaults.jobTitle,
                    input: true
                },
                {
                    type: 'textfield',
                    key: 'company-name',
                    label: 'Company Name',
                    placeholder: defaults.companyName,
                    input: true
                },
                {
                    type: 'phoneNumber',
                    key: 'telephone',
                    label: 'Main Phone Number',
                    placeholder: defaults.phone,
                    input: true,
                    inputMask: defaults.phoneNumberMask,
                    errors: {
                        mask: 'Main Phone Number does not match the mask'
                    },
                    validateOn: 'blur'
                },
                {
                    type: 'phoneNumber',
                    key: 'mobile-phone',
                    label: 'Mobile Phone Number',
                    placeholder: defaults.phone,
                    input: true,
                    inputMask: defaults.phoneNumberMask,
                    errors: {
                        mask: 'Mobile Phone Number does not match the mask'
                    },
                    validateOn: 'blur'
                },
                {
                    type: 'url',
                    key: 'homepage',
                    label: 'Website URL',
                    placeholder: defaults.website,
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
                    placeholder: defaults.email,
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
                    placeholder: defaults.address,
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

            Formio.createForm(document.getElementById('formio'), { components }, translations)
                .then(form => {
                    form.on('change', ({ changed }) => {
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
                    });

                    window.setLanguage = lang => {
                        form.language = lang;
                    }

                    components.forEach(component => {
                        const { key, placeholder } = component;

                        if ('profile-picture' != key) {
                            const el = document.getElementById(key);
                            el.innerText = placeholder
                        }
                    })
                });
        })
}
