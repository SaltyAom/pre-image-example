import { LitElement, html, css } from "lit-element"
import preImage from "pre-image"

class MockupSlider extends LitElement {
	constructor() {
		super()

		if (window.localStorage.getItem("preImage") === null)
            window.localStorage.setItem("preImage", "1")
            
        if (window.localStorage.getItem("slide") === null)
            window.localStorage.setItem("slide", "0")
            
		this.slide = parseInt(window.localStorage.getItem("slide"), 10)
		this.enablePreImage = window.localStorage.getItem("preImage")

		this.image = [
			require("./mockup/Miku Expo.jpg"),
			require("./mockup/Ghost Rule.jpg"),
			require("./mockup//Tower Light Firework.jpg"),
			require(".//mockup/Rem but it's cool.ori.jpg"),
			require("./mockup/Yae Sakura illustration.jpg"),
			require("./mockup/Japanese Scarlet Sister.jpg")
		]

		if (window.localStorage.getItem("preImage") === "1")
            window.onload = () => {
                preImage(
                    require("./mockup/Miku Expo.jpg"),
                    require("./mockup/Ghost Rule.jpg"),
                    require("./mockup//Tower Light Firework.jpg"),
                    require(".//mockup/Rem but it's cool.ori.jpg"),
                    require("./mockup/Yae Sakura illustration.jpg"),
                    require("./mockup/Japanese Scarlet Sister.jpg")
				)
			}
	}

	static get properties() {
		return {
			slide: { type: Number },
			enablePreImage: { type: Boolean },
			loaded: { type: Boolean }
		}
	}

	static get styles() {
        return css`
            * { box-sizing: border-box; }

			.mi-round {
				font-weight: normal;
				font-style: normal;
				font-size: 24px;
				line-height: 1;
				letter-spacing: normal;
				text-transform: none;
				display: inline-block;
				word-wrap: normal;
				direction: ltr;
				text-rendering: optimizeLegibility;
				-webkit-font-smoothing: antialiased;
				font-family: "Material Icons Round";
			}

			#suku-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 960px;
                object-fit: cover;
                object-position: center;
				margin: auto;
				cursor: pointer;
			}

			#suku-slider {
				width: 840px;
				height: 472.5px;
				border-radius: 4px;
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.125),
					0 7px 25px rgba(0, 0, 0, 0.0875);
                transition: box-shadow .25s ease-out;
				cursor: default;
			}

            #suku-slider:hover,
            #suku-slider:active {
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25),
					0 20px 25px rgba(0, 0, 0, 0.175);
            }

			.suku-changer {
				appearance: none;
				-webkit-appearance: none;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				font-size: 28px;
				width: 48px;
				height: 48px;
                margin: 0;
				background-color: transparent;
				border: 0;
				font-size: 60px;
				cursor: pointer;
				outline: none;
			}

			#content {
				appearance: none;
				-webkit-appearance: none;
				border: 0;
				background-color: transparent;
				font-family: "Product Sans";
				width: 100%;
				margin: 20px 0 0 0;
				font-size: 21px;
				color: #007aff;
				text-align: center;
				text-decoration: none;
				cursor: pointer;
				outline: none;
			}

			#content:hover,
			#content:focus {
				text-decoration: underline;
			}

			#to-npm {
				font-size: 24px;
				text-decoration: none;
				margin-right: 10px;
				color:#007aff;
			}

            @media screen and (min-width: 568px) and (max-width: 960px){
                #suku-container {
                    width: 90%;
                    margin: auto;
                }

                #suku-slider {
                    width: calc(100% - 100px);
                    height: auto;
                }
            }

            @media screen and (max-width: 567.9px){
                #suku-container {
                    width: 100%;
                }

                #suku-slider {
                    width: calc(100% - 20px);
                    height: auto;
                    margin: auto;
                }

                .suku-changer {
                    position: absolute;
                    z-index: 10;
                    margin-top: 37.5vw;
                }

                .suku-changer.left {
                    left: 10px;
                }

                .suku-changer.right {
                    right: 10px;
                }
            }
		`
	}

	increaseSlide() {
		if (this.slide >= this.image.length - 1) this.slide = 0
        this.slide++
        window.localStorage.setItem("slide", `${this.slide}`)
	}

	decreaseSlide() {
		if (this.slide <= 0) this.slide = this.image.length - 1
		this.slide--
        window.localStorage.setItem("slide", `${this.slide}`)
	}

	togglePreImage() {
		if (window.localStorage.getItem("preImage") === "1") {
            window.localStorage.setItem("preImage", "0")
		} else {
			window.localStorage.setItem("preImage", "1")
		}
		window.location.replace(`${window.location.origin}?${new Date().getTime()}`)
	}

	render() {
		return html`
			<section id="suku-container">
				<button
					class="suku-changer mi-round left"
					@click="${() => this.decreaseSlide()}"
				>
					chevron_left
				</button>
				<img id="suku-slider" src="${this.image[this.slide]}" />
				<button
					class="suku-changer mi-round right"
					@click="${() => this.increaseSlide()}"
				>
					chevron_right
				</button>
			</section>
			<button id="content" @click="${() => this.togglePreImage()}">
				<a href="https://npmjs.org/package/pre-image" id="to-npm" class="mi-round">open_in_new</a>
				${window.localStorage.getItem("preImage") === "1"
					? "With PreImage"
					: "Without PreImage"}
			</button>
		`
	}
}

customElements.define("mockup-slider", MockupSlider)
