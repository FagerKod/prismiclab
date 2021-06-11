import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import HomepageBanner from "../components/HomepageBanner"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const Homepage = ({ data }) => {
  if (!data) return null
  const document = data.allPrismicHomepage.edges[0].node.data

  const bannerContent = {
    title: document.banner_title,
    description: document.banner_description,
    link: document.banner_link,
    linkLabel: document.banner_link_label,
    background: document.banner_background,
  }

  const seoContent = {
    title: document.seo_title,
    description: document.seo_description.text,
  }

  const prismicNavigation = data.prismicNavigation

  return (
    <Layout isHomepage navigation={prismicNavigation}>
      <Seo title={seoContent.title} description={seoContent.description} />
      <HomepageBanner bannerContent={bannerContent} />
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query Homepage {
    allPrismicHomepage {
      edges {
        node {
          _previewable
          data {
            seo_title
            seo_description {
              text
            }
            banner_title {
              raw
              text
            }
            banner_description {
              raw
            }
            banner_link {
              url
              type
              uid
            }
            banner_link_label {
              raw
            }
            banner_background {
              url
              gatsbyImageData
              alt
            }
            body {
              ... on PrismicHomepageDataBodyText {
                slice_type
                primary {
                  columns
                  content {
                    raw
                  }
                }
              }
              ... on PrismicHomepageDataBodyQuote {
                slice_type
                primary {
                  quote {
                    raw
                  }
                }
              }
              ... on PrismicHomepageDataBodyFullWidthImage {
                slice_type
                primary {
                  full_width_image {
                    url
                    gatsbyImageData
                    alt
                  }
                }
              }
              ... on PrismicHomepageDataBodyImageGallery {
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
              ... on PrismicHomepageDataBodyImageHighlight {
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

export default withPrismicPreview(Homepage, [
  {
    repositoryName: "prismictestskott",
    linkResolver,
  },
])
