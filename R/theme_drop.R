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
#'
#' @return A ReactShiny input object.
#' @export
theme_drop_input <- function(inputId, pages, width = "250px", theme) {

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
         theme = theme),
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
