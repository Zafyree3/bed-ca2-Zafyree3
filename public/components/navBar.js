class NavBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark">
                <div class="container">
                    <a class="navbar-brand" href="index.html"
                        ><img
                            src="https://zayzaf-3.sirv.com/images/logo.png"
                            class="logo img-fluid"
                            width="50" height="50"
                    />
                    Kawaii Kittens</a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <!-- me-auto: margin-right: auto -->
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="home.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="messages.html">Messaging</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="cats.html">Cats</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="shop.html">Shop</a>
                            </li>
                        </ul>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <!-- ms-auto: margin-left: auto -->
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a id="profileButton" href="/profile.html" class="nav-link"
                                    >Profile</a
                                >
                            </li>
                            <li class="nav-item">
                                <a id="logoutButton" href="#" class="nav-link">Logout</a>
                            </li>
                            <li class="nav-item">
                                <a id="loginButton" href="/login.html" class="nav-link">Login</a>
                            </li>
                            <li>
                                <div class="btn-nav">
                                    <a
                                        id="registerButton"
                                        class="btn text-bg-dark btn-small navbar-btn"
                                        href="/register.html"
                                        >Register!</a
                                    >
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            `;
	}
}

customElements.define("nav-bar", NavBar);
