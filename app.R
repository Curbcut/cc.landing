library(shiny)
library(cc.landing)

pages <- qs::qread("C:/Users/maxim/Unsync/curbcut-montreal/data/modules.qs")
pages <- pages[c("id", "theme", "nav_title")]
pages$theme[12] <- "Explorer"
pages$theme[13] <- "Urban life"

c_city_svg <-  'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTUgMjEiPgogIDxyZWN0IHg9IjI1IiB3aWR0aD0iOTAiIGhlaWdodD0iMjEiIHJ4PSI0IiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeT0iLjAzMiIgd2lkdGg9IjIwLjczOCIgaGVpZ2h0PSIyMC43MzgiIHJ4PSI0IiBmaWxsPSIjZmZmIi8+CiAgPHBhdGggZD0iTTE3LjY3NyA4LjY4VjUuODdoLTEuOTc0YS43OTIuNzkyIDAgMCAxLS43OTItLjc5M1YzLjEwNUg1LjgzNnYxLjk3NmEuNzkyLjc5MiAwIDAgMS0uNzkxLjc5M0gzLjA2NnY5LjA5OGgxLjk3OWMuNDM3IDAgLjc5MS4zNTQuNzkxLjc5M3YxLjk4M2g5LjA3NXYtMS45ODNjMC0uNDM5LjM1NC0uNzkzLjc5Mi0uNzkzaDEuOTc0di0yLjgxaC0yLjgwNHYxLjk4M2EuNzkyLjc5MiAwIDAgMS0uNzkuNzkzaC03LjQyYS43OTIuNzkyIDAgMCAxLS43OTItLjc5M1Y2LjcwOGMwLS40MzguMzU0LS43OTMuNzkxLS43OTNoNy40MmMuNDM3IDAgLjc5MS4zNTUuNzkxLjc5M1Y4LjY4aDIuODA0WiIgZmlsbD0iIzAwMCIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMC4zMjcgNy4yMTloNS4xMzN2NS4xMzNoLTUuMTMzeiIvPgogIDxwYXRoIGQ9Ik0yMi44OTQgNy4yMTljLTEuODA3IDAtMi4xOS0xLjc4LTIuMTU2LTIuNjdsLS45MjQgMS40Mzh2Mi4xNTVoMy4wOFY3LjIyWk0yMi44OTQgMTIuMjQ5Yy0xLjgwNyAwLTIuMTkgMS43OC0yLjE1NiAyLjY3bC0uOTI0LTEuNDM4di0yLjE1NmgzLjA4di45MjRaTTIzLjIwMiA3LjIxOWMxLjgwNiAwIDIuMTktMS43OCAyLjE1NS0yLjY3bC45MjUgMS40Mzh2Mi4xNTVoLTMuMDhWNy4yMlpNMjMuMjAyIDEyLjI0OWMxLjgwNiAwIDIuMTkgMS43OCAyLjE1NSAyLjY3bC45MjUtMS40Mzh2LTIuMTU2aC0zLjA4di45MjRaIiBmaWxsPSIjZmZmIi8+CiAgPHBhdGggZD0iTTMyLjM2MiA0LjI1OGgyLjYxbDQuMDA4IDExLjQ3NmguMDM4bDQuMDA4LTExLjQ3NmgyLjYwOXYxMy40NTdoLTEuNzQ2VjkuMTRjMC0uNzY5LjAyLTEuNTM4LjAyLTIuMzA3aC0uMDM4bC0zLjg1NiAxMC44ODJIMzcuOThMMzQuMTI1IDYuODMzaC0uMDM4YzAgLjc3LjAyIDEuNTM4LjAyIDIuMzA3djguNTc1aC0xLjc0NlY0LjI1OGguMDAyWk00Ny4zOCAxMi40M2MwLTMuNTU3IDIuMzItNS41NzYgNS4yMzYtNS41NzYgMi45MTUgMCA1LjIzNiAyLjAxOSA1LjIzNiA1LjU3NXMtMi4zMjEgNS41NzUtNS4yMzYgNS41NzVjLTIuOTE1IDAtNS4yMzctMi4wMTktNS4yMzctNS41NzVabTUuMjM2IDQuMDc0YzEuOTE4IDAgMy40MzMtMS4zODQgMy40MzMtNC4wNzUgMC0yLjY5MS0xLjUxNS00LjA3NS0zLjQzMy00LjA3NXMtMy40MzMgMS4zODQtMy40MzMgNC4wNzVjMCAyLjY5MSAxLjUxNSA0LjA3NSAzLjQzMyA0LjA3NVpNNTkuMzQ5IDcuMTQzaDEuNjg4djEuOThoLjAzOGMuNjMzLTEuNDA0IDEuODYtMi4yNjkgMy40OS0yLjI2OSAyLjIyNiAwIDMuNTY5IDEuNTk2IDMuNTY5IDQuNTE4djYuMzQ0aC0xLjcyN3YtNi4xNzJjMC0yLjI4Ny0uOTk3LTMuMTUyLTIuMzc3LTMuMTUyLTEuNDk3IDAtMi45NTMgMS4wMzgtMi45NTMgMy41OTV2NS43MjlINTkuMzVWNy4xNDNoLS4wMDFaTTcxLjE0IDE0LjkyOFY4LjY4aC0yLjExVjcuMTQ0aDIuMTFWNC4yNTloMS43Mjd2Mi44ODRoMy4zMzhWOC42OGgtMy4zMzh2Ni4yNDdjMCAuOTAzLjQ2IDEuMjUgMS4yNjYgMS4yNWgyLjE2OHYxLjUzOGgtMi4zNmMtMS44NDEgMC0yLjgtLjkyMy0yLjgtMi43ODhaTTc3LjQzNSA3LjE0M2gxLjY4OHYxLjg0NmguMDM4Yy40OTktMS4xMTYgMS4wNzUtMS44NDYgMi43NjEtMS44NDZoMS4wMTdWOC42OGgtMS4yNDdjLTEuNzY0IDAtMi41MzEgMS4wNTgtMi41MzEgMy4wNzZ2NS45NmgtMS43MjZWNy4xNDNaTTgzLjA2NSAxMi40M2MwLTMuNDAzIDIuMTEtNS41NzYgNS4xNC01LjU3NiAyLjg0IDAgNS4wMDcgMS44ODUgNS4wMDcgNS4wMTh2MS4xMzRoLTguMzI0Yy4xMzQgMS45OCAxLjM0MyAzLjQ5OCAzLjM1NyAzLjQ5OCAxLjQ1OCAwIDIuNTktLjc4OCAzLjAxLTIuMDM4aDEuODYxYy0uNDQxIDIuMDc3LTIuMzYgMy41MzctNC44NzEgMy41MzctMy4xMDcgMC01LjE3OS0yLjIxMS01LjE3OS01LjU3NWwtLjAwMS4wMDFabTguMzQzLS45MDRjMC0xLjg4NC0xLjE4OS0zLjE3Mi0zLjE0NS0zLjE3MnMtMy4xMDcgMS4zODQtMy4zMzcgMy4xNzJoNi40ODNabS0yLjUzMS04LjQyaDEuOTE4TDg4Ljg3NyA1LjkzaC0xLjUzNWwxLjUzNS0yLjgyNVpNOTcuNjggMTguMDA0Yy0yLjAxNCAwLTMuNjA2LTEuMTUzLTMuNjA2LTMuMzQ0IDAtMi4zODMgMS45MTgtMy4zMDYgNC4wMDgtMy4zMDZoMS42NjhjMS4wNTUgMCAxLjU5Mi0uNDQzIDEuNTkyLTEuMjcgMC0xLjE1My0xLjA1NC0xLjczLTIuMzc3LTEuNzMtMS41NTUgMC0yLjY0OC43ODktMi43NjIgMi4yMWgtMS43MjZjLjE1NC0yLjI0OCAxLjYzLTMuNzEgNC40ODgtMy43MSAyLjg1NyAwIDQuMTA0IDEuNTE4IDQuMTA0IDMuNTk1djUuMDU2YzAgLjUuMTcyLjY3My42NzEuNjczaC40OHYxLjUzOGgtMS4xMzJjLTEuMDE2IDAtMS42NS0uNjE1LTEuNjUtMS41NzZ2LS42MTVoLS4wMzhjLS42NzEgMS42OTItMi4wNTIgMi40NzktMy43MiAyLjQ3OVptLjMyNi0xLjVjMS43NDYgMCAzLjMzNi0xLjE1MyAzLjMzNi0zLjYzMlYxMS42OGgtLjAzOGMtLjM2My43NjktMS4wMzUgMS4xNTMtMi4zMjEgMS4xNTNoLS44NjNjLTEuNjUgMC0yLjI0NC44NjUtMi4yNDQgMS44MjcgMCAuOTYuNjE0IDEuODQ2IDIuMTMgMS44NDZ2LS4wMDJaTTEwNS40NzYgMi43MDFoMS43MjZ2MTUuMDE1aC0xLjcyNlYyLjdaIiBmaWxsPSIjMDAwIi8+Cjwvc3ZnPg=='

