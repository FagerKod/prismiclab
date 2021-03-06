import React, { useState } from "react"
import { graphql } from "gatsby"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import linkResolver from "../utils/linkResolver"
import Layout from "../UI/Layout"
import Seo from "../UI/Seo"

const Page = ({ data }) => {
  console.log("data.allPrismicPage page", data.allPrismicPage)
  console.log("data.prismicPage page", !!data.prismicPage)

  const previewData = !!data.prismicPage

  const document = previewData
    ? data.prismicPage.data
    : data.allPrismicPage.edges[0].node.data
  const prismicNavigation = data.prismicNavigation

  console.log("document", document)

  const capitalizeFirstLetter = input => {
    return input[0].toUpperCase() + input.slice(1)
  }

  if (!data) return null
  return (
    <Layout navigation={prismicNavigation}>
      {/* <Seo title={capitalizeFirstLetter(document.uid)} /> */}
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($uid: String) {
    allPrismicPage(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          uid
          _previewable
          data {
            body {
              ... on PrismicPageDataBodyText {
                slice_type
                primary {
                  columns
                  content {
                    raw
                  }
                }
              }
              ... on PrismicPageDataBodyQuote {
                slice_type
                primary {
                  quote {
                    raw
                  }
                }
              }
              ... on PrismicPageDataBodyFullWidthImage {
                slice_type
                primary {
                  full_width_image {
                    url
                    gatsbyImageData
                    alt
                  }
                }
              }
              ... on PrismicPageDataBodyImageGallery {
                slice_type
                primary {
                  gallery_title {
                    raw
                  }
                }
                items {
                  image {
                    url
                    gatsbyImageData
                    alt
                  }
                  image_description {
                    raw
                  }
                  link {
                    url
                    type
                    uid
                  }
                  link_label {
                    raw
                  }
                }
              }
              ... on PrismicPageDataBodyImageHighlight {
                slice_type
                primary {
                  featured_image {
                    url
                    gatsbyImageData
                    alt
                  }
                  title {
                    raw
                  }
                  description {
                    raw
                  }
                  link {
                    url
                    type
                    uid
                  }
                  link_label {
                    raw
                  }
                }
              }
            }
          }
        }
      }
    }
    prismicNavigation {
      ...HeaderQuery
    }
  }
`

export default withPrismicPreview(Page, [
  {
    repositoryName: "prismictestskott",
    linkResolver,
  },
])
