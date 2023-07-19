#' <Add Title>
#'
#' <Add Description>
#'
#' @importFrom reactR createReactShinyInput
#' @importFrom htmltools htmlDependency tags
#'
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

#' <Add Title>
#'
#' <Add Description>
#'
#' @export
update_theme_drop <- function(session, inputId, value, configuration = NULL) {
  message <- list(value = value)
  if (!is.null(configuration)) message$configuration <- configuration
  session$sendInputMessage(inputId, message);
}
