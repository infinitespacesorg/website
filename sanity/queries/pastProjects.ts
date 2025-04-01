import { groq } from "next-sanity";

export const PAST_PROJECTS_QUERY = groq`*[_type == "pastProject" && defined(slug.current)]{
    _type,
    name, 
    slug,
    teamMember->{
        name,
        slug,
        jobTitle,
        bio,
        associatedLink,
        showOnAboutPage,
        image{
        asset->{
            _id,
            url,
            mimeType,
            metadata {
            lqip,
            dimensions {
                width,
                height
            }
            }
        },
        alt
        },
    },
    impact,
    description,
    associatedLink,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    }
}`;

export const PAST_PROJECTS_SLUGS_QUERY = groq`*[_type == "pastProject" && defined(slug)]{slug}`;