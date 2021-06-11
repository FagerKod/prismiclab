const linkResolver = doc => {
  console.log("linkResolver körs")

  if (doc.type === "page") {
    return `/${doc.uid}`
  }
  return "/"
}

module.exports = linkResolver
