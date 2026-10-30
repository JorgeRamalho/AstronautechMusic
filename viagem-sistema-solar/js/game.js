/**
 * Viagem Sistema Solar — Lógica principal
 */
(function () {
  const STORAGE_KEY = 'viagem-sistema-solar-progress';

  const screens = {
    intro: document.getElementById('screen-intro'),
    map: document.getElementById('screen-map'),
    stop: document.getElementById('screen-stop'),
    complete: document.getElementById('screen-complete')
  };

  const stopContent = document.getElementById('stop-content');
  const stopName = document.getElementById('stop-name');
  const stopEmoji = document.getElementById('stop-emoji');
  const stopType = document.getElementById('stop-type');
  const stopStepLabel = document.getElementById('stop-step-label');
  const btnStopNext = document.getElementById('btn-stop-next');
  const btnStopPrev = document.getElementById('btn-stop-prev');
  const statStops = document.getElementById('stat-stops');
  const statScore = document.getElementById('stat-score');
  const solarMap = document.getElementById('solar-map');

  let progress = loadProgress();
  let currentStop = null;
  let currentStep = 0;
  let activityPassed = false;
  const steps = ['travel', 'arrival', 'datasheet', 'activity', 'complete'];

  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return { completed: [], score: 0, currentIndex: 0 };
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    updateStats();
  }

  function showScreen(name) {
    Object.values(screens).forEach((s) => s?.classList.remove('screen--active'));
    screens[name]?.classList.add('screen--active');
  }

  function updateStats() {
    const total = SOLAR_JOURNEY.stops.length;
    statStops.textContent = `${progress.completed.length} / ${total} paradas`;
    statScore.textContent = `⭐ ${progress.score} pts`;
  }

  function isUnlocked(index) {
    return index <= progress.currentIndex;
  }

  function isCompleted(id) {
    return progress.completed.includes(id);
  }

  function buildMap() {
    solarMap.innerHTML = '';
    const stops = SOLAR_JOURNEY.stops;

    stops.forEach((stop, index) => {
      const unlocked = isUnlocked(index);
      const done = isCompleted(stop.id);

      const node = document.createElement('button');
      node.type = 'button';
      node.className = `orbit-stop ${unlocked ? 'orbit-stop--unlocked' : 'orbit-stop--locked'} ${done ? 'orbit-stop--done' : ''}`;
      node.style.setProperty('--stop-color', stop.color);
      node.style.setProperty('--orbit-index', stop.orbitIndex);
      node.dataset.index = index;
      node.setAttribute('role', 'listitem');
      node.setAttribute('aria-label', `${stop.name}${done ? ', concluído' : unlocked ? ', disponível' : ', bloqueado'}`);
      node.innerHTML = `
        <span class="orbit-stop__emoji">${stop.emoji}</span>
        <span class="orbit-stop__name">${stop.name}</span>
        ${done ? '<span class="orbit-stop__badge">✓</span>' : ''}
        ${!unlocked ? '<span class="orbit-stop__lock">🔒</span>' : ''}
      `;

      if (unlocked) {
        node.addEventListener('click', () => openStop(index));
      }

      solarMap.appendChild(node);
    });

    positionShip(progress.currentIndex);
    updateStats();
  }

  function positionShip(index) {
    const ship = document.getElementById('map-ship');
    const node = solarMap.querySelector(`[data-index="${index}"]`);
    if (!ship || !node) return;

    const mapRect = solarMap.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    ship.style.left = `${nodeRect.left - mapRect.left + nodeRect.width / 2 - 16}px`;
    ship.style.top = `${nodeRect.top - mapRect.top - 28}px`;
  }

  function openStop(index) {
    currentStop = SOLAR_JOURNEY.stops[index];
    currentStep = 0;
    activityPassed = isCompleted(currentStop.id);
    showScreen('stop');
    renderStopStep();
  }

  function renderStopStep() {
    const step = steps[currentStep];
    const labels = {
      travel: 'Viagem',
      arrival: 'Chegada',
      datasheet: 'Ficha de Dados',
      activity: 'Desafio',
      complete: 'Conclusão'
    };

    stopName.textContent = currentStop.name;
    stopEmoji.textContent = currentStop.emoji;
    stopType.textContent = currentStop.type;
    stopStepLabel.textContent = labels[step];
    btnStopPrev.hidden = currentStep === 0;
    btnStopNext.disabled = step === 'activity' && !activityPassed;
    btnStopNext.textContent =
      step === 'complete' ? 'Voltar ao Mapa'
      : step === 'activity' && !activityPassed ? 'Completa o desafio'
      : step === 'activity' ? 'Continuar'
      : 'Continuar';

    stopContent.innerHTML = '';

    if (step === 'travel') {
      stopContent.innerHTML = `
        <div class="travel-scene">
          <div class="travel-ship">🚀</div>
          <div class="travel-target" style="--color: ${currentStop.color}">${currentStop.emoji}</div>
          <p class="travel-label">A aproximar de <strong>${currentStop.name}</strong>...</p>
          <div class="travel-bar"><div class="travel-bar__fill"></div></div>
        </div>
      `;
      Narrator.say(currentStop.narrator.travel);
    } else if (step === 'arrival') {
      stopContent.innerHTML = `
        <div class="arrival-scene" style="--planet-color: ${currentStop.color}">
          <div class="planet-visual">${currentStop.emoji}</div>
          <p class="planet-desc">${currentStop.description}</p>
        </div>
      `;
      Narrator.say(currentStop.narrator.arrival);
    } else if (step === 'datasheet') {
      stopContent.innerHTML = `
        <article class="datasheet">
          <header class="datasheet-header">
            <h3>Ficha de Dados — ${currentStop.name}</h3>
            <span class="datasheet-type">${currentStop.type}</span>
          </header>
          <dl class="datasheet-grid">
            ${Object.entries(currentStop.facts).map(([key, val]) => `
              <div class="datasheet-row">
                <dt>${key}</dt>
                <dd>${val}</dd>
              </div>
            `).join('')}
          </dl>
          <p class="datasheet-distance">📍 ${currentStop.distance}</p>
        </article>
      `;
      Narrator.say(currentStop.narrator.datasheet);
    } else if (step === 'activity') {
      stopContent.innerHTML = `
        <div class="activity-intro">
          <h3>${currentStop.activity.title}</h3>
          <p>${currentStop.activity.instruction}</p>
          <button type="button" class="btn btn-primary" id="btn-start-activity">Iniciar Desafio</button>
        </div>
        <div id="activity-area"></div>
      `;
      Narrator.say(currentStop.narrator.activity);

      document.getElementById('btn-start-activity')?.addEventListener('click', startActivity);
    } else if (step === 'complete') {
      if (!isCompleted(currentStop.id)) {
        progress.completed.push(currentStop.id);
        if (progress.currentIndex < SOLAR_JOURNEY.stops.length - 1) {
          progress.currentIndex = Math.max(progress.currentIndex, currentStop.orbitIndex + 1);
        }
        saveProgress();
      }

      stopContent.innerHTML = `
        <div class="stop-complete">
          <p class="stop-complete-icon">🏆</p>
          <h3>${currentStop.name} explorado!</h3>
          <p>Parada concluída com sucesso. ${progress.currentIndex >= SOLAR_JOURNEY.stops.length ? 'Completaste toda a viagem!' : 'Próxima parada desbloqueada no mapa.'}</p>
        </div>
      `;
      Narrator.say(currentStop.narrator.complete);
    }
  }

  function startActivity() {
    const area = document.getElementById('activity-area');
    const intro = stopContent.querySelector('.activity-intro');
    if (intro) intro.style.display = 'none';
    btnStopNext.disabled = true;

    Activities.render(currentStop.activity, area, {
      success(points) {
        if (!isCompleted(currentStop.id)) {
          progress.score += points;
          saveProgress();
        }
        activityPassed = true;
        btnStopNext.disabled = false;
        btnStopNext.textContent = 'Continuar';
      },
      retry() {
        Activities.clear();
        if (intro) intro.style.display = '';
        area.innerHTML = '';
        startActivity();
      }
    });
  }

  function nextStep() {
    const step = steps[currentStep];

    if (step === 'activity' && !activityPassed) return;

    if (step === 'complete') {
      if (progress.completed.length >= SOLAR_JOURNEY.stops.length) {
        document.getElementById('final-score').textContent = `Pontuação final: ${progress.score} pontos`;
        showScreen('complete');
      } else {
        buildMap();
        showScreen('map');
        Narrator.say(SOLAR_JOURNEY.mapNarrator, { instant: false });
      }
      return;
    }

    currentStep++;
    renderStopStep();
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStopStep();
    }
  }

  function resetGame() {
    progress = { completed: [], score: 0, currentIndex: 0 };
    saveProgress();
    buildMap();
    showScreen('intro');
  }

  document.getElementById('btn-start')?.addEventListener('click', async () => {
    const voiceCheck = document.getElementById('voice-enabled');
    Narrator.setVoiceEnabled(voiceCheck?.checked ?? true);
    buildMap();
    showScreen('map');
    await Narrator.say(SOLAR_JOURNEY.introNarrator);
    await Narrator.say(SOLAR_JOURNEY.mapNarrator);
  });

  document.getElementById('voice-enabled')?.addEventListener('change', (e) => {
    Narrator.setVoiceEnabled(e.target.checked);
  });

  document.getElementById('btn-narrator-skip')?.addEventListener('click', () => Narrator.skip());
  document.getElementById('btn-narrator-repeat')?.addEventListener('click', () => Narrator.repeat());
  document.getElementById('btn-back-map')?.addEventListener('click', () => {
    buildMap();
    showScreen('map');
  });
  document.getElementById('btn-stop-next')?.addEventListener('click', nextStep);
  document.getElementById('btn-stop-prev')?.addEventListener('click', prevStep);
  document.getElementById('btn-restart')?.addEventListener('click', resetGame);

  window.addEventListener('resize', () => positionShip(progress.currentIndex));

  updateStats();
})();
