import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Files, BookA, User, ListCollapse, Quote, PersonStanding, Calendar } from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'team-member',
        title: 'Team Members',
        icon: PersonStanding,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'event',
        title: 'Events',
        icon: Calendar,
        S,
        context,
      })
    ]);