news_cards <- tibble::tibble(
  id = c("census", "centraide", "alp"),
  icon = c("demographics", "urban", "health"),
  title_en = c("2021 Census", "Centraide x Curbcut", "Active Living Potential"),
  title_fr = c("Recensement de 2021", "Centraide x Curbcut", "Potentiel de vie active"),
  text_en = c("We’ve added new data to the site! 2021 Census data is now available on all pages.",
              "In a novel collaboration, Centraide of Greater Montreal is partnering with Curbcut on a series of housing maps. Centraide is using its social expertise and data to help target and interpret housing issues, a decisive factor in poverty and social exclusion.",
              "Curbcut has developed its own Active Living Potential index. This index quantifies which areas provide walkable environments to their residents based on street connectivity, building density and points of interest. We developed the index with out internal travel time matrix dataset which uses a 15-minute walk buffer on the street network."),
  text_fr = c("Nous avons ajouté de nouvelles données au site ! Les données du recensement de 2021 sont maintenant disponibles sur toutes les pages.",
              "Dans une collaboration inédite, Centraide du Grand Montréal s’associe à Curbcut à travers une série de cartes dédiées au logement. Centraide met son expertise sociale et ses données au profit de la plateforme pour mieux cibler et interpréter les enjeux liés au logement, qui est un facteur déterminant sur la pauvreté et l’exclusion sociale.",
              "Curbcut a développé son propre indice de potentiel de vie active. Cet indice quantifie les zones qui offrent des environnements propices à la marche à leurs résidents en fonction de la connectivité des rues, de la densité des bâtiments et des points d'intérêt. Nous avons développé cet indice à l'aide de notre matrice interne de données sur les temps de déplacement, qui utilise un tampon de 15 minutes de marche sur le réseau de rues.")
)

