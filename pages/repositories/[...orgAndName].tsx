import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type Repository = {
  name: string;
  description: string;
  url: string;
}

type RepositoryProps = {
  repository: Repository;
};

export default function Repository({ repository }: RepositoryProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>{repository.name}</h2>
      <p>{repository.description}</p>
      <a href={repository.url}>Acessar</a>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { orgAndName: ["rocketseat", "umbriel"] } },
      { params: { orgAndName: ["rocketseat", "adonis-bull"] } },
      { params: { orgAndName: ["rocketseat", "gatsby-themes"] } },
      { params: { orgAndName: ["rocketseat", "docs"] } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [org, name] = params.orgAndName as string[];

  const response = await fetch(`http://api.github.com/repos/${org}/${name}`);
  const data = await response.json();

  const repository = {
    name: data.name,
    description: data.description,
    url: data.html_url
  };

  return {
    props: {
      repository
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}