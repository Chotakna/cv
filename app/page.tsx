"use client"
//new one
import { useEffect, useState, useRef } from "react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const animatedTextRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const target = e.currentTarget as HTMLAnchorElement
        const targetId = target.getAttribute("href")
        if (!targetId) return
        
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
          })

          // Update active nav link
          navLinks.forEach((l) => l.classList.remove("active"))
          target.classList.add("active")

          // Close mobile menu after clicking
          setIsMenuOpen(false)
        }
      })
    })

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el)
    })

    // Update active nav on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll(".nav-link")

      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || ""
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    // Add interactive effects for glass cards
    document.querySelectorAll(".glass-card").forEach((card) => {
      card.addEventListener("mouseenter", function (e) {
        const target = e.currentTarget as HTMLElement
        target.style.transform = "translateY(-10px) scale(1.02)"
        target.style.transition = "transform 0.3s ease"
      })

      card.addEventListener("mouseleave", function (e) {
        const target = e.currentTarget as HTMLElement
        target.style.transform = "translateY(0) scale(1)"
      })
    })

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll(".skill-progress")
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width")
            entry.target.style.width = "0"
            setTimeout(() => {
              if (entry.target instanceof HTMLElement) {
                entry.target.style.transition = "width 1s ease"
                entry.target.style.width = width || "0%"
              }
            }, 200)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => {
      skillObserver.observe(bar)
    })

    // Typing effect for animated text
    function typeWriter(element: HTMLElement, text: string, speed: number, callback?: () => void) {
      let i = 0
      element.textContent = "" // Clear before starting
      function type() {
        if (i < text.length) {
          element.textContent = text.substring(0, i + 1)
          i++
          setTimeout(type, speed)
        } else if (typeof callback === "function") {
          setTimeout(callback, 2000) // Add pause before callback
        }
      }
      type()
    }

    function loopTypeWriter(element: HTMLElement, text: string, speed: number, pause: number) {
      function loop() {
        typeWriter(element, text, speed, () => {
          setTimeout(() => {
            element.textContent = "" // Clear text
            setTimeout(loop, 500) // Short pause before restarting
          }, pause)
        })
      }
      loop()
    }

    // Start typing animation when component mounts
    if (animatedTextRef.current) {
      loopTypeWriter(animatedTextRef.current, "Data scientist + web developer", 80, 1500)
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      navLinks.forEach((link) => {
        link.removeEventListener("click", () => {})
      })
    }
  }, [])

  return (
    <div className="portfolio-container">
      <nav className="main-nav">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link">
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link">
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link contact-btn">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="animated-text-container">
                <h1 className="animated-text" ref={animatedTextRef}></h1>
              </div>
              <p className="hero-description">
                Transforming data into insights and ideas into digital experiences. I bridge the gap between complex
                analytics and beautiful, functional web applications.
              </p>
              <div className="cta-buttons">
                <a href="#projects" className="btn btn-primary">
                  View My Work
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get In Touch
                </a>
              </div>
              <div className="social-links">
                <a
                  href="https://github.com/Chotakna?tab=overview&from=2025-09-01&to=2025-09-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/kruy-mony-chotakna-9899112b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-image-container">
              <div className="geometric-decoration"></div>
              <img src="/pic.png" alt="Kruy Monychotakna" className="profile-image" />
              <div className="geometric-decoration-2"></div>
            </div>
            <h4 className="profile-name">Kruy Monychotakna</h4>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h2 className="section-title fade-in">About Me</h2>
          <div className="about-grid">
            <div className="glass-card fade-in">
              <h3>Professional Background</h3>
              <p className="about-info">
                I am a dedicated frontend developer and data scientist with expertise in modern web technologies and
                statistical analysis. My technical proficiency spans HTML, CSS, JavaScript, React, and Python, enabling
                me to bridge the gap between data insights and user-centered design.
              </p>
              <p className="about-info">
                What drives me is the intersection of analytical thinking and creative problem-solving. I excel at
                transforming complex datasets into meaningful visualizations and building responsive web applications
                that deliver exceptional user experiences.
              </p>
              <p className="about-info">
                Based in Phnom Penh, Cambodia, I am committed to leveraging technology for meaningful impact while
                continuously expanding my expertise in emerging technologies and best practices.
              </p>
            </div>
            <div className="stats-grid fade-in">
              <div className="stat-item">
                <div className="stat-number">3rd</div>
                <div className="stat-label">Year Student</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Commitment</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-content">
                <div className="project-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                  </svg>
                </div>
                <h3 className="project-title">Report Management system</h3>
                <p className="project-description">
                  Developed a full-stack web application for uploading, analyzing, and visualizing CSV data. Built a dynamic dashboard with Next.js and React to display processed data, key metrics, and interactive charts, 
                  transforming raw files into actionable reports.
                </p>
                <div className="tech-tags">
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Chart.js</span>
                  <span className="tech-tag">Tailwind CSS</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-content">
                <div className="project-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="project-title">Room Booking System</h3>
                <p className="project-description">
                  Modern, responsive frontend application for room reservation management. Features intuitive user
                  interface design with seamless booking workflows and real-time availability updates.
                </p>
                <div className="tech-tags">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">HTML5</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">CSS3</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-content">
                <div className="project-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="20" x2="12" y2="10" />
                    <line x1="18" y1="20" x2="18" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="16" />
                  </svg>
                </div>
                <h3 className="project-title">Sales Forecasting Model</h3>
                <p className="project-description">
                  Machine learning solution for predictive sales analytics using advanced statistical modeling.
                  Implements data preprocessing, feature engineering, and model validation for accurate business
                  forecasting.
                </p>
                <div className="tech-tags">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Scikit-Learn</span>
                  <span className="tech-tag">Pandas</span>
                  <span className="tech-tag">Matplotlib</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2 className="section-title fade-in">Technical Expertise</h2>
          <div className="skills-grid">
            <div className="glass-card skill-category fade-in">
              <h3>Programming Languages</h3>
              <div className="skill-item">
                <span>Python</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="90%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>JavaScript</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="85%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>C/C++</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="75%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>SQL</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="80%"></div>
                </div>
              </div>
            </div>

            <div className="glass-card skill-category fade-in">
              <h3>Web Technologies</h3>
              <div className="skill-item">
                <span>HTML5/CSS3</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="95%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>React</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="85%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Responsive Design</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="90%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>UI/UX Design</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="80%"></div>
                </div>
              </div>
            </div>

            <div className="glass-card skill-category fade-in">
              <h3>Data Science</h3>
              <div className="skill-item">
                <span>Data Analysis</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="92%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Data Visualization</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="87%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Statistical Analysis</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="83%"></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Machine Learning</span>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="78%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2 className="section-title fade-in">Professional Contact</h2>
          <div className="contact-grid">
            <div className="contact-info fade-in">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>chotakna@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+855 93 806 187</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div>
                  <h4>Telegram</h4>
                  <p>093 806 187</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Phnom Penh, Cambodia</p>
                </div>
              </div>
            </div>

            <div className="glass-card fade-in">
              <h3>Let&apos;s Collaborate</h3>
              <p className="collaboration-text">
                I&apos;m always interested in discussing new opportunities, whether it&apos;s data analysis projects, frontend
                development work, or educational initiatives. Let&apos;s connect and explore how we can work together to
                create impactful solutions.
              </p>
              <div className="cta-buttons">
                <a
                  href="mailto:chotakna@gmail.com?subject=Professional%20Inquiry&body=Hello%20Kruy,%0D%0A%0D%0AI%20would%20like%20to%20discuss..."
                  className="btn btn-primary"
                >
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Kruy Monychotakna. All rights reserved. | Crafted with expertise in Phnom Penh, Cambodia</p>
      </footer>
    </div>
  )
}