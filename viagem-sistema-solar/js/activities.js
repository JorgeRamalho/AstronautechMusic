/**
 * Actividades / mini-jogos por parada
 */
const Activities = (function () {
  let container = null;
  let onComplete = null;
  let score = 0;

  function init(el, completeCallback) {
    container = el;
    onComplete = completeCallback;
    score = 0;
  }

  function clear() {
    if (container) container.innerHTML = '';
  }

  function showResult(success, message, points) {
    const div = document.createElement('div');
    div.className = `activity-result ${success ? 'activity-result--success' : 'activity-result--fail'}`;
    div.innerHTML = `
      <p class="result-icon">${success ? '🎉' : '🔄'}</p>
      <p class="result-msg">${message}</p>
      ${success ? `<p class="result-points">+${points} pontos</p>` : ''}
      ${!success ? '<button type="button" class="btn btn-primary btn-retry">Tentar novamente</button>' : ''}
    `;
    container.appendChild(div);

    if (!success) {
      div.querySelector('.btn-retry')?.addEventListener('click', () => {
        if (onComplete && onComplete.retry) onComplete.retry();
      });
    } else if (onComplete) {
      onComplete.success(points);
    }
  }

  function renderQuiz(activity) {
    clear();
    const shuffled = [...activity.questions].sort(() => Math.random() - 0.5).slice(0, activity.questions.length);
    let current = 0;
    let correct = 0;

    const wrap = document.createElement('div');
    wrap.className = 'activity activity--quiz';
    wrap.innerHTML = `
      <h3>${activity.title}</h3>
      <p class="activity-instruction">${activity.instruction}</p>
      <div class="quiz-progress"><span id="quiz-progress">1 / ${shuffled.length}</span></div>
      <div class="quiz-body" id="quiz-body"></div>
    `;
    container.appendChild(wrap);

    function renderQuestion() {
      const q = shuffled[current];
      const body = wrap.querySelector('#quiz-body');
      const progress = wrap.querySelector('#quiz-progress');

      progress.textContent = `${current + 1} / ${shuffled.length}`;
      body.innerHTML = `
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button type="button" class="quiz-option" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <p class="quiz-feedback" id="quiz-feedback" hidden></p>
      `;

      body.querySelectorAll('.quiz-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index, 10);
          const feedback = body.querySelector('#quiz-feedback');
          const isCorrect = idx === q.correct;

          body.querySelectorAll('.quiz-option').forEach((b) => {
            b.disabled = true;
            if (parseInt(b.dataset.index, 10) === q.correct) b.classList.add('quiz-option--correct');
            else if (parseInt(b.dataset.index, 10) === idx && !isCorrect) b.classList.add('quiz-option--wrong');
          });

          if (isCorrect) correct++;
          feedback.hidden = false;
          feedback.textContent = isCorrect ? '✓ Correcto!' : `✗ A resposta correcta era: ${q.options[q.correct]}`;
          feedback.className = `quiz-feedback ${isCorrect ? 'quiz-feedback--ok' : 'quiz-feedback--err'}`;

          setTimeout(() => {
            current++;
            if (current < shuffled.length) renderQuestion();
            else {
              const success = correct >= activity.minCorrect;
              showResult(
                success,
                success
                  ? `Acertaste ${correct} de ${shuffled.length}! Desafio superado.`
                  : `Acertaste ${correct} de ${shuffled.length}. Precisas de ${activity.minCorrect}.`,
                success ? activity.points : 0
              );
            }
          }, 1200);
        });
      });
    }

    renderQuestion();
  }

  function renderTrueFalse(activity) {
    clear();
    const statements = [...activity.statements].sort(() => Math.random() - 0.5);
    let current = 0;
    let correct = 0;

    const wrap = document.createElement('div');
    wrap.className = 'activity activity--truefalse';
    wrap.innerHTML = `
      <h3>${activity.title}</h3>
      <p class="activity-instruction">${activity.instruction}</p>
      <div class="tf-progress"><span id="tf-progress">1 / ${statements.length}</span></div>
      <div class="tf-body" id="tf-body"></div>
    `;
    container.appendChild(wrap);

    function renderStatement() {
      const s = statements[current];
      const body = wrap.querySelector('#tf-body');
      wrap.querySelector('#tf-progress').textContent = `${current + 1} / ${statements.length}`;

      body.innerHTML = `
        <p class="tf-statement">${s.text}</p>
        <div class="tf-buttons">
          <button type="button" class="btn btn-outline tf-btn" data-val="true">Verdadeiro</button>
          <button type="button" class="btn btn-outline tf-btn" data-val="false">Falso</button>
        </div>
        <p class="quiz-feedback" id="tf-feedback" hidden></p>
      `;

      body.querySelectorAll('.tf-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const val = btn.dataset.val === 'true';
          const isCorrect = val === s.correct;
          if (isCorrect) correct++;

          const feedback = body.querySelector('#tf-feedback');
          feedback.hidden = false;
          feedback.textContent = isCorrect ? '✓ Correcto!' : `✗ Era ${s.correct ? 'Verdadeiro' : 'Falso'}.`;
          feedback.className = `quiz-feedback ${isCorrect ? 'quiz-feedback--ok' : 'quiz-feedback--err'}`;

          body.querySelectorAll('.tf-btn').forEach((b) => (b.disabled = true));

          setTimeout(() => {
            current++;
            if (current < statements.length) renderStatement();
            else {
              const success = correct >= activity.minCorrect;
              showResult(
                success,
                success ? `${correct}/${statements.length} correctas!` : `${correct}/${statements.length}. Mínimo: ${activity.minCorrect}.`,
                success ? activity.points : 0
              );
            }
          }, 1000);
        });
      });
    }

    renderStatement();
  }

  function renderOrder(activity) {
    clear();
    const items = [...activity.items].sort(() => Math.random() - 0.5);

    const wrap = document.createElement('div');
    wrap.className = 'activity activity--order';
    wrap.innerHTML = `
      <h3>${activity.title}</h3>
      <p class="activity-instruction">${activity.instruction}</p>
      <ul class="order-list" id="order-list">
        ${items.map((item, i) => `
          <li class="order-item" draggable="true" data-id="${item.id}" data-order="${item.order}">
            <span class="order-handle">⋮⋮</span>
            <span>${item.label}</span>
          </li>
        `).join('')}
      </ul>
      <button type="button" class="btn btn-primary" id="order-check">Verificar ordem</button>
      <p class="quiz-feedback" id="order-feedback" hidden></p>
    `;
    container.appendChild(wrap);

    const list = wrap.querySelector('#order-list');
    let dragged = null;

    list.querySelectorAll('.order-item').forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        dragged = item;
        item.classList.add('order-item--dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('order-item--dragging');
        dragged = null;
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (dragged && dragged !== item) {
          const rect = item.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (e.clientY < mid) list.insertBefore(dragged, item);
          else list.insertBefore(dragged, item.nextSibling);
        }
      });
    });

    wrap.querySelector('#order-check').addEventListener('click', () => {
      const ordered = [...list.querySelectorAll('.order-item')];
      const isCorrect = ordered.every((el, i) => parseInt(el.dataset.order, 10) === i);
      const feedback = wrap.querySelector('#order-feedback');
      feedback.hidden = false;

      if (isCorrect) {
        feedback.textContent = '✓ Ordem perfecta!';
        feedback.className = 'quiz-feedback quiz-feedback--ok';
        showResult(true, 'Sequência correcta!', activity.points);
      } else {
        feedback.textContent = '✗ A ordem não está correcta. Arrasta novamente.';
        feedback.className = 'quiz-feedback quiz-feedback--err';
        showResult(false, 'Ordem incorrecta.', 0);
      }
    });
  }

  function renderMatch(activity) {
    clear();
    const pairs = activity.pairs;
    const leftItems = pairs.map((p, i) => ({ text: p.left, matchIndex: i }));
    const rightItems = [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5);

    let selectedLeft = null;
    const matched = new Set();

    const wrap = document.createElement('div');
    wrap.className = 'activity activity--match';
    wrap.innerHTML = `
      <h3>${activity.title}</h3>
      <p class="activity-instruction">${activity.instruction}</p>
      <div class="match-grid">
        <div class="match-col" id="match-left">
          ${leftItems.map((item, i) => `
            <button type="button" class="match-card match-card--left" data-index="${i}">${item.text}</button>
          `).join('')}
        </div>
        <div class="match-col" id="match-right">
          ${rightItems.map((text, i) => `
            <button type="button" class="match-card match-card--right" data-text="${text}">${text}</button>
          `).join('')}
        </div>
      </div>
      <p class="quiz-feedback" id="match-feedback">Selecciona um item à esquerda e a correspondência à direita.</p>
    `;
    container.appendChild(wrap);

    function checkComplete() {
      if (matched.size === pairs.length) {
        showResult(true, 'Todas as associações correctas!', activity.points);
      }
    }

    wrap.querySelectorAll('.match-card--left').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (matched.has(parseInt(btn.dataset.index, 10))) return;
        wrap.querySelectorAll('.match-card--left').forEach((b) => b.classList.remove('match-card--selected'));
        btn.classList.add('match-card--selected');
        selectedLeft = parseInt(btn.dataset.index, 10);
      });
    });

    wrap.querySelectorAll('.match-card--right').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (selectedLeft === null || btn.classList.contains('match-card--matched')) return;

        const expected = pairs[selectedLeft].right;
        const feedback = wrap.querySelector('#match-feedback');

        if (btn.dataset.text === expected) {
          matched.add(selectedLeft);
          btn.classList.add('match-card--matched');
          wrap.querySelector(`.match-card--left[data-index="${selectedLeft}"]`)?.classList.add('match-card--matched');
          selectedLeft = null;
          wrap.querySelectorAll('.match-card--left').forEach((b) => b.classList.remove('match-card--selected'));
          feedback.textContent = `✓ Correcto! ${matched.size}/${pairs.length}`;
          feedback.className = 'quiz-feedback quiz-feedback--ok';
          checkComplete();
        } else {
          feedback.textContent = '✗ Essa associação não está correcta. Tenta outra.';
          feedback.className = 'quiz-feedback quiz-feedback--err';
        }
      });
    });
  }

  function renderMemory(activity) {
    clear();
    const gridSize = activity.gridSize || 3;
    let roundsWon = 0;
    let roverCell = -1;
    let phase = 'show';

    const wrap = document.createElement('div');
    wrap.className = 'activity activity--memory';
    wrap.innerHTML = `
      <h3>${activity.title}</h3>
      <p class="activity-instruction">${activity.instruction}</p>
      <p class="memory-status" id="memory-status">Ronda 1 — Memoriza a posição!</p>
      <div class="memory-grid" id="memory-grid" style="--grid-size: ${gridSize}"></div>
    `;
    container.appendChild(wrap);

    const grid = wrap.querySelector('#memory-grid');
    const status = wrap.querySelector('#memory-status');
    const totalCells = gridSize * gridSize;

    function buildGrid(showRover) {
      grid.innerHTML = '';
      roverCell = Math.floor(Math.random() * totalCells);

      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'memory-cell';
        cell.dataset.index = i;
        cell.textContent = showRover && i === roverCell ? '🤖' : '';
        if (!showRover) {
          cell.addEventListener('click', () => onCellClick(i, cell));
        }
        grid.appendChild(cell);
      }
    }

    function onCellClick(index, cell) {
      if (phase !== 'guess') return;
      grid.querySelectorAll('.memory-cell').forEach((c) => (c.disabled = true));

      if (index === roverCell) {
        cell.textContent = '🤖';
        cell.classList.add('memory-cell--correct');
        roundsWon++;
        status.textContent = `✓ Ronda ${roundsWon} completa!`;

        if (roundsWon >= activity.minCorrect) {
          setTimeout(() => showResult(true, 'Rover encontrado em todas as rondas!', activity.points), 800);
        } else {
          setTimeout(startRound, 1500);
        }
      } else {
        cell.classList.add('memory-cell--wrong');
        grid.querySelector(`[data-index="${roverCell}"]`).textContent = '🤖';
        status.textContent = '✗ Posição errada!';
        setTimeout(() => showResult(false, 'O rover estava noutra célula.', 0), 1200);
      }
    }

    function startRound() {
      phase = 'show';
      status.textContent = `Ronda ${roundsWon + 1} — Memoriza a posição!`;
      buildGrid(true);
      setTimeout(() => {
        phase = 'guess';
        status.textContent = 'Onde estava o rover? Clica na célula!';
        buildGrid(false);
      }, 1500);
    }

    startRound();
  }

  function render(activity, el, completeCallback) {
    init(el, completeCallback);

    switch (activity.type) {
      case 'quiz':
        renderQuiz(activity);
        break;
      case 'truefalse':
        renderTrueFalse(activity);
        break;
      case 'order':
        renderOrder(activity);
        break;
      case 'match':
        renderMatch(activity);
        break;
      case 'memory':
        renderMemory(activity);
        break;
      default:
        el.innerHTML = '<p>Actividade em desenvolvimento.</p>';
    }
  }

  return { render, clear };
})();
