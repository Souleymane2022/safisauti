const quickMessages = [
  'Je suis menacée à la maison',
  'Quelqu’un me harcèle à l’école',
  'Je me sens très triste et seule',
  'Je veux connaître mes droits'
];

const resources = [
  {
    title: 'Urgence immédiate',
    text: 'Si tu es en danger maintenant, éloigne-toi vers un lieu sûr et contacte un numéro d’urgence local ou un adulte de confiance.',
    tag: 'Priorité haute'
  },
  {
    title: 'Écoute confidentielle',
    text: 'Prépare un court message expliquant où tu es, ce qui se passe, et le niveau de risque pour faciliter l’aide.',
    tag: 'Soutien'
  },
  {
    title: 'Droits et protection',
    text: 'La violence, les menaces, le chantage et le harcèlement ne sont pas de ta faute. Tu as le droit d’être protégée.',
    tag: 'Information'
  }
];

const emergencyWords = ['danger', 'menacée', 'menace', 'violence', 'frapper', 'abus', 'agression', 'urgence', 'poursuit'];
const harassmentWords = ['harcèle', 'harcelement', 'harcèlement', 'chantage', 'insulte', 'photo', 'école', 'ecole'];
const distressWords = ['triste', 'seule', 'pleure', 'peur', 'angoisse', 'détresse', 'detresse', 'suicide', 'mourir'];

function detectNeed(message) {
  const normalized = message.toLowerCase();

  if (emergencyWords.some((word) => normalized.includes(word))) {
    return {
      level: 'Urgent',
      tone: 'alert',
      reply: 'Je suis désolée que tu vives cela. Ta sécurité passe d’abord : si tu peux, va dans un endroit visible et sûr, contacte un adulte fiable ou un service d’urgence local. Ne reste pas seule avec la personne qui te menace.'
    };
  }

  if (harassmentWords.some((word) => normalized.includes(word))) {
    return {
      level: 'Harcèlement',
      tone: 'care',
      reply: 'Ce que tu décris mérite d’être pris au sérieux. Garde les preuves si c’est possible, évite de répondre seule à la personne, et parle à une personne de confiance : parent sûr, enseignante, responsable scolaire ou association de protection.'
    };
  }

  if (distressWords.some((word) => normalized.includes(word))) {
    return {
      level: 'Détresse émotionnelle',
      tone: 'soft',
      reply: 'Merci de l’avoir écrit. Respire lentement et rapproche-toi d’une personne de confiance aujourd’hui. Si tu penses à te faire du mal, cherche une aide immédiate auprès d’un adulte, d’un centre de santé ou d’un service d’urgence.'
    };
  }

  return {
    level: 'Orientation',
    tone: 'neutral',
    reply: 'Je peux t’aider à clarifier la situation. Dis-moi si tu es en danger maintenant, où cela se passe, et si tu as une personne de confiance près de toi. Tu n’as pas besoin de tout raconter d’un coup.'
  };
}

function createMessage(content, type = 'bot', meta = '') {
  const message = document.createElement('article');
  message.className = `chat-message chat-message--${type}`;
  message.innerHTML = `
    ${meta ? `<span class="chat-message__meta">${meta}</span>` : ''}
    <p>${content}</p>
  `;
  return message;
}

