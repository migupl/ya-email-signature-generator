# Yet Another Email Signature Generator

> **Work In Progress**
> Copy automatically

You can use this project to generate a signature card to copy and paste as an email signature.

Normally the different mail providers allow you to modify the copied data in aspects such as font type, position, etc.

The user data is stored in the localStorage space for later use and the dummy data is downloaded once per session and stored in sessionStorage.

Each time the page is refreshed, the email signature is populated using both data. The _Clean the Card_ button removes all dummy data from the card and that's it. The Email Signature can now be copied.

You can always add new data at any time and the card will be refreshed with these automatically.

## Helpers

[The 17 DOs and DON’Ts of email signatures](https://exclaimer.com/email-signature-handbook/the-17-email-signature-dos-and-donts/)

[formio.js](https://github.com/formio/formio.js), a plain JavaScript form renderer of the JSON schema forms produced by Form.io and render those within your application using plain JavaScript ([form builder](https://formio.github.io/formio.js/app/builder.html)).

[Faker](https://fakerjs.dev/), a fake (but realistic) data generator.

**Web Safe Fonts**[^1] Arial, Courier New, Georgia, Monospace, Times New Roman, Trebuchet MS and Verdana are used in the Email Signature, in addition to Andale Mono and Tahoma fonts.

[A complete guide on shadow DOM and event propagation](https://pm.dartus.fr/blog/a-complete-guide-on-shadow-dom-and-event-propagation/)

## License

[MIT license](./LICENSE)


[^1]: The [Web Safe Fonts](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals#web_safe_fonts) are known to be available on nearly all instances of the most used operating systems (Windows, macOS, the most common Linux distributions, Android, and iOS).

---
<h4 align="center">
Made with&nbsp;
<img alt="A simple heart" src="./assets/heart.svg">
&nbsp;by me
</h4>
