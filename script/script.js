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
        this.style.background = 'dodgerblue';
    }

    btnHandler(e) {
        e.preventDefault();
        const audio = new Audio('magic-spells.mp3');
        audio.autoplay = true;
        this.form.classList.add('hide');
        this.setAttribute('data-text', this.userText.value)
        this.setAttribute('data-color-text', this.userTextColor.value)
        this.setAttribute('data-img', this.userImgURL.value)
        this.btnClose.classList.remove('hide');
        this.addEventListener('mouseover', function () {
            this.par.classList.remove('hide');
        })
        this.addEventListener('mouseout', function () {
            this.par.classList.add('hide');
        })
    }
    btnCloseHandler(){
        this.setAttribute('data-text', '')
        this.setAttribute('data-color-text', '')
        this.setAttribute('data-img', '')
        this.removeEventListener('mouseover', function () {
            this.par.classList.remove('hide');
        })
        this.removeEventListener('mouseout', function () {
            this.par.classList.add('hide');
        })
        this.userText.value = '';
        this.userTextColor.value = '#000';
        this.userImgURL.value = '';
        this.btnClose.classList.add('hide');
        this.form.classList.remove('hide');
    }

    static get observedAttributes() {
        return ['data-text', 'data-color-text', 'data-img']
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName === 'data-text'){ this.par.innerText = newVal}
        if(attrName === 'data-color-text'){ this.par.style.color = newVal}
        if(attrName === 'data-img'){
            if(newVal){
                this.style.background = `url("${newVal}")`;
                this.style.backgroundSize = 'cover';
                this.style.backgroundPosition = 'center';
                this.style.backgroundRepeat = 'no-repeat';
            } else { this.style.background = 'dodgerblue';}
        }
    }
}

customElements.define('user-elem', UserElem);
