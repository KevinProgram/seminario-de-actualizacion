// ------------------------------- Captcha -------------------------------

// Function to generate random text
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

// Show the CAPTCHA
const captchaText = generateRandomText(6);
document.getElementById('captcha').textContent = captchaText;

let isCaptchaValid = false; // Captcha validation status
let isEmailValid = false; // Email validation status

document.getElementById('verifyBtn').addEventListener('click', function()
{
    const userInput = document.getElementById('userInput').value;
    const messageElement = document.getElementById('message');

    if (userInput === captchaText)
    {
        messageElement.textContent = '¡Correcto! CAPTCHA resuelto.';
        messageElement.style.color = 'green';
        document.getElementById('captchaValid').value = 'true';
        isCaptchaValid = true; // Captcha is valid
    } else {
        messageElement.textContent = 'Incorrecto. Intenta de nuevo.';
        messageElement.style.color = 'red';
        document.getElementById('captchaValid').value = 'false';
        isCaptchaValid = false; // Captcha is invalid
    }

    updateLoginButtonState();
});

// ------------------------------- Mail -------------------------------

let emailCode = ''; // Variable to store the sent code

// Function to send an email with a numerical code
function sendEmailCode(email)
{
    const code = generateNumericCode(6); // Generate a 6-digit numeric code
    console.log(`Enviando código ${code} al correo ${email}`);
    emailCode = code; // Save the submitted code
    
    return code;
}

// Function to generate a random numerical code
function generateNumericCode(length)
{
    let result = '';
    for (let i = 0; i < length; i++)
    {
        result += Math.floor(Math.random() * 10); // Generate a random digit from 0 to 9
    }
    return result;
}

// Capture the user's email
document.getElementById('sendCodeBtn').addEventListener('click', function()
{
    event.preventDefault(); // Prevent form submission - Prevenir el envío del formulario
    const email = document.getElementById('emailInput').value;
    if (email)
    {
        sendEmailCode(email);
        document.getElementById('codeSentMessage').textContent = 'Se ha enviado un código a tu correo.';
        document.getElementById('codeSentMessage').style.color = 'green';

        // Enable code input field - Habilitar el campo de entrada del código
        document.getElementById('codeInput').disabled = false;
        document.getElementById('verifyEmailBtn').disabled = false;
    } else {
        document.getElementById('codeSentMessage').textContent = 'Por favor, ingresa un correo válido.';
        document.getElementById('codeSentMessage').style.color = 'red';
    }
});

// Verify the code entered by the user
document.getElementById('verifyEmailBtn').addEventListener('click', function(event)
{
    event.preventDefault(); // Prevent form submission
    const userInputCode = document.getElementById('codeInput').value;
    const messageElement = document.getElementById('message');

    if (userInputCode === emailCode)
    {
        messageElement.textContent = '¡Correcto! Código verificado.';
        messageElement.style.color = 'green';
        isEmailValid = true; // Email is valid
    } else {
        messageElement.textContent = 'Incorrecto. Intenta de nuevo.';
        messageElement.style.color = 'red';
        isEmailValid = false; // Email is not valid
    }

    updateLoginButtonState();
});

// ------------------------------- Feature to update login button state - Función para actualizar el estado del botón de inicio de sesión -------------------------------

function updateLoginButtonState()
{
    loginBtn.disabled = !(isCaptchaValid && isEmailValid); // Enable only if both are valid
    document.getElementById('loginBtn').addEventListener('click', function() {
       
        if (isCaptchaValid && isEmailValid) {

            console.log('Usuario logueado con éxito');
        } else {
            console.log('Fallo en la validación. No se puede loguear.');
        }
    });
}
