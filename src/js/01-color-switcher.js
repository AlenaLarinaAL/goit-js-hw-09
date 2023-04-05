const refs = {
    windowEl: document.querySelector('body'),
    startBtnEl: document.querySelector('button[data-start]'),
    stopBtnEl: document.querySelector('button[data-stop]'),
};

let changeBGColor = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const onStartBtnClick = () => {
    refs.startBtnEl.disabled = true;
    changeBGColor = setInterval(() => {
        const bgColor = getRandomHexColor();
        refs.windowEl.style.backgroundColor = bgColor;;
    }, 700);

};

const onStopbtnClick = () => {
    refs.startBtnEl.disabled = false;
    clearInterval(changeBGColor);

};

refs.startBtnEl.addEventListener('click', onStartBtnClick);
refs.stopBtnEl.addEventListener('click',onStopbtnClick);
