import * as React from "react"
import {
  withPrismicUnpublishedPreview,
  componentResolverFromMap,
} from "gatsby-plugin-prismic-previews"

import { linkResolver } from "../utils/linkResolver"

import Page from "../templates/Page"
import Homepage from "./index"

const NotFoundPage = () => {
  return (
    <div>
      <h1>TRASIGT</h1>
    </div>
  )
}

export default withPrismicUnpublishedPreview(NotFoundPage, [
  {
    repositoryName: "prismictestskott",
    linkResolver,
    componentResolver: componentResolverFromMap({
      page: Page,
      homepage: Homepage,
    }),
  },
])
