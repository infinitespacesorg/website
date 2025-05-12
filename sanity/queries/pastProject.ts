import { groq } from "next-sanity";

export const pastProjectQuery = groq`*[_type == "pastProject" && slug.current == $slug][0]{
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