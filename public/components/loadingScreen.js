class LoadingScreen extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
            <div class="w-100 h-100 bg-black bg-opacity-50 d-flex justify-content-center align-items-center">
                <div class="w-25 position-absolute ratio ratio-1x1">
                    <div class="spinner-border m-auto" role="status" style="--bs-spinner-border-width:1rem">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            `;
	}
}

customElements.define("loading-screen", LoadingScreen);
