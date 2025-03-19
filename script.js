const grandezaSelect = document.getElementById('grandeza');
const unidadeEntradaSelect = document.getElementById('unidadeEntrada');
const unidadeSaidaSelect = document.getElementById('unidadeSaida');
const valorEntrada = document.getElementById('valorEntrada');
const valorSaida = document.getElementById('valorSaida');

const unidades = {
    massa: ['quilograma (kg)', 'grama (g)', 'miligrama (mg)'],
    comprimento: ['metro (m)', 'centímetro (cm)', 'milímetro (mm)', 'quilômetro (km)'],
    capacidade: ['litro (L)', 'mililitro (mL)'],
    volume: ['metro cúbico (m³)', 'litro (L)', 'mililitro (mL)'],
    tempo: ['segundo (s)', 'minuto (min)', 'hora (h)', 'dia (d)']
};

const fatoresConversao = {
    massa: {
        'quilograma (kg)': 1,
        'grama (g)': 1000,
        'miligrama (mg)': 1000000
    },
    comprimento: {
        'metro (m)': 1,
        'centímetro (cm)': 100,
        'milímetro (mm)': 1000,
        'quilômetro (km)': 0.001
    },
    capacidade: {
        'litro (L)': 1,
        'mililitro (mL)': 1000
    },
    volume: {
        'metro cúbico (m³)': 1,
        'litro (L)': 1000,
        'mililitro (mL)': 1000000
    },
    tempo: {
        'segundo (s)': 1,
        'minuto (min)': 1 / 60,
        'hora (h)': 1 / 3600,
        'dia (d)': 1 / 86400
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
