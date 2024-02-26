library(shiny)
devtools::load_all()

pages <- qs::qread("C:/Users/maxim/Unsync/curbcut-montreal/data/modules.qs")
pages <- pages[c("id", "theme", "nav_title")]

c_city_svg <- 'www/c-montreal.svg'

news_cards <- tibble::tibble(id = character(),
                             icon = character(),
                             title_en = character(),
                             title_fr = character(),
                             text_en = character(),
                             text_fr = character(),
                             link = character())

news_cards <-
  news_cards |>
  tibble::add_row(id = "curbcut5a7",
                  icon = "transport",
                  title_en = "Curbcut 5@7",
                  title_fr = "5@7 Curbcut",
                  text_en = paste0(
                    "Join us in celebrating Curbcut's latest update! We're hosting a 5@7 e",
                    "vent at the McGill Engine Centre on October 2nd. Don't miss this oppor",
                    "tunity to explore our innovative new features and join in-depth discus",
                    "sions on how Curbcut is shaping the future of urban sustainability. Se",
                    "e you there!"
                  ),
                  text_fr = paste0(
                    "Rejoignez-nous pour célébrer la toute dernière mise à jour de Curbcut ",
                    "! Nous organisons un 5@7 au Centre d'Innovation McGill le 2 octobre. N",
                    "e manquez pas cette occasion de découvrir nos nouvelles fonctionnalité",
                    "s innovantes et de participer à des discussions approfondies sur la ma",
                    "nière dont Curbcut façonne l'avenir de la durabilité urbaine. À très b",
                    "ientôt !"
                  ),
                  link = "https://www.eventbrite.ca/e/curbcut-57-tickets-705402857937") |>
  tibble::add_row(id = "greenness",
                  icon = "ecology",
                  title_en = "Explore Urban Greenery",
                  title_fr = "Explorez la verdure urbaine",
                  text_en = paste0(
                    "Curbcut unveils its cutting-edge page focused on Normalized Difference ",
                    "Vegetation Index (NDVI) analytics for in-depth vegetation analysis. ",
                    "Leveraging advanced satellite data, the platform offers a c",
                    "omprehensive look at plant health and density in urban areas. Through ",
                    "precise calculations and quality filtering, we provide actionable insi",
                    "ghts for urban planning and environmental conservation. This becomes a",
                    " crucial asset for stakeholders in urban sustainability and environmen",
                    "tal justice."
                  ),
                  text_fr = paste0(
                    "Curbcut dévoile sa nouvelle page innovante axée sur l'analyse approfon",
                    "die de l'Indice de Différence de Végétation Normalisée (NDVI). En expl",
                    "oitant des données satellitaires avancées, la plateforme offre un aper",
                    "çu complet de la santé et de la densité des plantes en milieu urbain. ",
                    "Grâce à des calculs précis et à un filtrage de qualité, nous offrons d",
                    "es renseignements concrets utiles pour l'aménagement urbain et la prés",
                    "ervation de l'environnement. Cet outil devient un atout essentiel pour",
                    " les acteurs de la durabilité urbaine et de la justice environnemental",
                    "e."
                  ),
                  link = "ndvi") |>
  tibble::add_row(id = "lst",
                  icon = "climat",
                  title_en = "Land Surface Temperature",
                  title_fr = "Température au sol",
                  text_en = paste0(
                    "Unveiling our latest Land Surface Temperature (LST) analytics! Our new",
                    " LST page provides accurate, three-year mean temperature estimates. A ",
                    "must-see for researchers and policymakers in urban sustainability."
                  ),
                  text_fr = paste0(
                    "Découvrez nos dernières analyses sur la température au sol ! Notre nou",
                    "velle page offre des estimations précises de la température moyenne su",
                    "r une période de trois ans. Un passage obligé pour les chercheurs et l",
                    "es décideurs en durabilité urbaine."
                  ),
                  link = "lst") |>
  tibble::add_row(id = "alp",
                  icon = "health",
                  title_en = "Active Living Potential",
                  title_fr = "Potentiel de vie active",
                  text_en = paste0(
                    "Curbcut has developed its own Active Living Potential index. This inde",
                    "x quantifies which areas provide walkable environments to their reside",
                    "nts based on street connectivity, building density and points of inter",
                    "est. We developed the index with out internal travel time matrix datas",
                    "et which uses a 15-minute walk buffer on the street network."
                  ),
                  text_fr = paste0(
                    "Curbcut a développé son propre indice de potentiel de vie active. Cet ",
                    "indice quantifie les zones qui offrent des environnements propices à l",
                    "a marche à leurs résidents en fonction de la connectivité des rues, de",
                    " la densité des bâtiments et des points d'intérêt. Nous avons développ",
                    "é cet indice à l'aide de notre matrice interne de données sur les temp",
                    "s de déplacement, qui utilise un tampon de 15 minutes de marche sur le",
                    " réseau de rues."
                  ),
                  link = "alp") |>
  tibble::add_row(id = "census",
                  icon = "demographics",
                  title_en = "2021 Census",
                  title_fr = "Recensement de 2021",
                  text_en = paste0(
                    "We’ve added new data to the site! 2021 Census data is now available on",
                    " all pages."
                  ),
                  text_fr = paste0(
                    "Nous avons ajouté de nouvelles données au site ! Les données du recens",
                    "ement de 2021 sont maintenant disponibles sur toutes les pages."
                  ),
                  link = NA)


