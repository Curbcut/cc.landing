#' Create a Themed Title Box Shiny Input
#'
#' This function creates a React-based Shiny Input for title boxes.
#'
#' @param inputId <`character`> An identifier string for the new Shiny input.
#' This ID makes it possible to refer to the input in server logic.
#' @param theme <`character`> A character string defining the theme for the title box.
#' @param title_text_title <`character`> A character string defining the main title text.
#' @param title_text_main <`character`> A character string defining the subtitle text.
#' @param title_text_extra <`character`> A character string defining any additional text.
#' @param lan <`character`>g A character string defining the language for the title box,
#' defaults to English ('en').
#' @param minWidth <`character`> A character string specifying the minimum width of the title
#' box, defaults to '300px'.
#' @param maxWidth <`character`> A character string specifying the maximum width of the title
#' box, defaults to '400px'.
#' @param show <`character`> A character string indicating whether to show the title box by
#'default, 'true' or 'false'. Defaults to 'false'.
#'
#' @return Returns a Shiny input element that can be added to a Curbcut page.
#'
#' @export
title_box_input <- function(inputId, theme, title_text_title, title_text_main,
                            title_text_extra, lang = 'en', minWidth = '400px',
                            maxWidth = '40vw', show = 'false') {


  reactR::createReactShinyInput(
    inputId,
    "title_box",
    htmltools::htmlDependency(
      name = "title_box-input",
      version = "1.0.0",
      src = "www/cc.landing",
      package = "cc.landing",
      script = "main.js"
    ),
    "",
    list(theme = theme,
         title_text_title = title_text_title,
         title_text_main = title_text_main,
         title_text_extra = title_text_extra,
         minWidth = minWidth,
         maxWidth = maxWidth,
         show = show,
         lang = lang),
    htmltools::tags$div
  )
}

#' Update the title box input
#'
#' The `update_title_box` function updates a 'ReactShiny' input object for Curbcut.
#' It allows changing the value of the input element with the given 'inputId'.
#' Optionally, it also updates the configuration of the input element if provided.
#'
#' @param session <`shiny.session`> The Shiny session within which to update the input value.
#' @param inputId <`character`> The ID of the input element to be updated.
#' @param configuration <`names list`> The new configuration for the input
#' element.
#'
#' @seealso
#' \code{\link{title_box_input}} for creating the landing input.
#'
#' @return The function doesn't return a value but modifies the input element
#' state in the active Shiny session.
#' @export
update_title_box <- function(session, inputId, configuration = NULL) {
  message <- list(value = inputId)
  if (!is.null(configuration)) {

    message$configuration <- configuration

  }
  session$sendInputMessage(inputId, message)
}

