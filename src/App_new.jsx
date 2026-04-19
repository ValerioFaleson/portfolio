import React from 'react';
import './App.css';
import heroImage from './assets/valerio.JPG';

function App() {
  return (
    <div className="light-theme">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-name">Faleson Valério</div>
          <div className="sidebar-subtitle">Étudiant en Informatique</div>
        </div>

        <nav className="sidebar-nav">
          <a href="#home" className="nav-item active">HOME</a>
          <a href="#about" className="nav-item">ABOUT ME</a>
          <a href="#resume" className="nav-item">RESUME</a>
          <a href="#portfolio" className="nav-item">PORTFOLIO</a>
          <a href="#testimonials" className="nav-item">TESTIMONIALS</a>
          <a href="#contact" className="nav-item">CONTACT</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                HI THERE! I'M <span className="highlight">Faleson Valério</span>
              </h1>
              <p className="hero-subtitle">Étudiant en Informatique • Développeur Fullstack</p>
              <a href="#about" className="btn-primary">MORE ABOUT ME</a>
            </div>

            <div className="hero-image">
              <img src={heroImage} alt="Faleson Valério" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-content">
            <div className="about-image">
              <img src={heroImage} alt="Faleson Valério" />
            </div>

            <div className="about-text">
              <h2>About Me</h2>
              <p>
                Étudiant passionné par l'informatique, je possède une solide formation en développement web,
                programmation et gestion de projets numériques. Curieux, créatif et rigoureux, je m'implique
                totalement dans chaque mission pour proposer des solutions innovantes et efficaces.
              </p>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Années d'expérience</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Projets complétés</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">8+</div>
                  <div className="stat-label">Technologies maîtrisées</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Stages professionnels</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="resume-section">
          <div className="resume-content">
            <h2>Resume</h2>

            <div className="resume-grid">
              <div className="resume-column">
                <h3>Education</h3>

                <div className="resume-item">
                  <h4>Master Professionnelle (Informatique Générale)</h4>
                  <div className="company">École Nationale de l'Informatique</div>
                  <div className="period">2025 – 2026</div>
                  <p>Deuxième année de Master Professionnelle en Informatique Générale.</p>
                </div>

                <div className="resume-item">
                  <h4>Licence Professionnelle</h4>
                  <div className="company">École Nationale de l'Informatique</div>
                  <div className="period">2024 – 2025</div>
                  <p>Première année de Master – Obtention de la Licence Professionnelle, mention Bien.</p>
                </div>

                <div className="resume-item">
                  <h4>Baccalauréat Série D</h4>
                  <div className="company">Collège Capricorn School</div>
                  <div className="period">2020 – 2021</div>
                  <p>Obtention du Baccalauréat Série D, mention Assez Bien.</p>
                </div>
              </div>

              <div className="resume-column">
                <h3>Experience & Projects</h3>

                <div className="resume-item">
                  <h4>Projet de fin d'année</h4>
                  <div className="company">École Nationale de l'Informatique</div>
                  <div className="period">Octobre 2025</div>
                  <p>Conception et réalisation d'une application web pour un réfrigérateur intelligent (Flask + PostgreSQL).</p>
                </div>

                <div className="resume-item">
                  <h4>Stage en informatique</h4>
                  <div className="company">E-Work Pro (France)</div>
                  <div className="period">Août – Octobre 2024</div>
                  <p>Conception et réalisation d'une application web de consultation médicale en ligne (Django + PostgreSQL).</p>
                </div>

                <div className="resume-item">
                  <h4>Stage en informatique</h4>
                  <div className="company">Softlab SARLU (Antananarivo)</div>
                  <div className="period">Septembre – Octobre 2023</div>
                  <p>Gestion de facturation et réalisation d'un site web avec PHP (CodeIgniter 4 + MySQL).</p>
                </div>

                <div className="resume-item">
                  <h4>Projet de fin d'année</h4>
                  <div className="company">École Nationale de l'Informatique</div>
                  <div className="period">Septembre 2022</div>
                  <p>Réalisation d'une application desktop de gestion des prêts automobiles (Qt Creator + Microsoft Access).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="portfolio-section">
          <div className="portfolio-content">
            <div className="portfolio-header">
              <h2>Portfolio</h2>
              <p>Découvrez mes réalisations et expériences</p>
            </div>

            <div className="portfolio-filters">
              <button className="filter-btn active">ALL</button>
              <button className="filter-btn">WEB DESIGN</button>
              <button className="filter-btn">APPLICATIONS</button>
            </div>

            <div className="portfolio-grid">
              <div className="portfolio-card">
                <div className="portfolio-image">
                  Réfrigérateur Intelligent
                </div>
                <div className="portfolio-info">
                  <h3>Réfrigérateur Intelligent</h3>
                  <p>Application web complète pour la gestion d'un réfrigérateur intelligent avec suivi de température et inventaire automatique.</p>
                </div>
              </div>

              <div className="portfolio-card">
                <div className="portfolio-image">
                  Plateforme Médicale
                </div>
                <div className="portfolio-info">
                  <h3>Plateforme Médicale</h3>
                  <p>Application web de consultation médicale en ligne avec gestion des patients et rendez-vous.</p>
                </div>
              </div>

              <div className="portfolio-card">
                <div className="portfolio-image">
                  Système de Facturation
                </div>
                <div className="portfolio-info">
                  <h3>Système de Facturation</h3>
                  <p>Site web de gestion de facturation complète avec interface administrateur et génération de PDF.</p>
                </div>
              </div>

              <div className="portfolio-card">
                <div className="portfolio-image">
                  Gestion Prêts Auto
                </div>
                <div className="portfolio-info">
                  <h3>Gestion Prêts Auto</h3>
                  <p>Application desktop de gestion des prêts automobiles avec interface graphique professionnelle.</p>
                </div>
              </div>

              <div className="portfolio-card">
                <div className="portfolio-image">
                  Projet 5
                </div>
                <div className="portfolio-info">
                  <h3>Projet 5</h3>
                  <p>Description du projet 5 avec les technologies utilisées.</p>
                </div>
              </div>

              <div className="portfolio-card">
                <div className="portfolio-image">
                  Projet 6
                </div>
                <div className="portfolio-info">
                  <h3>Projet 6</h3>
                  <p>Description du projet 6 avec les technologies utilisées.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">"Excellent travail, très professionnel et créatif."</p>
                <div className="font-semibold">Client 1</div>
                <div className="text-sm text-gray-500">Entreprise ABC</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">"Projet livré dans les délais avec une qualité exceptionnelle."</p>
                <div className="font-semibold">Client 2</div>
                <div className="text-sm text-gray-500">Entreprise XYZ</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="contact-content">
            <div className="contact-form">
              <h3>Feel free to contact me!</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            </div>

            <div className="contact-info">
              <h3>Get in Touch</h3>
              <div className="contact-item">
                <h4>Email</h4>
                <p>evondrayfalesonv@gmail.com</p>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <p>+261 33 896 0108</p>
              </div>
              <div className="contact-item">
                <h4>Address</h4>
                <p>Rte Circulaire, Fianarantsoa 301, Madagascar</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;