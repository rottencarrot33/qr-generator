const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;


    if (url === '') {
        alert('Please enter a URL');
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;

                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
};

// Add https:// on the URL form
const url = document.getElementById('url');

url.addEventListener('blur', function () {
    const urlInput = url.value.trim();

    if (urlInput !== '' && !urlInput.startsWith('http')) {
        url.value = 'https://' + urlInput;
    }
})

const generateQRCode = (url) => {

    const qrcode = new QRCode('qrcode', {
        text: url,
        width: 300,
        height: 300,
    });
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-link');
    if (saveBtn) {
        saveBtn.remove();
    }
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

// Create button
const createSaveBtn = (saveUrl) => {
    const canvas = document.querySelector('#qrcode canvas');
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'btn-success btn my-4';
    link.href = dataUrl;
    link.style = 'width:300px'
    link.download = 'qrcode.png';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};


hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
