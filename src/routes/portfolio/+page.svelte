<!--
  🏠 Landing Page del Portafolio de Daniel Marcel
-->

<script lang="ts">
  import { profile, projects } from "$lib/data/portfolio";
  import { fly, fade, scale } from "svelte/transition";
  import { onMount } from "svelte";

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>{profile.shortName} | Portafolio Data Engineer</title>
  <meta name="description" content={profile.bio} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <!-- Hero Section -->
  {#if mounted}
    <section class="hero" in:fade={{ duration: 500 }}>
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-text" in:fly={{ y: 30, delay: 200 }}>
          <p class="greeting">👋 Hola, soy</p>
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
          <p class="subtitle">{profile.subtitle}</p>
          <p class="bio">{profile.bio}</p>

          <div class="hero-actions">
            <a href="#proyectos" class="btn primary">Ver Proyectos</a>
            <a href="#contacto" class="btn secondary">Contacto</a>
          </div>

          <div class="social-links">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <span class="icon">💼</span> LinkedIn
            </a>
            <a href="mailto:{profile.email}" class="social-link">
              <span class="icon">✉️</span> Email
            </a>
          </div>
        </div>

        <div class="hero-visual" in:scale={{ delay: 400, duration: 500 }}>
          <div class="avatar-ring">
            <div class="avatar">DM</div>
          </div>
          <div class="floating-tags">
            <span class="tag" style="--delay: 0">Python</span>
            <span class="tag" style="--delay: 1">SQL</span>
            <span class="tag" style="--delay: 2">Svelte</span>
            <span class="tag" style="--delay: 3">D3.js</span>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Skills Section -->
  <section class="skills-section" id="skills">
    <h2 class="section-title">🛠️ Habilidades</h2>
    <p class="section-subtitle">Tecnologías y herramientas que domino</p>

    <div class="skill-categories">
      {#each profile.skillCategories as category, i}
        <div class="skill-card" in:fly={{ y: 30, delay: 100 * i }}>
          <span class="category-icon">{category.icon}</span>
          <h3>{category.name}</h3>
          <div class="skill-tags">
            {#each category.skills as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="skills-bars">
      {#each profile.skills as skill, i}
        <div class="skill-bar-container" in:fly={{ x: -20, delay: 50 * i }}>
          <div class="skill-info">
            <span class="skill-icon">{skill.icon}</span>
            <span class="skill-name">{skill.name}</span>
            <span class="skill-level">{skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" style="width: {skill.level}%"></div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects-section" id="proyectos">
    <h2 class="section-title">🚀 Proyectos</h2>
    <p class="section-subtitle">Trabajos destacados en visualización y datos</p>

    <div class="projects-grid">
      {#each projects.filter((p) => p.featured) as project, i}
        <a
          href={project.link}
          class="project-card"
          in:fly={{ y: 30, delay: 100 * i }}
        >
          <div class="project-header">
            <span class="project-category">
              {project.category === "data-viz"
                ? "📊"
                : project.category === "data-eng"
                  ? "⚙️"
                  : "💻"}
            </span>
            <h3>{project.title}</h3>
          </div>
          <p class="project-description">{project.description}</p>
          <div class="project-tech">
            {#each project.technologies as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
          <span class="project-link">Ver proyecto →</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section" id="contacto">
    <h2 class="section-title">📬 Contacto</h2>
    <p class="section-subtitle">¿Tienes un proyecto en mente? ¡Hablemos!</p>

    <div class="contact-cards">
      <a href="mailto:{profile.email}" class="contact-card">
        <span class="contact-icon">✉️</span>
        <h3>Email</h3>
        <p>{profile.email}</p>
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener"
        class="contact-card"
      >
        <span class="contact-icon">💼</span>
        <h3>LinkedIn</h3>
        <p>@danielmarcel</p>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>
      © 2024 {profile.shortName}. Construido con <span class="heart">❤️</span> y
      Svelte
    </p>
    <p class="tech-stack">Svelte • D3.js • Observable Plot • TypeScript</p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    min-height: 100vh;
    color: white;
    overflow-x: hidden;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Hero Section */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .hero-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        ellipse 80% 60% at 20% 40%,
        rgba(139, 92, 246, 0.12) 0%,
        transparent 60%
      ),
      radial-gradient(
        ellipse 60% 50% at 80% 60%,
        rgba(34, 197, 94, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 100% 80% at 50% 100%,
        rgba(99, 102, 241, 0.06) 0%,
        transparent 40%
      );
    pointer-events: none;
    z-index: 0;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
    align-items: center;
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }

  .greeting {
    color: #8b5cf6;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
  }

  .hero h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 0.25rem 0;
  }

  .subtitle {
    color: #22c55e;
    font-weight: 500;
    margin: 0 0 1rem 0;
  }

  .bio {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    max-width: 500px;
    margin-bottom: 2rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    padding: 0.875rem 1.75rem;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn.primary {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: white;
  }

  .btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
  }

  .btn.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn.secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  .social-link:hover {
    color: #8b5cf6;
  }

  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .avatar-ring {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #22c55e);
    padding: 4px;
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    font-weight: 700;
    color: #8b5cf6;
    animation: rotate 10s linear infinite reverse;
  }

  .floating-tags {
    position: absolute;
  }

  .floating-tags .tag {
    position: absolute;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.4);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: #a78bfa;
    font-size: 0.8rem;
    font-weight: 500;
    animation: float 3s ease-in-out infinite;
    animation-delay: calc(var(--delay) * 0.5s);
  }

  .floating-tags .tag:nth-child(1) {
    top: -40px;
    left: -60px;
  }
  .floating-tags .tag:nth-child(2) {
    top: 20px;
    right: -80px;
  }
  .floating-tags .tag:nth-child(3) {
    bottom: 20px;
    right: -60px;
  }
  .floating-tags .tag:nth-child(4) {
    bottom: -40px;
    left: -40px;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Section Styles */
  .section-title {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }

  .section-subtitle {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 3rem 0;
  }

  /* Skills Section */
  .skills-section {
    padding: 6rem 0;
  }

  .skill-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .skill-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }

  .skill-card:hover {
    transform: translateY(-4px);
  }

  .category-icon {
    font-size: 2rem;
  }

  .skill-card h3 {
    margin: 0.5rem 0 1rem 0;
    font-size: 1.1rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background: rgba(139, 92, 246, 0.15);
    color: #a78bfa;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  .skills-bars {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .skill-bar-container {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 1rem;
  }

  .skill-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .skill-name {
    flex: 1;
    font-weight: 500;
  }

  .skill-level {
    color: #22c55e;
    font-weight: 600;
  }

  .skill-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }

  .skill-fill {
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6, #22c55e);
    border-radius: 3px;
    transition: width 1s ease-out;
  }

  /* Projects Section */
  .projects-section {
    padding: 6rem 0;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .project-card:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .project-header {
    margin-bottom: 1rem;
  }

  .project-category {
    font-size: 1.5rem;
  }

  .project-card h3 {
    margin: 0.5rem 0 0 0;
    font-size: 1.25rem;
  }

  .project-description {
    color: rgba(255, 255, 255, 0.6);
    flex: 1;
    line-height: 1.6;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .tech-tag {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .project-link {
    color: #8b5cf6;
    font-weight: 500;
    font-size: 0.9rem;
  }

  /* Contact Section */
  .contact-section {
    padding: 6rem 0;
  }

  .contact-cards {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .contact-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem 3rem;
    text-align: center;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease;
  }

  .contact-card:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.4);
  }

  .contact-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 1rem;
  }

  .contact-card h3 {
    margin: 0 0 0.5rem 0;
  }

  .contact-card p {
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  /* Footer */
  footer {
    text-align: center;
    padding: 3rem 0;
    color: rgba(255, 255, 255, 0.5);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  footer p {
    margin: 0.5rem 0;
  }

  .heart {
    color: #ef4444;
  }

  .tech-stack {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.3);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
    }

    .bio {
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions,
    .social-links {
      justify-content: center;
    }

    .hero-visual {
      order: -1;
      margin-bottom: 2rem;
    }

    .avatar-ring {
      width: 200px;
      height: 200px;
    }

    .avatar {
      font-size: 3rem;
    }
  }
</style>
