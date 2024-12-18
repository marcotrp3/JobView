document.addEventListener('DOMContentLoaded', function () {
    const cadastrarusuarioForm = document.getElementById('cadastrarusuario');

    // Função para carregar os setores
    async function carregarSetores() {
        try {
            const response = await fetch('http://localhost:3000/api/setores');
            if (response.ok) {
                const setores = await response.json();
                const setorSelect = document.getElementById('codigo_setor');

                // Limpa o select antes de preencher
                setorSelect.innerHTML = '<option value="">Selecione um código de setor</option>';

                // Preenche o select com os códigos de setor
                setores.forEach(setor => {
                    const option = document.createElement('option');
                    option.value = setor.codigo_setor; // Define o código como valor
                    option.textContent = `${setor.codigo_setor} - ${setor.setor}`; // Exibe o código no dropdown
                    setorSelect.appendChild(option);
                });
            } else {
                console.error('Erro ao carregar setores');
            }
        } catch (error) {
            console.error('Erro ao carregar setores:', error);
        }
    }

    // Chama a função para carregar os setores ao carregar a página
    carregarSetores();

    // Evento de submissão do formulário
    cadastrarusuarioForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('Nome').value;
        const email = document.getElementById('Email').value;
        const telefone = document.getElementById('Telefone').value;
        const cpf = document.getElementById('cpf').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.querySelector('input[name="role"]:checked').value;
        const codigo_setor = document.getElementById('codigo_setor').value;

        if (!codigo_setor) {
            alert("Por favor, selecione um código de setor.");
            return;
        }

        const formData = {
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            username: username,
            password: password,
            role: role,
            codigo_setor: parseInt(codigo_setor) // Certifica-se de enviar um número
        };

        fetch('http://localhost:3000/usuarios', {
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
                cadastrarusuarioForm.reset();
            } else {
                alert(data.message || 'Erro ao criar usuário');
            }
        })
        .catch(error => {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário.');
        });
    });
});
