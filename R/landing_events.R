#' Retrieve Event Information from the Landing input
#'
#' This function retrieves the specified event information.
#' The type of event is specified with `event_type` and the values to be
#' retrieved are defined in `values`.
#'
#' @param inputId <`character`> The identifier for the landing id object in the Shiny application.
#' @param event_type <`character`>The type of event to retrieve information for.
#' @param values <`character vector`> A vector of values to be retrieved from the
#' specified event.
#' @param session <`session`> The Shiny session object. Defaults to the current reactive
#' domain.
#' @return The specified values for the event if it exists and is of the
#' specified event type, NULL otherwise.
#' @export
get_landing_event <- function(inputId, event_type, values, session = shiny::getDefaultReactiveDomain()) {
  if (!is.null(session$input[[inputId]]["event"])) {
    if (!is.na(session$input[[inputId]]["event"])) {
      if (session$input[[inputId]]["event"] == event_type) {
        return(session$input[[inputId]][values])
      }
    }
  }
}

#' Retrieve Page Link Click Information from Landing input
#'
#' This function retrieves page link click information using `get_landing_event`.
#'
#' @param inputId A `character` string that identifies the landing id object in
#'   the Shiny application.
#' @param session The Shiny `session` object. By default, it uses the current
#'   reactive domain.
#' @return Returns the ID of the page clicked if it exists. If it does not
#'   exist, it returns NULL.
#' @export
get_landing_click <- function(inputId, session = shiny::getDefaultReactiveDomain()) {
  out <- get_landing_event(
    inputId = inputId, event_type = "page_link",
    values = "page", session = session
  )

  if (length(out) == 0) {
    return(NULL)
  }

  return(out$page)
}

#' Retrieve Discover Link Click Information from Landing input
#'
#' This function retrieves page link click information using `get_landing_event`.
#'
#' @param inputId A `character` string that identifies the landing id object in
#'   the Shiny application.
#' @param session The Shiny `session` object. By default, it uses the current
#'   reactive domain.
#' @return Returns the ID of the discover card clicked if it exists. If it does not
#'   exist, it returns NULL.
#' @export
get_landing_discover <- function(inputId, session = shiny::getDefaultReactiveDomain()) {
  out <- get_landing_event(
    inputId = inputId, event_type = "discover_link",
    values = "card_id", session = session
  )

  if (length(out) == 0) {
    return(NULL)
  }

  return(out$card_id)
}

#' Retrieve lang click from Landing input
#'
#' This function retrieves lang click information using `get_landing_event`.
#'
#' @param inputId A `character` string that identifies the landing id object in
#'   the Shiny application.
#' @param session The Shiny `session` object. By default, it uses the current
#'   reactive domain.
#' @return Returns the ID of the page clicked if it exists. If it does not
#'   exist, it returns NULL.
#' @export
get_lang_click <- function(inputId, session = shiny::getDefaultReactiveDomain()) {
  out <- get_landing_event(
    inputId = inputId, event_type = "lang_change",
    values = "lang", session = session
  )

  if (length(out) == 0) {
    return(NULL)
  }

  return(out$lang)
}
