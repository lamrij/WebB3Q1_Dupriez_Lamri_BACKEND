document.getElementById('apiTesterForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const baseUrl = document.getElementById('urlInput').value.replace(/\/+$/, ''); // Supprime le slash final, s'il existe
    const endpoint = document.getElementById('endpointInput').value.replace(/^\/+/, ''); // Supprime le(s) slash(es) initial(aux) de l'endpoint
    const apiUrl = `${baseUrl}/${endpoint}`;

    // Récupérer la méthode sélectionnée
    const method = document.getElementById('methodSelect').value;

    // Récupérer les données du corps du formulaire
    const bodyInput = document.getElementById('bodyInput').value; // Supposons que vous avez un champ de texte pour le corps
    const bodyData = bodyInput ? JSON.parse(bodyInput) : {}; // On parse le JSON si le champ n'est pas vide

    // Mettre à jour le label avec l'URL de la requête
    document.getElementById('requestUrl').textContent = apiUrl + ' at ' + new Date().toISOString();

    try {
        const response = await fetch(apiUrl, {
            method: method, // Utiliser la méthode sélectionnée
            headers: {
                'Content-Type': 'application/json', // Spécifiez que vous envoyez du JSON
            },
            body: method !== 'GET' ? JSON.stringify(bodyData) : undefined, // Pas de corps pour GET
        });

        if (!response.ok) {
            throw new Error(`Erreur de la requête : ${response.status}`);
        }

        // Affiche la réponse brute sans modification
        const data = await response.text();

        // Détermine si la réponse est du JSON
        try {
            const jsonData = JSON.parse(data);
            document.getElementById('apiResponse').textContent = JSON.stringify(jsonData, null, 2);
            Prism.highlightElement(document.getElementById('apiResponse')); // Applique la coloration syntaxique
        } catch {
            // Si ce n'est pas du JSON, on affiche le texte brut
            document.getElementById('apiResponse').textContent = data;
        }

    } catch (error) {
        document.getElementById('apiResponse').textContent = `Erreur : ${error.message}`;
    }
});
