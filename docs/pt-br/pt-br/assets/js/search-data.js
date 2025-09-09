
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
            },{id: "post-workreach-how-distance-job-quality-and-informality-shape-where-we-work",
        
          title: "WorkReach: How Distance, Job Quality, and Informality Shape Where We Work",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2025/workreach/";
          
        },
      },{id: "post-socioeconomic-disparities-in-mobility-during-covid-19",
        
          title: "Socioeconomic Disparities in Mobility During COVID-19",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2025/disparities/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Postagens",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "post-distanciamiento-social-y-auto-aislamiento-en-épocas-de-covid-19",
        
          title: "Distanciamiento Social y Auto-aislamiento en épocas de COVID-19",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2020/SIS/";
          
        },
      },{id: "post-listening-to-communities-during-the-ebola-crisis",
        
          title: "Listening to Communities During the Ebola Crisis",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2020/ebola/";
          
        },
      },{id: "post-19s-mexico-39-s-resilience-in-an-earthquake-event",
        
          title: "19S - Mexico&#39;s Resilience in an Earthquake Event",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2019/Earthquake/";
          
        },
      },{id: "post-analysis-of-a-temporal-asylum-seekers-network",
        
          title: "Analysis of a Temporal Asylum Seekers Network",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2019/Asylum/";
          
        },
      },{id: "post-a-cellular-automata-sznajd-model",
        
          title: "A Cellular Automata Sznajd Model",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2018/CA/";
          
        },
      },{id: "post-fractals-from-random-walkers",
        
          title: "Fractals from random walkers",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2018/fractals/";
          
        },
      },{id: "post-mexican-senate-coalitions",
        
          title: "Mexican Senate Coalitions",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2017/coalitions/";
          
        },
      },{id: "post-bot-emmett-brown",
        
          title: "Bot Emmett Brown",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2017/botemmett/";
          
        },
      },{id: "post-dynamics-of-the-mexican-senate",
        
          title: "Dynamics of the Mexican Senate",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2017/video/";
          
        },
      },{id: "post-scraping-the-mexican-senate",
        
          title: "Scraping the Mexican Senate",
        
        description: "",
        section: "Postagens",
        handler: () => {
          
            window.location.href = "/pt-br/blog/2017/scraping/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/pt-br/books/pt-br/the_godfather/";
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
          section: "Novidades",},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/9_project/";
            },},{id: "projects-projeto-1",
          title: 'projeto 1',
          description: "com imagem de fundo",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/pt-br/1_project/";
            },},{id: "projects-projeto-2",
          title: 'projeto 2',
          description: "um projeto com imagem de fundo e comentários do giscus",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/pt-br/2_project/";
            },},{id: "projects-projeto-3-com-um-nome-bem-longo",
          title: 'projeto 3 com um nome bem longo',
          description: "um projeto que redireciona pra outro website",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/pt-br/3_project/";
            },},{id: "projects-projeto-4",
          title: 'projeto 4',
          description: "outro sem imagem",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/pt-br/4_project/";
            },},{id: "projects-projeto-5",
          title: 'projeto 5',
          description: "um projeto com imagem de fundo",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/pt-br/5_project/";
            },},{id: "projects-projeto-6",
          title: 'projeto 6',
          description: "um projeto sem imagem",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/pt-br/6_project/";
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
