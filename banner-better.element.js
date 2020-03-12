class BannerElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'closed'}).innerHTML = `
        <style>
            :host {
                display: flex;
                align-items: center;
                text-align: left;
                background-color: white;
                border-radius: 4px;
                border: 2px solid;
                word-break: break-word;
                padding: 16px;
            }
            
            :host(.my-component-warning) svg {
                fill: darkorange;
            }
            
            :host(.my-component-warning) {
                border-color: darkorange;
            }
            
            :host(.my-component-error) svg {
                fill: red;
            }
            
            :host(.my-component-error) {
                border-color: red;
            }
            
            :host(.my-component-info) svg {
                fill: dodgerblue;
            }
            
            :host(.my-component-info) {
                border-color: dodgerblue;
            }
            
            svg {
                display: inline;
                vertical-align: baseline;
                flex-shrink: 0;
                flex-grow: 0;
                font-size: 18px;
                font-weight: bold;
            }
            
            .banner-message {
                margin-left: 4px;
                flex-grow: 1;
            }
        </style>
        
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"/>
            <text x="50%" y="51%" dominant-baseline="middle" text-anchor="middle" fill="white">!</text>
        </svg>
        
        <span class="banner-message">
            <slot></slot>
        </span>
        `;
    }
}

customElements.define('my-banner', BannerElement);
