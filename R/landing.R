#' Generate a Landing Input for a Curbcut app
#'
#' The `landing_input` function generates a 'ReactShiny' input object for a
#' Curbcut app. It encodes image data into base64 format and prepares several
#' types of card data to be used in the landing page of the app.
#' @param inputId <`character`> The ID of the input element.
#'
#' @param pages <`data.frame`>
#'   A data frame containing information about the pages. It should have the following columns:
#'     \itemize{
#'       \item \code{id}: Unique identifier for each page. (`alp`)
#'       \item \code{theme}: Theme of the page (`Health`)
#'       \item \code{nav_title}: Navigation title of the page. (`Active living potential`)
#'     }
#'
#' @param c_city_svg <`character`>
#'   A character string representing the path to the top-left corner SVG image
#'   of the city. (`c-montreal`)
#'
#' @param news_cards <`data.frame`>
#'   A data frame containing information about news cards. It should have the following columns:
#'     \itemize{
#'       \item \code{id}: Unique identifier for each news card. (`census`)
#'       \item \code{icon}: Icon of the news card. (`demographics`)
#'       \item \code{title_en}: Title of the news card in English. (`2021 Census`)
#'       \item \code{title_fr}: Title of the news card in French. (`Recensement de 2021`)
#'       \item \code{text_en}: Text content of the news card in English.
#'       \item \code{text_fr}: Text content of the news card in French.
#'     }
#'
#' @param discover_cards <`data.frame`>
#'   A data frame containing information about discover cards. It should have the following columns:
#'     \itemize{
#'       \item \code{id}: Unique identifier for each discover card. (`metro`)
#'       \item \code{img}: Image file path for the discover card. (`www/discover/metro.png`)
#'       \item \code{theme}: Theme of the discover card. (`Transport`)
#'       \item \code{en}: Text content of the discover card in English. (`The Evolution of the Montreal metro`)
#'       \item \code{fr}: Text content of the discover card in French. (`L'évolution du métro de Montréal`)
#'     }
#'
#' @param team_cards <`data.frame`>
#'   A data frame containing information about team cards. It should have the following columns:
#'     \itemize{
#'       \item \code{id}: Unique identifier for each team card. (`maxbdb`)
#'       \item \code{img}: Image file path or URL for the team card. (`www/maxime_belanger_de_blois.png`)
#'       \item \code{name}: Name of the team member. (`Maxime Bélanger De Blois`)
#'       \item \code{role_en}: Role of the team member in English. (`Head of Technology and Data`)
#'       \item \code{role_fr}: Role of the team member in French. (`Responsable technologie et données`)
#'       \item \code{bio_en}: Biography of the team member in English.
#'       \item \code{bio_fr}: Biography of the team member in French.
#'       \item \code{theme}: Theme of the team card. (`Health`)
#'     }
#'
#' @param contributors <`character vector`>
#'   A character vector containing the names of contributors.
#'
#' @param collabs <`data.frame`>
#'   A data frame containing information about collaborators. It should have the following columns:
#'     \itemize{
#'       \item \code{id}: Unique identifier for each collaborator. (`MSSI`)
#'       \item \code{img}: Image file path or URL for the collaborator. (`www/mcgill-logo.png`)
#'       \item \code{name}: Name of the collaborator. (`McGill Sustainability Systems Initiative`)
#'     }
#'
#' @param translation_df <`data.frame`>
#'   A data frame containing translation pairs. It should have the following columns:
#'     \itemize{
#'       \item \code{en}: Text content in English. (`Housing`, ...)
#'       \item \code{fr}: Text content in French. (`Logement`, ...)
#'     }
#'
#' @return A ReactShiny input object.
#' @export
landing_input <- function(inputId, pages, c_city_svg, news_cards,
                         discover_cards, team_cards, contributors,
                         collabs, translation_df) {

  # Encode `svg` to base64 (top left corner image)
  svg_content <- readLines(c_city_svg, warn = FALSE)
  base64_content <- base64enc::base64encode(charToRaw(paste(svg_content, collapse = "\n")))
  c_city_svg <- paste0("data:image/svg+xml;base64,", base64_content)

  # Encode images to base64 for the input
  base64 <- function(x) {
    # Read the JPG image as raw binary data
    image_data <- readBin(x, "raw", file.info(x)$size)

    # Encode the image data to base64
    paste0("data:image/jpeg;base64,", base64enc::base64encode(image_data))
  }
  discover_cards$img <- sapply(discover_cards$img, base64)
  team_cards$img <- sapply(team_cards$img, base64)
  collabs$img <- sapply(collabs$img, base64)

  # Convert everything to JSON
  pages <- jsonlite::toJSON(pages)
  news_cards <- jsonlite::toJSON(news_cards)
  discover_cards <- jsonlite::toJSON(discover_cards)
  team_cards <- jsonlite::toJSON(team_cards)
  contributors <- jsonlite::toJSON(contributors)
  collabs <- jsonlite::toJSON(collabs)
  translation_df <- jsonlite::toJSON(translation_df)

  # The input
  reactR::createReactShinyInput(
    inputId,
    "landing",
    htmltools::htmlDependency(
      name = "landing-input",
      version = "1.0.0",
      src = "www/cc.landing",
      package = "cc.landing",
      script = "main.js"
    ),
    "",
    list(pages = pages,
         c_city_svg = c_city_svg,
         news_cards = news_cards,
         discover_cards = discover_cards,
         team_cards = team_cards,
         contributors = contributors,
         collabs = collabs,
         translation_df = translation_df),
    htmltools::tags$div
  )
}

#' Update the landing page input
#'
#' The `update_landing` function updates a 'ReactShiny' input object for Curbcut.
#' It allows changing the value of the input element with the given 'inputId'.
#' Optionally, it also updates the configuration of the input element if provided.
#'
#' @param session <`shiny.session`> The Shiny session within which to update the input value.
#' @param inputId <`character`> The ID of the input element to be updated.
#' @param configuration <`names list`> The new configuration for the input
#' element.
#'
#' @seealso
#' \code{\link{landing_input}} for creating the landing input.
#'
#' @return The function doesn't return a value but modifies the input element
#' state in the active Shiny session.
#' @export
update_landing <- function(session, inputId, configuration = NULL) {
  message <- list(value = inputId)
  if (!is.null(configuration)) {

    message$configuration <- configuration

  }
  session$sendInputMessage(inputId, message)
}
