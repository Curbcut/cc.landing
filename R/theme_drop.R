#' Generate a theme dropdown input for a Curbcut app
#'
#' The `theme_drop_input` function generates a 'ReactShiny' input object for a
#' Curbcut app. It's used to switch active page.
#'
#' @param inputId <`character`> The ID of the input element.
#' @param pages <`data.frame`>
#'   A data frame containing information about the pages. It should have the following columns:
#'     \itemize{
#'       \item \code{id}: Unique identifier for each page. (`alp`)
#'       \item \code{theme}: Theme of the page (`Health`)
#'       \item \code{nav_title}: Navigation title of the page. (`Active living potential`)
#'     }
#' @param width <`character`> width in pixel of the widget.
#' @param theme <`character`> Current theme of the page in which this input will live.
#' @param home_str <`character`> String to link back to the home page. Defaults to `"Home"`.
#' @param translation_df <`data.frame`>
#'   A data frame containing translation pairs. It should have the following columns:
#'     \itemize{
#'       \item \code{en}: Text content in English. (`Housing`, ...)
#'       \item \code{fr}: Text content in French. (`Logement`, ...)
#'     }
#' @param lang <`character`> Default language, 'en' or 'fr'.
#'
#' @return A ReactShiny input object.
#' @export
theme_drop_input <- function(inputId, pages, width = "250px", theme, home_str = 'Home',
                             translation_df, lang = "en") {

  # Convert everything to JSON
  pages <- jsonlite::toJSON(pages)

  reactR::createReactShinyInput(
    inputId,
    "theme_drop",
    htmltools::htmlDependency(
      name = "theme_drop-input",
      version = "1.0.0",
      src = "www/cc.landing",
      package = "cc.landing",
      script = "main.js"
    ),
    "",
    list(pages = pages,
         width = width,
         theme = theme,
         translation_df = translation_df,
         lang = lang,
         home_str = home_str),
    htmltools::tags$div
  )
}

#' Update the theme dropdown input
#'
#' The `update_theme_drop` function updates a 'ReactShiny' input object for Curbcut.
#' It allows changing the value of the input element with the given 'inputId'.
#' Optionally, it also updates the configuration of the input element if provided.
#'
#' @param session <`shiny.session`> The Shiny session within which to update the input value.
#' @param inputId <`character`> The ID of the input element to be updated.
#' @param configuration <`names list`> The new configuration for the input
#' element.
#'
#' @seealso
#' \code{\link{theme_drop_input}} for creating the landing input.
#'
#' @return The function doesn't return a value but modifies the input element
#' state in the active Shiny session.
#' @export
update_theme_drop <- function(session, inputId, configuration = NULL) {
  message <- list(value = inputId)
  if (!is.null(configuration)) {

    message$configuration <- configuration

  }
  session$sendInputMessage(inputId, message)
}

#' Update the theme pages
#'
#' The `update_theme_pages` function updates the pages in a 'ReactShiny' input
#' object for Curbcut, specifically in the theme dropdown. This can be useful
#' when there's a need to modify the page content in the active theme dropdown
#' during a session (for language change, for example.
#'
#' @param session <`shiny.session`> The Shiny session within which to update
#' the theme pages.
#' @param inputId <`character`> The ID of the input element to be updated.
#' @param lang <`character`> Default language, 'en' or 'fr'.
#'
#' @return The function doesn't return a value but modifies the theme pages
#' in the active theme dropdown input in the active Shiny session.
#' @export
update_theme_drop_lang <- function(session, inputId, lang) {
  update_theme_drop(session = session, inputId = inputId,
                    configuration = list(lang = lang))
}
