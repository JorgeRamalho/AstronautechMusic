/**
 * Viagem Sistema Solar — Dados dos corpos celestes, narrador e actividades
 */
const SOLAR_JOURNEY = {
  stops: [
    {
      id: 'sol',
      name: 'Sol',
      type: 'Estrela',
      emoji: '☀️',
      color: '#ffd700',
      orbitIndex: 0,
      distance: '0 AU',
      facts: {
        'Tipo': 'Estrela anã amarela (G2V)',
        'Temperatura superficial': '~5.500 °C',
        'Diâmetro': '~1,4 milhões km',
        'Idade': '~4,6 mil milhões de anos',
        'Composição': '73% hidrogénio, 25% hélio',
        'Rotação': '~27 dias (equador)',
        'Curiosidade': 'O Sol contém 99,86% de toda a massa do Sistema Solar.'
      },
      description: 'O Sol é a nossa estrela — uma gigante esfera de plasma que ilumina e aquece todos os planetas. No seu núcleo, o hidrogénio funde-se em hélio, libertando energia que viaja até nós como luz e calor.',
      narrator: {
        travel: 'Atenção, tripulação! Aproximamo-nos do centro do Sistema Solar. O Sol é uma fornalha nuclear a 150 milhões de quilómetros — usem os filtros de observação!',
        arrival: 'Chegámos à estrela que torna a vida na Terra possível. Sem o Sol, não haveria luz, calor, nem planetas como os conhecemos.',
        datasheet: 'Consulta a ficha de dados: tipo estelar, temperatura, composição. Memoriza estes números — vão ser úteis no desafio.',
        activity: 'Desafio activado! Responde sobre fusão nuclear e as propriedades do Sol. Precisas de acertar o suficiente para desbloquear a próxima parada.',
        complete: 'Excelente trabalho! Dominaste os segredos da nossa estrela. Próxima parada: a Lua, companheira fiel da Terra.'
      },
      activity: {
        type: 'quiz',
        title: 'Desafio Solar',
        instruction: 'Responde correctamente a 3 de 4 perguntas sobre o Sol.',
        minCorrect: 3,
        points: 100,
        questions: [
          {
            q: 'O que acontece no núcleo do Sol?',
            options: ['Gelo congela-se', 'Hidrogénio funde-se em hélio', 'Rochas derretem', 'O oxigénio evapora'],
            correct: 1
          },
          {
            q: 'Qual é a temperatura superficial aproximada do Sol?',
            options: ['500 °C', '5.500 °C', '55.000 °C', '550 °C'],
            correct: 1
          },
          {
            q: 'Que percentagem da massa do Sistema Solar o Sol possui?',
            options: ['50%', '75%', '99,86%', '10%'],
            correct: 2
          },
          {
            q: 'De que cor classificamos o Sol?',
            options: ['Anã vermelha', 'Anã azul', 'Anã amarela', 'Anã branca'],
            correct: 2
          }
        ]
      }
    },
    {
      id: 'lua',
      name: 'Lua',
      type: 'Satélite natural',
      emoji: '🌙',
      color: '#c0c0c0',
      orbitIndex: 1,
      distance: '384.400 km da Terra',
      facts: {
        'Diâmetro': '3.474 km',
        'Distância média': '384.400 km',
        'Período orbital': '27,3 dias',
        'Gravidade': '1/6 da Terra',
        'Atmosfera': 'Praticamente inexistente',
        'Formação': 'Impacto gigante há ~4,5 mil milhões de anos',
        'Curiosidade': 'A Lua afasta-se da Terra ~3,8 cm por ano.'
      },
      description: 'A Lua é o satélite natural da Terra. Controla as marés, estabiliza o eixo terrestre e inspirou mitologias em todas as culturas. A sua superfície está coberta de crateras e mares de lava solidificada.',
      narrator: {
        travel: 'Ajustando rota para a órbita lunar. A Lua é o nosso primeiro destino depois do Sol — um mundo silencioso e cheio de crateras.',
        arrival: 'Estamos em órbita lunar! Desde aqui vês a Terra como uma pequena esfera azul — a perspectiva dos astronautas do Apollo.',
        datasheet: 'Estuda a ficha: gravidade reduzida, ausência de atmosfera, formação por impacto. A Lua guarda a história do Sistema Solar.',
        activity: 'Hora do desafio! Ordena as fases da Lua na sequência correcta. A ordem importa — como na órbita real.',
        complete: 'Fases dominadas! Compreendes o ciclo lunar. Rumo ao planeta mais próximo do Sol: Mercúrio.'
      },
      activity: {
        type: 'order',
        title: 'Fases da Lua',
        instruction: 'Arrasta as fases para a ordem correcta: Nova → Crescente → Quarto → Gibosa → Cheia.',
        minCorrect: 5,
        points: 100,
        items: [
          { id: 'nova', label: '🌑 Nova', order: 0 },
          { id: 'crescente', label: '🌒 Crescente', order: 1 },
          { id: 'quarto', label: '🌓 Quarto Crescente', order: 2 },
          { id: 'gibosa', label: '🌔 Gibosa Crescente', order: 3 },
          { id: 'cheia', label: '🌕 Cheia', order: 4 }
        ]
      }
    },
    {
      id: 'mercurio',
      name: 'Mercúrio',
      type: 'Planeta rochoso',
      emoji: '☿️',
      color: '#8c8c8c',
      orbitIndex: 2,
      distance: '0,39 AU',
      facts: {
        'Diâmetro': '4.879 km',
        'Dia solar': '176 dias terrestres',
        'Temperatura': 'De -180 °C a 430 °C',
        'Atmosfera': 'Quase inexistente',
        'Anos': '88 dias terrestres',
        'Superfície': 'Crateras como a Lua',
        'Curiosidade': 'Mercúrio não tem luas nem anéis.'
      },
      description: 'Mercúrio é o planeta mais pequeno e mais próximo do Sol. Sem atmosfera para reter calor, sofre variações extremas de temperatura entre o dia e a noite.',
      narrator: {
        travel: 'Acelerando em direcção a Mercúrio. Cuidado — estamos a entrar num mundo de extremos térmicos!',
        arrival: 'Mercúrio à vista! Este planeta rochoso gira três vezes a cada duas órbitas — um dia solar dura quase metade do ano mercuriano.',
        datasheet: 'Analisa os dados: temperaturas extremas, ausência de atmosfera, órbita rápida. Mercúrio é um deserto cósmico.',
        activity: 'Desafio relâmpago! Diz se cada afirmação sobre Mercúrio é verdadeira ou falsa. Rápido e preciso!',
        complete: 'Impressionante! Mercúrio não te enganou. Próximo: Vénus, o planeta mais quente do Sistema Solar.'
      },
      activity: {
        type: 'truefalse',
        title: 'Verdadeiro ou Falso — Mercúrio',
        instruction: 'Acerta 4 de 5 afirmações sobre Mercúrio.',
        minCorrect: 4,
        points: 100,
        statements: [
          { text: 'Mercúrio é o planeta mais próximo do Sol.', correct: true },
          { text: 'Mercúrio tem uma atmosfera densa de dióxido de carbono.', correct: false },
          { text: 'Um dia solar em Mercúrio dura cerca de 176 dias terrestres.', correct: true },
          { text: 'Mercúrio possui mais de 10 luas.', correct: false },
          { text: 'As temperaturas nocturnas em Mercúrio podem descer abaixo de -100 °C.', correct: true }
        ]
      }
    },
    {
      id: 'venus',
      name: 'Vénus',
      type: 'Planeta rochoso',
      emoji: '♀️',
      color: '#e8cda0',
      orbitIndex: 3,
      distance: '0,72 AU',
      facts: {
        'Diâmetro': '12.104 km',
        'Temperatura superficial': '~465 °C',
        'Atmosfera': '96% CO₂, nuvens de ácido sulfúrico',
        'Pressão': '92× a da Terra',
        'Rotação': 'Retrógrada (~243 dias)',
        'Anos': '225 dias terrestres',
        'Curiosidade': 'Vénus brilha intensamente — é visível ao amanhecer e ao anoitecer.'
      },
      description: 'Vénus é muitas vezes chamado planeta irmão da Terra pelo tamanho similar, mas o efeito de estufa descontrolado transformou-o num inferno de nuvens ácidas e calor extremo.',
      narrator: {
        travel: 'Rota calculada para Vénus. Atenção: a superfície é mais quente que a de Mercúrio apesar de estar mais longe do Sol!',
        arrival: 'Vénus envolto em nuvens espessas. Abaixo delas, rochas fundidas e uma pressão esmagadora aguardam quem ousa aterrar.',
        datasheet: 'Estuda o efeito de estufa extremo, a rotação retrógrada e a composição da atmosfera. Vénus é um aviso cósmico.',
        activity: 'Desafio atmosférico! Escolhe a resposta correcta sobre a atmosfera infernal de Vénus.',
        complete: 'Atmosfera decifrada! Vénus guardou os seus segredos. A seguir: a nossa casa — a Terra.'
      },
      activity: {
        type: 'quiz',
        title: 'Atmosfera de Vénus',
        instruction: 'Acerta 3 de 4 perguntas sobre Vénus.',
        minCorrect: 3,
        points: 100,
        questions: [
          {
            q: 'Qual é o principal gás da atmosfera de Vénus?',
            options: ['Oxigénio', 'Nitrogénio', 'Dióxido de carbono', 'Hidrogénio'],
            correct: 2
          },
          {
            q: 'Por que Vénus é mais quente que Mercúrio?',
            options: ['Está mais perto do Sol', 'Efeito de estufa extremo', 'Tem vulcões activos', 'Rotação muito rápida'],
            correct: 1
          },
          {
            q: 'Como roda Vénus em relação à maioria dos planetas?',
            options: ['No mesmo sentido', 'Rotação retrógrada', 'Não roda', 'Rotação vertical'],
            correct: 1
          },
          {
            q: 'De que são feitas as nuvens de Vénus?',
            options: ['Água', 'Metano', 'Ácido sulfúrico', 'Amónia'],
            correct: 2
          }
        ]
      }
    },
    {
      id: 'terra',
      name: 'Terra',
      type: 'Planeta rochoso',
      emoji: '🌍',
      color: '#4a90d9',
      orbitIndex: 4,
      distance: '1 AU',
      facts: {
        'Diâmetro': '12.742 km',
        'Água líquida': '71% da superfície',
        'Atmosfera': '78% N₂, 21% O₂',
        'Luas': '1 (a Lua)',
        'Temperatura média': '~15 °C',
        'Campo magnético': 'Protege da radiação solar',
        'Curiosidade': 'A Terra é o único planeta conhecido com vida.'
      },
      description: 'A Terra é o nosso planeta — um oásis azul na vastidão do espaço. O ar respirável, a água líquida e o campo magnético criaram condições únicas para a vida.',
      narrator: {
        travel: 'Regressando à órbita terrestre. Este planeta azul é a nossa origem e o nosso lar no cosmos.',
        arrival: 'Terra em vista! Continentes, oceanos e nuvens — um mosaico vivo visto do espaço.',
        datasheet: 'Revisa os dados da Terra: água, oxigénio, campo magnético. Protege o que torna este planeta especial.',
        activity: 'Desafio ecológico! Associa cada característica ao factor que torna a Terra habitável.',
        complete: 'Planeta azul compreendido! Agora rumamos ao planeta vermelho: Marte.'
      },
      activity: {
        type: 'match',
        title: 'Terra Habitável',
        instruction: 'Associa cada elemento à sua função. Acerta todas as 4 associações.',
        minCorrect: 4,
        points: 100,
        pairs: [
          { left: 'Oxigénio na atmosfera', right: 'Permite respiração' },
          { left: 'Campo magnético', right: 'Protege da radiação solar' },
          { left: 'Água líquida', right: 'Base para a vida conhecida' },
          { left: 'Distância ao Sol', right: 'Zona habitável ideal' }
        ]
      }
    },
    {
      id: 'marte',
      name: 'Marte',
      type: 'Planeta rochoso',
      emoji: '🔴',
      color: '#c1440e',
      orbitIndex: 5,
      distance: '1,52 AU',
      facts: {
        'Diâmetro': '6.779 km',
        'Dia': '24h 37min',
        'Temperatura média': '-63 °C',
        'Atmosfera': '95% CO₂, fina',
        'Monte Olimpo': 'Maior vulcão do Sistema Solar',
        'Luas': 'Fobos e Deimos',
        'Curiosidade': 'Marte tinha água líquida no passado — há evidências de leitos de rios.'
      },
      description: 'Marte, o planeta vermelho, fascina cientistas como possível destino futuro da humanidade. Rovers exploram o seu solo árido à procura de vestígios de vida antiga.',
      narrator: {
        travel: 'Trajectória marciana activada. O planeta vermelho aguarda — deserto de ferro oxidado e mistérios enterrados.',
        arrival: 'Marte abaixo! Vês o Monte Olimpo e os vales secos onde a água correu há milhões de anos.',
        datasheet: 'Consulta a ficha: atmosfera fina, dia similar ao nosso, evidências de água passada. Marte guarda segredos.',
        activity: 'Missão rover! Encontra o rover escondido na superfície marciana antes que o tempo acabe.',
        complete: 'Rover localizado! Marte explorado com sucesso. Próximo gigante: Júpiter!'
      },
      activity: {
        type: 'memory',
        title: 'Caça ao Rover',
        instruction: 'Memoriza onde o rover apareceu e clica na célula correcta. Acerta 3 rondas seguidas.',
        minCorrect: 3,
        points: 100,
        rounds: 3,
        gridSize: 3
      }
    },
    {
      id: 'jupiter',
      name: 'Júpiter',
      type: 'Planeta gasoso',
      emoji: '🟠',
      color: '#c88b3a',
      orbitIndex: 6,
      distance: '5,2 AU',
      facts: {
        'Diâmetro': '139.820 km',
        'Massa': '318× a da Terra',
        'Grande Mancha Vermelha': 'Tempestade há >400 anos',
        'Luas conhecidas': '95+',
        'Composição': 'Hidrogénio e hélio',
        'Anos': '12 anos terrestres',
        'Curiosidade': 'Júpiter actua como escudo gravitacional, desviando asteroides.'
      },
      description: 'Júpiter é o maior planeta — um gigante gasoso com faixas coloridas e a famosa Grande Mancha Vermelha, uma tempestade maior que a Terra.',
      narrator: {
        travel: 'Entrando na órbita de Júpiter. Preparem-se — este gigante gasoso é 11 vezes maior que todos os outros planetas juntos!',
        arrival: 'Júpiter domina o horizonte! Faixas de nuvens e a Mancha Vermelha giram num ballet violento.',
        datasheet: 'Estuda Júpiter: composição gasosa, luas galileias, papel de guardião do Sistema Solar interior.',
        activity: 'Desafio joviano! Responde sobre a Grande Mancha Vermelha e as luas de Júpiter.',
        complete: 'Gigante dominado! Saturno aguarda com os seus anéis espectaculares.'
      },
      activity: {
        type: 'quiz',
        title: 'Gigante Joviano',
        instruction: 'Acerta 3 de 4 perguntas sobre Júpiter.',
        minCorrect: 3,
        points: 100,
        questions: [
          {
            q: 'De que é feita a Grande Mancha Vermelha?',
            options: ['Lava', 'Tempestade gigante', 'Oceano', 'Deserto'],
            correct: 1
          },
          {
            q: 'Quantas vezes Júpiter é mais massivo que a Terra (aprox.)?',
            options: ['10×', '100×', '318×', '1000×'],
            correct: 2
          },
          {
            q: 'Quais luas foram descobertas por Galileu?',
            options: ['Fobos e Deimos', 'Io, Europa, Ganimedes, Calisto', 'Titã e Encélado', 'Tritão e Proteu'],
            correct: 1
          },
          {
            q: 'Qual o papel de Júpiter no Sistema Solar?',
            options: ['Gera luz', 'Desvia asteroides', 'Cria luas', 'Absorve o Sol'],
            correct: 1
          }
        ]
      }
    },
    {
      id: 'saturno',
      name: 'Saturno',
      type: 'Planeta gasoso',
      emoji: '🪐',
      color: '#e8d5a3',
      orbitIndex: 7,
      distance: '9,5 AU',
      facts: {
        'Diâmetro': '116.460 km',
        'Anéis': 'Partículas de gelo e rocha',
        'Extensão dos anéis': 'Até 282.000 km',
        'Densidade': 'Menor que a da água',
        'Luas': '146+ (Titã é a maior)',
        'Anos': '29 anos terrestres',
        'Curiosidade': 'Saturno flutuaria numa piscina gigante — é menos denso que a água!'
      },
      description: 'Saturno é famoso pelos seus magníficos anéis — milhões de fragmentos de gelo e rocha que orbitam o planeta num disco espectacular visível mesmo de telescópios amadores.',
      narrator: {
        travel: 'Ajustando sensores para Saturno. Os anéis reflectem a luz solar como um disco de vinil cósmico.',
        arrival: 'Saturno e os seus anéis! Um espectáculo que inspirou astronomia amadora há séculos.',
        datasheet: 'Estuda a ficha de Saturno: anéis de gelo, densidade baixa, lua Titã com atmosfera densa. Dados essenciais!',
        activity: 'Desafio dos anéis! Monta a sequência correcta dos anéis de Saturno, do interior para o exterior.',
        complete: 'Anéis alinhados! Saturno revelou os seus segredos. Rumo ao planeta inclinado: Urano.'
      },
      activity: {
        type: 'order',
        title: 'Anéis de Saturno',
        instruction: 'Ordena os anéis do mais interior ao mais exterior: D, C, B, A, F, G, E.',
        minCorrect: 5,
        points: 100,
        items: [
          { id: 'd', label: 'Anel D (interior)', order: 0 },
          { id: 'c', label: 'Anel C', order: 1 },
          { id: 'b', label: 'Anel B', order: 2 },
          { id: 'a', label: 'Anel A', order: 3 },
          { id: 'f', label: 'Anel F', order: 4 }
        ]
      }
    },
    {
      id: 'urano',
      name: 'Urano',
      type: 'Planeta gasoso',
      emoji: '🔵',
      color: '#72d5e8',
      orbitIndex: 8,
      distance: '19,2 AU',
      facts: {
        'Diâmetro': '50.724 km',
        'Inclinação axial': '98° (rota sobre o lado)',
        'Composição': 'Hidrogénio, hélio, metano (cor azul)',
        'Temperatura mínima': '~ -224 °C',
        'Anéis': '13 anéis fracos',
        'Anos': '84 anos terrestres',
        'Curiosidade': 'Urano foi o primeiro planeta descoberto com telescópio (1781).'
      },
      description: 'Urano é o planeta inclinado — roda de lado, possivelmente devido a um impacto antigo. A sua cor azul-esverdeada vem do metano na atmosfera.',
      narrator: {
        travel: 'Curso definido para Urano. Este planeta azul gira de lado — como uma bola de boliche a rolar no espaço.',
        arrival: 'Urano à frente! Um mundo gelado com anéis ténues e rotação única no Sistema Solar.',
        datasheet: 'Analisa a inclinação extrema, a descoberta por Herschel e a temperatura mais fria do Sistema Solar.',
        activity: 'Puzzle de inclinação! Escolhe os factos correctos sobre a rotação única de Urano.',
        complete: 'Urano decifrado! Falta o último planeta: Neptuno, o guardião azul do Sistema Solar.'
      },
      activity: {
        type: 'truefalse',
        title: 'Urano Inclinado',
        instruction: 'Acerta 4 de 5 afirmações sobre Urano.',
        minCorrect: 4,
        points: 100,
        statements: [
          { text: 'Urano roda essencialmente de lado (inclinação ~98°).', correct: true },
          { text: 'Urano foi descoberto à naked eye por astronomos antigos.', correct: false },
          { text: 'A cor azul de Urano deve-se principalmente ao metano.', correct: true },
          { text: 'Urano é o planeta mais quente do Sistema Solar.', correct: false },
          { text: 'Urano possui anéis, embora mais fracos que os de Saturno.', correct: true }
        ]
      }
    },
    {
      id: 'netuno',
      name: 'Neptuno',
      type: 'Planeta gasoso',
      emoji: '💙',
      color: '#3b5bdb',
      orbitIndex: 9,
      distance: '30 AU',
      facts: {
        'Diâmetro': '49.244 km',
        'Ventos': 'Até 2.100 km/h (mais rápidos do Sistema Solar)',
        'Composição': 'Hidrogénio, hélio, metano',
        'Grande Mancha Escura': 'Tempestade similar a Júpiter',
        'Luas': '16 (Tritão é a maior)',
        'Anos': '165 anos terrestres',
        'Curiosidade': 'Neptuno foi previsto matematicamente antes de ser observado.'
      },
      description: 'Neptuno, o planeta mais distante, é um mundo de ventos supersónicos e tempestades escuras. Foi descoberto através de cálculos matemáticos — uma vitória da física.',
      narrator: {
        travel: 'Última parada da viagem: Neptuno. A 4,5 mil milhões de km do Sol, o frio e os ventos extremos dominam.',
        arrival: 'Neptuno em vista! Ventos a mais de 2.000 km/h — mais rápidos que qualquer furacão terrestre.',
        datasheet: 'Estuda Neptuno: descoberta matemática, ventos extremos, lua Tritão com géisers de azoto.',
        activity: 'Desafio final! Responde sobre Neptuno e completa a tua expedição pelo Sistema Solar.',
        complete: 'Missão concluída! Percorreste todo o Sistema Solar. És um verdadeiro explorador cósmico!'
      },
      activity: {
        type: 'quiz',
        title: 'Desafio Final — Neptuno',
        instruction: 'Acerta 3 de 4 perguntas para completar a viagem.',
        minCorrect: 3,
        points: 150,
        questions: [
          {
            q: 'Como foi descoberto Neptuno?',
            options: ['Por acaso num telescópio', 'Previsto por cálculos matemáticos', 'Por uma sonda espacial', 'Por astronautas'],
            correct: 1
          },
          {
            q: 'Qual a velocidade máxima dos ventos de Neptuno?',
            options: ['200 km/h', '800 km/h', '2.100 km/h', '50 km/h'],
            correct: 2
          },
          {
            q: 'Qual é a lua mais grande de Neptuno?',
            options: ['Europa', 'Titã', 'Tritão', 'Io'],
            correct: 2
          },
          {
            q: 'Quanto tempo dura um ano neptuniano?',
            options: ['12 anos', '84 anos', '165 anos', '29 anos'],
            correct: 2
          }
        ]
      }
    }
  ],

  introNarrator: 'Comandante Nova ao controlo. Bem-vindo a bordo da nave Astronautech. A nossa missão: percorrer o Sistema Solar, parar em cada mundo, estudar as fichas de dados e superar desafios. Estás pronto, explorador?',

  mapNarrator: 'Consulta o mapa. Cada parada desbloqueia a seguinte. Completa a ficha e o desafio para avançar. A viagem começa pelo Sol — o coração do nosso sistema.'
};

if (typeof module !== 'undefined') module.exports = { SOLAR_JOURNEY };
