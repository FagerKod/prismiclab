const linkResolver = doc => {
  if (doc.type === "page") {
    if (doc.lang !== "en-us") {
      return `/sv-se/${doc.uid}`
    }
    return `/${doc.uid}`
  }

  if (doc.type === "homepage") {
    if (doc.lang !== "en-us") {
      return "/sv-se"
    }
    return "/"
  }
  //return "/"
}

module.exports = linkResolver
