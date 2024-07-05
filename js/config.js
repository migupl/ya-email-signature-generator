
import { allFakers } from 'https://esm.sh/@faker-js/faker';
import { phone, phoneNumberMask } from './intl-tel-input.js'

export const formDefaults = ({ country_code, languages }) => {
    const preferedLanguage = languages.split(',')[0].replace(/-/, '_');
    const preferedCountry = country_code.toLocaleLowerCase();

    const faker = allFakers[preferedLanguage] || allFakers[preferedCountry] || allFakers['en'];

    const employee = (() => {
        const person = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        }
        const domain = faker.internet.domainName();

        const company = (() => {
            const street = faker.location.streetAddress();
            const city = faker.location.city();
            const state = faker.location.state({ abbreviated: true });
            const zipCode = (() => {
                let code;
                try {
                    code = faker.location.zipCode({ state: state });

                } catch (error) {
                    code = faker.location.zipCode();
                }

                return code
            })();

            const address = (() => {
                if ('es' === preferedCountry) return `${street}, ${zipCode}, ${city}`

                return `${street}, ${city}, ${state} ${zipCode}`
            })();

            return {
                address,
                name: faker.company.name(),
                website: `https://${domain}/`
            }
        })();

        const email = faker.internet.email({ firstName: person.firstName, lastName: person.lastName, provider: domain });
        const fullname = `${person.firstName} ${person.lastName}`;
        const job = faker.person.jobTitle();

        const photo = faker.image.urlLoremFlickr({ category: 'face', height: 250, width: 250 });

        return {
            company, email, fullname, job, photo
        }
    })();

    return {
        address: employee.company.address,
        companyName: employee.company.name,
        email: employee.email,
        fullname: employee.fullname,
        jobTitle: employee.job,
        phone: phone(),
        phoneNumberMask: phoneNumberMask(),
        profilePicture: employee.photo,
        website: employee.company.website
    }
};
