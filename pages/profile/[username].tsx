import { GetServerSideProps } from "next";

type Profile = {
  name: string;
  bio: string;
}

type ProfileProps = {
  profile: Profile;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params;

  try {
    const response = await fetch(`http://api.github.com/users/${username}`);
    const data = await response.json();

    const profile = {
      name: data.name,
      bio: data.bio,
    };

    return {
      props: {
        profile
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}