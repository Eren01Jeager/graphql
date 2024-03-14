var endpointLogin = "https://learn.zone01dakar.sn/api/auth/signin";

const credentials = {
    username: "",
    password: ""
};

function encodeBase64(str) {
    // Utiliser TextEncoder pour obtenir un tableau d'octets
    var encoder = new TextEncoder();
    var byteArray = encoder.encode(str);
    // Convertir le tableau d'octets en chaîne base64
    var base64String = arrayBufferToBase64(byteArray);
    return base64String;
  }

const arrayBufferToBase64=(buffer)=>{
    var binary="";
    var bytes=new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary+=String.fromCharCode(bytes[i]);        
    } 
    return btoa(binary);
}

const login = () => {
    // Encodez les informations d'identification en base64
    const base64Credentials = encodeBase64(`${credentials.username}:${credentials.password}`);
    console.log(base64Credentials);
    // Construisez l'en-tête Authorization pour Basic authentication
    const headers = {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
    };

    // Effectuez une requête POST à l'endpoint /api/auth/signin
    fetch(endpointLogin, {
            method: 'POST',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            if (typeof(data) == "string") {
                localStorage.setItem("token", data);
                window.location.href = "Myprofil.html"
            } else {
                let error = document.getElementById("error")
                error.textContent="your credential is incorrect"
                error.style="color:red"
            }
            // Utilisez le jeton JWT pour accéder à l'API GraphQL
            // Faites vos requêtes GraphQL ici
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        });

}

if (document.getElementById("btn") != null) {
    document.getElementById("btn").addEventListener("click", (e) => {
        e.preventDefault()
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        credentials.username = username;
        credentials.password = password;
        login()
    })
}