discover_cards <- tibble::tibble(
  id = c('metro', 'alp', 'gentrification', 'access'),
  img = c("www/pic-five-roses.jpg", "www/pic-active-living.jpg", "www/pic-biosphere.jpg",
          "www/pic-amenities.jpg"),
  theme = c('ecology', 'health', 'urban', 'transport'),
  en = c('The Evolution of the Montreal Metro', 'Active Living Potential: The Canale Index', 'Environmental racism and green gentrification', 'Access to Amenities'),
  fr = c("L'évolution du métro de Montréal", "Potentiel de vie active : L'indice Canale", "Racisme environnemental et embourgeoisement vert", "Accès aux commodités")
)

discover_cards$preview_en <- paste("Preview for", discover_cards$en)
discover_cards$preview_fr <- paste("Preview for", discover_cards$fr)

team_cards <- tibble::tibble(
  id = c('davidw', 'kevinm', 'maxbdb', 'dominiqueb'),
  img = c("www/david_wachsmuth.jpeg", "www/kevin_manaugh.jpg", "www/maxime_belanger_de_blois.jpg",
          "www/dominique_boulet.jpg"),
  name = c('David Wachsmuth', 'Kevin Manaugh', 'Maxime Bélanger De Blois', 'Dominique Boulet'),
  role_en = c('Co-founder & Co-CEO', 'Co-founder & Co-CEO', 'Head of Technology and Data', 'Qualitative Research Lead'),
  role_fr = c('Co-fondateur et co-PDG', 'Co-fondateur et co-PDG', 'Responsable technologie et données', 'Responsable de la recherche qualitative'),
  # bio_en = c("David is one of the world’s leading experts on the impacts of short-term rental platforms, such as Airbnb, on cities around the world and consults widely with municipalities and community organizations on designing appropriate regulations. In addition to his work at Curbcut, David is the Canada Research Chair in Urban Governance at McGill University, where he is also an Associate Professor in the School of Urban Planning.",
  #            "Kevin is one of the leading experts on the intersection between urban transport systems and social and environmental justice. In addition to his work at Curbcut, Kevin is also an associate professor at McGill University jointly appointed in the Department of Geography and the Bieler School of Environment.",
  #            "Maxime is a skilled, resourceful and forward-thinking data scientist, adept at developing and transforming intricate datasets into actionable intelligence. With a master's degree in Urban Planning from McGill University, his extensive understanding of data analysis and geovisualization enables him to extract valuable insights and provide innovative solutions.",
  #            "Dominique is driven to create qualitative work that complements quantitative information. She has a master’s degree in Urban Planning from McGill University and a master’s degree in Anthropology from Aarhus University, Copenhagen."),
  # bio_fr = c("David est l'un des plus grands experts mondiaux sur les impacts des plateformes de location à court terme, telles que Airbnb, sur les villes du monde entier et consulte largement les municipalités et les organisations communautaires sur la conception de réglementations appropriées. En plus de son travail chez Curbcut, David est titulaire de la Chaire de recherche du Canada en gouvernance urbaine à l'Université McGill, où il est également professeur associé à l'École d'urbanisme.",
  #            "Kevin est l'un des principaux experts de l'intersection entre les systèmes de transport urbain et la justice sociale et environnementale. En plus de son travail chez Curbcut, Kevin est également professeur associé à l'Université McGill, nommé conjointement au département de géographie et à l'école d'environnement Bieler.",
  #            "Maxime est un scientifique de données habile, ingénieux et avant-gardiste, capable de concevoir et de transformer des ensembles de données complexes en renseignements exploitables. Diplômé d'une maîtrise en urbanisme de l'Université McGill, sa connaissance approfondie de l'analyse des données et de la géovisualisation lui permet d'extraire des informations précieuses et de proposer des solutions innovantes.",
  #            "Dominique est motivée par la nécessité de produire des études qualitatives qui complètent les informations quantitatives. Elle est titulaire d'une maîtrise en urbanisme de l'Université McGill et d'une maîtrise en anthropologie de l'Université d'Aarhus, à Copenhague."),
  theme = c('housing', 'transport', 'health', 'urban')
)