function renderApp() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <main class="shell">
      <section class="hero" aria-labelledby="hero-title">
        <nav class="topbar" aria-label="Navigation principale">
          <a class="brand" href="#hero-title" aria-label="Accueil SafiSauti AI">
            <span class="brand__mark">SS</span>
            <span>
              <strong>SafiSauti AI</strong>
              <small>Écouter • Orienter • Protéger</small>
            </span>
          </a>
          <a class="topbar__cta" href="#assistant">Essayer l’assistant</a>
        </nav>

        <div class="hero__grid">
          <div class="hero__content">
            <p class="eyebrow">Projet proposé par Amina Hassan</p>
            <h1 id="hero-title">Une interface discrète pour demander de l’aide plus tôt.</h1>
            <p class="hero__lead">
              SafiSauti AI guide les filles et jeunes femmes confrontées à la violence, au harcèlement,
              à la pression familiale ou à la détresse émotionnelle vers des ressources sûres et adaptées.
            </p>
            <div class="hero__actions">
              <a class="button button--primary" href="#assistant">Parler au chatbot</a>
              <a class="button button--ghost" href="#ressources">Voir les ressources</a>
            </div>
          </div>

          <aside class="safety-card" aria-label="Conseils de sécurité rapide">
            <span class="safety-card__status">Confidentiel</span>
            <h2>Si tu es en danger maintenant</h2>
            <ol>
              <li>Éloigne-toi vers un lieu visible ou fréquenté.</li>
              <li>Contacte un adulte fiable ou un service d’urgence local.</li>
              <li>Partage ta position si tu peux le faire sans risque.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section class="features" aria-label="Fonctionnalités principales">
        <article>
          <span>1</span>
          <h3>Conversation simple</h3>
          <p>L’utilisatrice écrit avec ses mots, sans formulaire compliqué.</p>
        </article>
        <article>
          <span>2</span>
          <h3>Détection du risque</h3>
          <p>L’interface classe le besoin : urgence, harcèlement, détresse ou information.</p>
        </article>
        <article>
          <span>3</span>
          <h3>Orientation locale</h3>
          <p>Elle propose des étapes concrètes et prépare le relais vers une structure humaine.</p>
        </article>
      </section>

      <section class="assistant-panel" id="assistant" aria-labelledby="assistant-title">
        <div class="assistant-panel__intro">
          <p class="eyebrow">Prototype d’interface</p>
          <h2 id="assistant-title">Assistant SafiSauti</h2>
          <p>Teste une conversation. Les réponses sont des exemples de première orientation et ne remplacent pas une aide professionnelle.</p>
        </div>

        <div class="chat-card">
          <div class="chat-card__header">
            <div>
              <strong>SafiSauti est en ligne</strong>
              <small>Réponse immédiate et bienveillante</small>
            </div>
            <span class="pulse" aria-hidden="true"></span>
          </div>
          <div class="chat-window" id="chat-window" aria-live="polite">
            <article class="chat-message chat-message--bot">
              <span class="chat-message__meta">Accueil</span>
              <p>Bonjour, tu peux écrire ici ce qui se passe. Si tu es en danger immédiat, cherche d’abord un lieu sûr.</p>
            </article>
          </div>
          <div class="quick-actions" aria-label="Messages rapides">
            ${quickMessages.map((message) => `<button type="button" data-message="${message}">${message}</button>`).join('')}
          </div>
          <form class="chat-form" id="chat-form">
            <label class="sr-only" for="user-message">Ton message</label>
            <input id="user-message" name="message" placeholder="Écris ton message ici…" autocomplete="off" />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </section>

      <section class="resources" id="ressources" aria-labelledby="resources-title">
        <div>
          <p class="eyebrow">Ressources essentielles</p>
          <h2 id="resources-title">Ce que l’application met en avant</h2>
        </div>
        <div class="resource-grid">
          ${resources.map((resource) => `
            <article class="resource-card">
              <span>${resource.tag}</span>
              <h3>${resource.title}</h3>
              <p>${resource.text}</p>
            </article>
          `).join('')}
        </div>
      </section>
    </main>
  `;

  const chatWindow = document.querySelector('#chat-window');
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#user-message');

  function submitMessage(message) {
    const trimmed = message.trim();
    if (!trimmed) return;

    chatWindow.append(createMessage(trimmed, 'user'));
    const result = detectNeed(trimmed);
    chatWindow.append(createMessage(result.reply, 'bot', result.level));
    chatWindow.scrollTop = chatWindow.scrollHeight;
    input.value = '';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitMessage(input.value);
  });

  document.querySelectorAll('[data-message]').forEach((button) => {
    button.addEventListener('click', () => submitMessage(button.dataset.message));
  });
}

renderApp();
