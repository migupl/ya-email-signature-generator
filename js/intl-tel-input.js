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

const phone = () => telephoneCheck.placeholder;
const phoneNumberMask = () => telephoneCheck.placeholder.replace(/\d/g, "9");

export { telInputIntl, phone, phoneNumberMask }