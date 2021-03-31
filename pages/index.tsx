import { GetStaticProps } from 'next'
import Link from 'next/link';
import Head from 'next/head'

import styles from './home.module.css'

type Repository = {
  name: string;
  description: string;
  org: string;
};

type HomeProps = {
  repositories: Repository[];
};

export default function Home({ repositories }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <ul className={styles.repoList}>
        {repositories.map(repository => {
          return (
            <li key={repository.name}>
              <strong>{repository.name}</strong>
              <p>{repository.description}</p>
              <Link href={`/repositories/${repository.org}/${repository.name}`}>
                <a>
                  Acessar repositório
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/orgs/rocketseat/repos');
  const data = await response.json();

  const repositories = data.map(repository => {
    return {
      name: repository.name,
      description: repository.description,
      org: repository.owner.login,
    };
  });

  return {
    props: {
      repositories,
    },
    revalidate: 60 * 5, // 5 minutes
  }
}