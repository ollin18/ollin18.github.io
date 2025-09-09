
const currentUrl = window.location.href;
const siteUrl = "http://localhost:4000"; 
let updatedUrl = currentUrl.replace("http://localhost:4000", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("pt-br".length > 0) {
  updatedUrl = updatedUrl.replace("/pt-br", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-sobre",
    title: "sobre",
    section: "Menu de navegação",
    handler: () => {
      window.location.href = "/pt-br/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "um tema simples para acadêmicos",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/blog/";
          },
        },{id: "nav-publicações",
          title: "publicações",
          description: "publicações por categoria em ordem cronológica reversa. gerado pelo jekyll-scholar.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/publications/";
          },
        },{id: "nav-projetos",
          title: "projetos",
          description: "Uma crescente coleção de seus projetos interessantes.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/projects/";
          },
        },{id: "nav-repositórios",
          title: "repositórios",
          description: "Edite o `_data/repositories.yml` e mude as listas `github_users` e `github_repos` para incluir seu próprio perfil do GitHub e repositórios.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Esta é uma descrição da página. Você pode modificá-la em &#39;_pages/cv.md&#39;. Também pode alterar ou remover o botão no topo de download de pdf.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/cv/";
          },
        },{id: "nav-ensino",
          title: "ensino",
          description: "Materiais de cursos que você ministrou. Substitua esse texto com sua descrição.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/teaching/";
          },
        },{id: "nav-membros",
          title: "membros",
          description: "membros do grupo de pesquisa ou laboratório",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/people/";
          },
        },{id: "dropdown-publicações",
              title: "publicações",
              description: "",
              section: "Outras opções",
              handler: () => {
                window.location.href = "/pt-br/publications/";
              },
            },{id: "dropdown-projetos",
              title: "projetos",
              description: "",
              section: "Outras opções",
              handler: () => {
                window.location.href = "/pt-br/projects/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Outras opções",
              handler: () => {
                window.location.href = "/pt-br/blog/";
              },
            },{id: "post-distanciamiento-social-y-auto-aislamiento-en-épocas-de-covid-19",
        
          title: "Distanciamiento Social y Auto-aislamiento en épocas de COVID-19",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2020/SIS/";
          
        },
      },{id: "books-defying-dislacement",
          title: 'Defying Dislacement',
          description: "",
          section: "",handler: () => {
              window.location.href = "/pt-br/books/en-us/defying_displacement/";
            },},{id: "books-how-to-kill-a-city",
          title: 'How to Kill a City',
          description: "",
          section: "",handler: () => {
              window.location.href = "/pt-br/books/en-us/how_to_kill_a_city/";
            },},{id: "books-país-sin-techo",
          title: 'País sin Techo',
          description: "",
          section: "",handler: () => {
              window.location.href = "/pt-br/books/en-us/pais_sin_techo/";
            },},{id: "news-um-anúncio-simples-em-uma-linha",
          title: 'Um anúncio simples em uma linha.',
          description: "",
          section: "Novidades",},{id: "news-um-anúncio-longo-com-detalhes",
          title: 'Um anúncio longo com detalhes',
          description: "",
          section: "Novidades",handler: () => {
              window.location.href = "/pt-br/news/pt-br/announcement_2/";
            },},{id: "news-um-anúncio-simples-em-uma-linha-com-markdown-emoji-sparkles-smile",
          title: 'Um anúncio simples em uma linha com Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "Novidades",},{id: "projects-scraping-the-mexican-senate",
          title: 'Scraping the Mexican Senate',
          description: "Using Julia to scrape useful information from the Mexican Senate&#39;s website.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2017-02-10-scraping/";
            },},{id: "projects-voting-patterns-in-the-mexican-senate",
          title: 'Voting patterns in the Mexican Senate',
          description: "A network representation of the voting patterns of the Mexican Senate in the LXII and LXIII legislatures between 2012 and 2017.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2017-11-3-video/";
            },},{id: "projects-bot-emmett-brown",
          title: 'Bot Emmett Brown',
          description: "A Twitter bot that generates text according to the Doc&#39;s dialogues in the 3 Back to the Future movies.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2017-12-09-botemmett/";
            },},{id: "projects-mexican-senate-coalitions",
          title: 'Mexican Senate Coalitions',
          description: "Coalitions in the Mexican Senate from a complex networks point of view.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2017-12-11-coalitions/";
            },},{id: "projects-fractals-from-random-walkers",
          title: 'Fractals from random walkers',
          description: "Using L-systems and Diffusion-Limited Aggregation to create fractals.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2018-10-10-fractals/";
            },},{id: "projects-a-cellular-automata-sznajd-model",
          title: 'A Cellular Automata Sznajd Model',
          description: "Using a Sznajd model to simulate opinion dynamics in a 2D lattice and the effect of bots.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2018-10-25-CA/";
            },},{id: "projects-analysis-of-a-temporal-asylum-seekers-network",
          title: 'Analysis of a Temporal Asylum Seekers Network',
          description: "Using temporal networks to analyze asylum seekers petitions between countries from 2000 to 2017.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2019-08-18-Asylum/";
            },},{id: "projects-19s-mexico-39-s-resilience-in-an-earthquake-event",
          title: '19S - Mexico&amp;#39;s Resilience in an Earthquake Event',
          description: "A study of Mexico City&#39;s resilience after the September 19, 2017 earthquake using mobility and social media data.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2019-10-06-Earthquake/";
            },},{id: "projects-listening-to-communities-during-the-ebola-crisis",
          title: 'Listening to Communities During the Ebola Crisis',
          description: "How unmet needs shaped behaviors during the 2014-2015 Ebola outbreak in Sierra Leone.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2020-02-07-ebola/";
            },},{id: "projects-distanciamiento-social-y-auto-aislamiento-en-épocas-de-covid-19",
          title: 'Distanciamiento Social y Auto-aislamiento en épocas de COVID-19',
          description: "Using a SIS model to simulate the effect of social distancing and self-isolation in the spreading of COVID-19.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/es-mx/2020-03-13-SIS/";
            },},{id: "projects-socioeconomic-disparities-in-mobility-during-covid-19",
          title: 'Socioeconomic Disparities in Mobility During COVID-19',
          description: "How mobility changes during the COVID-19 pandemic varied widely by socioeconomic status in six developing countries.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2025-01-08-disparities/";
            },},{id: "projects-workreach-how-distance-job-quality-and-informality-shape-where-we-work",
          title: 'WorkReach: How Distance, Job Quality, and Informality Shape Where We Work',
          description: "Understanding urban work location choices through a new discrete-choice model blending distance, economic complexity, and informality.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/en-us/2025-08-15-workreach/";
            },},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://bsky.app/profile/ollin18.bsky.social", "_blank");
        },
      },{
        id: 'social-email',
        title: 'Enviar um email',
        section: 'Redes sociais',
        handler: () => {
          window.open("mailto:%6F%6C%6C%69%6E[%61%74]%62%65%72%6B%65%6C%65%79.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://github.com/ollin18", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://instagram.com/ollin18", "_blank");
        },
      },{
        id: 'social-lastfm',
        title: 'Last FM',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://www.last.fm/user/ollinlan", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://www.linkedin.com/in/ollin18", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=L1QJLFoAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://humnetlab.berkeley.edu/index.php/people/ollin-d-langle-chimal/", "_blank");
        },
      },{
          id: 'lang-en-us',
          title: 'en-us',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
          id: 'lang-es-mx',
          title: 'es-mx',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "/es-mx" + updatedUrl;
          },
        },{
          id: 'lang-fr-ca',
          title: 'fr-ca',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "/fr-ca" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Muda o tema para claro',
      description: 'Muda o tema do site para claro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Muda o tema para escuro',
      description: 'Muda o tema do site para escuro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Usa o tema padrão do sistema',
      description: 'Muda o tema do site para o padrão do sistema',
      section: 'Tema',
      handler: () => {
        setThemeSetting("system");
      },
    },];
