class BannerElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'closed'}).innerHTML = `
        <style>
            .banner {
                display: flex;
                align-items: center;
                text-align: left;
                background-color: white;
                border-radius: 4px;
                border: 2px solid darkorange;
                word-break: break-word;
                padding: 16px;
            }
            
            svg {
                display: inline;
                vertical-align: baseline;
                flex-shrink: 0;
                flex-grow: 0;
                font-size: 18px;
                fill: white;
                font-weight: bold;
            }
            
            .banner-message {
                margin-left: 4px;
                flex-grow: 1;
            }
        </style>
        
        <div class="banner">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="darkorange"/>
                <text x="50%" y="51%" dominant-baseline="middle" text-anchor="middle">!</text>
            </svg>
            
            <span class="banner-message">
                <slot></slot>
            </span>
        </div>
        `;
    }
}

customElements.define('my-banner', BannerElement);
