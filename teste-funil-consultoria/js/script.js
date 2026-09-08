const steps = {
    inicial: {
        title: 'Informações para contato',
        content: `
            <div class="form-group">
                <label for="nome">Nome <span style="color: #a855f7;">*</span></label>
                <input type="text" id="nome" placeholder="Seu nome completo" required>
            </div>
            <div class="form-group">
                <label for="whatsapp">WhatsApp <span style="color: #a855f7;">*</span></label>
                <input type="tel" id="whatsapp" placeholder="(21) 99999-9999" required>
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="seu@email.com">
            </div>
        `,
        action: function() {
            const nome = document.getElementById('nome').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!nome || !whatsapp) {
                alert('Por favor, preencha nome e WhatsApp');
                return;
            }

            leadInfo.nome = nome;
            leadInfo.whatsapp = whatsapp;
            leadInfo.email = email || 'Não informado';
            leadInfo.dataCaptura = new Date().toLocaleString('pt-BR');

            // SALVAR IMEDIATAMENTE
            salvarLeadParcial('iniciado');

            showStep('cnpj');
        }
    },

    cnpj: {
        title: 'Você possui CNPJ?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="sim">Sim, tenho CNPJ</div>
                <div class="form-option-card" data-value="nao">Não tenho CNPJ</div>
            </div>
        `,
        action: function(value) {
            formData.cnpj = value;
            if (value === 'sim') {
                showStep('regime');
            } else {
                showStep('abrirCnpj');
            }
        }
    },

    regime: {
        title: 'Qual é o regime da sua empresa?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="mei">MEI</div>
                <div class="form-option-card" data-value="simples">ME — Simples Nacional</div>
                <div class="form-option-card" data-value="presumido">ME — Lucro Presumido</div>
                <div class="form-option-card" data-value="real">ME — Lucro Real</div>
            </div>
        `,
        action: function(value) {
            formData.regime = value;
            showStep('nomeEmpresa');
        }
    },

    nomeEmpresa: {
        title: 'Nome da empresa registrada',
        content: `
            <div class="form-group">
                <input type="text" id="nomeEmpresa" placeholder="Digite o nome da empresa">
            </div>
        `,
        action: function() {
            const nomeEmpresa = document.getElementById('nomeEmpresa').value.trim();
            formData.nomeEmpresa = nomeEmpresa || 'Não informado';
            showStep('cnpjNumero');
        }
    },

    cnpjNumero: {
        title: 'CNPJ (opcional)',
        content: `
            <div class="form-group">
                <input type="text" id="cnpjNumero" placeholder="00.000.000/0000-00">
            </div>
        `,
        action: function() {
            const cnpjNumero = document.getElementById('cnpjNumero').value.trim();
            formData.cnpjNumero = cnpjNumero || 'Não informado';
            showStep('faturamento');
        }
    },

    faturamento: {
        title: 'Faturamento mensal aproximado',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="ate-10k">Até R$ 10 mil</div>
                <div class="form-option-card" data-value="10-50k">R$ 10 mil a R$ 50 mil</div>
                <div class="form-option-card" data-value="50-100k">R$ 50 mil a R$ 100 mil</div>
                <div class="form-option-card" data-value="100k+">R$ 100 mil ou mais</div>
            </div>
        `,
        action: function(value) {
            formData.faturamento = value;
            showStep('funcionarios');
        }
    },

    funcionarios: {
        title: 'Sua empresa possui funcionários?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="nao">Não</div>
                <div class="form-option-card" data-value="sim">Sim</div>
            </div>
        `,
        action: function(value) {
            formData.funcionarios = value;
            if (value === 'sim') {
                showStep('quantosFuncionarios');
            } else {
                finalizarFormulario();
            }
        }
    },

    quantosFuncionarios: {
        title: 'Quantos funcionários possui?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="0">0</div>
                <div class="form-option-card" data-value="1">1</div>
                <div class="form-option-card" data-value="2">2</div>
                <div class="form-option-card" data-value="3">3</div>
                <div class="form-option-card" data-value="4">4</div>
                <div class="form-option-card" data-value="+4">Mais de 4</div>
            </div>
            <div class="form-group">
                <label>Quantidade exata (opcional)</label>
                <input type="text" id="quantidadeExata" placeholder="Digite a quantidade">
            </div>
        `,
        action: function() {
            const quantidadeExata = document.getElementById('quantidadeExata').value.trim();
            formData.quantidadeExata = quantidadeExata || 'Não informado';
            finalizarFormulario();
        }
    },

    abrirCnpj: {
        title: 'Você possui negócio e gostaria de abrir CNPJ?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="sim">Sim</div>
                <div class="form-option-card" data-value="nao">Não</div>
            </div>
        `,
        action: function(value) {
            if (value === 'sim') {
                formData.servicoInteresse = 'abrir-empresa';
                finalizarFormulario();
            } else {
                showStep('possuiContador');
            }
        }
    },

    possuiContador: {
        title: 'Você possui contador atualmente?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="nao">Não</div>
                <div class="form-option-card" data-value="trocar">Sim, mas gostaria de trocar</div>
            </div>
        `,
        action: function(value) {
            if (value === 'trocar') {
                formData.servicoInteresse = 'trocar-contador';
            } else {
                formData.servicoInteresse = 'diagnostico';
            }
            showStep('quantosFuncionariosSemCnpj');
        }
    },

    quantosFuncionariosSemCnpj: {
        title: 'Quantos funcionários possui?',
        content: `
            <div class="form-options">
                <div class="form-option-card" data-value="0">0</div>
                <div class="form-option-card" data-value="1">1</div>
                <div class="form-option-card" data-value="2">2</div>
                <div class="form-option-card" data-value="3">3</div>
                <div class="form-option-card" data-value="4">4</div>
                <div class="form-option-card" data-value="+4">Mais de 4</div>
            </div>
            <div class="form-group">
                <label>Quantidade exata (opcional)</label>
                <input type="text" id="quantidadeExata" placeholder="Digite a quantidade">
            </div>
        `,
        action: function() {
            const quantidadeExata = document.getElementById('quantidadeExata').value.trim();
            formData.quantidadeExata = quantidadeExata || 'Não informado';
            finalizarFormulario();
        }
    }
};

let formData = {};
let leadInfo = {};

const ctaButton = document.getElementById('ctaButton');
const formModal = document.getElementById('formModal');
const modalClose = document.getElementById('modalClose');
const formContainer = document.getElementById('formContainer');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        openForm();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        closeForm();
    });
}

if (formModal) {
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            closeForm();
        }
    });
}

function openForm() {
    formData = {};
    leadInfo = {};
    formModal.style.display = 'flex';
    showStep('inicial');
}

function closeForm() {
    formModal.style.display = 'none';
    formContainer.innerHTML = '';
}

function showStep(stepName) {
    const step = steps[stepName];
    if (!step) return;

    formContainer.innerHTML = `
        <h2 style="font-size: 20px; margin-bottom: 24px;">${step.title}</h2>
        <div id="formContent">${step.content}</div>
        <button class="btn-primary" id="nextBtn">Próximo</button>
        ${stepName !== 'inicial' ? '<button class="btn-back" id="backBtn">Voltar</button>' : ''}
    `;

    document.querySelectorAll('.form-option-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.form-option-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            document.getElementById('nextBtn').dataset.selected = card.getAttribute('data-value');
        });
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const selected = document.getElementById('nextBtn').dataset.selected;
        if (step.content.includes('form-option-card') && !selected) {
            alert('Por favor, selecione uma opção');
            return;
        }
        step.action(selected);
    });

    if (document.getElementById('backBtn')) {
        document.getElementById('backBtn').addEventListener('click', () => {
            voltarPasso(stepName);
        });
    }
}

function voltarPasso(stepAtual) {
    const passos = {
        'regime': 'cnpj',
        'nomeEmpresa': 'regime',
        'cnpjNumero': 'nomeEmpresa',
        'faturamento': 'cnpjNumero',
        'funcionarios': 'faturamento',
        'quantosFuncionarios': 'funcionarios',
        'abrirCnpj': 'cnpj',
        'possuiContador': 'abrirCnpj',
        'quantosFuncionariosSemCnpj': 'possuiContador'
    };

    if (passos[stepAtual]) {
        showStep(passos[stepAtual]);
    }
}

function salvarLeadParcial(status) {
    const lead = {
        id: Date.now(),
        nome: leadInfo.nome,
        whatsapp: leadInfo.whatsapp,
        email: leadInfo.email || 'Não informado',
        servicoInteresse: formData.servicoInteresse || 'em-progresso',
        dataCaptura: leadInfo.dataCaptura,
        qualificado: false,
        status: status,
        detalhes: formData
    };

    let leads = JSON.parse(localStorage.getItem('leads')) || [];
    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));

    console.log('✅ Lead parcial salvo:', lead);
}

function finalizarFormulario() {
    const servicoInteresse = formData.servicoInteresse || 'diagnostico';
    let isQualificado = true;

    if (servicoInteresse === 'abrir-empresa' && formData.cnpj === 'sim') {
        isQualificado = false;
    }

    if (isQualificado) {
        mostrarSucessoQualificado();
    } else {
        mostrarMensagemNaoQualificado();
    }

    salvarLeadFinal(servicoInteresse, isQualificado);
}

function salvarLeadFinal(servicoInteresse, isQualificado) {
    const lead = {
        id: Date.now(),
        nome: leadInfo.nome,
        whatsapp: leadInfo.whatsapp,
        email: leadInfo.email,
        servicoInteresse: servicoInteresse,
        dataCaptura: leadInfo.dataCaptura,
        qualificado: isQualificado,
        status: 'completo',
        detalhes: formData
    };

    let leads = JSON.parse(localStorage.getItem('leads')) || [];
    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));

    console.log('✅ Lead final salvo:', lead);
}

function mostrarSucessoQualificado() {
    formContainer.innerHTML = `
        <div class="success-message">
            <div class="success-icon">✅</div>
            <h2>Perfeito!</h2>
            <p>Sua avaliação foi recebida com sucesso!</p>
            <p style="margin-top: 16px; font-size: 13px; color: #999;">
                Um de nossos especialistas entrará em contato em breve para discutir as melhores estratégias 
                para seu negócio crescer e gerar mais lucro. Prepare-se para uma transformação!
            </p>
            <p style="margin-top: 24px; font-weight: 600;">${leadInfo.nome}, estamos ansiosos para trabalhar com você! 🚀</p>
            <button class="btn-primary" onclick="closeForm();" style="margin-top: 24px;">
                Fechar
            </button>
        </div>
    `;
}

function mostrarMensagemNaoQualificado() {
    formContainer.innerHTML = `
        <div class="success-message">
            <div class="success-icon">🙏</div>
            <h2>Obrigado por confiar na nossa equipe!</h2>
            <p>
                No momento, alguns dos serviços que você procura podem não estar dentro do nosso 
                atendimento atual.
            </p>
            <p style="margin-top: 16px;">
                Mesmo assim, gostaríamos de manter seu contato. <strong>Nossa equipe poderá entrar 
                em contato futuramente caso tenhamos uma solução adequada para o seu perfil.</strong>
            </p>
            <p style="margin-top: 24px; font-size: 13px; color: #999;">WhatsApp: ${leadInfo.whatsapp}</p>
            <button class="btn-primary" onclick="closeForm();" style="margin-top: 24px;">Entendi, obrigado!</button>
        </div>
    `;
}

console.log('✅ Sistema carregado!');
