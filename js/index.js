// const credentials = {
//     username: "mandaw",
//     password: "Capoute@21"
// };
// const credentials = {
//     username: "bsall",
//     password: "Coumba98@"
// };

var endpointLogin = "https://learn.zone01dakar.sn/api/auth/signin";

const credentials = {
    username: "",
    password: ""
};

const login = () => {
    // Encodez les informations d'identification en base64
    const base64Credentials = btoa(`${credentials.username}:${credentials.password}`);

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