discover_cards <- tibble::tibble(
  id = c('metro', 'alp', 'gentrification', 'access'),
  img = c("www/pic-five-roses.jpg", "www/pic-active-living.jpg", "www/pic-biosphere.jpg",
          "www/pic-amenities.jpg"),
  theme = c('ecology', 'health', 'urban', 'transport'),
  en = c('The Evolution of the Montreal Metro', 'Active Living Potential: The Canale Index', 'Environmental racism and green gentrification', 'Access to Amenities'),
  fr = c("L'évolution du métro de Montréal", "Potentiel de vie active : L'indice Canale", "Racisme environnemental et embourgeoisement vert", "Accès aux commodités")
)

team_cards <- tibble::tibble(
  id = c('davidw', 'kevinm', 'maxbdb', 'dominiqueb'),
  img = c("www/david_wachsmuth.jpeg", "www/kevin_manaugh.jpg", "www/maxime_belanger_de_blois.jpg",
          "www/dominique_boulet.jpg"),
  name = c('David Wachsmuth', 'Kevin Manaugh', 'Maxime Bélanger De Blois', 'Dominique Boulet'),
  role_en = c('Co-founder & Co-CEO', 'Co-founder & Co-CEO', 'Head of Technology and Data', 'Qualitative Research Lead'),
  role_fr = c('Co-fondateur et co-PDG', 'Co-fondateur et co-PDG', 'Responsable technologie et données', 'Responsable de la recherche qualitative'),
  bio_en = c("David is one of the world’s leading experts on the impacts of short-term rental platforms, such as Airbnb, on cities around the world and consults widely with municipalities and community organizations on designing appropriate regulations. In addition to his work at Curbcut, David is the Canada Research Chair in Urban Governance at McGill University, where he is also an Associate Professor in the School of Urban Planning.",
             "Kevin is one of the leading experts on the intersection between urban transport systems and social and environmental justice. In addition to his work at Curbcut, Kevin is also an associate professor at McGill University jointly appointed in the Department of Geography and the Bieler School of Environment.",
             "Maxime is a skilled, resourceful and forward-thinking data scientist, adept at developing and transforming intricate datasets into actionable intelligence. With a master's degree in Urban Planning from McGill University, his extensive understanding of data analysis and geovisualization enables him to extract valuable insights and provide innovative solutions.",
             "Dominique is driven to create qualitative work that complements quantitative information. She has a master’s degree in Urban Planning from McGill University and a master’s degree in Anthropology from Aarhus University, Copenhagen."),
  bio_fr = c("David est l'un des plus grands experts mondiaux sur les impacts des plateformes de location à court terme, telles que Airbnb, sur les villes du monde entier et consulte largement les municipalités et les organisations communautaires sur la conception de réglementations appropriées. En plus de son travail chez Curbcut, David est titulaire de la Chaire de recherche du Canada en gouvernance urbaine à l'Université McGill, où il est également professeur associé à l'École d'urbanisme.",
             "Kevin est l'un des principaux experts de l'intersection entre les systèmes de transport urbain et la justice sociale et environnementale. En plus de son travail chez Curbcut, Kevin est également professeur associé à l'Université McGill, nommé conjointement au département de géographie et à l'école d'environnement Bieler.",
             "Maxime est un scientifique de données habile, ingénieux et avant-gardiste, capable de concevoir et de transformer des ensembles de données complexes en renseignements exploitables. Diplômé d'une maîtrise en urbanisme de l'Université McGill, sa connaissance approfondie de l'analyse des données et de la géovisualisation lui permet d'extraire des informations précieuses et de proposer des solutions innovantes.",
             "Dominique est motivée par la nécessité de produire des études qualitatives qui complètent les informations quantitatives. Elle est titulaire d'une maîtrise en urbanisme de l'Université McGill et d'une maîtrise en anthropologie de l'Université d'Aarhus, à Copenhague."),
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
  en = c('Hello', 'Goodbye', 'About', 'About Curbcut', 'The Team', 'Contact Us', 'FR', 'CLOSE', 'Climate', 'Climate risk',
         'Ecology', 'EXPLORE<br />URBAN', 'SUSTAIN&shy;ABILITY', 'About us', 'Curbcut is a platform for deep, dynamic, and intuitive exploration of urban sustainability.',
         'More about Curbcut', 'Discover', 'View all', 'Latest news', 'Read more', 'Browse themes', 'Newsletter', 'Keep in touch!',
         'GET UPDATES', 'Our collaborators', 'Curbcut cities', 'by LEEROY. All rights reserved.'),
  fr = c('Salut', 'Adieux', 'À propos', 'À propos de Curbcut', "L'équipe", 'Contact', 'EN', 'FERMER', 'Climat', 'Risque Climatique',
         'Écologie', 'EXPLORER LA', 'DURABILITÉ', 'À propos', "Curbcut est une plateforme d'exploration approfondie, dynamique et intuitive de la durabilité urbaine.",
         'Plus sur Curbcut', 'Découvrez', 'Afficher tout', 'Dernières nouvelles', 'En lire plus', 'Parcourez les thèmes', 'Infolettre', 'Gardons contact!',
         "S'INSCRIRE", 'Nos partenaires', 'Villes Curbcut', 'by LEEROY. Tous droits réservés.')
)

collabs <- tibble::tibble(
  id = c('MSSI', 'centraide'),
  img = c("www/mcgill-logo.png", "www/centraide-logo.png"),
  name = c('The McGill Sustainability Systems Initiative', 'Centraide')
)

ui <- fluidPage(

  tags$head(
    tags$style(HTML("
      .container-fluid {
        padding-left: 0;
        padding-right: 0;
      }
    "))
  ),

  landingInput("landing_page",
               pages = pages,
               c_city_svg = c_city_svg,
               news_cards = news_cards,
               discover_cards = discover_cards,
               team_cards = team_cards,
               contributors = contributors,
               translation_df = translation_df,
               collabs = collabs)
)

server <- function(input, output, session) {
  observe(print(input$landing_page))
}

shinyApp(ui, server)

