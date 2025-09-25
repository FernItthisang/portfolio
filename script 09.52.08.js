// Google Sheets CMS for Portfolio
class PortfolioCMS {
    constructor() {
        this.sheetId = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual sheet ID
        this.apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
        this.portfolioData = null;
        this.currentProject = null;
        this.init();
    }

    async init() {
        await this.loadPortfolioData();
        this.setupEventListeners();
        this.renderPortfolio();
    }

    async loadPortfolioData() {
        try {
            // Fetch data from Google Sheets
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Portfolio!A1:Z1000?key=${this.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch data from Google Sheets');
            }

            const data = await response.json();
            this.portfolioData = this.parseSheetData(data.values);
            console.log('Portfolio data loaded:', this.portfolioData);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Fallback to static data if API fails
            this.portfolioData = this.getFallbackData();
        }
    }

    parseSheetData(values) {
        if (!values || values.length < 2) return this.getFallbackData();

        const headers = values[0];
        const projects = [];

        for (let i = 1; i < values.length; i++) {
            const row = values[i];
            if (row.length === 0 || !row[0]) continue; // Skip empty rows

            const project = {};
            headers.forEach((header, index) => {
                if (row[index]) {
                    project[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
                }
            });
            projects.push(project);
        }

        return {
            projects: projects,
            about: this.parseAboutSection(values)
        };
    }

    parseAboutSection(values) {
        // Look for about section in the sheet
        const aboutData = {};
        let inAboutSection = false;

        for (const row of values) {
            if (row[0] === 'ABOUT_SECTION') {
                inAboutSection = true;
                continue;
            }
            if (inAboutSection && row[0] === 'END_ABOUT') {
                break;
            }
            if (inAboutSection && row[0] && row[1]) {
                aboutData[row[0].toLowerCase().replace(/\s+/g, '_')] = row[1];
            }
        }

        return aboutData;
    }

    getFallbackData() {
        return {
            projects: [
                {
                    id: "1",
                    title: "Companion, Cohabitant and Continuum (Cee)",
                    date: "Fall 2024 - Spring 2025",
                    description: "Cee is not about creating a better robotic vacuum...",
                    thumbnail: "assets/thumbnail.png",
                    images: ["assets/thumbnail.png", "assets/demo.gif", "assets/about.png"],
                    video: null,
                    external_link: "https://gsapp-cdp.github.io/archive/projects/2025/companion-cohabitant-and-continuum/"
                }
                // Add more fallback projects as needed
            ],
            about: {
                name: "Fern Itthisang",
                greeting: "Hello! I'm Fern Itthisang",
                introduction: "Currently, I'm a designer who is passionate about data visualization...",
                current_status: "Right now, I'm pursuing my studies in Computational Design Practices (CDP) at GSAPP, Columbia University.",
                skills: "Data Visualization, UX/UI Design, Interaction Design, AI and Coding, Storytelling through Design",
                email: "pakjira[dot]itt[at]gmail[dot]com"
            }
        };
    }

    setupEventListeners() {
        // Project card click events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.project-card')) {
                const projectCard = e.target.closest('.project-card');
                const projectId = projectCard.dataset.project;
                this.showProjectDetails(projectId);
            }
        });

        // Back button
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.hideProjectDetails();
            });
        }

        // Box collapse/expand
        document.addEventListener('click', (e) => {
            if (e.target.closest('.box-title')) {
                const box = e.target.closest('.box');
                box.classList.toggle('collapsed');
            }
        });
    }

    renderPortfolio() {
        this.renderAboutSection();
        this.renderProjects();
    }

    renderAboutSection() {
        const about = this.portfolioData.about;
        if (!about) return;

        // Update header
        const headerLeft = document.querySelector('.header-left span');
        if (headerLeft && about.name) {
            headerLeft.textContent = about.name;
        }

        // Update about boxes
        const boxes = document.querySelectorAll('.box .content');
        boxes.forEach(box => {
            const boxTitle = box.previousElementSibling?.textContent;
            if (boxTitle && about[this.getAboutKey(boxTitle)]) {
                box.innerHTML = this.formatAboutContent(about[this.getAboutKey(boxTitle)]);
            }
        });
    }

    getAboutKey(title) {
        const keyMap = {
            'Say Hello!': 'greeting',
            'Where I Am Now?': 'current_status',
            'What Drives Me?': 'introduction',
            'My Vision': 'introduction',
            'My Skills and Approach': 'skills',
            'Let\'s Connect!': 'email'
        };
        return keyMap[title] || title.toLowerCase().replace(/\s+/g, '_');
    }

    formatAboutContent(content) {
        // Convert markdown-like formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n/g, '</p><p>')
            .replace(/^- (.*)/g, '<p>- <b>$1</b></p>');
    }

    renderProjects() {
        const projectContainer = document.getElementById('project-container');
        const projectDetails = document.getElementById('project-details');
        
        if (!projectContainer || !projectDetails) return;

        // Clear existing content
        projectContainer.innerHTML = '';
        projectDetails.innerHTML = '';

        // Render project cards
        this.portfolioData.projects.forEach((project, index) => {
            const projectId = index + 1;
            
            // Create project card
            const projectCard = this.createProjectCard(project, projectId);
            projectContainer.appendChild(projectCard);

            // Create project details
            const projectDetail = this.createProjectDetails(project, projectId);
            projectDetails.appendChild(projectDetail);
        });
    }

    createProjectCard(project, projectId) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.project = projectId;

        card.innerHTML = `
            <div class="project-thumbnail">
                <img src="${project.thumbnail || 'assets/default-thumbnail.png'}" alt="${project.title}" />
            </div>
            <div class="project-title">${project.title}</div>
        `;

        return card;
    }

    createProjectDetails(project, projectId) {
        const detail = document.createElement('div');
        detail.className = 'project-card-details';
        detail.dataset.project = projectId;

        let mediaContent = '';
        if (project.video) {
            mediaContent = `
                <video controls width="100%" style="border-radius: 4px;">
                    <source src="${project.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (project.images && project.images.length > 0) {
            if (project.images.length === 1) {
                mediaContent = `<img src="${project.images[0]}" alt="${project.title}" />`;
            } else {
                const imageElements = project.images.map(img => 
                    `<img src="${img}" alt="${project.title}" />`
                ).join('');
                mediaContent = `
                    <div class="project-images-carousel">
                        <div class="carousel-track">
                            ${imageElements}
                        </div>
                    </div>
                `;
            }
        }

        let externalLink = '';
        if (project.external_link) {
            externalLink = `<a class="learn-more-btn" href="${project.external_link}" target="_blank">Visit Project</a>`;
        }

        detail.innerHTML = `
            <div class="project-images">
                ${mediaContent}
            </div>
            <div class="project-title-row">
                <div class="project-title">${project.title}</div>
                <span class="project-date">${project.date || ''}</span>
            </div>
            <div class="project-description">
                ${this.formatDescription(project.description)}
            </div>
            ${externalLink}
        `;

        return detail;
    }

    formatDescription(description) {
        if (!description) return '';
        return description
            .replace(/\n/g, '</p><p>')
            .replace(/^- (.*)/g, '<p>- $1</p>');
    }

    showProjectDetails(projectId) {
        const projectContainer = document.getElementById('project-container');
        const projectDetails = document.getElementById('project-details');
        const backBtn = document.getElementById('back-btn');

        if (projectContainer && projectDetails && backBtn) {
            projectContainer.style.display = 'none';
            projectDetails.style.display = 'block';
            backBtn.style.display = 'block';

            // Show specific project
            const allDetails = projectDetails.querySelectorAll('.project-card-details');
            allDetails.forEach(detail => {
                detail.style.display = detail.dataset.project === projectId ? 'block' : 'none';
            });

            this.currentProject = projectId;
        }
    }

    hideProjectDetails() {
        const projectContainer = document.getElementById('project-container');
        const projectDetails = document.getElementById('project-details');
        const backBtn = document.getElementById('back-btn');

        if (projectContainer && projectDetails && backBtn) {
            projectContainer.style.display = 'grid';
            projectDetails.style.display = 'none';
            backBtn.style.display = 'none';
            this.currentProject = null;
        }
    }
}

// Initialize the CMS when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioCMS();
});