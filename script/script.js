class UserElem extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        this.formElem = `
            <form class="formUser">
            <p>
                <p>
                    Ваш текст:
                </p>
                <textarea name="userText" id="" cols="40" rows="8" class="userText"></textarea>
            </p>
            <p>
                <p>
                    Цвет текста:
                </p>
                <input type="color" class="userTextColor">
            </p>
            <p>
                <p>
                Фоновая картинка (вставлять ссылку):
                </p>
                <input type="text" class="userImgURL">
            </p>
        </form>
        `
        this.btn = document.createElement('button');
        this.par = document.createElement('p');
        this.btnClose = document.createElement('button');
        this.insertAdjacentHTML('afterbegin', this.formElem);

        this.form = document.querySelector('form');
        this.userText = document.querySelector('.userText');
        this.userTextColor = document.querySelector('.userTextColor');
        this.userImgURL = document.querySelector('.userImgURL');

        this.btn.innerHTML = '&#10022; Вжух';
        this.btnClose.innerHTML = 'repeat &#9851;'
        this.par.className = 'par';
        this.par.classList.add('hide');
        this.btnClose.className = 'btnClose';
        this.btnClose.classList.add('hide');

        this.form.appendChild(this.btn);
        this.appendChild(this.par)
        this.appendChild(this.btnClose)
        this.btn.addEventListener('click', this.btnHandler.bind(this))
        this.btnClose.addEventListener('click', this.btnCloseHandler.bind(this))
        let attrText = this.getAttribute('attrText');
        let attrColorText = this.getAttribute('attrColorText');
        let attrImg = this.getAttribute('attrImg');
        console.log('connectedCallback(attrText):', attrText);

        if(attrText || attrImg){
            this.par.innerText = attrText;
            this.par.style.color = attrColorText;
            this.style.background = `url(${attrImg}) no-repeat`;
            this.style.backgroundSize = 'cover';
            this.style.backgroundPosition = 'center';
        }else{
            this.par.innerText = '';
            this.style.background = 'dodgerblue';
        }
    }

    btnHandler(e) {
        e.preventDefault();
        const audio = new Audio('magic-spells.mp3');
        audio.autoplay = true;
        this.form.classList.add('hide');
        this.setAttribute('attrText', this.userText.value)
        this.setAttribute('attrColorText', this.userTextColor.value)
        this.setAttribute('attrImg', this.userImgURL.value)
        this.par.classList.remove('hide');
        this.btnClose.classList.remove('hide');

    }
    btnCloseHandler(){
        console.log('_close_')
    }

    disconnectedCallback() {
        console.log('Bye');
    }

    static get observedAttributes() {
        return ['attrText', 'attrColorText', 'attrImg']
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('attributesChangedCallback work');
        console.log(attrName);
        console.log(oldVal);
        console.log(newVal);
    }
}

customElements.define('user-elem', UserElem);
