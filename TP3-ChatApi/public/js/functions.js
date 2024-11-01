// ------------------------------- Captcha -------------------------------

// Función para generar un texto aleatorio
function generateRandomText(length)
{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++)
    {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

// Mostrar el CAPTCHA
const captchaText = generateRandomText(6);
document.getElementById('captcha').textContent = captchaText;

let isCaptchaValid = false; // Estado de validación del captcha
let isEmailValid = false; // Estado de validación del email

document.getElementById('verifyBtn').addEventListener('click', function()
{
    const userInput = document.getElementById('userInput').value;
    const messageElement = document.getElementById('message');

    if (userInput === captchaText)
    {
        messageElement.textContent = '¡Correcto! CAPTCHA resuelto.';
        messageElement.style.color = 'green';
        document.getElementById('captchaValid').value = 'true';
        isCaptchaValid = true; // Captcha es válido
    } else {
        messageElement.textContent = 'Incorrecto. Intenta de nuevo.';
        messageElement.style.color = 'red';
        document.getElementById('captchaValid').value = 'false';
        isCaptchaValid = false; // Captcha no es válido
    }

    updateLoginButtonState();
});

// ------------------------------- Mail -------------------------------

let emailCode = ''; // Variable para almacenar el código enviado

// Función para enviar un correo con un código numérico
function sendEmailCode(email)
{
    const code = generateNumericCode(6); // Generar un código numérico de 6 dígitos
    console.log(`Enviando código ${code} al correo ${email}`);
    emailCode = code; // Guardar el código enviado
    // Aquí deberías implementar la lógica para enviar el correo, o simularlo
    return code;
}

// Función para generar un código numérico aleatorio
function generateNumericCode(length)
{
    let result = '';
    for (let i = 0; i < length; i++)
    {
        result += Math.floor(Math.random() * 10); // Generar un dígito aleatorio del 0 al 9
    }
    return result;
}

// Captura el correo del usuario
document.getElementById('sendCodeBtn').addEventListener('click', function()
{
    event.preventDefault(); // Prevenir el envío del formulario
    const email = document.getElementById('emailInput').value;
    if (email)
    {
        sendEmailCode(email);
        document.getElementById('codeSentMessage').textContent = 'Se ha enviado un código a tu correo.';
        document.getElementById('codeSentMessage').style.color = 'green';

        // Habilitar el campo de entrada del código
        document.getElementById('codeInput').disabled = false;
        document.getElementById('verifyEmailBtn').disabled = false;
    } else {
        document.getElementById('codeSentMessage').textContent = 'Por favor, ingresa un correo válido.';
        document.getElementById('codeSentMessage').style.color = 'red';
    }
});

// Verificar el código introducido por el usuario
document.getElementById('verifyEmailBtn').addEventListener('click', function(event)
{
    event.preventDefault(); // Prevenir el envío del formulario
    const userInputCode = document.getElementById('codeInput').value;
    const messageElement = document.getElementById('message');

    if (userInputCode === emailCode)
    {
        messageElement.textContent = '¡Correcto! Código verificado.';
        messageElement.style.color = 'green';
        isEmailValid = true; // Email es válido
    } else {
        messageElement.textContent = 'Incorrecto. Intenta de nuevo.';
        messageElement.style.color = 'red';
        isEmailValid = false; // Email no es válido
    }

    updateLoginButtonState();
});

// Función para actualizar el estado del botón de inicio de sesión
function updateLoginButtonState()
{
    // const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = !(isCaptchaValid && isEmailValid); // Habilitar solo si ambos son válidos
    document.getElementById('loginBtn').addEventListener('click', function() {
        // Aquí va tu lógica de inicio de sesión
        if (isCaptchaValid && isEmailValid) {
            // Lógica para iniciar sesión
            console.log('Usuario logueado con éxito');
        } else {
            console.log('Fallo en la validación. No se puede loguear.');
        }
    });
}
