document.addEventListener('DOMContentLoaded', function () {
    const criarsetorForm = document.getElementById('criarsetor');

    criarsetorForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const setor = document.getElementById('Setor').value;
        const descricao = document.getElementById('descricao').value;
        const role = document.getElementById('role').value;

        
        const formData = {
            setor: setor,
            descricao: descricao,
            role: role

        };

        fetch('http://localhost:3000/setor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                // Limpar o formulário após o sucesso
                criarsetorForm.reset();
            } else {
                alert(data.message || 'Erro ao criar Setor');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao criar Setor');
        });
    });
});