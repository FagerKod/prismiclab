import React from "react"
import { graphql } from "gatsby"
import HomepageBanner from "../components/HomepageBanner"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import linkResolver from "../utils/linkResolver"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Homepage = ({ data }) => {
  if (!data) return null
  const document = data.prismicHomepage.data
  console.log("startsida document", document)

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
  query homepageQuery($lang: String) {
    prismicHomepage(lang: { eq: $lang }) {
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      data {
        banner_background {
          alt
          gatsbyImageData
          url
        }
        banner_description {
          raw
        }
        banner_link {
          lang
          type
          uid
          url
        }
        banner_link_label {
          raw
        }
        seo_description {
          raw
        }
        seo_title
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
            id
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
            id
            slice_type
            primary {
              gallery_title {
                raw
              }
            }
            items {
              image {
                alt
                gatsbyImageData
                url
              }
              link {
                url
                uid
                type
              }
              link_label {
                raw
              }
              image_description {
                raw
              }
            }
          }
          ... on PrismicHomepageDataBodyImageHighlight {
            id
            slice_type
            primary {
              featured_image {
                alt
                gatsbyImageData
                url
              }
              title {
                raw
              }
              description {
                raw
              }
              link {
                url
                uid
                type
              }
              link_label {
                raw
              }
            }
          }
        }
        banner_title {
          raw
        }
      }
      _previewable
    }
    prismicNavigation(lang: { eq: $lang }) {
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
