import { getCollection, type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";
import ogBg from "@/assets/og-bg.png";

import fs from "fs";
import path from "path";
interface Props {
  params: { slug: string };
  props: { champion: CollectionEntry<"champions"> };
}

export async function GET({ props }: Props) {
  const { champion } = props;

  // post cover with Image is pretty tricky for dev and build phase
  const background = fs.readFileSync(
    process.env.NODE_ENV === "development"
      ? path.resolve(ogBg.src.replace(/\?.*/, "").replace("/@fs", ""))
      : path.resolve(ogBg.src.replace("/", "dist/"))
  );

  const NunitoSemiBold = fs.readFileSync(
    path.resolve(
      "node_modules/@fontsource/nunito/files/nunito-latin-600-normal.woff"
    )
  );
  const NunitoBlack = fs.readFileSync(
    path.resolve(
      "node_modules/@fontsource/nunito/files/nunito-latin-900-normal.woff"
    )
  );
  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: "div",
    key: "og",
    props: {
      children: [
        {
          type: "img",
          props: {
            src: background.buffer,
            tw: "absolute w-full top-0 left-0",
          },
        },
        {
          type: "div",
          key: "content",
          props: {
            children: [
              {
                type: "div",
                key: "title",
                props: {
                  children: [
                    {
                      type: "img",
                      props: {
                        src: `https://github.com/${champion?.data?.social?.github || "not-found"}.png`,
                        tw: "w-64 h-64 rounded-full mb-4",
                      },
                    },
                    {
                      type: "h1",
                      props: {
                        children: `${champion.data.firstName} ${champion.data.lastName}`,
                        tw: "text-5xl font-bold text-white m-0",
                        style: {
                          fontFamily: "Nunito",
                        },
                      },
                    },
                    {
                      type: "p",
                      props: {
                        children: champion.data.role,
                        tw: "text-xl text-white m-0",
                        style: {
                          fontFamily: "Nunito",
                        },
                      },
                    },
                    {
                      type: "p",
                      props: {
                        children: champion.data.organization,
                        tw: "text-lg text-white m-0 opacity-70",
                        style: {
                          fontFamily: "Nunito",
                        },
                      },
                    },
                  ],
                  tw: "mb-4 flex flex-col items-center",
                },
              },
            ],
            tw: "relative z-10 text-center flex",
          },
        },
      ],
      tw: "w-full h-full flex items-center justify-center relative pb-20",
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Nunito",
        data: NunitoSemiBold.buffer,
        style: "normal",
        weight: 600,
      },
      {
        name: "Nunito",
        data: NunitoBlack.buffer,
        style: "normal",
        weight: 900,
      },
    ],
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const champions = await getCollection("champions");
  return champions.map((champion) => ({
    params: { id: champion.id },
    props: { champion },
  }));
}
