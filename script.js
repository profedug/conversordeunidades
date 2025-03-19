const grandezaSelect = document.getElementById('grandeza');
const unidadeEntradaSelect = document.getElementById('unidadeEntrada');
const unidadeSaidaSelect = document.getElementById('unidadeSaida');
const valorEntrada = document.getElementById('valorEntrada');
const valorSaida = document.getElementById('valorSaida');

const unidades = {
    massa: ['quilograma', 'grama', 'miligrama', 'libra', 'onça'],
    comprimento: ['metro', 'centímetro', 'milímetro', 'quilômetro', 'milha', 'jarda', 'pé'],
    capacidade: ['litro', 'mililitro', 'galão', 'xícara'],
    volume: ['metro cúbico', 'litro', 'mililitro', 'galão'],
    tempo: ['segundo', 'minuto', 'hora', 'dia']
};

const fatoresConversao = {
    massa: {
        quilograma: 1,
        grama: 1000,
        miligrama: 1000000,
        libra: 2.20462,
        onça: 35.274
    },
    comprimento: {
        metro: 1,
        centímetro: 100,
        milímetro: 1000,
        quilômetro: 0.001,
        milha: 0.000621371,
        jarda: 1.09361,
        pé: 3.28084
    },
    capacidade: {
        litro: 1,
        mililitro: 1000,
        galão: 0.264172,
        xícara: 4.22675
    },
    volume: {
        'metro cúbico': 1,
        litro: 1000,
        mililitro: 1000000,
        galão: 264.172
    },
    tempo: {
        segundo: 1,
        minuto: 1 / 60,
        hora: 1 / 3600,
        dia: 1 / 86400
    }
};

function atualizarUnidades() {
    const grandeza = grandezaSelect.value;
    const unidadesGrandeza = unidades[grandeza];

    unidadeEntradaSelect.innerHTML = unidadesGrandeza.map(unidade => `<option value="${unidade}">${unidade}</option>`).join('');
    unidadeSaidaSelect.innerHTML = unidadesGrandeza.map(unidade => `<option value="${unidade}">${unidade}</option>`).join('');
}

function converter() {
    const grandeza = grandezaSelect.value;
    const unidadeEntrada = unidadeEntradaSelect.value;
    const unidadeSaida = unidadeSaidaSelect.value;
    const valor = parseFloat(valorEntrada.value);

    if (isNaN(valor)) {
        valorSaida.value = '';
        return;
    }

    const fatorEntrada = fatoresConversao[grandeza][unidadeEntrada];
    const fatorSaida = fatoresConversao[grandeza][unidadeSaida];
    const valorConvertido = (valor / fatorEntrada) * fatorSaida;

    // Remove zeros não significativos
    valorSaida.value = parseFloat(valorConvertido.toFixed(6));
}

grandezaSelect.addEventListener('change', () => {
    atualizarUnidades();
    converter();
});

unidadeEntradaSelect.addEventListener('change', converter);
unidadeSaidaSelect.addEventListener('change', converter);
valorEntrada.addEventListener('input', converter);

// Inicializar unidades ao carregar a página
atualizarUnidades();
