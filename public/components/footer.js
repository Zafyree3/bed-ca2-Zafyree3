// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

class Footer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
            <footer class="mt-auto text-white-50 text-center">
                <p>Created by Irman Zafyree. This is for
                Academical purposes in the Backend Development Module.
                This is made with the hopes of scoring an A.
                The images and names are trademarks of ME, IRMAN ZAFYREE.
                Free free to use it, I don't mind.
                </p>
            </footer>
            `;
	}
}

customElements.define("footer-component", Footer);