contributors <- c(
  'Cloé St-Hilaire',
  'Emma Ezvan',
  'Daniela Rodriguez',
  'Connor Cordingley',
  'Robin Basalaev-Binder',
  'Josh Medicoff',
  'Philip Bligh',
  'Lauren Rosenthal'
)

translation_df <- tibble::tibble(
  en = c('Climate'),
  fr = c('Climat')
)

collabs <- tibble::tibble(
  id = c('MSSI', 'centraide'),
  img = c("www/mcgill-logo.png", "www/centraide-logo.png"),
  name = c('The McGill Sustainability Systems Initiative', 'Centraide')
)

h1_first_line <- list(en = "MONTREAL", fr = "RÉGION DE")
h1_second_line <- list(en = "REGION", fr = "MONTRÉAL")

ui <- fluidPage(

  tags$head(
    tags$style(HTML("
      .container-fluid {
        padding-left: 0;
        padding-right: 0;
      }
    "))
  ),

  landing_input("landing",
                h1_first_line = h1_first_line,
                h1_second_line = h1_second_line,
               pages = pages,
               c_city_svg = c_city_svg,
               news_cards = news_cards,
               discover_cards = discover_cards,
               team_cards = team_cards,
               contributors = contributors,
               translation_df = translation_df,
               collabs = collabs,
               placeholder_video_src = "https://s3.amazonaws.com/curbcut.public.resources/mtl_vid_placeholder.mp4",
               video_src = "https://s3.amazonaws.com/curbcut.public.resources/mtl_vid_placeholder.mp4",
               lang = "fr",
               show_cities = FALSE),

  actionButton("lang", "lang", style = "position:absolute;z-index:99999;top:0px")
)

server <- function(input, output, session) {

  click <- reactive(get_landing_click("landing"))

  observeEvent(click(), {
    update_landing(session = session,
                   inputId = "landing",
                   configuration = list(
                     turn = 'off'
                   ))

  }, ignoreNULL = TRUE)

  discover <- reactive(get_landing_discover("landing"))

  observeEvent(discover(), {
    print(discover())
  }, ignoreNULL = TRUE)

  news <- reactive(get_landing_news("landing"))

  observeEvent(news(), {
    print(news())
  }, ignoreNULL = TRUE)

  lang_click <- reactive(get_lang_click("landing"))

  observeEvent(lang_click(), {
    print(lang_click())
  }, ignoreNULL = TRUE, ignoreInit = TRUE)

  # observe(print(input$landing))

  observeEvent(input$lang, {
    update_landing(session = session,
                   inputId = "landing",
                   configuration = list(
                     lang = if (input$lang %% 2 == 0) "en" else "fr"
                   ))
  })

}

shinyApp(ui, server)

# pages <- qs::qread("C:/Users/maxim/Unsync/curbcut-montreal/data/modules.qs")
# translation_df <- qs::qread("C:/Users/maxim/Unsync/curbcut-montreal/data/translation_df.qs")
# pages <- pages[c("id", "theme", "nav_title")]
# translation_df <- translation_df[translation_df$en %in% c(pages$theme, pages$nav_title), ]
#
# ui <- fluidPage(
#   theme_drop_input("theme_drop", pages = pages, theme = "Transport",
#                    translation_df = translation_df, lang = "en")
# )
#
# server <- function(input, output, session) {
#
#   click <- reactive(get_theme_drop_click("theme_drop"))
#
#   observeEvent(click(), {
#     print(click())
#   }, ignoreNULL = TRUE)
#
#   observe({
#     update_theme_drop_lang(session = session, inputId = "theme_drop",
#                            lang = "fr")
#   })
#
# }
#
# shinyApp(ui, server)
#

# ui <- fluidPage(
#   shiny::actionButton("show", label = "SHOW"),
#   shiny::actionButton("hide", label = "HIDE"),
#   shiny::actionButton("en", label = "EN"),
#   shiny::actionButton("fr", label = "FR"),
#   title_box_input("title_box", theme = "Housing",
#                   title_text_title = "The housing system",
#                   title_text_main = '<p>Housing is at the centre of our lives. Our ability to find affordable, adequate, and healthy accommodations profoundly affects our life chances.',
#                   title_text_extra = "<p>The datasets visualized on this page come from the Canadian Census from 1996 to the present. There are a few efforts in place to better the housing landscape from the federal and municipal governments. In Canada, the National Housing Strategy aims to address housing needs and houselessness through modernization, new construction, and innovation and research. Within the City of Montreal, important housing initiatives include the Diverse Metropolis by-law and the 12,000-housing unit strategy. For more information on these initiatives visit:<ul><li><a href='https://www.cmhc-schl.gc.ca/en/nhs/' target='_blank'>CMHC. (n.d.). National Housing Strategy</a></li><li><a href='https://montreal.ca/articles/metropole-mixte-les-grandes-lignes-du-reglement-7816' target='_blank'>Ville de Montréal. (4 octobre 2021). Métropole Mixte: Les grandes lignes du règlement.</a></li></ul></p>", lang = 'fr', minWidth = '300px',
#                   maxWidth = '400px', show = 'false')
# )
#
# server <- function(input, output, session) {
#
#   observeEvent(input$show, {
#
#     update_title_box(session = session, inputId = "title_box",
#                      configuration = list(show = 'true'))
#   })
#
#   observeEvent(input$hide, {
#     update_title_box(session = session, inputId = "title_box",
#                      configuration = list(show = 'false'))
#   })
#
#   observeEvent(input$en, {
#     update_title_box(session = session, inputId = "title_box",
#                      configuration = list(title_text_title = 'The housing system',
#                                           lang = 'en'))
#   })
#
#   observeEvent(input$fr, {
#     update_title_box(session = session, inputId = "title_box",
#                      configuration = list(title_text_title = 'Système de logement',
#                                           lang = 'fr'))
#   })
#
# }
#
# shinyApp(ui, server)
